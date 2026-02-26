"use client";

import { useState } from "react";
import { twMerge } from "tailwind-merge";

import { AdvancedSearchButton } from "@/features/advanced-search/advanced-search-button";
import { getIyakuhinLayoutVersion } from "@/features/iyakuhin-master-versions/layouts";
import { SearchBar } from "@/features/search/search-bar";
import { getLayoutVersion } from "@/features/shinryoukoui-master-versions/layouts";
import { DEFAULT_MASTER_ID, MASTER_IDS } from "@/master-types";

export function HomeSearchPanel() {
  const [masterId, setMasterId] = useState(DEFAULT_MASTER_ID);

  return (
    <div className="w-full">
      <div className="flex items-center justify-center gap-2 mb-3">
        <span className="text-sm text-gray-500">検索対象</span>
        <div className="inline-flex rounded border border-gray-300 overflow-hidden">
          <button
            type="button"
            className={twMerge(
              "px-3 py-1.5 text-sm",
              masterId === MASTER_IDS.SHINRYOUKOUI
                ? "bg-slate-600 text-white"
                : "bg-white text-gray-600 hover:bg-gray-50",
            )}
            onClick={() => setMasterId(MASTER_IDS.SHINRYOUKOUI)}
          >
            診療行為
          </button>
          <button
            type="button"
            className={twMerge(
              "px-3 py-1.5 text-sm",
              masterId === MASTER_IDS.IYAKUHIN
                ? "bg-slate-600 text-white"
                : "bg-white text-gray-600 hover:bg-gray-50",
            )}
            onClick={() => setMasterId(MASTER_IDS.IYAKUHIN)}
          >
            医薬品
          </button>
        </div>
      </div>
      <SearchBar masterId={masterId} />
      <div className="mt-3">
        <AdvancedSearchButton
          masterId={masterId}
          layoutVersion={
            masterId === MASTER_IDS.IYAKUHIN
              ? getIyakuhinLayoutVersion("")
              : getLayoutVersion("")
          }
        />
      </div>
    </div>
  );
}
