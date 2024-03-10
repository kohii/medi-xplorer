import { useRouter } from "next/navigation";
import { useCallback } from "react";

import { SEARCH_PARAM_NAMES } from "@/search-param-names";

export type SearchParamNames = typeof SEARCH_PARAM_NAMES["SEARCH"][keyof typeof SEARCH_PARAM_NAMES["SEARCH"]];

type Options = {
  preserveExtraSearchParams: boolean
}

export function useShinryoukouiSearch({
  preserveExtraSearchParams,
}: Options) {
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
    push(`/s?${searchParams.toString()}`);
  }, [preserveExtraSearchParams, push]);
}

export function useShinryoukouiSearchByQuery() {
  const search = useShinryoukouiSearch({preserveExtraSearchParams: false});
  return useCallback((q: string) => {
    search({
      q,
    });
  }, [search]);
}