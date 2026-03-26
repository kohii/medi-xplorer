"use client";

import { forwardRef } from "react";

import { Button } from "@/components/button";
import { SearchIcon } from "@/components/icons/search-icon";
import { useMasterSearchByQuery } from "@/hooks/use-shinryoukoui-search";
import { MASTER_IDS, MasterId } from "@/master-types";
import { SEARCH_PARAM_NAMES } from "@/search-param-names";

import { SearchInput } from "./search-input";

type SearchBarProps = {
  masterId: MasterId;
  value?: string;
  onChange?: (value: string) => void;
};

export type SearchBarHandle = {
  focus: () => void;
};

export const SearchBar = forwardRef<SearchBarHandle, SearchBarProps>(function SearchBar(
  { masterId, value, onChange },
  ref,
) {
  const search = useMasterSearchByQuery(masterId);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    search(event.currentTarget.q.value);
  };

  const action = masterId === MASTER_IDS.IYAKUHIN ? "/y" : "/s";

  return (
    <form onSubmit={handleSubmit} action={action} autoComplete="off">
      <div className="relative h-10">
        {masterId !== MASTER_IDS.IYAKUHIN && (
          <input type="hidden" name={SEARCH_PARAM_NAMES.SEARCH.MASTER} value={masterId} />
        )}
        <div className="absolute flex items-center text-gray-400 inset-y-0 start-0 ps-3 pointer-events-none h-10">
          <SearchIcon />
        </div>
        <SearchInput
          masterId={masterId}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ref={ref as any}
          value={value}
          onChange={onChange}
          className="block w-full ps-10 py-2 h-10"
        />
        <Button
          type="submit"
          className="absolute right-0 top-0 bottom-0 px-4 py-0.5 rounded-s-none h-10"
        >
          検索
        </Button>
      </div>
    </form>
  );
});
