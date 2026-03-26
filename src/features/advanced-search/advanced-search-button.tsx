"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

import { Backdrop } from "@/components/backdrop";
import { useMasterSearchByQuery } from "@/hooks/use-shinryoukoui-search";
import { MasterId } from "@/master-types";

type AdvancedSearchButtonProps = {
  initialQuery?: string;
  masterId: MasterId;
  layoutVersion: string;
};

export function AdvancedSearchButton({
  initialQuery,
  masterId,
  layoutVersion,
}: AdvancedSearchButtonProps) {
  const [advancedSearchOpen, setAdvancedSearchOpen] = useState(false);

  const open = () => {
    setAdvancedSearchOpen(true);
  };

  const search = useMasterSearchByQuery(masterId);

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
          masterId={masterId}
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
