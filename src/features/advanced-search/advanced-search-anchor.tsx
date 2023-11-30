"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

import { MASTER_VERSION_SEARCH_PARAM_NAME, SHINRYOUKOUI_MASTER_VERSION_KEYS, ShinryoukouiMasterVersion } from "@/constants";
import { useRouterFn } from "@/hooks/use-router-fn";

import { AdvancedSearchFormModal } from "./advancedj-search-form-modal";

type AdvancedSearchLinkProps = {
	initialQuery?: string;
	className?: string;
};

export function AdvancedSearchAnchor({ initialQuery, className }: AdvancedSearchLinkProps) {
	const [advancedSearchOpen, setAdvancedSearchOpen] = useState(false);

	const searchParams = useSearchParams();
	const { push } = useRouterFn();

	const open = () => {
		setAdvancedSearchOpen(true);
	};

	const search = (query: string) => {
		setAdvancedSearchOpen(false);

		const sp = new URLSearchParams();
		if (query) {
			sp.set("q", query);
		}
		const masterVersion = searchParams.get(MASTER_VERSION_SEARCH_PARAM_NAME);
		if (masterVersion && SHINRYOUKOUI_MASTER_VERSION_KEYS.includes(masterVersion as ShinryoukouiMasterVersion)) {
			sp.set(MASTER_VERSION_SEARCH_PARAM_NAME, masterVersion);
		}

		push(`/s?${sp.toString()}`);
	};

	return (
		<>
			<button
				onClick={open}
				className={twMerge(
					"text-blue-500 hover:text-blue-700 text-sm",
					className
				)}
			>
				詳細検索
			</button>
			{advancedSearchOpen && <AdvancedSearchFormModal query={initialQuery ?? ""} onChange={search} onClose={() => setAdvancedSearchOpen(false)} />}
		</>
	);
}