import { Modal } from "@/components/modal";
import { AdvancedSearchForm, AdvancedSearchParams, advancedSearchOperatorOptions } from "./advanced-search-form";
import { useMemo, useState } from "react";
import { parseQuery } from "../search/parse-query";
import { FieldFilterItem, FilterItem } from "../search/types";
import { AdvancedSearchItem, AdvancedSearchItemOperator } from "./advanced-search-item-form";
import { FieldName, getField, getFieldBySeq } from "@/app/s/shinryoukoui-master-fields";
import { splitByWhitespace } from "@/utils/text";
import { stringifyQuery } from "../search/stringify-query";
import { Button } from "@/components/button";

type AdvancedSearchFormModalProps = {
	query: string;
	onChange: (query: string) => void;
	onClose: () => void;
};

export function AdvancedSearchFormModal({
	query,
	onChange,
	onClose,
}: AdvancedSearchFormModalProps) {
	const [params, setParams] = useState<AdvancedSearchParams>(() => {
		const parsed = parseQuery(query);
		if (parsed.kind === 'ERROR') {
			return {
				keyword: '',
				exclude: '',
				items: [],
			};
		}
		return {
			keyword: parsed.value.filter(item => !item.operator && !item.negative).map(item => item.value).join(' '),
			exclude: parsed.value.filter(item => !item.operator && item.negative).map(item => item.value).join(' '),
			items: parsed.value
				.filter((item): item is FieldFilterItem => item.operator !== undefined)
				.map(convertFilterItemToAdvancedSearchItem)
				.filter((item): item is AdvancedSearchItem => item !== undefined),
		}
	});

	const handleOk = () => {
		const filterItems: FilterItem[] = [
			...splitByWhitespace(params.keyword).map(value => ({
				negative: false,
				value,
			})),
			...splitByWhitespace(params.exclude).map(value => ({
				negative: true,
				value,
			})),
			...params.items.map(item => convertAdvancedSearchItemToFilterItem(item)),
		];
		onChange(stringifyQuery(filterItems));
		onClose();
	}

	// Commend+Enter or Ctrl+Enter to submit
	const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
		if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
			handleOk();
		}
	}

	return <Modal
		title="詳細検索"
		onClose={onClose}
		onKeyDown={handleKeyDown}
		footer={<>
			<Button onClick={handleOk}>検索</Button>
		</>}
	>
		<AdvancedSearchForm value={params} onChange={setParams} />
	</Modal>
}

function convertFilterItemToAdvancedSearchItem(filterItem: FieldFilterItem): AdvancedSearchItem | undefined {
	const operator: AdvancedSearchItemOperator = (() => {
		if (!filterItem.negative) {
			switch (filterItem.operator) {
				case ':': return 'が次のいずれかに一致する';
				case ':>': return 'が次より大きい';
				case ':>=': return 'が次以上';
				case ':<': return 'が次より小さい';
				case ':<=': return 'が次以下';
			}
		}
		switch (filterItem.operator) {
			case ':': return 'が次のいずれでもない';
			case ':>': return 'が次以下';
			case ':>=': return 'が次より小さい';
			case ':<': return 'が次以上';
			case ':<=': return 'が次より大きい';
		}
	})();

	const field = getField(filterItem.fieldKey as FieldName) ?? getFieldBySeq(+filterItem.fieldKey)
	if (!field) return undefined;

	const [value, ...restValues] = filterItem.operator === ':' ? filterItem.value.split(',').filter(Boolean) : [filterItem.value];

	return {
		field: field.name as FieldName,
		operator,
		value,
		restValues,
	}
}

function convertAdvancedSearchItemToFilterItem(item: AdvancedSearchItem): FieldFilterItem {
	const values = (item.restValues ? [item.value, ...item.restValues] : [item.value]).map(value => value.trim()).filter(Boolean);
	switch (item.operator) {
		case 'が次のいずれかに一致する':
			return {
				fieldKey: item.field,
				operator: ':',
				value: values.join(','),
				negative: false,
			} as const;
		case 'が次のいずれでもない':
			return {
				fieldKey: item.field,
				operator: ':',
				value: values.join(','),
				negative: true,
			} as const;
		case 'が次より大きい':
			return {
				fieldKey: item.field,
				operator: ':>',
				value: item.value.trim(),
				negative: false,
			} as const;
		case 'が次以上':
			return {
				fieldKey: item.field,
				operator: ':>=',
				value: item.value.trim(),
				negative: false,
			} as const;
		case 'が次より小さい':
			return {
				fieldKey: item.field,
				operator: ':<',
				value: item.value.trim(),
				negative: false,
			} as const;
		case 'が次以下':
			return {
				fieldKey: item.field,
				operator: ':<=',
				value: item.value.trim(),
				negative: false,
			} as const;
	}
}