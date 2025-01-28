import { useState, useMemo, memo } from 'react';
import styles from './table.module.css';

import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
  flexRender,
  Table,
} from '@tanstack/react-table'

type Product = {
	name: string
	location: string
	tags: string
	count: number
}

const defaultColumns: ColumnDef<Product>[] = [
	{
		accessorKey: 'name',
		cell: (info) => info.getValue(),
		header: 'Product Name',
	},
	{
		accessorKey: 'location',
		cell: (info) => info.getValue(),
		header: 'Location',
	},
	{
		accessorKey: 'tags',
		cell: (info) => info.getValue(),
		header: 'Tags',
	},
	{
		accessorKey: 'count',
		cell: (info) => info.getValue(),
		header: 'Stock',
	},
];

export default function InventoryTable(){
	const [data, _setData] = useState(() => makeData(25))
	const [columns] = useState<typeof defaultColumns>(() => [
		...defaultColumns,
	])

	const table = useReactTable({
		data,
		columns,
		columnResizeMode: 'onChange',
		getCoreRowModel: getCoreRowModel(),
		debugTable: true,
		debugHeaders: true,
		debugColumns: true,
		enableColumnResizing: true,
	})

	const columnSizeVars = useMemo(() => {
		const headers = table.getFlatHeaders()
		const colSizes: { [key: string]: number } = {}
		for (let i = 0; i < headers.length; i++) {
			const header = headers[i]!
			colSizes[`--header-${header.id}-size`] = header.getSize()
			colSizes[`--col-${header.column.id}-size`] = header.column.getSize()
		}
		return colSizes
	}, [table.getState().columnSizingInfo, table.getState().columnSizing])

	//demo purposes
	const [enableMemo, setEnableMemo] = useState(true);

	if (false)
	return (
		<div style={{overflowX: 'hidden', overflowY: 'scroll', width: '100%', display: 'block'}}>
			<table {...{
				className: styles.divTable,
				style: {
					...columnSizeVars, //Define column sizes on the <table> element
					overflowY: 'scroll'
				}
			}}>
				<thead>
					{table.getHeaderGroups().map(headerGroup => (
						<tr key={headerGroup.id}>
							{headerGroup.headers.map(header => (
								<th {...{
									key: header.id,
									className: styles.th,
									style: {
										width: `calc(var(--header-${header?.id}-size) * 1px)`,
//										width: header.getSize(),
										position: 'relative'
									},
									colSpan: header.colSpan
								}}>
									{header.isPlaceholder ? null : flexRender(
										header.column.columnDef.header,
										header.getContext()
									)}
									<div {...{
										onDoubleClick: () => header.column.resetSize(),
										onMouseDown: header.getResizeHandler(),
										onTouchStart: header.getResizeHandler(),
										className: [styles.resizer, header.column.getIsResizing() ? 'isResizing' : ''].join(' '),
									}}/>
								</th>
							))}
						</tr>
					))}
				</thead>
				{table.getState().columnSizingInfo.isResizingColumn && enableMemo ? (
					<MemoizedTableBody table={table} />
				) : (
					<TableBody table={table} />
				)}
			</table>
		</div>
	);

//	if (false)
	return (
		<div style={{overflow: 'hidden', width: '100%', display: 'flex', flexDirection: 'column'}}>
			<div>
			<table {...{
				className: styles.divTable,
				style: {
					...columnSizeVars, //Define column sizes on the <table> element
				}
			}}>
				<thead>
					{table.getHeaderGroups().map(headerGroup => (
						<tr key={headerGroup.id}>
							{headerGroup.headers.map(header => (
								<th {...{
									key: header.id,
									className: styles.th,
									style: {
										width: `calc(var(--header-${header?.id}-size) * 1px)`,
//										width: header.getSize(),
										position: 'relative'
									},
									colSpan: header.colSpan
								}}>
									{header.isPlaceholder ? null : flexRender(
										header.column.columnDef.header,
										header.getContext()
									)}
									<div {...{
										onDoubleClick: () => header.column.resetSize(),
										onMouseDown: header.getResizeHandler(),
										onTouchStart: header.getResizeHandler(),
										className: [styles.resizer, header.column.getIsResizing() ? 'isResizing' : ''].join(' '),
									}}/>
								</th>
							))}
						</tr>
					))}
				</thead>
			</table>
			</div>

		<div style={{overflowX: 'hidden', overflowY: 'scroll', width: '100%', display: 'block', flexGrow: 0}}>
			<table {...{
				className: styles.divTable,
				style: {
					...columnSizeVars, //Define column sizes on the <table> element
					overflowY: 'scroll'
				}
			}}>
				{table.getState().columnSizingInfo.isResizingColumn && enableMemo ? (
					<MemoizedTableBody table={table} />
				) : (
					<TableBody table={table} />
				)}
			</table>
		</div>
		</div>
	);

}

//un-memoized normal table body component - see memoized version below
function TableBody({ table }: { table: Table<Person> }) {
	return (
		<tbody className={styles.tbody}>
			{table.getRowModel().rows.map(row => (
				<tr {...{
					key: row.id,
					className: styles.tr,
				}}>
					{row.getVisibleCells().map(cell => {
						return (
							<td {...{
								key: cell.id,
								className: styles.td,
								style: {
									width: `calc(var(--col-${cell.column.id}-size) * 1px)`,
								},
							}}>
								{cell.renderValue<any>()}
							</td>
						)
					})}
				</tr>
			))}
		</tbody>
	);
}

//special memoized wrapper for our table body that we will use during column resizing
export const MemoizedTableBody = memo(
  TableBody,
  (prev, next) => prev.table.options.data === next.table.options.data
) as typeof TableBody

function makeData(len){
	return Array(len).fill().map((d) => ({
		name: 'Product name is really long',
		location: 'Here',
		tags: 'None',
		count: 10,
	}));
}
