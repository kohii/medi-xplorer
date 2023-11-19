'use client';
import { useQuery } from "@tanstack/react-query";
import { getMasterData } from "./get-master-data";
import { Field } from "@/features/fields/types";
import { getFields } from "./shinryoukoui-master-fields";
import { DataTable } from "@/features/tables/data-table";

const fields: Field[] = getFields([
	'診療行為コード',
	'診療行為省略名称/省略漢字名称',
]);

export default function Page() {
	const { data, error, isLoading } = useQuery({
		queryKey: ["s"],
		queryFn: getMasterData,
	})
	if (error) {
		throw error;
	}
	if (isLoading || !data) {
		return "Downloading...";
	}
	return (<div className="h-full">
		<DataTable
			rows={data}
			fields={fields}
		/>
	</div>)
}