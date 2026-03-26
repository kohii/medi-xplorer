import { useCallback } from "react";

import { FilterableSelect } from "@/components/filterable-select";
import { SparklesIcon } from "@/components/icons/sparkles-icon";
import { getMasterFields } from "@/features/fields/master-field-resolver";
import { getMasterVirtualFields } from "@/features/fields/master-virtual-field-resolver";
import { MasterId } from "@/master-types";

import { DisplayFieldConfig } from "./types";

type DisplayFieldSelectProps = {
  masterId: MasterId;
  layoutVersion: string;
  onChange: (value: DisplayFieldConfig) => void;
  className?: string;
};

export function DisplayFieldSelect({
  masterId,
  layoutVersion,
  onChange,
  className,
}: DisplayFieldSelectProps) {
  const normalFieldsOptions = getMasterFields(masterId, layoutVersion).map((field) => ({
    label: `${field.seq}: ${field.name}`,
    value: field.seq.toString(),
  }));

  const virtualFieldsOptions = Object.entries(getMasterVirtualFields(masterId)).map(
    ([key, field]) => ({
      label: (
        <div className="flex items-center gap-1.5">
          <SparklesIcon className="text-purple-500" />
          {field.name}
          <div className="text-xs text-gray-400 ml-2">MediXplorer 独自項目</div>
        </div>
      ),
      value: key,
    }),
  );

  const options = [...normalFieldsOptions, ...virtualFieldsOptions];

  const handleChange = useCallback(
    (value: string | null) => {
      if (!value) return;
      const seq = parseInt(value);
      if (isNaN(seq)) {
        onChange({ kind: "virtual", key: value });
      } else {
        onChange({ kind: "normal", seq });
      }
    },
    [onChange],
  );
  return (
    <FilterableSelect
      placeholder="＋ 列を追加..."
      isNullable
      clearable
      options={options}
      value={null}
      onChange={handleChange}
      className={className}
    />
  );
}
