"use client";

import { forwardRef } from "react";
import { experimental_RichInput as RichInput, RichInputHandle, createRegexRenderer } from "rich-textarea";
import { twMerge } from "tailwind-merge";

import { shinryokouiMasterFields } from "../shinryoukoui-master-fields/shinryoukoui-master-fields";

const FIELD_NAMES = shinryokouiMasterFields.map((f) => f.name);
const FIELD_HIGHLIGHT_REG = new RegExp(
  `(?<=(^|\\s)|-)(${FIELD_NAMES.map((f) => `${f}`).join("|")}):`,
  "g"
);
const renderer = createRegexRenderer([
  [
    FIELD_HIGHLIGHT_REG,
    { background: "#EAF5F9", color: "#698199", borderRadius: "2px" },
  ],
]);

const Menu = ({
  chars,
  index,
  top,
  left,
  complete,
}: {
  chars: string[];
  index: number;
  top: number;
  left: number;
  complete: (index: number) => void;
}) => {
  return (
    <div
      style={{
        position: "fixed",
        top: top,
        left: left,
        fontSize: "12px",
        border: "solid 1px gray",
        borderRadius: "3px",
        background: "white",
        cursor: "pointer",
      }}
    >
      {chars.map((c, i) => (
        <div
          key={c}
          style={{
            padding: "4px",
            ...(index === i && {
              color: "white",
              background: "#2A6AD3",
            }),
          }}
          onMouseDown={(e) => {
            e.preventDefault();
            complete(i);
          }}
        >
          {c}
        </div>
      ))}
    </div>
  );
};

type SearchInputProps = {
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export const SearchInput = forwardRef<RichInputHandle, SearchInputProps>(function SearchInput({
  value,
  onChange,
  className,
}, ref) {
  return (
    <>
      <RichInput
        ref={ref}
        name="q"
        autoFocus
        placeholder="診療行為を検索"
        style={{
          width: "100%",
        }}
        className={twMerge(
          "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2",
          className
        )}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        value={value}
      >
        {renderer}
      </RichInput>
    </>
  );
});