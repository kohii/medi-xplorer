import React from "react";

import { FilterableSelect } from "@/components/filterable-select";
import {
  ShinryoukouiMasterFieldName,
  getShinryoukouiMasterFields,
} from "@/features/shinryoukoui-master-fields/shinryoukoui-master-fields";

import { ShinryoukouiMasterLayoutVersion } from "../shinryoukoui-master-versions/layouts";

type Props<IsNullable extends boolean> = {
  value: IsNullable extends true ? ShinryoukouiMasterFieldName | null : ShinryoukouiMasterFieldName;
  onChange: (
    value: IsNullable extends true
      ? ShinryoukouiMasterFieldName | null
      : ShinryoukouiMasterFieldName,
  ) => void;
  placeholder?: string;
  className?: string;
  isNullable?: IsNullable;
  layoutVersion: ShinryoukouiMasterLayoutVersion;
};

const optionsCache = new Map<
  ShinryoukouiMasterLayoutVersion,
  { value: ShinryoukouiMasterFieldName; label: string }[]
>();
function getOptions(version: ShinryoukouiMasterLayoutVersion) {
  if (!optionsCache.has(version)) {
    const fields = getShinryoukouiMasterFields(version);
    optionsCache.set(
      version,
      fields.map((f) => ({
        value: f.name,
        label: `${f.seq}. ${f.name}`,
      })),
    );
  }
  return optionsCache.get(version)!;
}

export function FieldSelect<IsNullable extends boolean = false>({
  value,
  onChange,
  placeholder,
  className,
  isNullable,
  layoutVersion,
}: Props<IsNullable>) {
  return (
    <FilterableSelect
      options={getOptions(layoutVersion)}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
      className={className}
      isNullable={isNullable}
    />
  );
}
