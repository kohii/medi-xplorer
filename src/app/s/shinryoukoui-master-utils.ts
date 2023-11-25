import { getNthColorChipColor } from "@/components/color-chip";
import { getCodeLabel } from "@/features/fields/get-code-label";
import { getValue } from "@/features/fields/get-values";
import { Field } from "@/features/fields/types";
import { alphabetToNumber, trimDecimalZero } from "@/utils/text"

export function formatPoint(
	pointType: string,
	pointValue: string,
): string {
	switch (pointType) {
		case "1":
			return `${trimDecimalZero(pointValue)}円`;
		case "3":
			return `${trimDecimalZero(pointValue)}点`;
		case "4":
			return "購入価格";
		case "5":
			return `+${trimDecimalZero(pointValue)}%`;
		case "6":
			return `-${trimDecimalZero(pointValue)}%`;
		case "7":
			return "減点";
		case "8":
			return `-${trimDecimalZero(pointValue)}点`;
		default:
			return "";
	}
}

export function formatCodeValue(row: string[], field: Field) {
	const value = getValue(row, field);
	const label = getCodeLabel(value, field, true);
	return value + ": " + label;
}

export function getKubunBangouColor(value: string) {
	const v = value.substring(0, 1);
	return getNthColorChipColor(alphabetToNumber(v));
}