'use client';
import { useQuery } from "@tanstack/react-query";
import { getMasterData } from "./get-master-data";
import { Field } from "@/features/fields/types";
import { getField, getFields } from "./shinryoukoui-master-fields";
import { DataTable } from "@/features/tables/data-table";
import AutoSizer from "react-virtualized-auto-sizer";
import { TextInput } from "@/components/text-input";
import React, { useMemo, useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { get } from "http";
import { getValue } from "@/features/fields/get-values";
import { Loading } from "@/components/loading";
import { toHalfWidth, toHalfWidthKatakana, toKatakana } from "@/utils/kana";
import { Drawer } from "@/components/drawer";
import { Detail } from "./detail";


const fields: Field[] = getFields([
	'診療行為コード',
	'診療行為省略名称/省略漢字名称',
]);

export default function Page() {
	const [searchText, setSearchText] = useState("");
	const deboucedSearchText = useDebounce(searchText, 500);

	const [selectedRow, setSelectedRow] = useState<string[] | undefined>(undefined);

	const { data, error, isLoading } = useQuery({
		queryKey: ["s"],
		queryFn: getMasterData,
	})
	if (error) {
		throw error;
	}

	const filteredData = useMemo(() => {
		const trimmedSearchText = deboucedSearchText.trim();
		if (!trimmedSearchText || !data) {
			return data;
		}

		const kanaSearchText = toHalfWidthKatakana(toKatakana(toHalfWidth(trimmedSearchText)))

		return data.filter(row => {
			const code = getValue(row, getField("診療行為コード"));
			const name = getValue(row, getField("診療行為省略名称/省略漢字名称"));
			const kana = getValue(row, getField("診療行為省略名称/省略カナ名称"));
			return code.startsWith(trimmedSearchText) || name.includes(trimmedSearchText) || kana.includes(kanaSearchText);
		});
	}, [data, deboucedSearchText]);

	return (
		<div className="relative h-full">
			<div className="h-full grid" style={{
				gridTemplateRows: "100px minmax(0, 1fr)",
			}}
			>
				<div
					className="p-2"
					style={{ gridRow: 1 }}>
					<div>
						<TextInput value={searchText} onChange={setSearchText} placeholder="診療行為コードまたは名称を検索" autoFocus />
					</div>
				</div>
				<div style={{ gridRow: 2 }}>
					{
						isLoading || !filteredData ?
							<div className="flex items-center justify-center gap-2 mt-16">
								<Loading />
								Downloading...
							</div> : <DataTable
								data={filteredData}
								fields={fields}
								height="100%"
								onRowClick={setSelectedRow}
							/>
					}
				</div>
			</div>
			{selectedRow && <Drawer onClose={() => setSelectedRow(undefined)}>
				<Detail row={selectedRow} />
			</Drawer>}
		</div>
	)
}