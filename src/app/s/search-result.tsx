"use client";

import { useSearchParams } from "next/navigation";

import { MASTER_IDS, normalizeMasterId } from "@/master-types";
import { SEARCH_PARAM_NAMES } from "@/search-param-names";

import SearchResultIyaku from "./search-result-iyaku";
import SearchResultShinryoukoui from "./search-result-shinryoukoui";

export default function SearchResult() {
  const searchParams = useSearchParams();
  const masterId = normalizeMasterId(searchParams.get(SEARCH_PARAM_NAMES.SEARCH.MASTER));

  if (masterId === MASTER_IDS.IYAKU) {
    return <SearchResultIyaku />;
  }
  return <SearchResultShinryoukoui />;
}
