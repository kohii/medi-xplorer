"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { SearchResultDataProviders } from "./s/search-result-data-providers";

export function PrefetchSearchResultPage() {
  const { prefetch } = useRouter();

  // prefetch pages
  useEffect(() => {
    prefetch("/s");
    prefetch("/y");
  }, [prefetch]);

  // prefetch data
  return <SearchResultDataProviders>{" "}</SearchResultDataProviders>;
}
