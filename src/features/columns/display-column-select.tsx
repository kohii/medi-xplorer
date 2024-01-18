import { useCallback } from "react";

import { FilterableSelect } from "@/components/filterable-select";

import { shinryokouiMasterFields } from "../shinryoukoui-master-fields/shinryoukoui-master-fields";
import { ShinryoukouiMasterVirtualFieldId, shinryoukouiMasterVirtualFields } from "../shinryoukoui-master-fields/shinryoukoui-master-virtual-field";

import { DisplayColumnConfig } from "./types";

const normalFieldsOptions = shinryokouiMasterFields.map(field => ({
  label: `${field.seq}: ${field.name}`,
  value: field.seq.toString(),
}));

const virtualFieldsOptions = Object.entries(shinryoukouiMasterVirtualFields).map(([key, field]) => ({
  label: field.name,
  value: key,
}));

const options = [...normalFieldsOptions, ...virtualFieldsOptions];

type DisplayColumnSelectProps = {
  onChange: (value: DisplayColumnConfig) => void;
  className?: string;
};

export function DisplayColumnSelect({
  onChange,
  className,
}: DisplayColumnSelectProps) {
  const handleChange = useCallback((value: string | null) => {
    if (!value) return;
    const seq = parseInt(value);
    if (isNaN(seq)) {
      onChange({ kind: "virtual", key: value as ShinryoukouiMasterVirtualFieldId });
    } else {
      onChange({ kind: "normal", seq });
    }
  }, [onChange]);
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
