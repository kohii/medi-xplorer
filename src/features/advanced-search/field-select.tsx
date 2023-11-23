import { FieldName, shinryokouiMasterFields } from '@/app/s/shinryoukoui-master-fields';
import { FilterableSelect } from '@/components/filterable-select';
import React from 'react';

type Props = {
	value: FieldName | null;
	onChange: (value: FieldName) => void;
	placeholder?: string;
	className?: string;
}

const options = shinryokouiMasterFields.map(field => ({
	label: `${field.seq}. ${field.name}`,
	value: field.name,
}));

export function FieldSelect({ value, onChange, placeholder, className }: Props) {
	return (<FilterableSelect
		options={options}
		onChange={onChange}
		value={value}
		placeholder={placeholder}
		className={className}
	/>);
}