"use client";

import { useRef, useState } from "react";
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
  const masterTabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const focusMasterTab = (targetMasterId: MasterId) => {
    masterTabRefs.current[MASTER_OPTIONS.indexOf(targetMasterId)]?.focus();
  };

  const handleMasterTabKeyDown = (
    currentMasterId: MasterId,
    event: React.KeyboardEvent<HTMLButtonElement>,
  ) => {
    let nextId: MasterId | null = null;

    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        nextId = nextMasterId(currentMasterId);
        break;
      case "ArrowLeft":
      case "ArrowUp":
        nextId =
          MASTER_OPTIONS[(MASTER_OPTIONS.indexOf(currentMasterId) - 1 + MASTER_OPTIONS.length) % MASTER_OPTIONS.length];
        break;
      case "Home":
        nextId = MASTER_OPTIONS[0];
        break;
      case "End":
        nextId = MASTER_OPTIONS[MASTER_OPTIONS.length - 1];
        break;
      default:
        return;
    }

    if (nextId === null) {
      return;
    }

    event.preventDefault();
    setMasterId(nextId);
    focusMasterTab(nextId);
  };

  return (
    <>
      <div className="my-8 w-full">
        <div
          role="tablist"
          aria-label="マスター種別"
          className="flex gap-1 mb-2"
        >
          {MASTER_OPTIONS.map((id) => {
            const isActive = masterId === id;
            return (
              <button
                key={id}
                ref={(node) => {
                  masterTabRefs.current[MASTER_OPTIONS.indexOf(id)] = node;
                }}
                type="button"
                role="tab"
                aria-selected={isActive}
                tabIndex={isActive ? 0 : -1}
                className={twMerge(
                  "relative px-3 py-1 text-sm rounded-full cursor-pointer transition-all duration-200",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300",
                  isActive
                    ? "bg-blue-50 text-blue-600 font-medium"
                    : "text-gray-500 hover:text-gray-600 hover:bg-gray-50",
                )}
                onClick={() => setMasterId(id)}
                onKeyDown={(event) => handleMasterTabKeyDown(id, event)}
              >
                {MASTER_LABELS[id]}
              </button>
            );
          })}
        </div>
        <SearchBar masterId={masterId} />
        <div className="mt-2 text-left text-xs text-gray-400 select-none">
          ← → でマスター切り替え、Tab で次へ、Enter で検索
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
