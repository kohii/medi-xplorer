import { twMerge } from "tailwind-merge";

export type SimpleTableColumn<R> = {
	name: string;
	render: (item: R) => React.ReactNode;
	width?: string | number;
};

export type SimpleTableProps<R> = {
	className?: string;
	columns: SimpleTableColumn<R>[];
	data: R[];
	onRowClick?: (item: R) => void;
	rowClassName?: (item: R) => string;
	density?: "compact" | "normal";
};

export function SimpleTable<R>({
  className,
  columns,
  data,
  onRowClick,
  rowClassName,
  density = "normal",
}: SimpleTableProps<R>) {
  return (
    <table className={twMerge("w-full text-sm border border-slate-200", className)}>
      <thead>
        <tr className="bg-slate-100">
          {columns.map((column) => (
            <th
              className={"text-left font-medium " + (density === "compact" ? "px-2 py-1" : " px-2 py-1.5")}
              key={column.name}
              style={{ width: column.width }}
            >
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
              className={twMerge(
                onRowClick ? "cursor-pointer hover:bg-slate-50" : undefined,
                rowClassName?.(row)
              )}
              onClick={onRowClick ? () => onRowClick(row) : undefined}
            >
              {columns.map((column) => (
                <td
                  className={density === "compact" ? "px-2 py-1" : " px-2 py-1.5"}
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