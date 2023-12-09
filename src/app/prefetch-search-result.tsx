"use client";

import { useEffect } from "react";

import { useRouterFn } from "@/hooks/use-router-fn";

import { SearchResultDataProviders } from "./s/search-result-data-providers";

export function PrefetchSearchResultPage() {
	const { prefetch } = useRouterFn();

	// prefetch page
	useEffect(() => prefetch("/s"), [prefetch]);

	// prefetch data
	return <SearchResultDataProviders>{" "}</SearchResultDataProviders>;
}
