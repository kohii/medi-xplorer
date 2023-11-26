import { FieldFilterItem, FilterExpression, FilterExpressionText } from "./types";

export function stringifyQuery(filterExpression: FilterExpression): FilterExpressionText {
	return filterExpression.map((item) => {
		if ("fieldKey" in item) {
			return `${item.negative ? "-" : ""}${item.fieldKey}${item.operator}${item.value}`;
		} else {
			return `${item.negative ? "-" : ""}${item.value}`;
		}
	}).join(" ");
}