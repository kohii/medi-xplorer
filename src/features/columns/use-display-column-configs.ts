import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

import { DEFAULT_COLUMN_CONFIGS } from "./constants";
import { parseDisplayColumnConfigs } from "./parse-display-column-config";
import { DisplayColumnConfig } from "./types";

export function useDisplayColumnConfigs(): DisplayColumnConfig[] {
  const searchParams = useSearchParams();
  const columns = searchParams.get("columns");
  return useMemo(() => {
    if (!columns) return DEFAULT_COLUMN_CONFIGS;
    const columnConfigs = parseDisplayColumnConfigs(columns);
    if (columnConfigs.length === 0) {
      return DEFAULT_COLUMN_CONFIGS;
    }
    return columnConfigs;
  }, [columns]);
}
