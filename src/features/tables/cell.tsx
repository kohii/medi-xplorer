import { GridChildComponentProps } from 'react-window';
import { Field } from '../fields/types';
import { getValue } from '../fields/get-values';


export function Cell({ data, columnIndex, rowIndex, style }: GridChildComponentProps<{
	fields: Field[];
	rows: string[][];
}>) {
	const { fields, rows } = data;
	const field = fields[columnIndex];
	const row = rows[rowIndex];
	const value = getValue(row, field);

	return (
		<div style={style} className={`
		border-b border-gray-400 py-1 px-1
		text-ellipsis overflow-hidden text-sm leading-[1.1rem]
		${field.style?.wrap ? '' : 'whitespace-nowrap flex items-center'}
		`}
			title={value}
		>
			{
				field.style?.wrap ? <div className="h-[2.2rem] overflow-hidden">
					{value}
				</div> : value
			}
		</div>
	);
}