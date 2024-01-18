import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

import { SEARCH_PARAM_NAMES } from "@/search-param-names";

import { DEFAULT_COLUMN_CONFIGS } from "./constants";
import { parseDisplayColumnConfigs } from "./parse-display-column-config";
import { DisplayColumnConfig } from "./types";

export function useDisplayColumnConfigs(): DisplayColumnConfig[] {
  const searchParams = useSearchParams();
  const columns = searchParams.get(SEARCH_PARAM_NAMES.COLUMNS);
  return useMemo(() => {
    if (!columns) return DEFAULT_COLUMN_CONFIGS;
    const columnConfigs = parseDisplayColumnConfigs(columns);
    if (columnConfigs.length === 0) {
      return DEFAULT_COLUMN_CONFIGS;
    }
    return columnConfigs;
  }, [columns]);
}
