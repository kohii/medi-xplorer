import { FilterExpression, FilterExpressionText, Operator, ParseResult } from "./types";

export function parseQuery(text: FilterExpressionText): ParseResult<FilterExpression> {
	text = text.trim();
	if (!text) {
		return { kind: "SUCCESS", value: [] };
	}

	const items = text.split(/\s+/).filter(Boolean); // スペースで分割
	const expression: FilterExpression = [];

	for (const item of items) {
		const negative = item.startsWith('-');
		const adjustedItem = negative ? item.substring(1) : item;

		const fieldMatch = adjustedItem.match(/([^:]+)(:|:>|:<|:>=|:<=)(.+)/);
		if (fieldMatch) {
			const [_, fieldKey, operator, value] = fieldMatch;
			expression.push({
				operator: operator as Operator,
				fieldKey,
				value,
				negative
			});
		} else {
			expression.push({
				value: adjustedItem,
				negative
			});
		}
	}

	return { kind: "SUCCESS", value: expression };
}
