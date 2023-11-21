'use client';
import { useQuery } from "@tanstack/react-query";
import { getMasterData } from "./get-master-data";
import { Field } from "@/features/fields/types";
import { getField, getFields } from "./shinryoukoui-master-fields";
import { DataTable } from "@/features/tables/data-table";
import AutoSizer from "react-virtualized-auto-sizer";
import { TextInput } from "@/components/text-input";
import React, { useCallback, useMemo, useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { get } from "http";
import { getValue } from "@/features/fields/get-values";
import { Loading } from "@/components/loading";
import { toHalfWidth, toHalfWidthKatakana, toKatakana } from "@/utils/kana";
import { Drawer } from "@/components/drawer";
import { Detail } from "./detail";

import { useSearchParams } from 'next/navigation'
import { useRouterFn } from "@/hooks/use-router-fn";

const fields: Field[] = getFields([
	'診療行為コード',
	'診療行為省略名称/省略漢字名称',
]);

export default function Page() {
	const searchParams = useSearchParams()
	const router = useRouterFn()

	const [searchText, setSearchText] = useState("");
	const deboucedSearchText = useDebounce(searchText, 500);

	const selectedCode = searchParams.get("code");

	const select = useCallback((row?: string[]) => {
		const code = row ? getValue(row, getField("診療行為コード")) : undefined;
		if (code) {
			router.push('/s' + '?code=' + code)
		} else {
			router.push('/s')
		}
	}, [router]);

	const { data, error, isLoading } = useQuery({
		queryKey: ["s"],
		queryFn: getMasterData,
	})
	if (error) {
		throw error;
	}

	const codeToRow = useMemo(() => {
		const map = new Map<string, string[]>();
		if (!data) {
			return map;
		}
		for (let row of data) {
			const code = getValue(row, getField("診療行為コード"));
			map.set(code, row);
		}
		return map;
	}, [data]);

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
					{filteredData && <div className="text-sm text-gray-500 mt-2">
						Found {filteredData.length} {filteredData.length === 1 ? "item" : "items"}
					</div>}
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
								onRowClick={select}
							/>
					}
				</div>
			</div>
			{selectedCode && <Drawer onClose={select}>
				{codeToRow.has(selectedCode) ? <Detail row={codeToRow.get(selectedCode)!} /> : <div className="flex items-center justify-center h-full">
					No data found for code {selectedCode}
				</div>}
			</Drawer>}
		</div>
	)
}