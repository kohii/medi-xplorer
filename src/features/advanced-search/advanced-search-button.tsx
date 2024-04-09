"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

import { Backdrop } from "@/components/backdrop";
import { useShinryoukouiSearchByQuery } from "@/hooks/use-shinryoukoui-search";

import { ShinryoukouiMasterLayoutVersion } from "../shinryoukoui-master-versions/layouts";

type AdvancedSearchLinkProps = {
  initialQuery?: string;
  layoutVersion: ShinryoukouiMasterLayoutVersion;
};

export function AdvancedSearchButton({ initialQuery, layoutVersion }: AdvancedSearchLinkProps) {
  const [advancedSearchOpen, setAdvancedSearchOpen] = useState(false);

  const open = () => {
    setAdvancedSearchOpen(true);
  };

  const search = useShinryoukouiSearchByQuery();

  return (
    <>
      <button onClick={open} className="text-blue-600 hover:text-blue-800 text-sm">
        詳細検索
      </button>
      {advancedSearchOpen && (
        <DynamicAdvancedSearchFormModal
          query={initialQuery ?? ""}
          onChange={search}
          onClose={() => setAdvancedSearchOpen(false)}
          layoutVersion={layoutVersion}
        />
      )}
    </>
  );
}

const DynamicAdvancedSearchFormModal = dynamic(
  () => import("./advancedj-search-form-modal").then((m) => m.AdvancedSearchFormModal),
  { ssr: false, loading: () => <Backdrop /> },
);
