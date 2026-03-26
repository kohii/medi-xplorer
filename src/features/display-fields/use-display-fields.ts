import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

import { MasterId } from "@/master-types";
import { SEARCH_PARAM_NAMES } from "@/search-param-names";

import { getDefaultDisplayFields } from "./constants";
import { parseDisplayFieldConfigs } from "./parse-display-field-config";
import { DisplayFieldConfig } from "./types";

export function useDisplayFieldConfigs(masterId: MasterId): DisplayFieldConfig[] {
  const searchParams = useSearchParams();
  const fields = searchParams.get(SEARCH_PARAM_NAMES.SEARCH.FIELDS);
  return useMemo(() => {
    if (!fields) return getDefaultDisplayFields(masterId);
    const fieldConfigs = parseDisplayFieldConfigs(fields, masterId);
    if (fieldConfigs.length === 0) {
      return getDefaultDisplayFields(masterId);
    }
    return fieldConfigs;
  }, [fields, masterId]);
}
