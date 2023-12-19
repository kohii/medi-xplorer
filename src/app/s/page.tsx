import type { Metadata } from "next";
import { Suspense } from "react";

import SearchResult from "./search-result";
import { SearchResultDataProviders } from "./search-result-data-providers";

export const metadata: Metadata = {
  title: "検索結果 | MediXplorer",
  robots: {
    index: false,
  }
};

export default function Page() {
  return (
    <Suspense>
      <SearchResultDataProviders>
        <SearchResult />
      </SearchResultDataProviders>
    </Suspense>
  );
}
