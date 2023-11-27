import { getValue } from "./get-values";
import { Field } from "./types";

export function getCodeLabel(
	row: string[],
	field: Field,
	preferAlias = false,
): string | undefined {
	if (field.codes) {
		const value = getValue(row, field);
		const code = field.codes.find(code => {
			if (code.code !== value) return false;
			if (!code.condition) return true;
			return code.condition.value.includes(row[code.condition.seq]);
		});
		if (code) {
			return preferAlias && code.alias ? code.alias : code.name;
		}
	}
	return undefined;
}