"use client";

import { useEffect } from "react";

import { useRouterFn } from "@/hooks/use-router-fn";

export function PrefetchSearchResultPage() {
	const { prefetch } = useRouterFn();
	useEffect(() => prefetch("/s"), [prefetch]);
	return null;
}
