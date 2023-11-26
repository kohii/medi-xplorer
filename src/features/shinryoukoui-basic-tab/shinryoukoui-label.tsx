import Link from "next/link";

import { getField } from "@/app/s/shinryoukoui-master-fields";
import { useUpdateSearchParams } from "@/hooks/use-update-search-params";

import { getValue } from "../fields/get-values";

type ShinryoukouiLabelProps = {
	row: string[];
};

export function ShinryoukouiLabel({ row }: ShinryoukouiLabelProps) {
	const code = getValue(row, getField("診療行為コード")!);
	const updateSearchParams = useUpdateSearchParams();
	const handleRowClick = (code: string) => {
		updateSearchParams({
			code,
		});
	};

	return <Link href={`/s?code=${code}`} onClick={(e) => {
		e.preventDefault();
		handleRowClick(code);
	}}>
		{code} {getValue(row, getField("診療行為省略名称/省略漢字名称")!)}
	</Link>;
}
