import { getCodeLabel } from "@/features/fields/get-code-label";
import { getValue } from "@/features/fields/get-values";
import { Field } from "@/features/fields/types";
import { getField } from "@/features/iyakuhin-master-fields/iyakuhin-master-fields";
import { formatDate } from "@/utils/format-data";

const codeField = getField("医薬品コード");
const nameField = getField("医薬品名・規格名/漢字名称");
const generalNameField = getField("一般名処方の標準的な記載");
const amountTypeField = getField("新又は現金額/金額種別");
const selectedTreatmentField = getField("選定療養区分");
const longTermListedField = getField("長期収載品関連");
const unifiedNameField = getField("商品名等関連");
const plainDrugField = getField("麻薬・毒薬・覚醒剤原料・向精神薬");
const neuroDestructiveField = getField("神経破壊剤");
const biologicalField = getField("生物学的製剤");
const dentalField = getField("歯科特定薬剤");
const contrastField = getField("造影（補助）剤");
const antihivField = getField("抗ＨＩＶ薬区分");
const yoyakuDateField = getField("薬価基準収載年月日");
const graceDateField = getField("経過措置年月日又は商品名医薬品コード使用期限");

export function formatCodeValue(row: string[], field: Field): string {
  const value = getValue(row, field);
  const label = getCodeLabel(row, field, true);
  return `${value}: ${label ?? "-"}`;
}

export function formatYakka(rawValue: string): string {
  if (!rawValue || rawValue === "0") return "-";
  return `${rawValue}円`;
}

export function formatOptionalDate(rawValue: string): string {
  if (!hasOptionalDateValue(rawValue)) return "-";
  return formatDate(rawValue);
}

export function hasOptionalDateValue(rawValue: string): boolean {
  return rawValue !== "" && rawValue !== "0" && rawValue !== "99999999";
}

export function getShortListingLabel(code: string): string {
  switch (code) {
    case "1":
      return "局方品";
    case "2":
      return "局方品・生物学的製剤基準";
    case "3":
      return "局方品・生薬";
    case "6":
      return "生物学的製剤基準";
    case "7":
      return "生薬";
    case "8":
      return "統一名収載品";
    default:
      return "-";
  }
}

export function getSelectionCategoryLabel(code: string): string {
  switch (code) {
    case "1":
      return "医療上必要があると認める場合等";
    case "2":
      return "患者希望";
    default:
      return "-";
  }
}

export function getRelatedUnifiedNameRow(
  row: string[],
  getRowByCode: (code: string) => string[] | undefined,
): string[] | undefined {
  const code = getValue(row, unifiedNameField);
  return code !== "0" ? getRowByCode(code) : undefined;
}

export function getRelatedSelectionRows(
  row: string[],
  allRows: string[][],
  getRowByCode: (code: string) => string[] | undefined,
): string[][] {
  const selectionCategory = getValue(row, selectedTreatmentField);
  if (selectionCategory === "2") {
    const relatedCode = getValue(row, longTermListedField);
    const relatedRow = relatedCode !== "0" ? getRowByCode(relatedCode) : undefined;
    return relatedRow ? [relatedRow] : [];
  }

  if (selectionCategory === "1") {
    const code = getValue(row, codeField);
    return allRows.filter((candidateRow) => {
      return getValue(candidateRow, longTermListedField) === code;
    });
  }

  return [];
}

export function hasBunruiKisei(row: string[]): boolean {
  return getValue(row, plainDrugField) !== "0" ||
    getValue(row, neuroDestructiveField) !== "0" ||
    getValue(row, biologicalField) !== "0" ||
    getValue(row, dentalField) !== "0" ||
    getValue(row, contrastField) !== "0" ||
    getValue(row, antihivField) !== "0";
}

export function getIyakuhinBasicTabSummary(row: string[]) {
  const code = getValue(row, codeField);
  const kanjiMeisho = getValue(row, nameField);
  const kihonKanjiMeisho = getValue(row, getField("基本漢字名称"));
  const kinyuShubetsu = getValue(row, amountTypeField);
  const kyuKinyuShubetsu = getValue(row, getField("旧金額/金額種別"));
  const chushaYoryo = getValue(row, getField("注射容量"));
  const ippanmeiKisai = getValue(row, generalNameField).trim();
  const senryouyouKubun = getValue(row, selectedTreatmentField);
  const shouhinmeiTouKanren = getValue(row, unifiedNameField);
  const yakkaKijunShuusaiDate = getValue(row, yoyakuDateField);
  const keikaSochiDate = getValue(row, graceDateField);

  return {
    code,
    kanjiMeisho,
    kihonKanjiMeisho,
    kinyuShubetsu,
    kyuKinyuShubetsu,
    chushaYoryo,
    ippanmeiKisai,
    senryouyouKubun,
    shouhinmeiTouKanren,
    yakkaKijunShuusaiDate,
    keikaSochiDate,
  } as const;
}
