import { ColorChip } from "@/components/color-chip";
import { getValue } from "@/features/fields/get-values";
import { VirtualField } from "@/features/fields/virtual-field";

import { getField } from "./iyakuhin-master-fields";

const fields = {
  amount: getField("新又は現金額"),
  amountType: getField("新又は現金額/金額種別"),
  generic: getField("後発品"),
  selection: getField("選定療養区分"),
  controlledDrug: getField("麻薬・毒薬・覚醒剤原料・向精神薬"),
} as const;

type IyakuhinFeature = {
  label: string;
  color?: "orange" | "blue" | "red";
};

export function formatIyakuhinYakka(row: string[]): string {
  const amountType = getValue(row, fields.amountType);
  switch (amountType) {
    case "1":
      return `${getValue(row, fields.amount)}円`;
    case "3":
      return "薬剤使用量省略";
    case "7":
      return "減点";
    default:
      return getValue(row, fields.amount);
  }
}

export function getIyakuhinFeatures(row: string[]): IyakuhinFeature[] {
  const features: IyakuhinFeature[] = [];

  if (getValue(row, fields.generic) === "1") {
    features.push({ label: "後発品", color: "orange" });
  }

  switch (getValue(row, fields.selection)) {
    case "1":
      features.push({ label: "選定療養(医療上必要)", color: "blue" });
      break;
    case "2":
      features.push({ label: "選定療養(患者希望)", color: "blue" });
      break;
  }

  switch (getValue(row, fields.controlledDrug)) {
    case "1":
      features.push({ label: "麻薬", color: "red" });
      break;
    case "2":
      features.push({ label: "毒薬", color: "red" });
      break;
    case "3":
      features.push({ label: "覚醒剤原料", color: "red" });
      break;
    case "5":
      features.push({ label: "向精神薬", color: "red" });
      break;
  }

  return features;
}

export const iyakuhinMasterVirtualFields = {
  yakka: {
    name: "薬価",
    value: formatIyakuhinYakka,
    columnWidth: 140,
  },
  features: {
    name: "特徴",
    value(row: string[]) {
      return getIyakuhinFeatures(row)
        .map((feature) => feature.label)
        .join(" ");
    },
    render(row: string[]) {
      const features = getIyakuhinFeatures(row);
      if (features.length === 0) {
        return "";
      }
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
    columnWidth: 260,
  },
} satisfies Record<string, VirtualField>;

export type IyakuhinMasterVirtualFieldId = keyof typeof iyakuhinMasterVirtualFields;

export function getIyakuhinMasterVirtualField(
  id: IyakuhinMasterVirtualFieldId,
): VirtualField {
  return iyakuhinMasterVirtualFields[id];
}
