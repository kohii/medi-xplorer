"use client";

import { useState } from "react";
import { twMerge } from "tailwind-merge";

import { useShinryoukouiSearch } from "@/hooks/use-shinryoukoui-search";

import { AdvancedSearchFormModal } from "./advancedj-search-form-modal";

type AdvancedSearchLinkProps = {
	initialQuery?: string;
	className?: string;
};

export function AdvancedSearchAnchor({ initialQuery, className }: AdvancedSearchLinkProps) {
	const [advancedSearchOpen, setAdvancedSearchOpen] = useState(false);

	const open = () => {
		setAdvancedSearchOpen(true);
	};

	const search = useShinryoukouiSearch();

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