import { getField } from "@/app/s/shinryoukoui-master-fields";
import { getValue } from "../fields/get-values";
import { useMemo } from "react";
import { formatCodeValue } from "@/app/s/shinryoukoui-master-utils";
import { getCodeLabel } from "../fields/get-code-label";
import { ColorChip, getNthColorChipColor } from "@/components/color-chip";
import Link from "next/link";
import { useUpdateSearchParams } from "@/hooks/use-update-search-params";

export type ChuukasanListProps = {
	rows: string[][];
	chuukasanCode: string;
	shinryoukouiCodeToHighlight?: string;
};

const chuukasanCodeField = getField("注加算/注加算コード")!;
const chuukasanSeqField = getField("注加算/注加算通番")!;
const kokujiShikibetsuField = getField("告示等識別区分（１）")!;

export function ChuukasanList({ rows, chuukasanCode, shinryoukouiCodeToHighlight }: ChuukasanListProps) {
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

	const updateSearchParams = useUpdateSearchParams();

	const handleRowClick = (code: string) => {
		updateSearchParams({
			code,
		});
	}

	return (
		<table className="w-full text-sm">
			<thead>
				<tr className="bg-slate-100">
					<th className="text-left p-2 py-1.5">診療行為</th>
					<th className="text-left p-2 py-1.5">名称</th>
					<th className="text-left p-2 py-1.5">注加算通番</th>
					<th className="text-left p-2 py-1.5">告示等識別区分</th>
				</tr>
			</thead>
			<tbody>
				{matchedRows.map((row, index) => {
					const code = getValue(row, getField("診療行為コード")!);
					const kokujiShikibetsu = getValue(row, kokujiShikibetsuField);
					const highlight = code === shinryoukouiCodeToHighlight;
					return (
						<tr key={index} className={highlight ? "font-semibold" : ""}>
							<td className="py-1 px-2">
								<Link href={`/s?code=${code}`} onClick={(e) => {
									e.preventDefault();
									handleRowClick(code);
								}}>
									{code}
								</Link>
							</td>
							<td className="py-1 px-2">
								<Link href={`/s?code=${code}`} onClick={(e) => {
									e.preventDefault();
									handleRowClick(code);
								}}>
									{getValue(row, getField("診療行為省略名称/省略漢字名称")!)}
								</Link>
							</td>
							<td className="py-1 px-2">{getValue(row, chuukasanSeqField)}</td>
							<td className="py-1 px-2">
								<ColorChip color={getNthColorChipColor(+kokujiShikibetsu)} >
									{getCodeLabel(kokujiShikibetsu, kokujiShikibetsuField, true)}
								</ColorChip>
							</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	)
}