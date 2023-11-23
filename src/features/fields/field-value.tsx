import { getValue } from "./get-values";
import { Field } from "./types";
import { formatDate } from "@/utils/format-data";

type FieldValueProps = {
	field: Field;
	row: string[];
};

export function FieldValue({ field, row }: FieldValueProps) {
	const value = getValue(row, field);
	if (field.mode === 'date') {
		return formatDate(value);
	}

	if (field.codes) {
		const code = field.codes.find(code => (
			code.code === value && (
				!code.condition ||
				code.condition.value.includes(row[code.condition.seq - 1])
			)
		));
		if (code) {
			return <>
				{value}{" "}
				<span className="text-gray-400">
					: {code.name}
				</span>
			</>
		}
	}

	return value;
}
