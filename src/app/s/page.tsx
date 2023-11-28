import type { Metadata } from "next";

import Search from "./search";

export const metadata: Metadata = {
	title: "検索結果 | MediXplorer",
};

export default function Page({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
	let query = searchParams["q"];
	query = typeof query === "string" ? query : undefined;

	let code = searchParams["code"];
	code = typeof code === "string" ? code : undefined;

	return (
		<Search query={query} selectedCode={code} />
	);
}
