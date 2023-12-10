import { getNthColorChipColor } from "@/components/color-chip";
import { getCodeLabel } from "@/features/fields/get-code-label";
import { getValue } from "@/features/fields/get-values";
import { Field } from "@/features/fields/types";
import { alphabetToNumber, toHalfWidth, trimDecimalZero, trimLeadingZero } from "@/utils/text";

import { FieldName, getField } from "./shinryoukoui-master-fields";

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
  const label = getCodeLabel(row, field, true);
  return value + ": " + label;
}

export function getKubunBangouColor(value: string) {
  const v = value.substring(0, 1);
  return getNthColorChipColor(alphabetToNumber(v));
}

/** 点数欄集計先識別のラベルを取得 */
export function getTensuuranShuukeisakiShikibetsuLabel(value: string) {
  switch (value) {
    case "110": return "110: 初診";
    case "120": return "120: 再診（再診・外来診療料）";
    case "122": return "122: 再診（外来管理加算）";
    case "123": return "123: 再診（時間外）";
    case "124": return "124: 再診（休日）";
    case "125": return "125: 再診（深夜）";
    case "130": return "130: 医学管理";
    case "140": return "140: 在宅";
    case "210": return "210: 投薬（内服・頓服調剤）（入院外）";
    case "230": return "230: 投薬（外用調剤）（入院外）";
    case "240": return "240: 投薬（調剤）（入院）";
    case "250": return "250: 投薬（処方）";
    case "260": return "260: 投薬（麻毒）";
    case "270": return "270: 投薬（調基）";
    case "300": return "300: 注射（生物学的製剤・精密持続点滴・麻薬・外来化学療法加算）";
    case "311": return "311: 注射（皮下筋肉内）";
    case "321": return "321: 注射（静脈内）";
    case "331": return "331: 注射（その他）";
    case "400": return "400: 処置";
    case "500": return "500: 手術（手術）";
    case "502": return "502: 手術（輸血）";
    case "540": return "540: 麻酔";
    case "600": return "600: 検査・病理診断";
    case "700": return "700: 画像診断";
    case "800": return "800: その他";
    case "903": return "903: 入院基本料";
    case "920": return "920: 特定入院料・その他";
    case "970": return "970: 入院時食事療養";
    case "971": return "971: 入院時食事療養（標準負担額）";
    case "972": return "972: 生活療養食事療養";
    case "973": return "973: 生活療養食事療養（標準負担額）";
    case "974": return "974: 生活療養環境療養";
    case "975": return "975: 生活療養環境療養（標準負担額）";
  }
  return "";
}

const ageCodeLabels = {
  "AA": "生後２８日",
  "AE": "生後９０日",
  "B3": "３歳に達した日の翌月の１日",
  "B6": "６歳に達した日の翌月の１日",
  "MG": "未就学児",
  "BF": "１５歳に達した日の翌月の１日",
  "BK": "２０歳に達した日の翌月の１日",
};

const getAgeCodeLabel = (code: string) => ageCodeLabels[code as keyof typeof ageCodeLabels];

export function getAgeRangeLabel(lower: string, upper: string) {
  const lowerLabel = lower === "00" ? "" : (getAgeCodeLabel(lower) ?? `${trimLeadingZero(lower)}歳以上`);
  const upperLabel = upper === "00" ? "" : (getAgeCodeLabel(upper) ?? `${trimLeadingZero(upper)}歳未満`);
  if (!lowerLabel && !upperLabel) {
    return "-";
  }

  return `${lowerLabel}～${upperLabel}`;
}

export function getAgeAdditionalFeeData(row: string[]): {
  age: string;
  code: string;
}[] {
  const get = (key: "①" | "②" | "③" | "④") => {
    const code = getValue(row, getField(`年齢加算${key}/注加算診療行為コード`));
    if (code === "0") {
      return undefined;
    }
    const lower = getValue(row, getField(`年齢加算${key}/下限年齢`));
    const upper = getValue(row, getField(`年齢加算${key}/上限年齢`));
    const age = getAgeRangeLabel(lower, upper);
    return { age, code };
  };

  const n1 = get("①");
  if (!n1) return [];

  const n2 = get("②");
  if (!n2) return [n1];

  const n3 = get("③");
  if (!n3) return [n1, n2];

  const n4 = get("④");
  if (!n4) return [n1, n2, n3];

  return [n1, n2, n3, n4];
}

// codes are grouped by the following:
// 1st group: 施設基準①～⑥
// 2nd group: 施設基準⑦～⑨
// 3rd group: 施設基準⑩
// https://shinryohoshu.mhlw.go.jp/shinryohoshu/file/spec/R04rec2.pdf#page=65
const shisetsukijunGroupStartIndices = [
  getField("施設基準/施設基準コード①").seq - 1,
  getField("施設基準/施設基準コード⑦").seq - 1,
  getField("施設基準/施設基準コード⑩").seq - 1,
];

export function getShisetsukijunCodeGroupList(row: string[]): string[][] {
  const codes: string[][] = [];

  for (const groupStartIndex of shisetsukijunGroupStartIndices) {
    const group = [];
    for (let i = 0; i < 6; i++) {
      const code = row[groupStartIndex + i];
      if (code === "0") {
        break;
      }
      group.push(code);
    }
    if (group.length === 0) {
      break;
    }
    codes.push(group);
  }

  return codes;
}

export function normalizeUnit(unit: string) {
  if (unit === "ｃｍ２") {
    unit = "cm²";
  }
  return toHalfWidth(unit);
}
