import { useMemo } from "react";

import { getField } from "@/app/s/shinryoukoui-master-fields";

import { getValue } from "../fields/get-values";

import { SimpleTable, SimpleTableColumn } from "./simple-table";
import { useSelectShinryoukoui } from "./use-select-shinryoukoui";

const columns: SimpleTableColumn<{
	age: string;
	code: string;
	name: string;
}>[] = [{
	name: "対象年齢",
	render: (row) => row.age,
}, {
	name: "診療行為コード",
	render: (row) => row.code,
}, {
	name: "名称",
	render: (row) => row.name,
}];

type AgeAdditionalFeeTableProps = {
	data: {
		age: string;
		code: string;
	}[];
	originalRows: string[][];
}

export function AgeAdditionalFeeTable({
	data,
	originalRows,
}: AgeAdditionalFeeTableProps) {
	const { selectByCode } = useSelectShinryoukoui();

	const rows = useMemo(() => {
		return data.map(item => {
			const row = originalRows.find((row) => getValue(row, getField("診療行為コード")) === item.code);
			return ({
				...item,
				name: getValue(row!, getField("診療行為省略名称/省略漢字名称")),
			});
		});
	}, [data, originalRows]);

	return (
		<SimpleTable
			data={rows}
			columns={columns}
			onRowClick={(row) => selectByCode(row.code)}
		/>
	);
}