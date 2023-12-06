import { useSearchParams } from "next/navigation";
import { useCallback } from "react";

import { MASTER_VERSION_SEARCH_PARAM_NAME, SHINRYOUKOUI_MASTER_VERSION_KEYS, ShinryoukouiMasterVersion } from "@/features/shinryoukoui-master-versions/constants";

import { useRouterFn } from "./use-router-fn";

export function useShinryoukouiSearch() {
	const { push } = useRouterFn();
	const searchParams = useSearchParams();
	const masterVersion = searchParams.get(MASTER_VERSION_SEARCH_PARAM_NAME);

	return useCallback((query: string) => {
		const searchParams = new URLSearchParams();
		if (query) {
			searchParams.set("q", query);
		}
		if (masterVersion && SHINRYOUKOUI_MASTER_VERSION_KEYS.includes(masterVersion as ShinryoukouiMasterVersion)) {
			searchParams.set(MASTER_VERSION_SEARCH_PARAM_NAME, masterVersion);
		}
		push(`/s?${searchParams.toString()}`);
	}, [masterVersion, push]);
}