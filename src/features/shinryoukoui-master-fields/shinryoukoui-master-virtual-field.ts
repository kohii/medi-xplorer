import { getValue } from "@/features/fields/get-values";
import { VirtualField } from "@/features/fields/virtual-field";

import { getField } from "./shinryoukoui-master-fields";
import { formatPoint, getAgeRangeLabel, getKubunBangouColor } from "./shinryoukoui-master-utils";


const fields = {
  "コード表用番号（アルファベット部）": getField("コード表用番号（アルファベット部）"),
  "コード表用番号（アルファベット部を除く）/区分番号": getField("コード表用番号（アルファベット部を除く）/区分番号"),
  "コード表用番号（アルファベット部を除く）/枝番": getField("コード表用番号（アルファベット部を除く）/枝番"),
} as const;

export const shinryoukouiMasterVirtualFields = {
  kubunNo: {
    name: "区分番号",
    value(row: string[]) {
      const alphabet = getValue(row, fields["コード表用番号（アルファベット部）"]);
      if (alphabet === "-" || alphabet === "*") {
        return "-";
      }
      const kubun = getValue(row, fields["コード表用番号（アルファベット部を除く）/区分番号"]);
      const edaban = getValue(row, fields["コード表用番号（アルファベット部を除く）/枝番"]);
      return `${alphabet}${kubun}-${edaban}`;
    },
    colorize(value: string) {
      return getKubunBangouColor(value);
    },
    columnWidth: 92,
  },
  point: {
    name: "点数",
    value(row: string[]) {
      return formatPoint(
        getValue(row, getField("新又は現点数/点数識別")),
        getValue(row, getField("新又は現点数/新又は現点数")),
      );
    },
    columnWidth: 92,
  },
  prevPoint: {
    name: "旧点数",
    value(row: string[]) {
      return formatPoint(
        getValue(row, getField("旧点数/点数識別")),
        getValue(row, getField("旧点数/旧点数")),
      );
    },
    columnWidth: 92,
  },
  ageRange: {
    name: "上下限年齢",
    value(row: string[]) {
      const lowerAgeField = getField("上下限年齢/下限年齢");
      const upperAgeField = getField("上下限年齢/上限年齢");
      const lower = getValue(row, lowerAgeField);
      const upper = getValue(row, upperAgeField);
      return getAgeRangeLabel(lower, upper);
    },
  },
  limitCount: {
    name: "上限回数",
    value(row: string[]) {
      const value = getValue(row, getField("上限回数/上限回数"));
      if (value == "0") return "無制限";
      const count = `${value}回`;

      const errorPattern = getValue(row, getField("上限回数/上限回数エラー処理"));
      const error = errorPattern == "1" ? "上限回数を算定" : "上限回数を確認";

      return `${count} (超えた場合、${error})`;
    },
  }
} satisfies Record<string, VirtualField>;

export type ShinryoukouiMasterVirtualFieldId = keyof typeof shinryoukouiMasterVirtualFields;

export function getShinryoukouiMasterVirtualField(id: ShinryoukouiMasterVirtualFieldId): VirtualField {
  return shinryoukouiMasterVirtualFields[id];
}