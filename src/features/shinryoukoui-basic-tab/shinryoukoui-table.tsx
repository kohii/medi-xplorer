import Link from "next/link";
import { useMemo } from "react";

import { getField } from "@/app/s/shinryoukoui-master-fields";
import { formatCodeValue } from "@/app/s/shinryoukoui-master-utils";
import { shinryoukouiMasterVirtualFields } from "@/app/s/shinryoukoui-master-virtual-field";
import { ColorChip, getNthColorChipColor } from "@/components/color-chip";
import { useUpdateSearchParams } from "@/hooks/use-update-search-params";

import { getValue } from "../fields/get-values";
import { filterShinryoukouiRows } from "../search/filter-rows";
import { normalizeFilterExpression } from "../search/normalize-filter-expression";
import { FilterExpression } from "../search/types";

import { KokujiShikibetsu1Chip } from "./kokuji-shikibetsu1-chip";
import { SimpleTable, SimpleTableColumn } from "./simple-table";
import { useSelectShinryoukoui } from "./use-select-shinryoukoui";

type ShinryoukouiTableProps = {
	rows: string[][];
	filter: FilterExpression
};

const columns: SimpleTableColumn<string[]>[] = [{
	name: "診療行為コード",
	render: (row) => {
		const code = getValue(row, getField("診療行為コード")!);
		return (
			<Link href={`/s?code=${code}`} >
				{code}
			</Link>
		);
	},
}, {
	name: "名称",
	render: (row) => {
		const code = getValue(row, getField("診療行為コード")!);
		return (
			<Link href={`/s?code=${code}`} >
				{getValue(row, getField("診療行為省略名称/省略漢字名称")!)}
			</Link>
		);
	},
}, {
	name: "告示等識別区分",
	render: (row) => <KokujiShikibetsu1Chip row={row} />
}, {
	name: "点数",
	render: (row) => shinryoukouiMasterVirtualFields.新又は現点数.value(row),
}];

export function ShinryoukouiTable({
	rows,
	filter,
}: ShinryoukouiTableProps) {
	const matchedRows = useMemo(() => {
		const normalizedFilter = normalizeFilterExpression(filter);
		if (normalizedFilter.kind === "ERROR") return [];
		return filterShinryoukouiRows(rows, normalizedFilter.value);
	}, [filter, rows]);

	const { selectByRow } = useSelectShinryoukoui();

	return (
		<SimpleTable
			data={matchedRows}
			columns={columns}
			onRowClick={selectByRow}
		/>
	);
}
