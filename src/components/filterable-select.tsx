import { useMemo } from "react";
import ReactSelect from "react-select";
import { twMerge } from "tailwind-merge";

// FilterableSelectProps 型を条件付き型に変更
type FilterableSelectProps<ValueType extends string, IsNullable extends boolean> = {
	value: IsNullable extends true ? ValueType | null : ValueType;
	options: { label: string; value: ValueType }[];
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

  return (
    <ReactSelect
      aria-labelledby="aria-label"
      components={{
        IndicatorSeparator: () => null,
      }}
      className={`text-sm ${className ?? ""}`}
      classNames={{
        control: (state) => twMerge([
          "!bg-gray-50 !border !border-gray-300 !text-gray-900 !rounded outline-none",
          ...(state.isFocused ? ["!ring-blue-500 !border-blue-500"] : [])
        ]),
      }}
      options={options}
      onChange={(option) => onChange(option?.value ?? null as any)}
      value={selectedOption}
      placeholder={placeholder ?? "選択"}
      isClearable={clearable}
    />
  );
}
