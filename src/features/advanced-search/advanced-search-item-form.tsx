import React, { useEffect, useMemo } from "react";

import { FieldName, getField } from "@/app/s/shinryoukoui-master-fields";
import { FilterableSelect } from "@/components/filterable-select";
import { IconButton } from "@/components/icon-button";
import { DeleteIcon } from "@/components/icons/delete-icon";
import { TextInput } from "@/components/text-input";

import { FieldFilterItem } from "../search/types";

import { CodeSelect } from "./code-select";
import { FieldSelect } from "./field-select";

export const advancedSearchItemOperators = [
	"が次のいずれかに一致する",
	"が次のいずれでもない",
	"が次より大きい",
	"が次以上",
	"が次より小さい",
	"が次以下",
] as const;

const operatorOptions = advancedSearchItemOperators.map(label => ({
	label,
	value: label,
}));

export type AdvancedSearchItemOperator = typeof advancedSearchItemOperators[number];

export type AdvancedSearchItem = {
	field: FieldName;
	operator: AdvancedSearchItemOperator;
	value: string;
	restValues?: string[];
};

type AdvancedSearchItemFormProps = {
	item: AdvancedSearchItem;
	onChange: (value: AdvancedSearchItem) => void;
	onDelete: () => void;
};

export function AdvancedSearchItemForm({
	item,
	onChange,
	onDelete,
}: AdvancedSearchItemFormProps) {
	const field = getField(item.field)!;
	const values = useMemo(() => item.restValues ? [item.value, ...item.restValues] : [item.value], [item]);
	const takesMultipleValues = item.operator === "が次のいずれかに一致する" || item.operator === "が次のいずれでもない";

	useEffect(() => {
		if (!takesMultipleValues) return;

		const lastValue = values[values.length - 1];
		if (lastValue) {
			onChange({
				...item,
				restValues: [...values.slice(1), ""],
			});
		} else if (values.length > 1 && !values[values.length - 2]) {
			onChange({
				...item,
				restValues: values.slice(1, values.length - 1),
			});
		}
	}, [item, onChange, takesMultipleValues, values]);

	const handleValueChange = (value: string, index: number) => {
		onChange({
			...item,
			value: index === 0 ? value : values[0],
			restValues: index === 0 ? values.slice(1) : [...values.slice(1, index), value, ...values.slice(index + 1)],
		});
	};

	return <div className="flex items-start gap-1">
		<div className="flex-grow basis-1">
			<FieldSelect
				value={item.field}
				onChange={field => onChange({
					...item,
					field,
				})}
			/>
		</div>

		<div className="max-w-l">
			<FilterableSelect
				options={operatorOptions}
				value={item.operator}
				onChange={operator => onChange({
					...item,
					operator,
				})}
			/>
		</div>

		<div className="flex-grow basis-1 flex flex-col gap-2">
			{
				values.map((value, index) => (
					<React.Fragment key={index}>
						{!field.codes || field.allowFreeValue ? <TextInput
							value={value}
							onChange={value => handleValueChange(value, index)}
							placeholder={index === 0 ? "値を入力..." : "値を追加..."}
						/> : <CodeSelect
							codes={field.codes}
							value={value}
							onChange={value => handleValueChange(value ?? "", index)}
						/>}
					</React.Fragment>
				))
			}
		</div>


		<IconButton className="p-2" icon={<DeleteIcon />} label="フィルターを削除" onClick={onDelete} />
	</div>;
}
