import { formatDate } from "@/utils/format-data";

import { getCodeLabel } from "./get-code-label";
import { getValue } from "./get-values";
import { Field } from "./types";

type FieldValueProps = {
	field: Field;
	row: string[];
	raw?: boolean;
};

export function FieldValue({ field, row, raw }: FieldValueProps) {
  const value = getValue(row, field);
  if (!raw && field.mode === "date") {
    return formatDate(value);
  }

  if (field.codes) {
    const label = getCodeLabel(row, field);
    if (label) {
      return (
        <>
          {value}{" "}
          <span className="text-gray-400">
						: {label}
          </span>
        </>
      );
    }
  }

  return value;
}
