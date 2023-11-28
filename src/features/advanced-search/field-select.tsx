import React from "react";

import { FilterableSelect } from "@/components/filterable-select";
import { FieldName, shinryokouiMasterFields } from "@/features/shinryoukoui-master-fields/shinryoukoui-master-fields";

type Props<IsNullable extends boolean> = {
	value: IsNullable extends true ? FieldName | null : FieldName;
	onChange: (value: IsNullable extends true ? FieldName | null : FieldName) => void;
	placeholder?: string;
	className?: string;
	isNullable?: IsNullable;
}

const options = shinryokouiMasterFields.map(field => ({
	label: `${field.seq}. ${field.name}`,
	value: field.name,
}));

export function FieldSelect<IsNullable extends boolean = false>({
	value,
	onChange,
	placeholder,
	className,
	isNullable
}: Props<IsNullable>) {
	return (
		<FilterableSelect
			options={options}
			onChange={onChange}
			value={value}
			placeholder={placeholder}
			className={className}
			isNullable={isNullable}
		/>
	);
}