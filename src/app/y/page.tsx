import type { Metadata } from "next";
import { Suspense } from "react";

import { IyakuhinDataProviders } from "./iyakuhin-data-providers";
import SearchResultIyakuhin from "./search-result-iyakuhin";

export const metadata: Metadata = {
  title: "医薬品検索結果 | MediXplorer",
  robots: {
    index: false,
  }
};

export default function Page() {
  return (
    <Suspense>
      <IyakuhinDataProviders>
        <SearchResultIyakuhin />
      </IyakuhinDataProviders>
    </Suspense>
  );
}
