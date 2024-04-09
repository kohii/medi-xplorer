import { useCallback } from "react";

import { FilterableSelect } from "@/components/filterable-select";
import { SparklesIcon } from "@/components/icons/sparkles-icon";

import { getAllShinryoukouiMasterFields } from "../shinryoukoui-master-fields/shinryoukoui-master-fields";
import {
  ShinryoukouiMasterVirtualFieldId,
  shinryoukouiMasterVirtualFields,
} from "../shinryoukoui-master-fields/shinryoukoui-master-virtual-field";

import { DisplayFieldConfig } from "./types";

const normalFieldsOptions = getAllShinryoukouiMasterFields().map((field) => ({
  label: `${field.seq}: ${field.name}`,
  value: field.seq.toString(),
}));

const virtualFieldsOptions = Object.entries(shinryoukouiMasterVirtualFields).map(
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

type DisplayFieldSelectProps = {
  onChange: (value: DisplayFieldConfig) => void;
  className?: string;
};

export function DisplayFieldSelect({ onChange, className }: DisplayFieldSelectProps) {
  const handleChange = useCallback(
    (value: string | null) => {
      if (!value) return;
      const seq = parseInt(value);
      if (isNaN(seq)) {
        onChange({ kind: "virtual", key: value as ShinryoukouiMasterVirtualFieldId });
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
