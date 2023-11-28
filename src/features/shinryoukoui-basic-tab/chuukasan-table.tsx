import Link from "next/link";
import { useMemo } from "react";

import { getField } from "@/app/s/shinryoukoui-master-fields";
import { formatCodeValue } from "@/app/s/shinryoukoui-master-utils";
import { ColorChip, getNthColorChipColor } from "@/components/color-chip";

import { getValue } from "../fields/get-values";

import { KokujiShikibetsu1Chip } from "./kokuji-shikibetsu1-chip";
import { SimpleTable, SimpleTableColumn } from "./simple-table";
import { useSelectShinryoukoui } from "./use-select-shinryoukoui";


export type ChuukasanTableProps = {
	rows: string[][];
	chuukasanCode: string;
	shinryoukouiCodeToHighlight?: string;
};

const chuukasanCodeField = getField("注加算/注加算コード");
const chuukasanSeqField = getField("注加算/注加算通番");
const kokujiShikibetsuField = getField("告示等識別区分（１）");

const columns: SimpleTableColumn<string[]>[] = [{
	name: "診療行為コード",
	render: (row) => {
		const code = getValue(row, getField("診療行為コード"));
		return (
			<Link href={`/s?code=${code}`} >
				{code}
			</Link>
		);
	},
}, {
	name: "名称",
	render: (row) => {
		const code = getValue(row, getField("診療行為コード"));
		return (
			<Link href={`/s?code=${code}`} >
				{getValue(row, getField("診療行為省略名称/省略漢字名称"))}
			</Link>
		);
	},
}, {
	name: "注加算通番",
	render: (row) => getValue(row, chuukasanSeqField),
}, {
	name: "告示等識別区分",
	render: (row) => <KokujiShikibetsu1Chip row={row} />
}];

export function ChuukasanTable({ rows, chuukasanCode, shinryoukouiCodeToHighlight }: ChuukasanTableProps) {
	const matchedRows = useMemo(() => {
		const filtered = rows.filter(row => {
			return getValue(row, chuukasanCodeField) === chuukasanCode;
		});
		filtered.sort((a, b) => {
			const seq1 = +getValue(a, chuukasanSeqField);
			const seq2 = +getValue(b, chuukasanSeqField);
			if (seq1 === seq2) {
				return +getValue(a, kokujiShikibetsuField) - +getValue(b, kokujiShikibetsuField);
			}
			return seq1 - seq2;
		});
		return filtered;
	}, [rows, chuukasanCode]);

	const { selectByRow } = useSelectShinryoukoui();

	return (
		<SimpleTable
			data={matchedRows}
			columns={columns}
			onRowClick={selectByRow}
			rowClassName={(row) => {
				const code = getValue(row, getField("診療行為コード"));
				return code === shinryoukouiCodeToHighlight ? "font-semibold" : "";
			}}
		/>
	);
}
