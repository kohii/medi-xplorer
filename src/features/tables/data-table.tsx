import { Cell } from './cell';
import { Field } from '../fields/types';
import AutoSizer from "react-virtualized-auto-sizer";
import { useCallback } from 'react';
import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	Row,
	SortingState,
	useReactTable,
} from '@tanstack/react-table'
import { useVirtual } from '@tanstack/react-virtual';
import React from 'react';

export type DataTableProps = {
	data: string[][];
	fields: Field[];
	height: number | string;
	onRowClick?: (row: string[]) => void;
};

export const DataTable = React.memo(function DataTable({
	data,
	fields,
	height,
	onRowClick,
}: DataTableProps) {
	const getColumnWidth = useCallback((index: number) => {
		const field = fields[index];
		return field.style?.width || 80;
	}, [fields]);
	const columns = React.useMemo<ColumnDef<string[]>[]>(
		() => {
			return fields.map((field, index) => ({
				accessorFn: row => row[field.seq - 1],
				header: field.name,
				size: getColumnWidth(index),
			}))
		},
		[fields, getColumnWidth]
	)

	const table = useReactTable({
		data,
		columns,
		// state: {
		// 	sorting,
		// },
		// onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		debugTable: true,
	})

	const tableContainerRef = React.useRef<HTMLDivElement>(null)
	const { rows } = table.getRowModel()
	const rowVirtualizer = useVirtual({
		parentRef: tableContainerRef,
		size: rows.length,
		overscan: 10,
	})

	const { virtualItems: virtualRows, totalSize } = rowVirtualizer

	const paddingTop = virtualRows.length > 0 ? virtualRows?.[0]?.start || 0 : 0
	const paddingBottom =
		virtualRows.length > 0
			? totalSize - (virtualRows?.[virtualRows.length - 1]?.end || 0)
			: 0;

	return (
		<div ref={tableContainerRef} className="overflow-auto" style={{
			height,
		}}>
			<table className='border-collapse border-spacing-0 table-fixed w-full text-sm leading-[1.1rem]'>
				<thead className='sticky top-0 m-0 bg-white'>
					{table.getHeaderGroups().map((headerGroup, headerGroupIndex) => (
						<tr key={headerGroup.id}>
							{headerGroup.headers.map((header, headerIndex) => {
								return (
									<th
										key={header.id}
										colSpan={header.colSpan}
										style={{ width: header.getSize() }}
										className={`text-left ${headerGroupIndex === 0 && headerIndex === 0 ? 'pl-1' : ''}`}
									>
										<div className='border-b px-1 py-2'>
											{header.isPlaceholder ? null : (
												<div
													{...{
														className: header.column.getCanSort()
															? 'cursor-pointer select-none'
															: '',
														onClick: header.column.getToggleSortingHandler(),
													}}
												>
													{flexRender(
														header.column.columnDef.header,
														header.getContext()
													)}
													{{
														asc: ' 🔼',
														desc: ' 🔽',
													}[header.column.getIsSorted() as string] ?? null}
												</div>
											)}
										</div>
									</th>
								)
							})}
						</tr>
					))}
				</thead>
				<tbody>
					{paddingTop > 0 && (
						<tr>
							<td style={{ height: `${paddingTop}px` }} />
						</tr>
					)}
					{virtualRows.map(virtualRow => {
						const row = rows[virtualRow.index] as Row<string[]>
						return (
							<tr key={row.id} onClick={() => onRowClick?.(data[virtualRow.index])} className='cursor-pointer hover:bg-slate-50'>
								{row.getVisibleCells().map((cell, cellIndex) => {
									return (
										<td key={cell.id} className={`p-1 h-10 ${cellIndex === 0 ? 'pl-2' : ''}`}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</td>
									)
								})}
							</tr>
						)
					})}
					{paddingBottom > 0 && (
						<tr>
							<td style={{ height: `${paddingBottom}px` }} />
						</tr>
					)}
				</tbody>
			</table>
		</div>
	)
});
