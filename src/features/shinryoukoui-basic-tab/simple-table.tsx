import { twMerge } from "tailwind-merge";

export type SimpleTableColumn<R> = {
	name: string;
	render: (item: R) => React.ReactNode;
};

export type SimpleTableProps<R> = {
	columns: SimpleTableColumn<R>[];
	data: R[];
	onRowClick?: (item: R) => void;
};

export function SimpleTable<R>({ columns, data, onRowClick }: SimpleTableProps<R>) {
	return (
		<table className="w-full text-sm border border-slate-200">
			<thead>
				<tr className="bg-slate-100">
					{columns.map((column) => (
						<th className="text-left p-2 py-1.5" key={column.name}>
							{column.name}
						</th>
					))}
				</tr>
			</thead>
			<tbody>
				{data.map((row, index) => {
					return (
						<tr
							key={index}
							className={onRowClick ? "cursor-pointer hover:bg-slate-50" : undefined}
							onClick={onRowClick ? () => onRowClick(row) : undefined}
						>
							{columns.map((column) => (
								<td
									className="py-1.5 px-2"
									key={column.name}
								>
									{column.render(row)}
								</td>
							))}
						</tr>
					);
				})}
			</tbody>
		</table>
	);
}