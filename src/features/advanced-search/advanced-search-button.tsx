"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

import { Backdrop } from "@/components/backdrop";
import { useShinryoukouiSearch } from "@/hooks/use-shinryoukoui-search";

import { AdvancedSearchFormModal } from "./advancedj-search-form-modal";

type AdvancedSearchLinkProps = {
	initialQuery?: string;
};

export function AdvancedSearchButton({ initialQuery }: AdvancedSearchLinkProps) {
  const [advancedSearchOpen, setAdvancedSearchOpen] = useState(false);

  const open = () => {
    setAdvancedSearchOpen(true);
  };

  const search = useShinryoukouiSearch();

  return (
    <>
      <button
        onClick={open}
        className="text-blue-500 hover:text-blue-700 text-sm">
				詳細検索
      </button>
      {advancedSearchOpen && <DynamicAdvancedSearchFormModal query={initialQuery ?? ""} onChange={search} onClose={() => setAdvancedSearchOpen(false)} />}
    </>
  );
}

const DynamicAdvancedSearchFormModal = dynamic(
  () => import("./advancedj-search-form-modal").then(m => m.AdvancedSearchFormModal),
  { ssr: false, loading: () => <Backdrop /> },
);