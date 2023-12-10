import { getValue } from "@/features/fields/get-values";
import { VirtualField } from "@/features/fields/virtual-field";
import { trimLeadingZero } from "@/utils/text";

import { getField } from "./shinryoukoui-master-fields";
import { formatPoint, getAgeRangeLabel } from "./shinryoukoui-master-utils";


const fields = {
  "コード表用番号（アルファベット部）": getField("コード表用番号（アルファベット部）"),
  "コード表用番号（アルファベット部を除く）/区分番号": getField("コード表用番号（アルファベット部を除く）/区分番号"),
  "コード表用番号（アルファベット部を除く）/枝番": getField("コード表用番号（アルファベット部を除く）/枝番"),
} as const;

export const shinryoukouiMasterVirtualFields = {
  "区分番号": {
    name: "区分番号",
    value(row: string[]) {
      const alphabet = getValue(row, fields["コード表用番号（アルファベット部）"]);
      if (alphabet === "-" || alphabet === "*") {
        return "-";
      }
      const kubun = getValue(row, fields["コード表用番号（アルファベット部を除く）/区分番号"]);
      const edaban = getValue(row, fields["コード表用番号（アルファベット部を除く）/枝番"]);
      return `${alphabet}${kubun}-${edaban}`;
    }
  },
  "新又は現点数": {
    name: "新又は現点数",
    value(row: string[]) {
      return formatPoint(
        getValue(row, getField("新又は現点数/点数識別")),
        getValue(row, getField("新又は現点数/新又は現点数")),
      );
    },
  },
  "旧点数": {
    name: "旧点数",
    value(row: string[]) {
      return formatPoint(
        getValue(row, getField("旧点数/点数識別")),
        getValue(row, getField("旧点数/旧点数")),
      );
    },
  },
  "上下限年齢": {
    name: "上下限年齢",
    value(row: string[]) {
      const lowerAgeField = getField("上下限年齢/下限年齢");
      const upperAgeField = getField("上下限年齢/上限年齢");
      const lower = getValue(row, lowerAgeField);
      const upper = getValue(row, upperAgeField);
      return getAgeRangeLabel(lower, upper);
    },
  },
  "上限回数": {
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
