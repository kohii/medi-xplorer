"use client";

import { useCallback, useState } from "react";
import { twMerge } from "tailwind-merge";

import { AdvancedSearchButton } from "@/features/advanced-search/advanced-search-button";
import { getIyakuhinLayoutVersion } from "@/features/iyakuhin-master-versions/layouts";
import { SearchBar } from "@/features/search/search-bar";
import { getLayoutVersion } from "@/features/shinryoukoui-master-versions/layouts";
import { DEFAULT_MASTER_ID, MASTER_IDS, MASTER_LABELS, MasterId } from "@/master-types";

const MASTER_OPTIONS: MasterId[] = [MASTER_IDS.SHINRYOUKOUI, MASTER_IDS.IYAKUHIN];

function nextMasterId(current: MasterId): MasterId {
  const currentIndex = MASTER_OPTIONS.indexOf(current);
  return MASTER_OPTIONS[(currentIndex + 1) % MASTER_OPTIONS.length];
}

export function HomeSearchPanel() {
  const [masterId, setMasterId] = useState(DEFAULT_MASTER_ID);

  const handleSearchBarKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Tab") {
        e.preventDefault();
        setMasterId((prev) => nextMasterId(prev));
      }
    },
    [],
  );

  return (
    <>
      <div className="my-8 w-full">
        <div
          role="tablist"
          aria-label="マスター種別"
          className="flex gap-1 mb-4"
        >
          {MASTER_OPTIONS.map((id) => {
            const isActive = masterId === id;
            return (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={isActive}
                tabIndex={-1}
                className={twMerge(
                  "relative px-3 py-1 text-sm transition-colors rounded-full",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400",
                  isActive
                    ? "bg-gray-200 text-gray-700"
                    : "text-gray-400 hover:text-gray-500",
                )}
                onClick={() => setMasterId(id)}
              >
                {MASTER_LABELS[id]}
              </button>
            );
          })}
          <span className="ml-auto self-center text-xs text-gray-400 select-none">
            Tab で切り替え
          </span>
        </div>
        {/* onKeyDown は SearchInput (RichInput) からバブルアップしてくる */}
        <div onKeyDown={handleSearchBarKeyDown}>
          <SearchBar masterId={masterId} />
        </div>
      </div>
      <AdvancedSearchButton
        masterId={masterId}
        layoutVersion={
          masterId === MASTER_IDS.IYAKUHIN
            ? getIyakuhinLayoutVersion("")
            : getLayoutVersion("")
        }
      />
    </>
  );
}
