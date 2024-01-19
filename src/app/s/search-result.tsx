"use client";

import { useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { AppIcon } from "@/components/app-icon";
import { DataTable } from "@/components/data-table";
import { Drawer } from "@/components/drawer";
import { Link } from "@/components/link";
import { Loading } from "@/components/loading";
import { useShinryoukouiMasterData } from "@/contexts/shinryoukoui-master-data-context";
import { AdvancedSearchButton } from "@/features/advanced-search/advanced-search-button";
import { AdvancedSearchFormModal } from "@/features/advanced-search/advancedj-search-form-modal";
import { DisplayFieldsButton } from "@/features/display-fields/display-fields-buttom";
import { useDisplayFieldConfigs as useDisplayFields } from "@/features/display-fields/use-display-fields";
import { getValue } from "@/features/fields/get-values";
import { filterShinryoukouiRows } from "@/features/search/filter-rows";
import { normalizeFilterExpression } from "@/features/search/normalize-filter-expression";
import { parseQuery } from "@/features/search/parse-query";
import { SearchBar, SearchBarHandle } from "@/features/search/search-bar";
import { getField } from "@/features/shinryoukoui-master-fields/shinryoukoui-master-fields";
import { VersionSelect } from "@/features/shinryoukoui-master-versions/version-select";
import { useShinryoukouiSearch } from "@/hooks/use-shinryoukoui-search";
import { useStateFromProp } from "@/hooks/use-state-from-props";
import { useUpdateSearchParams } from "@/hooks/use-update-search-params";


import { Detail } from "./detail";
import { useTableColumns } from "./use-table-columns";

const codeField = getField("診療行為コード");
const nameField = getField("診療行為省略名称/省略漢字名称");

export default function SearchResult() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const selectedCode = searchParams.get("code");

  const updateSearchParams = useUpdateSearchParams();
  const {
    data,
    isLoading,
    getRowByCode,
  } = useShinryoukouiMasterData();

  const searchBarRef = useRef<SearchBarHandle>(null);

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

  const select = useCallback((row: string[]) => {
    const code = getValue(row, getField("診療行為コード"));
    updateSearchParams({
      code,
    });
  }, [updateSearchParams]);
  const unselect = useCallback(() => {
    updateSearchParams({
      code: undefined,
      tab: undefined,
    });
  }, [updateSearchParams]);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === "/") {
      const currentFocusOwner = document.activeElement;
      if (!currentFocusOwner || currentFocusOwner === document.body) {
        event.preventDefault();
        searchBarRef.current?.focus();
      }
    }
    if (event.key === "Escape") {
      event.preventDefault();
      unselect();
    }
  }, [unselect]);
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  const filteredData = useMemo(() => {
    if (!data) {
      return undefined;
    }
    if (filterExpression.kind === "ERROR") {
      return undefined;
    }
    return filterShinryoukouiRows(data, filterExpression.value);
  }, [data, filterExpression]);

  const displayFields = useDisplayFields();
  const columns = useTableColumns(displayFields);

  return (
    <div className="relative h-full">
      <div className="h-full grid"
        style={{
          gridTemplateRows: "min-content minmax(0, 1fr)",
          gridTemplateColumns: "minmax(0, 1fr)",
        }}
      >
        <div
          style={{ gridRow: 1 }}>
          <div className="p-3 border-b border-gray-300 flex items-start gap-3">
            <Link href="/" title="Go to MediXplorer home">
              <div className="text-center text-lg text-slate-500 flex items-center gap-1 mt-1">
                <AppIcon size="small" />
                <span className="hidden md:inline">
                  MediXplorer
                </span>
              </div>
            </Link>
            <div className="flex-1">
              <div>
                <SearchBar
                  ref={searchBarRef}
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
          <div className="flex justify-between items-center">
            <div>
              {filteredData && (<div className="text-sm text-gray-500 p-2 px-4">
                Found {filteredData.length} {filteredData.length === 1 ? "item" : "items"}
              </div>)}
            </div>
            <div className="pr-4">
              <DisplayFieldsButton initialFieldsConfigs={displayFields} />
            </div>
          </div>
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
        <Drawer title={selectedRow ? getValue(selectedRow, nameField) : ""} onClose={unselect}>
          {selectedRow ? <Detail row={selectedRow} rows={data!} /> : <div className="flex items-center justify-center h-full">
            No data found for code {selectedCode}
          </div>}
        </Drawer>
      )}
      {advancedSearchOpen && <AdvancedSearchFormModal query={searchInputValue} onChange={search} onClose={() => setAdvancedSearchOpen(false)} />}
    </div>
  );
}
