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
import { BreakLine } from '@/components/break-line';
import { twMerge } from 'tailwind-merge'


export type DataTableColumn = {
	name: string;
	width?: number;
	value: (row: string[]) => React.ReactNode;
};

export type DataTableProps = {
	data: string[][];
	columns: DataTableColumn[];
	height: number | string;
	onRowClick?: (row: string[]) => void;
	isSelected?: (row: string[]) => boolean;
};

export const DataTable = React.memo(function DataTable({
	data,
	columns,
	height,
	onRowClick,
	isSelected,
}: DataTableProps) {
	const columnDefs = React.useMemo<ColumnDef<string[]>[]>(
		() => {
			return columns.map((col) => ({
				id: col.name,
				accessorFn: row => col.value(row),
				header: () => <BreakLine value={col.name.replace('/', '/\n')} />,
				size: col.width,
			}))
		},
		[columns]
	)

	const table = useReactTable({
		data,
		columns: columnDefs,
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
										// style={{ width: header.getSize() }}
										style={{ width: header.column.columnDef.size }}
										className={`text-left text-sm px-1 pt-2 pb-3 h-10 ${headerGroupIndex === 0 && headerIndex === 0 ? 'pl-2' : ''}`}
									>
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
							<tr
								key={row.id}
								onClick={() => onRowClick?.(rows[virtualRow.index].original)}
								className={twMerge("cursor-pointer hover:bg-slate-50", isSelected?.(rows[virtualRow.index].original) ? "bg-blue-100 hover:bg-slate-200" : "")}
							>
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
