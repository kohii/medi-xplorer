import { useCallback, useRef } from "react";
import { useRouterFn } from "./use-router-fn";

export function useUpdateSearchParams() {
	const router = useRouterFn();
	return useCallback((
		params: Record<string, string | undefined>,
		options: {
			mode: "replace" | "push";
		} = { mode: "push" },
	) => {
		const url = new URL(window.location.href);
		Object.entries(params).forEach(([key, value]) => {
			if (value === undefined) {
				url.searchParams.delete(key);
			} else {
				url.searchParams.set(key, value);
			}
		});

		if (options.mode === "replace") {
			router.replace(url.pathname + url.search);
		} else {
			router.push(url.pathname + url.search);
		}
	}, [router]);
}