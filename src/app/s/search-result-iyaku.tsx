"use client";

import { useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useMemo, useRef } from "react";

import { AppIcon } from "@/components/app-icon";
import { DataTable } from "@/components/data-table";
import { Drawer } from "@/components/drawer";
import { Link } from "@/components/link";
import { Loading } from "@/components/loading";
import { useIyakuMasterData } from "@/contexts/iyaku-master-data-context";
import { getValue } from "@/features/fields/get-values";
import { getField } from "@/features/iyaku-master-fields/iyaku-master-fields";
import { IyakuVersionSelect } from "@/features/iyaku-master-versions/version-select";
import { filterShinryoukouiRows } from "@/features/search/filter-rows";
import { normalizeFilterExpression } from "@/features/search/normalize-filter-expression";
import { parseQuery } from "@/features/search/parse-query";
import { SearchBar, SearchBarHandle } from "@/features/search/search-bar";
import { useStateFromProp } from "@/hooks/use-state-from-props";
import { useUpdateSearchParams } from "@/hooks/use-update-search-params";
import { MASTER_IDS } from "@/master-types";
import { SEARCH_PARAM_NAMES } from "@/search-param-names";

import { IyakuDetail } from "./iyaku-detail";
import { useIyakuTableColumns } from "./use-iyaku-table-columns";

const codeField = getField("医薬品コード");
const nameField = getField("医薬品名・規格名/漢字名称");

export default function SearchResultIyaku() {
  const searchParams = useSearchParams();
  const query = searchParams.get(SEARCH_PARAM_NAMES.SEARCH.QUERY) ?? "";
  const selectedCode = searchParams.get("code");

  const updateSearchParams = useUpdateSearchParams();
  const { data, isLoading, getRowByCode, layoutVersion, version } = useIyakuMasterData();

  const searchBarRef = useRef<SearchBarHandle>(null);

  const selectedRow = useMemo(
    () => (selectedCode ? getRowByCode(selectedCode) : undefined),
    [selectedCode, getRowByCode],
  );

  const [searchInputValue, setSearchInputValue] = useStateFromProp(query ?? "");

  const filterExpression = useMemo(() => {
    const r = parseQuery(query, MASTER_IDS.IYAKU);
    if (r.kind === "ERROR") {
      return r;
    }
    return normalizeFilterExpression(r.value, MASTER_IDS.IYAKU);
  }, [query]);

  const select = useCallback(
    (row: string[]) => {
      const code = getValue(row, codeField!);
      updateSearchParams({
        code,
      });
    },
    [updateSearchParams],
  );
  const unselect = useCallback(() => {
    updateSearchParams({
      code: undefined,
      tab: undefined,
    });
  }, [updateSearchParams]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
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
    },
    [unselect],
  );
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
    return filterShinryoukouiRows(data, filterExpression.value, MASTER_IDS.IYAKU);
  }, [data, filterExpression]);

  const columns = useIyakuTableColumns();

  return (
    <div className="relative h-full">
      <div
        className="h-full grid"
        style={{
          gridTemplateRows: "min-content minmax(0, 1fr)",
          gridTemplateColumns: "minmax(0, 1fr)",
        }}
      >
        <div style={{ gridRow: 1 }}>
          <div className="p-3 border-b border-gray-300 flex items-start gap-3">
            <Link href="/" title="Go to MediXplorer home">
              <div className="text-center text-lg text-slate-500 flex items-center gap-1 mt-1">
                <AppIcon size="small" />
                <span className="hidden md:inline">MediXplorer</span>
              </div>
            </Link>
            <div className="flex-1">
              <div>
                <SearchBar
                  ref={searchBarRef}
                  masterId={MASTER_IDS.IYAKU}
                  value={searchInputValue}
                  onChange={setSearchInputValue}
                />
                {filterExpression.kind === "ERROR" && (
                  <div className="text-red-500 text-sm mt-2">{filterExpression.message}</div>
                )}
              </div>
              <div className="mt-2 flex justify-between items-center">
                <div className="text-sm text-gray-500">医薬品マスター</div>
                <div className="text-sm text-gray-500">
                  <IyakuVersionSelect />
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div>
              {filteredData && (
                <div className="text-sm text-gray-500 p-2 px-4">
                  Found {filteredData.length} {filteredData.length === 1 ? "item" : "items"}
                </div>
              )}
            </div>
          </div>
        </div>
        <div style={{ gridRow: 2 }} className="px-2">
          {!version ? (
            <div className="flex items-center justify-center gap-2 mt-16 text-gray-500">
              医薬品マスターが未取得です。
            </div>
          ) : isLoading || !filteredData ? (
            <div className="flex items-center justify-center gap-2 mt-16">
              <Loading />
              {data?.length ? "Filtering..." : "Downloading..."}
            </div>
          ) : (
            <DataTable
              data={filteredData}
              columns={columns}
              height="100%"
              onRowClick={select}
              isSelected={(row) =>
                Boolean(selectedCode) && getValue(row, codeField!) === selectedCode
              }
            />
          )}
        </div>
      </div>
      {selectedCode && !isLoading && (
        <Drawer title={selectedRow ? getValue(selectedRow, nameField!) : ""} onClose={unselect}>
          {selectedRow ? (
            <IyakuDetail row={selectedRow} layoutVersion={layoutVersion} />
          ) : (
            <div className="flex items-center justify-center h-full">
              No data found for code {selectedCode}
            </div>
          )}
        </Drawer>
      )}
    </div>
  );
}
