import { DEFAULT_MASTER_ID, MasterId } from "@/master-types";
import { splitByWhitespace } from "@/utils/text";

import {
  getFieldBySeq as getIyakuhinFieldBySeq,
  getFieldOrUndefined as getIyakuhinFieldOrUndefined,
} from "../iyakuhin-master-fields/iyakuhin-master-fields";
import {
  getFieldBySeq as getShinryoukouiFieldBySeq,
  getFieldOrUndefined as getShinryoukouiFieldOrUndefined,
} from "../shinryoukoui-master-fields/shinryoukoui-master-fields";

import { FilterExpression, FilterExpressionText, Operator, ParseResult } from "./types";

export function parseQuery(
  text: FilterExpressionText,
  masterId: MasterId = DEFAULT_MASTER_ID,
): ParseResult<FilterExpression> {
  text = text.trim();
  if (!text) {
    return { kind: "SUCCESS", value: [] };
  }

  const getFieldOrUndefined =
    masterId === "y" ? getIyakuhinFieldOrUndefined : getShinryoukouiFieldOrUndefined;
  const getFieldBySeq = masterId === "y" ? getIyakuhinFieldBySeq : getShinryoukouiFieldBySeq;

  const items = splitByWhitespace(text);
  const expression: FilterExpression = [];

  for (const item of items) {
    const negative = item.startsWith("-") && item.length > 1;
    const adjustedItem = negative ? item.substring(1) : item;

    const fieldMatch = adjustedItem.match(/([^:]+)(:>=?|:<=?|:)(.*)/);
    if (fieldMatch) {
      const [_, fieldKey, operator, value] = fieldMatch;
      if (getFieldOrUndefined(fieldKey) !== undefined || getFieldBySeq(+fieldKey) !== undefined) {
        expression.push({
          operator: operator as Operator,
          fieldKey,
          value,
          negative,
        });
        continue;
      }
    }
    expression.push({
      value: adjustedItem,
      negative,
    });
  }

  return { kind: "SUCCESS", value: expression };
}
