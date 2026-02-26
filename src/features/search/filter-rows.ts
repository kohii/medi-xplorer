import { DEFAULT_MASTER_ID, MasterId } from "@/master-types";

import { getValue } from "../fields/get-values";
import { getField as getIyakuField } from "../iyaku-master-fields/iyaku-master-fields";
import { getField as getShinryoukouiField } from "../shinryoukoui-master-fields/shinryoukoui-master-fields";

import { NormalizedFilterExpression, NormalizedFilterItem } from "./normalize-filter-expression";

const shinryoukouiSearchFields = {
  codeField: getShinryoukouiField("診療行為コード"),
  nameField: getShinryoukouiField("診療行為省略名称/省略漢字名称"),
  kanaField: getShinryoukouiField("診療行為省略名称/省略カナ名称"),
  fullnameField: getShinryoukouiField("基本漢字名称"),
};

const iyakuSearchFields = {
  codeField: getIyakuField("医薬品コード"),
  nameField: getIyakuField("医薬品名・規格名/漢字名称"),
  kanaField: getIyakuField("医薬品名・規格名/カナ名称"),
  fullnameField: getIyakuField("医薬品名・規格名/漢字名称"),
};

export function filterShinryoukouiRows(
  rows: string[][],
  expression: NormalizedFilterExpression,
  masterId: MasterId = DEFAULT_MASTER_ID,
): string[][] {
  const searchFields = masterId === "y" ? iyakuSearchFields : shinryoukouiSearchFields;
  return rows.filter(row => {
    for (const item of expression) {
      const r = filterShinryoukouiRow(row, item, searchFields);
      if (item.negative ? r : !r) {
        return false;
      }
    }
    return true;
  });
}

export function filterShinryoukouiRow(
  row: string[],
  item: NormalizedFilterItem,
  fields = shinryoukouiSearchFields,
): boolean {
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
    if (item.codeValue && getValue(row, fields.codeField!) === item.codeValue) {
      return true;
    }
    if (item.kanaValue && getValue(row, fields.kanaField!).includes(item.kanaValue)) {
      return true;
    }
    return (
      getValue(row, fields.nameField!).includes(item.fullWidthValue) ||
      getValue(row, fields.fullnameField!).includes(item.fullWidthValue)
    );
  }
}
