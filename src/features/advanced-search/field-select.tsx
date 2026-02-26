import React from "react";

import { FilterableSelect } from "@/components/filterable-select";
import { getMasterFields } from "@/features/fields/master-field-resolver";
import { MasterId } from "@/master-types";

type Props<IsNullable extends boolean> = {
  value: IsNullable extends true ? string | null : string;
  onChange: (
    value: IsNullable extends true
      ? string | null
      : string,
  ) => void;
  placeholder?: string;
  className?: string;
  isNullable?: IsNullable;
  masterId: MasterId;
  layoutVersion: string;
};

const optionsCache = new Map<
  string,
  { value: string; label: string }[]
>();

function getOptions(masterId: MasterId, layoutVersion: string) {
  const cacheKey = `${masterId}:${layoutVersion}`;
  if (!optionsCache.has(cacheKey)) {
    const fields = getMasterFields(masterId, layoutVersion);
    optionsCache.set(
      cacheKey,
      fields.map((f) => ({
        value: f.name,
        label: `${f.seq}. ${f.name}`,
      })),
    );
  }
  return optionsCache.get(cacheKey)!;
}

export function FieldSelect<IsNullable extends boolean = false>({
  value,
  onChange,
  placeholder,
  className,
  isNullable,
  masterId,
  layoutVersion,
}: Props<IsNullable>) {
  return (
    <FilterableSelect
      options={getOptions(masterId, layoutVersion)}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
      className={className}
      isNullable={isNullable}
    />
  );
}
