import { getFieldBySeq, getField, FieldName } from "@/features/shinryoukoui-master-fields/shinryoukoui-master-fields";
import { isNumeric, toHalfWidthKatakana, toKatakana, toHalfWidth, toFullWidth, isHalfWidth } from "@/utils/text";

import { Field } from "../fields/types";

import { FieldFilterItem, KeywordFilterItem, FilterExpression, ParseResult } from "./types";

type NormalizedFieldFilterItem = FieldFilterItem & {
  field: Field;
  listValue: string[];
  numValue: number | null;
}

export type NormalizedKeywordFilterItem = KeywordFilterItem & {
  fullWidthValue: string;
  kanaValue: string | null;
  codeValue: string | null;
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
      const halfWidthValue = toHalfWidth(item.value);
      const kanaValue = toHalfWidthKatakana(toKatakana(halfWidthValue)).toUpperCase();
      const codeValue = halfWidthValue.length === 9 && isNumeric(halfWidthValue) ? halfWidthValue : null;
      result.push({
        // text to search in 省略漢字名称
        fullWidthValue: toFullWidth(item.value),
        // text to search in 省略カナ名称
        kanaValue: isHalfWidth(kanaValue) ? kanaValue : null,
        // text to search in 診療行為コード
        codeValue,
        ...item,
      });
    }
  });
  return { kind: "SUCCESS", value: result };
}
