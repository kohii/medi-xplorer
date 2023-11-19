import { Field } from "./types";

export function getValue(
	row: string[],
	field: Field,
): string | undefined {
	return row[field.seq - 1];
}

export function getValues(
	row: string[],
	fields: Field[],
): string[] {
	return fields.map(field => row[field.seq - 1]);
}