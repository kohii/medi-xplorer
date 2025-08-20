"use client";

import { forwardRef } from "react";
import {
  experimental_RichInput as RichInput,
  RichInputHandle,
  createRegexRenderer,
} from "rich-textarea";
import { twMerge } from "tailwind-merge";

import { SEARCH_PARAM_NAMES } from "@/search-param-names";

import { getAllShinryoukouiMasterFields } from "../shinryoukoui-master-fields/shinryoukoui-master-fields";

const FIELD_NAMES = getAllShinryoukouiMasterFields().map((f) => f.name);
const FIELD_HIGHLIGHT_REG = new RegExp(
  `(?<=(^|\\s)|-)(${FIELD_NAMES.map((f) => `${f}`).join("|")}):`,
  "g",
);
const renderer = createRegexRenderer([
  [FIELD_HIGHLIGHT_REG, { background: "#EAF5F9", color: "#698199", borderRadius: "2px" }],
]);

type SearchInputProps = {
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
};

export const SearchInput = forwardRef<RichInputHandle, SearchInputProps>(function SearchInput(
  { value, onChange, className },
  ref,
) {
  return (
    <>
      <RichInput
        ref={ref}
        name={SEARCH_PARAM_NAMES.SEARCH.QUERY}
        autoFocus
        placeholder="診療行為を検索"
        style={{
          width: "100%",
        }}
        className={twMerge(
          "bg-gray-50 border border-gray-300 text-gray-900 rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2",
          className,
        )}
        onChange={onChange ? (e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value) : undefined}
        value={value}
      >
        {renderer}
      </RichInput>
    </>
  );
});
