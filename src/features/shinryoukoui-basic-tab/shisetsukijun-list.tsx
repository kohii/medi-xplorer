import { getShisetsukijunCodeList } from "@/app/s/shinryoukoui-master-utils";
import { useShisetsukijunData } from "@/contexts/shisetsukijun-data-context";

import { SimpleTableColumn } from "./simple-table";
import { SimpleTable } from "./simple-table";
import { SubHeading } from "./sub-heading";

export function ShisetsukijunList({ row }: { row: string[] }) {
	const codes = getShisetsukijunCodeList(row);
	const { getLabelByCode, isLoading } = useShisetsukijunData();

	if (codes.length === 0) {
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

	return (
		<div>
			<SubHeading>施設基準</SubHeading>
			<SimpleTable columns={columns} data={codes} className="w-auto min-w-[50%]" density="compact" />
		</div>
	);
}