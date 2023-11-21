import { isNumeric, toHalfWidth, toHalfWidthKatakana, toKatakana } from "@/utils/text";
import { getValue } from "../fields/get-values";
import { FieldName, getField } from "@/app/s/shinryoukoui-master-fields";
import { NormalizedFilterExpression, NormalizedFilterItem } from "./normalize-filter-expression";

const codeField = getField("診療行為コード")!;
const nameField = getField("診療行為省略名称/省略漢字名称")!;
const kanaField = getField("診療行為省略名称/省略カナ名称")!;

export function filterShinryoukouiRows(rows: string[][], expression: NormalizedFilterExpression): string[][] {
	return rows.filter(row => {
		for (const item of expression) {
			const r = filterShinryoukouiRow(row, item);
			if (item.negative ? r : !r) {
				return false;
			}
		}
		return true;
	});
}

export function filterShinryoukouiRow(row: string[], item: NormalizedFilterItem): boolean {
	if ('field' in item) {
		const value = getValue(row, item.field);
		if (value == null) return false;

		switch (item.operator) {
			case ':':
				return item.listValue.includes(value);
			case ':>':
				return value > item.value;
			case ':<':
				return value < item.value;
			case ':>=':
				return value >= item.value;
			case ':<=':
				return value <= item.value;
		}
	} else {
		if (isNumeric(item.kanaValue) && getValue(row, codeField).startsWith(item.kanaValue)) {
			return true;
		}
		return getValue(row, nameField).includes(item.value) || getValue(row, kanaField).includes(item.kanaValue);
	}
}
