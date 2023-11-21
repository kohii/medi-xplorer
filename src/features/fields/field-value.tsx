import { getField } from "@/app/s/shinryoukoui-master-fields";
import { getValue } from "./get-values";
import { Field } from "./types";

type FieldValueProps = {
	field: Field;
	row: string[];
};

export function FieldValue({ field, row }: FieldValueProps) {
	const value = getValue(row, field);
	if (field.mode === 'date') {
		if (!value || value === '0') {
			return "-";
		}
		return value.substring(0, 4) + "-" + value.substring(4, 6) + "-" + value.substring(6, 8);
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
