import { useCallback } from "react";

import { MASTER_VERSION_SEARCH_PARAM_NAME, SHINRYOUKOUI_MASTER_VERSION_KEYS } from "@/features/shinryoukoui-master-versions/constants";

import { useRouterFn } from "./use-router-fn";

export function useShinryoukouiSearch() {
	const { push } = useRouterFn();

	return useCallback((query: string) => {
		const currentSearchParams = new URLSearchParams(location.search);
		const masterVersion = currentSearchParams.get(MASTER_VERSION_SEARCH_PARAM_NAME);
		const searchParams = new URLSearchParams();
		if (query) {
			searchParams.set("q", query);
		}
		if (masterVersion && SHINRYOUKOUI_MASTER_VERSION_KEYS.includes(masterVersion)) {
			searchParams.set(MASTER_VERSION_SEARCH_PARAM_NAME, masterVersion);
		}
		push(`/s?${searchParams.toString()}`);
	}, [push]);
}