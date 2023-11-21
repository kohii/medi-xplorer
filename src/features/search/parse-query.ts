import { Token, tokenize } from "./tokenize";
import { FilterExpressionText, ParseResult, FilterExpressionTree, FieldKey, FilterExpression, ComparisonOperator, FilterItem, Operator, LogicalOperator } from "./types";

export function parseQuery(text: FilterExpressionText): ParseResult<FilterExpressionTree> {
	const tokens = tokenize(text);
	if (tokens.kind === "ERROR") {
		return tokens;
	}
	const result = parseExpression(tokens.value);
	if (result.kind === "SUCCESS") {
		return result;
	} else {
		return result;
	}
}

function parseExpression(tokens: Token[]): ParseResult<FilterExpressionTree> {
	let pos = 0; // Current position in the token array

	function parseToken(): FilterExpression | null {
		if (pos >= tokens.length) {
			return null;
		}

		let token = tokens[pos];

		switch (token.kind) {
			case "LOGICAL_OPERATOR":
				const logicalOp: LogicalOperator = token.value;
				pos++;
				const items: FilterExpression[] = [];
				while (true) {
					const expr = parseToken();
					if (!expr) break;
					items.push(expr);
				}
				if (logicalOp === "NOT") {
					return { operator: logicalOp, item: items[0] };
				}
				return { operator: logicalOp, items: items };

			case "LPAREN":
				pos++;
				const subExpr = parseToken();
				if (tokens[pos]?.kind === "RPAREN") {
					pos++; // consume RPAREN
					return subExpr;
				}
				return null;

			case "KEY":
				const field = token.value;
				pos++;
				let tokenAtPos = tokens[pos];
				if (tokenAtPos && tokenAtPos.kind === "COMPARISON_OPERATOR") {
					const op = tokenAtPos.value as ComparisonOperator;
					pos++;
					tokenAtPos = tokens[pos];
					if (tokenAtPos && tokenAtPos.kind === "VALUE") {
						const value = tokenAtPos.value;
						pos++;
						return { operator: op, field: field, value: value };
					}
				}
				return null;

			default:
				pos++;
				return null;
		}
	}

	const result = [];
	while (pos < tokens.length) {
		const expr = parseToken();
		if (expr) {
			result.push(expr);
		} else {
			break;
		}
	}

	if (result.length > 0) {
		return { kind: "SUCCESS", value: result };
	} else {
		return { kind: "ERROR", message: "Invalid expression" };
	}
}
