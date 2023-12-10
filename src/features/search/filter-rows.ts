import { getField } from "@/features/shinryoukoui-master-fields/shinryoukoui-master-fields";
import { isNumeric } from "@/utils/text";

import { getValue } from "../fields/get-values";

import { NormalizedFilterExpression, NormalizedFilterItem } from "./normalize-filter-expression";

const codeField = getField("診療行為コード");
const nameField = getField("診療行為省略名称/省略漢字名称");
const kanaField = getField("診療行為省略名称/省略カナ名称");
const fullnameField = getField("基本漢字名称");

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
  if ("field" in item) {
    const value = getValue(row, item.field);
    if (value == null) return false;
    if (item.operator == ":") return item.listValue.includes(value);

    const numValue = item.field.mode === "numeric" ? +value : null;
    if (numValue != null && item.numValue != null) {
      switch (item.operator) {
        case ":>":
          return numValue > item.numValue;
        case ":<":
          return numValue < item.numValue;
        case ":>=":
          return numValue >= item.numValue;
        case ":<=":
          return numValue <= item.numValue;
      }
    } else {
      switch (item.operator) {
        case ":>":
          return value > item.value;
        case ":<":
          return value < item.value;
        case ":>=":
          return value >= item.value;
        case ":<=":
          return value <= item.value;
      }
    }
  } else {
    if (item.codeValue && getValue(row, codeField) === item.codeValue) {
      return true;
    }
    return getValue(row, nameField).includes(item.fullWidthValue) || getValue(row, fullnameField).includes(item.fullWidthValue) || getValue(row, kanaField).includes(item.kanaValue);
  }
}
