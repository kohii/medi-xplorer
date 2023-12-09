import type { Metadata } from "next";

import SearchResult from "./search-result";
import { SearchResultDataProviders } from "./search-result-data-providers";

export const metadata: Metadata = {
	title: "検索結果 | MediXplorer",
};

export default function Page() {
	return (
		<SearchResultDataProviders>
			<SearchResult />
		</SearchResultDataProviders>
	);
}
