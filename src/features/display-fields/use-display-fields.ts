import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

import { SEARCH_PARAM_NAMES } from "@/search-param-names";

import { DEFAULT_DISPLAY_FIELDS } from "./constants";
import { parseDisplayFieldConfigs } from "./parse-display-field-config";
import { DisplayFieldConfig } from "./types";

export function useDisplayFieldConfigs(): DisplayFieldConfig[] {
  const searchParams = useSearchParams();
  const fields = searchParams.get(SEARCH_PARAM_NAMES.FIELDS);
  return useMemo(() => {
    if (!fields) return DEFAULT_DISPLAY_FIELDS;
    const fieldConfigs = parseDisplayFieldConfigs(fields);
    if (fieldConfigs.length === 0) {
      return DEFAULT_DISPLAY_FIELDS;
    }
    return fieldConfigs;
  }, [fields]);
}
