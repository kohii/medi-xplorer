import type { Metadata } from "next";

import SearchResult from "./search-result";

export const metadata: Metadata = {
	title: "検索結果 | MediXplorer",
};

export default function Page() {
	return (
		<SearchResult />
	);
}
