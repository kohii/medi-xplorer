import { useMemo, useState } from "react";
import ReactSelect from 'react-select';
import { twMerge } from 'tailwind-merge';

type FilterableSelectProps<ValueType extends string | null, Nullable extends boolean = false> = {
	value: ValueType;
	options: { label: string; value: ValueType }[];
	onChange: (value: ValueType) => void;
	placeholder?: string;
	className?: string;
	clearable?: boolean;
};

export function FilterableSelect<ValueType extends string | null>({
	value,
	options,
	onChange,
	placeholder,
	className,
	clearable,
}: FilterableSelectProps<ValueType>) {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const onMenuOpen = () => setIsMenuOpen(true);
	const onMenuClose = () => setIsMenuOpen(false);

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
			onMenuOpen={onMenuOpen}
			onMenuClose={onMenuClose}
			options={options}
			onChange={(option) => onChange(option?.value ?? null as any)}
			value={selectedOption}
			placeholder={placeholder ?? "選択"}
			isClearable={clearable}
		/>
	);
}