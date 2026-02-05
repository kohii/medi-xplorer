"use client";

import { forwardRef, useMemo } from "react";
import {
  experimental_RichInput as RichInput,
  RichInputHandle,
  createRegexRenderer,
} from "rich-textarea";
import { twMerge } from "tailwind-merge";

import { MasterId } from "@/master-types";
import { SEARCH_PARAM_NAMES } from "@/search-param-names";

import { getAllIyakuMasterFields } from "../iyaku-master-fields/iyaku-master-fields";
import { getAllShinryoukouiMasterFields } from "../shinryoukoui-master-fields/shinryoukoui-master-fields";

type SearchInputProps = {
  masterId: MasterId;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
};

export const SearchInput = forwardRef<RichInputHandle, SearchInputProps>(function SearchInput(
  { masterId, value, onChange, className },
  ref,
) {
  const fieldNames = useMemo(() => {
    const fields = masterId === "y" ? getAllIyakuMasterFields() : getAllShinryoukouiMasterFields();
    return fields.map((f) => f.name);
  }, [masterId]);

  const renderer = useMemo(() => {
    if (!fieldNames.length) return undefined;
    const fieldHighlightReg = new RegExp(
      `(?<=(^|\\s)|-)(${fieldNames.map((f) => `${f}`).join("|")}):`,
      "g",
    );
    return createRegexRenderer([
      [fieldHighlightReg, { background: "#EAF5F9", color: "#698199", borderRadius: "2px" }],
    ]);
  }, [fieldNames]);

  return (
    <>
      <RichInput
        ref={ref}
        name={SEARCH_PARAM_NAMES.SEARCH.QUERY}
        autoFocus
        placeholder={masterId === "y" ? "医薬品を検索" : "診療行為を検索"}
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
