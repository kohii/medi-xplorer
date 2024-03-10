"use client";

import { forwardRef } from "react";

import { Button } from "@/components/button";
import { SearchIcon } from "@/components/icons/search-icon";
import {  useShinryoukouiSearchByQuery } from "@/hooks/use-shinryoukoui-search";

import { SearchInput } from "./search-input";

type SearchBarProps = {
  value?: string;
  onChange?: (value: string) => void;
};

export type SearchBarHandle = {
  focus: () => void;
};

export const SearchBar = forwardRef<SearchBarHandle, SearchBarProps>(function SearchBar(
  { value, onChange }, ref
) {
  const search = useShinryoukouiSearchByQuery();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    search(event.currentTarget.q.value);
  };

  return (
    <form onSubmit={handleSubmit} action="/s">
      <div className="relative h-10">
        <div className="absolute flex items-center text-gray-400 inset-y-0 start-0 ps-3 pointer-events-none h-10">
          <SearchIcon />
        </div>
        <SearchInput
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
    </form >
  );
});
