import { FieldKey, ComparisonOperator, ParseResult, LogicalOperator } from "./types";

export type Token = {
	kind: "SPACE";
} | {
	kind: "KEY";
	value: FieldKey;
} | {
	kind: "COMPARISON_OPERATOR";
	value: ComparisonOperator;
} | {
	kind: "LOGICAL_OPERATOR";
	value: LogicalOperator;
} | {
	kind: "VALUE";
	value: string;
} | {
	kind: "LPAREN";
} | {
	kind: "RPAREN";
}


export function tokenize(text: string): ParseResult<Token[]> {
	let tokens: Token[] = [];
	let index = 0;

	while (index < text.length) {
		const char = text[index];

		switch (char) {
			case " ":
				tokens.push({ kind: "SPACE" });
				index++;
				break;
			case "(":
				tokens.push({ kind: "LPAREN" });
				index++;
				break;
			case ")":
				tokens.push({ kind: "RPAREN" });
				index++;
				break;
			case '"':
				const stringValueResult = parseStringValue(text, index);
				if (stringValueResult.kind === "ERROR") {
					return stringValueResult;
				}
				tokens.push({ kind: "VALUE", value: stringValueResult.value });
				index = stringValueResult.newIndex;
				break;
			default:
				const keyResult = parseFieldKey(text, index);
				if (keyResult.kind === "ERROR") {
					return keyResult;
				}
				tokens.push({ kind: "KEY", value: keyResult.value });
				index = keyResult.newIndex;
		}
	}

	return {
		kind: "SUCCESS",
		value: tokens
	};
}

function parseStringValue(text: string, startIndex: number): ParseResult<string> & { newIndex: number } {
	let index = startIndex + 1;
	let value = "";

	while (index < text.length) {
		const char = text[index];

		switch (char) {
			case '"':
				return {
					kind: "SUCCESS",
					value,
					newIndex: index + 1
				};
			default:
				value += char;
				index++;
		}
	}

	return {
		kind: "ERROR",
		message: "Unmatched double quote",
		newIndex: index
	};
}

function parseFieldKey(text: string, startIndex: number): ParseResult<FieldKey> & { newIndex: number } {
	let index = startIndex;
	let value = "";

	while (index < text.length) {
		const char = text[index];

		switch (char) {
			case " ":
			case "(":
			case ")":
				return {
					kind: "SUCCESS",
					value,
					newIndex: index
				};
			default:
				value += char;
				index++;
		}
	}

	return {
		kind: "SUCCESS",
		value,
		newIndex: index
	};
}
