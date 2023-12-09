"use client";

import { get } from "http";

import { useSearchParams } from "next/navigation";
import React, { useCallback, useMemo, useState } from "react";

import { AppIcon } from "@/components/app-icon";
import { ColorChip, getNthColorChipColor } from "@/components/color-chip";
import { DataTable, DataTableColumn } from "@/components/data-table";
import { Drawer } from "@/components/drawer";
import { Link } from "@/components/link";
import { Loading } from "@/components/loading";
import { useShinryoukouiMasterData } from "@/contexts/shinryoukoui-master-data-context";
import { AdvancedSearchButton } from "@/features/advanced-search/advanced-search-button";
import { AdvancedSearchFormModal } from "@/features/advanced-search/advancedj-search-form-modal";
import { getCodeLabel } from "@/features/fields/get-code-label";
import { getValue } from "@/features/fields/get-values";
import { filterShinryoukouiRows } from "@/features/search/filter-rows";
import { normalizeFilterExpression } from "@/features/search/normalize-filter-expression";
import { parseQuery } from "@/features/search/parse-query";
import { SearchBar } from "@/features/search/search-bar";
import { useRouterFn } from "@/hooks/use-router-fn";
import { useShinryoukouiSearch } from "@/hooks/use-shinryoukoui-search";
import { useStateFromProp } from "@/hooks/use-state-from-props";
import { useUpdateSearchParams } from "@/hooks/use-update-search-params";
import { formatDate } from "@/utils/format-data";

import { getField } from "../../features/shinryoukoui-master-fields/shinryoukoui-master-fields";
import { getKubunBangouColor } from "../../features/shinryoukoui-master-fields/shinryoukoui-master-utils";
import { shinryoukouiMasterVirtualFields } from "../../features/shinryoukoui-master-fields/shinryoukoui-master-virtual-field";
import { VersionSelect } from "../../features/shinryoukoui-master-versions/version-select";

import { Detail } from "./detail";

const codeField = getField("診療行為コード");
const nameField = getField("診療行為省略名称/省略漢字名称");
const kokujiShikibetsuField = getField("告示等識別区分（１）");

const columns: DataTableColumn[] = [{
  name: "区分番号",
  value: row => shinryoukouiMasterVirtualFields.区分番号.value(row),
  styledValue: row => {
    const v = shinryoukouiMasterVirtualFields.区分番号.value(row);
    return v === "-" ? "-" : <ColorChip color={getKubunBangouColor(v)}>{v}</ColorChip>;
  },
  width: 92,
}, {
  name: "診療行為コード",
  value: row => getValue(row, codeField),
  width: 120,
}, {
  name: "名称",
  value: row => getValue(row, getField("診療行為省略名称/省略漢字名称")),
}, {
  name: "告示等識別区分",
  value: row => getValue(row, kokujiShikibetsuField),
  styledValue: row => {
    const value = getValue(row, kokujiShikibetsuField);
    const label = getCodeLabel(row, kokujiShikibetsuField, true);
    return <ColorChip color={getNthColorChipColor(+value)}>{value + ": " + label}</ColorChip>;
  },
  width: 128,
}, {
  name: "点数",
  value: row => shinryoukouiMasterVirtualFields.新又は現点数.value(row),
  width: 112,
}, {
  name: "変更日",
  value: row => formatDate(getValue(row, getField("変更年月日"))),
  width: 112,
}];

export default function SearchResult() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const selectedCode = searchParams.get("code");

  const { push } = useRouterFn();
  const updateSearchParams = useUpdateSearchParams();
  const {
    data,
    isLoading,
    getRowByCode,
  } = useShinryoukouiMasterData();

  const selectedRow = useMemo(
    () => selectedCode ? getRowByCode(selectedCode) : undefined,
    [selectedCode, getRowByCode],
  );

  const [searchInputValue, setSearchInputValue] = useStateFromProp(query ?? "");

  const [advancedSearchOpen, setAdvancedSearchOpen] = useState(false);
  const search = useShinryoukouiSearch();

  const filterExpression = useMemo(() => {
    const r = parseQuery(query);
    if (r.kind === "ERROR") {
      return r;
    }
    return normalizeFilterExpression(r.value);
  }, [query]);

  const select = useCallback((row?: string[]) => {
    const code = row ? getValue(row, getField("診療行為コード")) : undefined;
    updateSearchParams({
      code,
    });
  }, [updateSearchParams]);

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
        gridTemplateRows: "124px minmax(0, 1fr)",
        gridTemplateColumns: "minmax(0, 1fr)",
      }}
      >
        <div
          style={{ gridRow: 1 }}>
          <div className="p-3 border-b border-gray-300 flex items-start gap-3">
            <Link href="/">
              <div className="text-center text-lg text-slate-500 flex items-center gap-1 mt-1">
                <AppIcon size="small" />
								MediXplorer
              </div>
            </Link>
            <div className="flex-1">
              <div>
                <SearchBar
                  value={searchInputValue}
                  onChange={setSearchInputValue}
                />
                {filterExpression.kind === "ERROR" && <div className="text-red-500 text-sm mt-2">{filterExpression.message}</div>}
              </div>
              <div className="mt-2 flex justify-between items-center">
                <AdvancedSearchButton initialQuery={searchInputValue} />
                <div className="text-sm text-gray-500">
                  <VersionSelect />
                </div>
              </div>
            </div>
          </div>
          {filteredData && (<div className="text-sm text-gray-500 p-2 px-4">
						Found {filteredData.length} {filteredData.length === 1 ? "item" : "items"}
          </div>)}
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
      {selectedCode && !isLoading && (
        <Drawer title={selectedRow ? getValue(selectedRow, nameField) : ""} onClose={select}>
          {selectedRow ? <Detail row={selectedRow} rows={data!} /> : <div className="flex items-center justify-center h-full">
						No data found for code {selectedCode}
          </div>}
        </Drawer>
      )}
      {advancedSearchOpen && <AdvancedSearchFormModal query={searchInputValue} onChange={search} onClose={() => setAdvancedSearchOpen(false)} />}
    </div>
  );
}
