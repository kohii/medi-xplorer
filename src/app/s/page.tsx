import type { Metadata } from "next";

import Search from "./search";

export const metadata: Metadata = {
	title: "検索結果 | MediXplorer",
};

export default function Page() {
	return (
		<Search />
	);
}
