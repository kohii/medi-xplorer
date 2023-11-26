"use client";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import React, { useCallback, useMemo, useState } from "react";

import { ColorChip, getNthColorChipColor } from "@/components/color-chip";
import { Drawer } from "@/components/drawer";
import { Loading } from "@/components/loading";
import { TextInput } from "@/components/text-input";
import { AdvancedSearchFormModal } from "@/features/advanced-search/advancedj-search-form-modal";
import { getCodeLabel } from "@/features/fields/get-code-label";
import { getValue } from "@/features/fields/get-values";
import { Field } from "@/features/fields/types";
import { filterShinryoukouiRows } from "@/features/search/filter-rows";
import { normalizeFilterExpression } from "@/features/search/normalize-filter-expression";
import { parseQuery } from "@/features/search/parse-query";
import { DataTable, DataTableColumn } from "@/features/tables/data-table";
import { useDebouncedCallback } from "@/hooks/use-debounced-callback";
import { useStateFromProp } from "@/hooks/use-state-from-props";
import { useUpdateSearchParams } from "@/hooks/use-update-search-params";
import { formatDate } from "@/utils/format-data";
import { alphabetToNumber } from "@/utils/text";

import { Detail } from "./detail";
import { getMasterData } from "./get-master-data";
import { getField, getFields } from "./shinryoukoui-master-fields";
import { getKubunBangouColor } from "./shinryoukoui-master-utils";
import { shinryoukouiMasterVirtualFields } from "./shinryoukoui-master-virtual-field";

const codeField = getField("診療行為コード")!;
const nameField = getField("診療行為省略名称/省略漢字名称")!;
const kokujiShikibetsuField = getField("告示等識別区分（１）")!;

const columns: DataTableColumn[] = [{
	name: "区分番号",
	value: row => {
		const v = shinryoukouiMasterVirtualFields.区分番号.value(row);
		return v === "-" ? "-" : <ColorChip color={getKubunBangouColor(v)}>{v}</ColorChip>;
	},
	width: 88,
}, {
	name: "診療行為コード",
	value: row => getValue(row, codeField),
	width: 120,
}, {
	name: "診療行為名称",
	value: row => getValue(row, getField("診療行為省略名称/省略漢字名称")!),
}, {
	name: "告示等識別区分",
	value: row => {
		const value = getValue(row, kokujiShikibetsuField);
		const label = getCodeLabel(value, kokujiShikibetsuField, true);
		return <ColorChip color={getNthColorChipColor(+value)}>{value + ": " + label}</ColorChip>;
	},
	width: 128,
}, {
	name: "点数",
	value: row => shinryoukouiMasterVirtualFields.新又は現点数.value(row),
	width: 112,
}, {
	name: "変更日",
	value: row => formatDate(getValue(row, getField("変更年月日")!)),
	width: 112,
}];

export default function Page() {
	const searchParams = useSearchParams();
	const updateSearchParams = useUpdateSearchParams();

	const query = searchParams.get("q") ?? "";
	const selectedCode = searchParams.get("code");

	const [queryInputValue, _setQueryInputValue] = useStateFromProp(query);

	const [advancedSearchOpen, setAdvancedSearchOpen] = useState(false);

	const updateQuery = useCallback((value: string) => {
		updateSearchParams({
			q: value || undefined,
		});
	}, [updateSearchParams]);

	const applyCurrentQuery = useDebouncedCallback(
		() => {
			updateQuery(queryInputValue);
		},
		500,
		[queryInputValue, updateQuery],
	);
	const setQueryInputValue = useCallback((value: string) => {
		_setQueryInputValue(value);
		applyCurrentQuery();
	}, [_setQueryInputValue, applyCurrentQuery]);

	const filterExpression = useMemo(() => {
		const r = parseQuery(query);
		if (r.kind === "ERROR") {
			return r;
		}
		return normalizeFilterExpression(r.value);
	}, [query]);

	const select = useCallback((row?: string[]) => {
		const code = row ? getValue(row, getField("診療行為コード")!) : undefined;
		updateSearchParams({
			code,
		});
	}, [updateSearchParams]);

	const { data, error, isLoading } = useQuery({
		queryKey: ["s"],
		queryFn: getMasterData,
	});
	if (error) {
		throw error;
	}

	const codeToRow = useMemo(() => {
		const map = new Map<string, string[]>();
		if (!data) {
			return map;
		}
		const codeField = getField("診療行為コード")!;
		for (let row of data) {
			const code = getValue(row, codeField);
			map.set(code, row);
		}
		return map;
	}, [data]);

	const filteredData = useMemo(() => {
		if (!data) {
			return undefined;
		}
		if (filterExpression.kind === "ERROR") {
			return undefined;
		}
		return filterShinryoukouiRows(data, filterExpression.value);
	}, [data, filterExpression]);

	return (
		<div className="relative h-full">
			<div className="h-full grid" style={{
				gridTemplateRows: "140px minmax(0, 1fr)",
			}}
			>
				<div
					style={{ gridRow: 1 }}>
					<div className="p-2 border-b border-gray-300 flex items-center gap-2">
						<div className="p-2 mr-2 text-6xl">
							👨‍⚕️
						</div>
						<div className="flex-1">
							<div className="mb-2 text-sm">
								MediXplorer / 診療行為マスター
							</div>
							<div>
								<TextInput
									value={queryInputValue}
									onChange={setQueryInputValue}
									placeholder="検索"
									autoFocus
								/>
								{filterExpression.kind === "ERROR" && <div className="text-red-500 text-sm mt-2">{filterExpression.message}</div>}
							</div>
							<div className="mt-1">
								<a href="" className="text-sm text-blue-500" onClick={e => {
									e.preventDefault();
									setAdvancedSearchOpen(true);
								}}>
									詳細検索
								</a>
							</div>
						</div>
					</div>
					{filteredData && <div className="text-sm text-gray-500 p-2 px-4">
						Found {filteredData.length} {filteredData.length === 1 ? "item" : "items"}
					</div>}
				</div>
				<div style={{ gridRow: 2 }} className="px-2">
					{
						isLoading || !filteredData ?
							<div className="flex items-center justify-center gap-2 mt-16">
								<Loading />
								Downloading...
							</div> : <DataTable
								data={filteredData}
								columns={columns}
								height="100%"
								onRowClick={select}
								isSelected={(row) => Boolean(selectedCode) && getValue(row, codeField) === selectedCode}
							/>
					}
				</div>
			</div>
			{selectedCode && !isLoading && <Drawer title={codeToRow.has(selectedCode) ? getValue(codeToRow.get(selectedCode)!, nameField) : ""} onClose={select}>
				{codeToRow.has(selectedCode) ? <Detail row={codeToRow.get(selectedCode)!} rows={data!} /> : <div className="flex items-center justify-center h-full">
					No data found for code {selectedCode}
				</div>}
			</Drawer>}
			{advancedSearchOpen && <AdvancedSearchFormModal query={queryInputValue} onChange={updateQuery} onClose={() => setAdvancedSearchOpen(false)} />}
		</div>
	);
}
