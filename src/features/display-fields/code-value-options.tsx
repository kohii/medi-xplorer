import { twMerge } from "tailwind-merge";

import { Option, Select } from "@/components/select";

import { CodeValueVariant } from "./types";


type CodeValueOptionsProps = {
  className?: string;
  value?: {
    variant?: CodeValueVariant;
  };
  onChange: (value: { variant: CodeValueVariant }) => void;
};

const options: Option<CodeValueVariant>[] = [{
  value: "label-with-code",
  label: "コードとラベル (デフォルト)",
}, {
  value: "code",
  label: "コードのみ",
}, {
  value: "label",
  label: "ラベルのみ",
}];

export function CodeValueOptions({
  className,
  value,
  onChange,
}: CodeValueOptionsProps) {
  const variant : CodeValueVariant = value?.variant ?? "label-with-code";
  return (
    <div className={twMerge("flex items-center gap-1", className)}>
      表示内容:
      <Select
        value={variant}
        options={options}
        onChange={(v) => onChange({ variant: v })}
        className="w-auto py-1"
      >
      </Select>
    </div>
  );
}
