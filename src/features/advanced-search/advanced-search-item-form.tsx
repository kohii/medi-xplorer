import { FieldName } from "@/app/s/shinryoukoui-master-fields";
import { FieldFilterItem } from "../search/types";
import { FieldSelect } from "./field-select";
import { TextInput } from "@/components/text-input";
import { FilterableSelect } from "@/components/filterable-select";
import { DeleteIcon } from "@/components/icons/delete-icon";
import { IconButton } from "@/components/icon-button";

export const advancedSearchItemOperators = [
	'が次のいずれかに一致する',
	'が次のいずれでもない',
	'が次より大きい',
	'が次以上',
	'が次より小さい',
	'が次以下',
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
	return <div className="flex items-center gap-1">
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

		<div className="flex-grow basis-1">
			<TextInput
				value={item.value}
				onChange={value => onChange({
					...item,
					value,
				})}
				placeholder={item.operator === 'が次のいずれかに一致する' ? '値を入力 (カンマまたは空白区切りで複数入力可)' : '値を入力'}
			/>
		</div>

		<IconButton icon={<DeleteIcon />} label="フィルターを削除" onClick={onDelete} />
	</div>
}