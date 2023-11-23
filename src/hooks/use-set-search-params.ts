import { useCallback } from "react";
import { useRouterFn } from "./use-router-fn";

export function useSetSearchParams() {
	const router = useRouterFn();
	return useCallback((params: Record<string, string | undefined>) => {
		const url = new URL(window.location.href);
		Object.entries(params).forEach(([key, value]) => {
			if (value === undefined) {
				url.searchParams.delete(key);
			} else {
				url.searchParams.set(key, value);
			}
		});
		router.push(url.pathname + url.search);
	}, [router]);
}