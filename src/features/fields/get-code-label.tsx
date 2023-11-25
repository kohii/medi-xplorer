import { Field } from "./types";

export function getCodeLabel(
	value: string,
	field: Field,
	preferAlias = false,
): string | undefined {
	if (field.codes) {
		const code = field.codes.find(code => (
			code.code === value && (
				!code.condition ||
				code.condition.value.includes(value)
			)
		));
		if (code) {
			return preferAlias && code.alias ? code.alias : code.name;
		}
	}
	return undefined;
}