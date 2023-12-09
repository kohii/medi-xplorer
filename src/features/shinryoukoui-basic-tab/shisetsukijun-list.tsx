import { twMerge } from "tailwind-merge";

import { useShisetsukijunData } from "@/contexts/shisetsukijun-data-context";
import { getShisetsukijunCodeGroupList } from "@/features/shinryoukoui-master-fields/shinryoukoui-master-utils";

import { SimpleTableColumn } from "./simple-table";
import { SimpleTable } from "./simple-table";
import { SubHeading } from "./sub-heading";

export function ShisetsukijunList({ row }: { row: string[] }) {
	const codeGroups = getShisetsukijunCodeGroupList(row);
	const { getLabelByCode, isLoading } = useShisetsukijunData();

	if (codeGroups.length === 0) {
		return null;
	}

	if (isLoading) {
		return <div className="p-4">Loading...</div>;
	}

	const columns: SimpleTableColumn<string>[] = [{
		name: "施設基準コード",
		render: code => code,
		width: 124,
	}, {
		name: "施設基準",
		render: code => getLabelByCode(code)
	}];

	const hasOr = codeGroups.some(codes => codes.length > 1);
	const hasAnd = codeGroups.length > 1;
	const codeLength = codeGroups.reduce((acc, codes) => acc + codes.length, 0);

	return (
		<div>
			<SubHeading>施設基準</SubHeading>
			<table className="text-sm border border-slate-200 w-auto min-w-[50%]">
				<thead>
					<tr className="bg-slate-100">
						<th className="text-left font-medium px-2 py-1 w-32" >
							施設基準コード
						</th>
						<th className="text-left font-medium px-2 py-1" >
							施設基準
						</th>
						{hasOr && (
							<th className="w-11" />
						)}
						{hasAnd && (
							<th className="w-11" />
						)}
					</tr>
				</thead>
				<tbody>
					{codeGroups.map((codesInGroup, groupIndex) => {
						return codesInGroup.map((code, index) => {
							return (
								<tr key={code} className="[&>td]:border-t">
									<td className="px-2 py-1" >
										{code}
									</td>
									<td className="px-2 py-1">
										{getLabelByCode(code)}
									</td>
									{hasOr && index === 0 && (
										codesInGroup.length > 1 ?
											<td className="px-1 py-1 border-l text-center" rowSpan={codesInGroup.length}> OR </td> :
											<td className="px-1 py-1" />
									)}
									{hasAnd && groupIndex === 0 && index === 0 && (
										<td className="px-1 py-1 border-l text-center" rowSpan={codeLength}>
											AND
										</td>
									)}
								</tr>
							);
						});
					})}
				</tbody>
			</table>
		</div>
	);
}