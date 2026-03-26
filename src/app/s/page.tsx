import type { Metadata } from "next";
import { Suspense } from "react";

import { RedirectIfIyakuhin } from "./redirect-if-iyakuhin";
import SearchResult from "./search-result";
import { SearchResultDataProviders } from "./search-result-data-providers";

export const metadata: Metadata = {
  title: "診療行為検索結果 | MediXplorer",
  robots: {
    index: false,
  },
};

export default function Page() {
  return (
    <Suspense>
      <RedirectIfIyakuhin />
      <SearchResultDataProviders>
        <SearchResult />
      </SearchResultDataProviders>
    </Suspense>
  );
}
