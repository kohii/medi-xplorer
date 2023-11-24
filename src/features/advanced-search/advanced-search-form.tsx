import { FormItem } from "@/components/form-item";
import { FieldName } from "../../app/s/shinryoukoui-master-fields";
import { FieldSelect } from "./field-select";
import { TextInput } from "@/components/text-input";
import { FormLabel } from "@/components/form-label";
import { AdvancedSearchItem, AdvancedSearchItemForm } from "./advanced-search-item-form";

export const advancedSearchOperatorOptions = [{
	label: 'が次のいずれかに一致する',
	operator: ':',
	negative: false,
}, {
	label: 'が次のいずれでもない',
	operator: ':',
	negative: true,
}, {
	label: 'が次より大きい',
	operator: '>',
	negative: false,
}, {
	label: 'が次以上',
	operator: '>=',
	negative: false,
}, {
	label: 'が次より小さい',
	operator: '<',
	negative: false,
}, {
	label: 'が次以下',
	operator: '<=',
	negative: false,
}] as const;


type OperatorLabel = typeof advancedSearchOperatorOptions[number]['label'];

export type AdvancedSearchParams = {
	keyword: string;
	exclude: string;
	items: AdvancedSearchItem[];
}

export type AdvancedSearchFormProps = {
	value: AdvancedSearchParams;
	onChange: (value: AdvancedSearchParams) => void;
};

export function AdvancedSearchForm({ value, onChange }: AdvancedSearchFormProps) {
	const onSelect = (field: FieldName | null) => {
		if (!field) return;
		onChange({
			...value,
			items: [
				...value.items,
				{
					field,
					operator: advancedSearchOperatorOptions[0].label,
					value: '',
				},
			],
		});
	}

	return (<div>
		<FormItem >
			<FormLabel>検索ワード</FormLabel>
			<TextInput value={value.keyword} onChange={keyword => onChange({ ...value, keyword })} autoFocus />
		</FormItem>
		<FormItem>
			<FormLabel>除外ワード</FormLabel>
			<TextInput value={value.exclude} onChange={exclude => onChange({ ...value, exclude })} />
		</FormItem>
		<div>
			<FormLabel>検索項目</FormLabel>
			<div className="flex flex-col gap-2">
				{value.items.map((item, index) => (
					<AdvancedSearchItemForm
						key={index}
						item={item}
						onChange={item => {
							const items = [...value.items];
							items[index] = item;
							onChange({ ...value, items });
						}}
						onDelete={() => {
							const items = [...value.items];
							items.splice(index, 1);
							onChange({ ...value, items });
						}}
					/>
				))}
				<FieldSelect onChange={onSelect} value={null} placeholder="検索する項目を追加..." isNullable />
			</div>
		</div>
	</div>);
}
