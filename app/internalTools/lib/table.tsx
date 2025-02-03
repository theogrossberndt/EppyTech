import { useRef, useState, useMemo, memo, useCallback, useLayoutEffect } from 'react';
import styles from './table.module.css';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry, themeQuartz } from 'ag-grid-community';
import { AnimatePresence, motion } from "framer-motion"

// TODO: Pair down modules
ModuleRegistry.registerModules([AllCommunityModule]);

const themeBase = {
	fontFamily: 'monospace',
	fontSize: '1rem',
	headerFontWeight: 'bold'
};

const myTheme = themeQuartz.withParams({...themeBase, border: 'none'});

const makeRandomItem = (i) => {
	return {product: 'Product ' + i, location: 'Here', tags: 'Printer', stock: 1, i: i, fw: false};
}

export default function InventoryTable(){
	const charWidth = useCharacterWidth('bold');
	const padding = 30;
	const fiveChar = charWidth*6+padding;
	const eightChar = charWidth*8+padding;
	console.log("charWidth", charWidth);

	const [ expanded, setExpanded ] = useState<number | null>(null);
	const [ rowData, setRowData ] = useState(Array(10).fill().map((d, i) => makeRandomItem(i)));
	const [ colDefs, setColDefs ] = useState([
		{field: 'product', minWidth: eightChar*2, lockPosition: 'left', lockVisible: true, flex: 2},
		{field: 'location', minWidth: eightChar, initialWidth: eightChar, flex: 1},
		{field: 'tags', minWidth: eightChar*2, flex: 2},
		{field: 'stock', lockPosition: 'right', minWidth: fiveChar, initialWidth: fiveChar, maxWidth: fiveChar*2, resizable: false, lockVisible: true}
	]);

	const isEven = (rowIndex: number): boolean =>
		(rowIndex + (expanded !== null && rowIndex > expanded ? 1 : 0))%2 === 0;

	const rowClassRules = {
		[styles.rowNormalEven]: params => params.data.stock > 0 && isEven(params.rowIndex),
		[styles.rowNormalOdd]: params => params.data.stock > 0 && !isEven(params.rowIndex),
		[styles.rowRedEven]: params => params.data.stock === 0 && isEven(params.rowIndex),
		[styles.rowRedOdd]: params => params.data.stock === 0 && !isEven(params.rowIndex),
	}

	const gridOptions = {
		suppressScrollOnNewData: true,
		autoSizeStrategy: {
			type: 'fitGridWidth',
			columnLimits: [
				{colId: 'stock', minWidth: fiveChar},
				{colId: 'location', minWidth: eightChar}
			]
		},
		defaultColDef: {
			flex: 1,
			cellClass: styles.noBorder,
		},
		suppressCellFocus: true,
//		colResizeDefault: 'shift'
	}

	// Attempts to resize a column as much as possible
	// Returns the amount of overage that still needs to be compensated for
	// IE if this column could be reduced by 10px but 40px need to be reduced, this function returns 30
	// If over is negative, expands the column as much as possible instead
	const resizeColIfPossible = (api: GridApi<TData>, colName: string, over: number): boolean => {
		const col = api.getColumn(colName);
		if (!col)
			return over;
		const currentWidth = col.getActualWidth();
		const minWidth = col.getMinWidth();
		const maxWidth = col.getMaxWidth();
		if (over > 0 && currentWidth > minWidth){
			const reduceBy = Math.min(currentWidth-minWidth, over);
			console.log("Reducing ", colName, " by ", reduceBy, " px to compensate");
			api.setColumnWidths([{key: colName, newWidth: currentWidth-reduceBy, finished: false}]);
			return over-reduceBy;
		} else if (over < 0 && currentWidth < maxWidth){
			const growBy = Math.min(maxWidth-currentWidth, -1*over);
			console.log("Growing ", colName, " by ", growBy, " px to compensate");
			api.setColumnWidths([{key: colName, newWidth: currentWidth+growBy, finished: false}]);
			return over+growBy;
		}
		return over;
	}

	const onResize = useCallback((event: ColumnResizedEvent<TData>) => {
//		if (event.column && event.column.getActualWidth() == event.column.getMinWidth())
//			console.log("HIT MIN");
//		else if (!event.column && event.api){
//			console.log("no column", event.api?.getColumns());
//			const cols = event.api.getColumns();
//			col.forEach((col) => {
//				if (col.getLeft() > col.getOldLeft() && col.getActualWidth() == col.getMinWidth()){
//					resizeColIfPossible()
//				}
//			})
//		}
//		console.log(event.source);
		if (!event.api || !event.finished)
			return;

		// So long as nothing catestrophic has happened to reduce the grid size below the container width
		// the width should always be equal to the horizontal pixel range
		const range = event.api.getHorizontalPixelRange();
		if (!range)
			return;
		const width = range.right - range.left;

//		console.log("type", event.type, "on", event.column?.colId, "width", width);
//		console.log(event.api.getColumns());

		const stockCol = event.api.getColumn('stock');
		if (!stockCol)
			return;

		// Columns in order of least important to most important
		// Ie, stock should be minimized first and maximized last
		// product should be maximized first and minimized last
		const keyPriorities = ['stock', 'location', 'tags', 'product'];

		let over = stockCol.getLeft() - (width - stockCol.getActualWidth());

		// If any resize causes the stock column to start past the width - stock min width, we will be out of frame (breaking)
		// If its not a breaking resize event, theres nothing to do
		if (over == 0){
			console.log("Good resize");
			return;
		}

		if (over < 0){
			console.log("Undersized by", over, ":(");
			keyPriorities.reverse().some((key: string): boolean => {
				if ((!event.column || event.column.colId !== key) && event.api.getColumn(key)?.visible)
					over = resizeColIfPossible(event.api, key, over);
				return over == 0;
			});
			if (over < 0 && event.column)
				over = resizeColIfPossible(event.api, event.column.colId, over);
			return;
		}

		// If we get to here, its a breaking resize that needs to be fixed
		// Calculate how bad it is to start
		console.log("Oversized by", over, ":(");
//		console.log("Over by:", over, "px");

		// The stock column should be resized to it's minimum automatically, so no need to check it
		// Then, column resizing goes (in order): location, tags, product
		keyPriorities.some((key: string): boolean => {
			if ((!event.column || event.column.colId !== key) && event.api.getColumn(key)?.visible)
				over = resizeColIfPossible(event.api, key, over);
			return over <= 0;
		});

		if (over > 0 && event.column)
			over = resizeColIfPossible(event.api, event.column.colId, over);

	}, [])

	const fullWidthCellRenderer = useCallback(ClickPanelRenderer, []);

	const closeAnyPanels = (rowData) => rowData.filter(row => !row.fw);
	const createPanel = (rowData, index: number) => rowData.toSpliced(index+1, 0, {index: index, fw: true, });
	const openPanel = (indexIn: number) => {
		const index = expanded < indexIn ? indexIn-1 : indexIn;
		if (expanded === index){
			setRowData(rowData => closeAnyPanels(rowData));
			setExpanded(null);
		} else {
			setRowData(rowData => createPanel(closeAnyPanels(rowData), index));
			setExpanded(index);
		}
	}

//	const closeAnyPanels = (rowData) => rowData.map(d => ({...d, fw: false}));
//	const openPanel = (rowData, index: number) => closeAnyPanels(rowData).map((d, i: number) => ({...d, fw: i === index}))

	return (
		<div className={styles.divTable}>
			<AgGridReact rowData={rowData} columnDefs={colDefs} rowClassRules={rowClassRules} theme={myTheme} gridOptions={gridOptions} defaultColDef={gridOptions.defaultColDef}
				onColumnResized={onResize}
				isFullWidthRow={(params) => params.rowNode.data.fw}
				fullWidthCellRenderer={fullWidthCellRenderer}
				onRowClicked={(event) => openPanel(event.rowIndex)}
			/>
		</div>
	);
};

const ClickPanelRenderer = (props) => {
	const measurer = useRef(null);
	const [ height, setHeight ] = useState<number | null>(null);

	useLayoutEffect(() => {
		if (measurer.current){
			const calcHeight = measurer.current.offsetHeight;
			setHeight(calcHeight);
			props.node.setRowHeight(calcHeight);
			props.api.onRowHeightChanged();
		}
	})

	console.log(props);

	const cn = (props.node.rowIndex-1) % 2 == 0 ?
		styles.rowNormalEven :
		styles.rowNormalOdd;

	return (
		<AnimatePresence>
		<motion.div initial={{opacity: 0, height: 0}} animate={{opacity: 1, height: height}} exit={{opacity: 0, height: 0}} style={{overflow: 'hidden'}}>
			<div ref={measurer} style={{...themeBase, padding: '1rem'}} className={cn}>
				<h2>Hi</h2>
				<h2>Hi</h2>
				<h2>Hi</h2>
			</div>
		</motion.div>
		</AnimatePresence>
	);
}

const useCharacterWidth = (weight?: string) => {
  const didCompute = useRef(false);
  const widthRef = useRef(0);

  if (didCompute.current) return widthRef.current;

  // Creating invisible container
  const outer = document.createElement('div');
  outer.style.fontFamily = themeBase.fontFamily;
  outer.style.fontSize = themeBase.fontSize;
  if (weight)
	  outer.style.fontWeight = weight;
  outer.style.display = 'inline-block';
  outer.style.visibility = 'hidden';
  outer.innerHTML = 'a';
  document.body.appendChild(outer);

  // Calculating difference between container's full width and the child width
  const charWidth = outer.offsetWidth;

  // Removing temporary elements from the DOM
  outer.parentNode.removeChild(outer);

  didCompute.current = true;
  widthRef.current = charWidth;

  return charWidth;
};
