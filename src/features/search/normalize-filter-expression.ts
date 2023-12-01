import { getFieldBySeq, getField, FieldName } from "@/features/shinryoukoui-master-fields/shinryoukoui-master-fields";
import { isNumeric, toHalfWidthKatakana, toKatakana, toHalfWidth, toFullWidth } from "@/utils/text";

import { Field } from "../fields/types";

import { FieldFilterItem, KeywordFilterItem, FilterExpression, ParseResult } from "./types";

type NormalizedFieldFilterItem = FieldFilterItem & {
	field: Field;
	listValue: string[];
	numValue: number | null;
}

export type NormalizedKeywordFilterItem = KeywordFilterItem & {
	fullWidthValue: string;
	kanaValue: string;
}

export type NormalizedFilterItem = NormalizedFieldFilterItem | NormalizedKeywordFilterItem;

export type NormalizedFilterExpression = NormalizedFilterItem[];

export function normalizeFilterExpression(
	expression: FilterExpression,
): ParseResult<NormalizedFilterExpression> {
	const result: NormalizedFilterExpression = [];
	expression.forEach((item) => {
		if ("fieldKey" in item) {
			const key = (item as FieldFilterItem).fieldKey;
			const field = isNumeric(key) ? getFieldBySeq(+key) : getField(key as FieldName);
			if (!field) {
				return { kind: "ERROR", message: `Unknown field: ${key}` };
			}
			result.push({
				field,
				listValue: item.value.split(","),
				numValue: isNumeric(item.value) ? +item.value : null,
				...item,
			});
		} else {
			result.push({
				// text to search in 省略カナ名称
				fullWidthValue: toFullWidth(item.value),
				kanaValue: toHalfWidthKatakana(toKatakana(toHalfWidth(item.value))).toUpperCase(),
				...item,
			});
		}
	});
	return { kind: "SUCCESS", value: result };
}
