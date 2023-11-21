import { getFieldBySeq, getField, FieldName } from "@/app/s/shinryoukoui-master-fields";
import { isNumeric, toHalfWidthKatakana, toKatakana, toHalfWidth } from "@/utils/text";
import { Field } from "../fields/types";
import { FieldFilterItem, KeywordFilterItem, FilterExpression, ParseResult } from "./types";

type NormalizedFieldFilterItem = FieldFilterItem & {
	field: Field;
	listValue: string[];
	numValue: number | null;
}

export type NormalizedKeywordFilterItem = KeywordFilterItem & {
	kanaValue: string;
}

export type NormalizedFilterItem = NormalizedFieldFilterItem | NormalizedKeywordFilterItem;

export type NormalizedFilterExpression = NormalizedFilterItem[];

export function normalizeFilterExpression(
	expression: FilterExpression,
): ParseResult<NormalizedFilterExpression> {
	const result: NormalizedFilterExpression = [];
	expression.forEach((item) => {
		if ('fieldKey' in item) {
			const key = (item as FieldFilterItem).fieldKey;
			const field = isNumeric(key) ? getFieldBySeq(+key) : getField(key as FieldName);
			if (!field) {
				return { kind: "ERROR", message: `Unknown field: ${key}` };
			}
			result.push({
				field,
				listValue: item.value.split(','),
				numValue: isNumeric(item.value) ? +item.value : null,
				...item,
			});
		} else {
			result.push({
				kanaValue: toHalfWidthKatakana(toKatakana(toHalfWidth(item.value))),
				...item,
			});
		}
	});
	return { kind: "SUCCESS", value: result };
}
