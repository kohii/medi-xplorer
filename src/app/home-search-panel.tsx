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

function previousMasterId(current: MasterId): MasterId {
  const currentIndex = MASTER_OPTIONS.indexOf(current);
  return MASTER_OPTIONS[(currentIndex - 1 + MASTER_OPTIONS.length) % MASTER_OPTIONS.length];
}

export function HomeSearchPanel() {
  const [masterId, setMasterId] = useState(DEFAULT_MASTER_ID);
  const handleSearchBarKeyDown = useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
      return;
    }

    if (event.key !== "ArrowUp" && event.key !== "ArrowDown") {
      return;
    }

    event.preventDefault();
    setMasterId((prev) => (event.key === "ArrowUp" ? previousMasterId(prev) : nextMasterId(prev)));
  }, []);

  return (
    <>
      <div className="my-8 w-full">
        <div aria-label="マスター種別" className="flex gap-1 mb-2">
          {MASTER_OPTIONS.map((id) => {
            const isActive = masterId === id;
            return (
              <button
                key={id}
                type="button"
                aria-pressed={isActive}
                className={twMerge(
                  "relative px-3 py-1 text-sm rounded-full cursor-pointer transition-all duration-200",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300",
                  isActive
                    ? "bg-blue-50 text-blue-600 font-medium"
                    : "text-gray-500 hover:text-gray-600 hover:bg-gray-50",
                )}
                onClick={() => setMasterId(id)}
              >
                {MASTER_LABELS[id]}
              </button>
            );
          })}
        </div>
        <div onKeyDown={handleSearchBarKeyDown}>
          <SearchBar masterId={masterId} />
        </div>
        <div className="mt-2 text-left text-xs text-gray-400 select-none">
          Alt + ↑ / ↓ でマスター切り替え、Enter で検索
        </div>
      </div>
      <AdvancedSearchButton
        masterId={masterId}
        layoutVersion={
          masterId === MASTER_IDS.IYAKUHIN ? getIyakuhinLayoutVersion("") : getLayoutVersion("")
        }
      />
    </>
  );
}
