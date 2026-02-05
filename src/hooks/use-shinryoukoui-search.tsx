import { useRouter } from "next/navigation";
import { useCallback } from "react";

import { DEFAULT_MASTER_ID, MasterId } from "@/master-types";
import { SEARCH_PARAM_NAMES } from "@/search-param-names";

export type SearchParamNames = typeof SEARCH_PARAM_NAMES["SEARCH"][keyof typeof SEARCH_PARAM_NAMES["SEARCH"]];

type Options = {
  preserveExtraSearchParams: boolean
}

export function useMasterSearch({
  preserveExtraSearchParams,
  masterId,
}: Options & { masterId: MasterId }) {
  const { push } = useRouter();

  return useCallback((params: {
    [key in SearchParamNames]?: string | undefined
  }) => {
    const currentSearchParams = new URLSearchParams(window.location.search);
    const searchParams = new URLSearchParams();

    const searchParamNames =  Object.values(SEARCH_PARAM_NAMES.SEARCH);
    currentSearchParams.forEach((value, key) => {
      if (preserveExtraSearchParams || searchParamNames.includes(key as SearchParamNames)) {
        searchParams.set(key, value);
      }
    });

    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        searchParams.set(key, value);
      } else {
        searchParams.delete(key);
      }
    });
    searchParams.set(SEARCH_PARAM_NAMES.SEARCH.MASTER, masterId);
    push(`/s?${searchParams.toString()}`);
  }, [masterId, preserveExtraSearchParams, push]);
}

export function useMasterSearchByQuery(masterId: MasterId) {
  const search = useMasterSearch({ preserveExtraSearchParams: false, masterId });
  return useCallback((q: string) => {
    search({
      q,
    });
  }, [search]);
}

export function useShinryoukouiSearch({
  preserveExtraSearchParams,
}: Options) {
  return useMasterSearch({ preserveExtraSearchParams, masterId: DEFAULT_MASTER_ID });
}

export function useShinryoukouiSearchByQuery() {
  return useMasterSearchByQuery(DEFAULT_MASTER_ID);
}
