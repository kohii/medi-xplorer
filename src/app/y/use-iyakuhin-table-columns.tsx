import { useMemo } from "react";

import { ColorChip } from "@/components/color-chip";
import { DataTableColumn } from "@/components/data-table";
import { getValue } from "@/features/fields/get-values";
import { getField } from "@/features/iyakuhin-master-fields/iyakuhin-master-fields";

const codeField = getField("医薬品コード");
const nameField = getField("医薬品名・規格名/漢字名称");
const generalNameField = getField("一般名処方の標準的な記載");
const zaikeiField = getField("剤形");
const unitField = getField("単位漢字名称");
const amountField = getField("新又は現金額");
const amountTypeField = getField("新又は現金額/金額種別");
const genericField = getField("後発品");
const selectionField = getField("選定療養区分");
const controlledDrugField = getField("麻薬・毒薬・覚醒剤原料・向精神薬");

function getZaikeiLabel(code: string): string {
  switch (code) {
    case "1": return "内用薬";
    case "3": return "その他";
    case "4": return "注射薬";
    case "6": return "外用薬";
    case "8": return "歯科用薬剤";
    default: return code;
  }
}

function formatYakka(row: string[]): string {
  const amountType = getValue(row, amountTypeField);
  switch (amountType) {
    case "1":
      return `${getValue(row, amountField)}円`;
    case "3":
      return "薬剤使用量省略";
    case "7":
      return "減点";
    default:
      return getValue(row, amountField);
  }
}

function getFeatureLabels(row: string[]): { label: string; color?: "orange" | "blue" | "red" }[] {
  const labels: { label: string; color?: "orange" | "blue" | "red" }[] = [];

  if (getValue(row, genericField) === "1") {
    labels.push({ label: "後発品", color: "orange" });
  }

  switch (getValue(row, selectionField)) {
    case "1":
      labels.push({ label: "選定療養(医療上必要)", color: "blue" });
      break;
    case "2":
      labels.push({ label: "選定療養(患者希望)", color: "blue" });
      break;
  }

  switch (getValue(row, controlledDrugField)) {
    case "1":
      labels.push({ label: "麻薬", color: "red" });
      break;
    case "2":
      labels.push({ label: "毒薬", color: "red" });
      break;
    case "3":
      labels.push({ label: "覚醒剤原料", color: "red" });
      break;
    case "5":
      labels.push({ label: "向精神薬", color: "red" });
      break;
  }

  return labels;
}

export function useIyakuhinTableColumns() {
  return useMemo<DataTableColumn[]>(() => {
    return [
      {
        id: "code",
        name: "医薬品コード",
        width: 130,
        value: (row) => getValue(row, codeField),
      },
      {
        id: "name",
        name: "医薬品名・規格名",
        width: 320,
        value: (row) => getValue(row, nameField),
      },
      {
        id: "general-name",
        name: "一般名",
        width: 320,
        value: (row) => getValue(row, generalNameField).trim(),
      },
      {
        id: "zaikei",
        name: "剤形",
        width: 120,
        value: (row) => getZaikeiLabel(getValue(row, zaikeiField)),
      },
      {
        id: "unit",
        name: "単位",
        width: 80,
        value: (row) => getValue(row, unitField),
      },
      {
        id: "amount",
        name: "薬価",
        width: 140,
        value: formatYakka,
      },
      {
        id: "features",
        name: "特徴",
        width: 260,
        value: (row) => getFeatureLabels(row).map((feature) => feature.label).join(" "),
        styledValue: (row) => {
          const features = getFeatureLabels(row);
          if (features.length === 0) return "";
          return (
            <div className="flex items-center gap-1 overflow-hidden">
              {features.map((feature) => (
                <ColorChip key={feature.label} color={feature.color}>
                  {feature.label}
                </ColorChip>
              ))}
            </div>
          );
        },
      },
    ];
  }, []);
}
