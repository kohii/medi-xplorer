import { FormItem } from "@/components/form-item";
import { FormLabel } from "@/components/form-label";
import { TextInput } from "@/components/text-input";

import { FieldName } from "../shinryoukoui-master-fields/shinryoukoui-master-fields";

import { AdvancedSearchItemForm } from "./advanced-search-item-form";
import { AdvancedSearchItem, advancedSearchOperatorOptions } from "./constants";
import { FieldSelect } from "./field-select";

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
					operatorKind: advancedSearchOperatorOptions[0].kind,
					value: "",
				},
			],
		});
	};

	return (
		<div>
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
		</div>
	);
}
