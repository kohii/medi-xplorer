import React, { useMemo } from "react";
import ReactSelect, { ClassNamesConfig, GroupBase } from "react-select";
import { twMerge } from "tailwind-merge";

// FilterableSelectProps 型を条件付き型に変更
type FilterableSelectProps<ValueType extends string, IsNullable extends boolean> = {
  value: IsNullable extends true ? ValueType | null : ValueType;
  options: { label: string | React.ReactNode; value: ValueType }[];
  // eslint-disable-next-line no-unused-vars
  onChange: (value: IsNullable extends true ? ValueType | null : ValueType) => void;
  placeholder?: string;
  className?: string;
  clearable?: boolean;
  isNullable?: IsNullable;
};

export function FilterableSelect<ValueType extends string, IsNullable extends boolean = false>({
  value,
  options,
  onChange,
  placeholder,
  className,
  clearable,
}: FilterableSelectProps<ValueType, IsNullable>) {
  const selectedOption = useMemo(() => {
    if (value === null) {
      return null;
    }
    return options.find(option => option.value === value) ?? null;
  }, [options, value]);

  type OptionType = { label: string | React.ReactNode; value: ValueType };
  
  const classNamesConfig: ClassNamesConfig<OptionType, false, GroupBase<OptionType>> = {
    control: (state) => twMerge([
      "bg-gray-50! border! border-gray-300! text-gray-900! rounded-sm! outline-hidden",
      ...(state.isFocused ? ["ring-blue-500! border-blue-500!"] : [])
    ]),
  };

  return (
    <ReactSelect<OptionType, false, GroupBase<OptionType>>
      aria-labelledby="aria-label"
      components={{
        IndicatorSeparator: () => null,
      }}
      className={`text-sm ${className ?? ""}`}
      classNames={classNamesConfig}
      options={options}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onChange={(option: OptionType | null) => onChange(option?.value ?? null as any)}
      value={selectedOption}
      placeholder={placeholder ?? "選択"}
      isClearable={clearable}
    />
  );
}
