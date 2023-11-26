import { useMemo } from "react";
import { filterShinryoukouiRows } from "../search/filter-rows";
import { FilterExpression } from "../search/types";
import { stringifyQuery } from "../search/stringify-query";
import { normalizeFilterExpression } from "../search/normalize-filter-expression";
import { getField } from "@/app/s/shinryoukoui-master-fields";
import { ColorChip, getNthColorChipColor } from "@/components/color-chip";
import Link from "next/link";
import { getCodeLabel } from "../fields/get-code-label";
import { getValue } from "../fields/get-values";
import { useUpdateSearchParams } from "@/hooks/use-update-search-params";
import { formatCodeValue } from "@/app/s/shinryoukoui-master-utils";
import { shinryoukouiMasterVirtualFields } from "@/app/s/shinryoukoui-master-virtual-field";

type ShinryoukouiListProps = {
	rows: string[][];
	filter: FilterExpression
};

export function ShinryoukouiList({
	rows,
	filter,
}: ShinryoukouiListProps) {
	const matchedRows = useMemo(() => {
		const normalizedFilter = normalizeFilterExpression(filter);
		if (normalizedFilter.kind === "ERROR") return [];
		return filterShinryoukouiRows(rows, normalizedFilter.value);
	}, [filter, rows]);

	const updateSearchParams = useUpdateSearchParams();

	const handleRowClick = (code: string) => {
		updateSearchParams({
			code,
		});
	}

	return (
		<table className="w-full text-sm border border-slate-200">
			<thead>
				<tr className="bg-slate-100">
					<th className="text-left p-2 py-1.5">診療行為コード</th>
					<th className="text-left p-2 py-1.5">名称</th>
					<th className="text-left p-2 py-1.5">告示等識別区分</th>
					<th className="text-left p-2 py-1.5">点数</th>
				</tr>
			</thead>
			<tbody>
				{matchedRows.map((row, index) => {
					const code = getValue(row, getField("診療行為コード")!);
					return (
						<tr key={index}>
							<td className="py-1.5 px-2">
								<Link href={`/s?code=${code}`} onClick={(e) => {
									e.preventDefault();
									handleRowClick(code);
								}}>
									{code}
								</Link>
							</td>
							<td className="py-1.5 px-2">
								<Link href={`/s?code=${code}`} onClick={(e) => {
									e.preventDefault();
									handleRowClick(code);
								}}>
									{getValue(row, getField("診療行為省略名称/省略漢字名称")!)}
								</Link>
							</td>
							<td className="py-1.5 px-2">
								<ColorChip color={getNthColorChipColor(+getValue(row, getField("告示等識別区分（１）")!))} >
									{formatCodeValue(row, getField("告示等識別区分（１）")!)}
								</ColorChip>
							</td>
							<td className="py-1.5 px-2">
								{shinryoukouiMasterVirtualFields.新又は現点数.value(row)}
							</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	)
}