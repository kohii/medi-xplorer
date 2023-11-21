import { Field } from "./types";

type FieldValueProps = {
	field: Field;
	value: string;
};

export function FieldValue({ field, value }: FieldValueProps) {
	if (field.mode === 'date') {
		if (!value || value === '0') {
			return "-";
		}
		return value.substring(0, 4) + "-" + value.substring(4, 6) + "-" + value.substring(6, 8);
	}

	if (field.codes) {
		const code = field.codes.find(code => code.code === value);
		if (code) {
			return <>
				{value}{" "}
				<span className="text-gray-400">
					{code.name}
				</span>
			</>
		}
	}

	return value;
}
