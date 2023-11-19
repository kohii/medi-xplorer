import { VariableSizeGrid as Grid } from 'react-window';
import { Cell } from './cell';
import { Field } from '../fields/types';
import AutoSizer from "react-virtualized-auto-sizer";
import { useCallback } from 'react';

export type DataTableProps = {
	rows: string[][];
	fields: Field[];
};

function getRowHeight() {
	return 42;
}

export function DataTable({
	rows,
	fields,
}: DataTableProps) {
	const getColumnWidth = useCallback((index: number) => {
		const field = fields[index];
		return field.style?.width || 80;
	}, [fields]);
	return <AutoSizer >
		{({ width, height }: { width: number, height: number }) => (<Grid
			columnCount={fields.length}
			height={height}
			width={width}
			rowCount={rows.length}
			rowHeight={getRowHeight}
			columnWidth={getColumnWidth}
			itemData={{ fields, rows }}
		>
			{Cell}
		</Grid>
		)}
	</AutoSizer>
}