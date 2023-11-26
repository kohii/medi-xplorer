import { useMemo } from "react";

import { FilterableSelect } from "@/components/filterable-select";

import { Field } from "../fields/types";

type CodeSelectProps = {
	codes: NonNullable<Field["codes"]>;
	value: string;
	onChange: (value: string | null) => void;
}

export function CodeSelect({
	codes,
	value,
	onChange,
}: CodeSelectProps) {
	const options = useMemo(() => {
		return codes.map(code => ({
			label: `${code.code}: ${code.name}`,
			value: code.code,
		}));
	}, [codes]);
	return <FilterableSelect
		isNullable
		clearable
		options={options}
		value={value || null}
		onChange={onChange}
	/>;
}