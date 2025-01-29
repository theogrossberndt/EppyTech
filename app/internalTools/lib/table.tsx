import { useRef, useState, useMemo, memo, useCallback } from 'react';
import styles from './table.module.css';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry, themeQuartz } from 'ag-grid-community';

// TODO: Pair down modules
ModuleRegistry.registerModules([AllCommunityModule]);

const themeBase = {
	fontFamily: 'monospace',
	fontSize: '1rem'
};

const myTheme = themeQuartz.withParams(themeBase);

const makeRandomItem = () => {
	return {product: 'Product', location: 'Here', tags: 'Printer', stock: 1};
}

export default function InventoryTable(){
	const charWidth = useCharacterWidth();
	const padding = 30;
	const fiveChar = charWidth*6+padding;
	const eightChar = charWidth*8+padding;
	console.log("charWidth", charWidth);

	const [ rowData, setRowData ] = useState(Array(10).fill().map(d => makeRandomItem()));
	const [ colDefs, setColDefs ] = useState([
		{field: 'product', },
		{field: 'location', minWidth: eightChar, initialWidth: eightChar},
		{field: 'tags', minWidth: eightChar*2},
		{field: 'stock', lockPosition: 'right', resizable: false, minWidth: fiveChar, initialWidth: fiveChar}
	]);

	const rowClassRules = {
		[styles.rowNormalEven]: params => params.data.stock > 0 && params.rowIndex % 2 === 0,
		[styles.rowNormalOdd]: params => params.data.stock > 0 && params.rowIndex % 2 === 1,
		[styles.rowRedEven]: params => params.data.stock === 0 && params.rowIndex % 2 === 0,
		[styles.rowRedOdd]: params => params.data.stock === 0 && params.rowIndex % 2 === 1,
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
		}
	}

	// Attempts to resize a column as much as possible
	// Returns the amount of overage that still needs to be compensated for
	// IE if this column could be reduced by 10px but 40px need to be reduced, this function returns 30
	const resizeColIfPossible = (api: GridApi<TData>, colName: string, over: number): boolean => {
		const col = api.getColumn(colName);
		if (!col)
			return over;
		const currentWidth = col.getActualWidth();
		const minWidth = col.getMinWidth();
		if (currentWidth > minWidth){
			const reduceBy = Math.min(currentWidth-minWidth, over);
			console.log("Resizing ", colName, " by ", reduceBy, " px to compensate");
			api.setColumnWidths([{key: colName, newWidth: currentWidth-reduceBy, finished: false}]);
			return over-reduceBy;
		}
		return over;
	}

	const onResize = useCallback((event: ColumnResizedEvent<TData>) => {
		if (!event.api || !event.finished)
			return;

		// So long as nothing catestrophic has happened to reduce the grid size below the container width
		// the width should always be equal to the horizontal pixel range
		const range = event.api.getHorizontalPixelRange();
		if (!range)
			return;
		const width = range.right - range.left;

		const stockCol = event.api.getColumn('stock');
		if (!stockCol)
			return;
		// If any resize causes the stock column to start past the width - stock min width, we will be out of frame (breaking)
		// If its not a breaking resize event, theres nothing to do
		if (stockCol.getLeft() <= width-stockCol.getMinWidth()){
//			console.log(stockCol.getLeft(), width-stockCol.getMinWidth(), width, stockCol.getMinWidth(), stockCol.getColId());
			console.log("Good resize");
			return;
		}

		// If we get to here, its a breaking resize that needs to be fixed
		// Calculate how bad it is to start
		console.log("BAD RESIZE!!!!", event.column);
		let over = stockCol.getLeft() - (width - stockCol.getMinWidth());
		console.log("Over by:", over, "px");

		// The stock column should be resized to it's minimum automatically, so no need to check it
		// Then, column resizing goes (in order): location, tags, product
		const keys = ['location', 'tags', 'product'];
		keys.some((key: string): boolean => {
			if (event.column && event.column.colId !== key)
				over = resizeColIfPossible(event.api, key, over);
			return over <= 0;
		});
	}, [])

	return (
		<div className={styles.divTable}>
			<AgGridReact rowData={rowData} columnDefs={colDefs} rowClassRules={rowClassRules} theme={myTheme} gridOptions={gridOptions} defaultColDef={gridOptions.defaultColDef} onColumnResized={onResize}/>
		</div>
	);
};

const useCharacterWidth = () => {
  const didCompute = useRef(false);
  const widthRef = useRef(0);

  if (didCompute.current) return widthRef.current;

  // Creating invisible container
  const outer = document.createElement('div');
  outer.style.fontFamily = themeBase.fontFamily;
  outer.style.fontSize = themeBase.fontSize;
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
