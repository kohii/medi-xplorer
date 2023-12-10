import type { Metadata } from "next";

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
    <SearchResultDataProviders>
      <SearchResult />
    </SearchResultDataProviders>
  );
}
