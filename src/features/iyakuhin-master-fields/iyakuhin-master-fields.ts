import { Field } from "../fields/types";
import {
  IyakuhinMasterLayoutVersion,
  INITIAL_IYAKUHIN_MASTER_LAYOUT_VERSION,
} from "../iyakuhin-master-versions/layouts";

const iyakuhinMasterFields = [
  {
    seq: 1,
    name: "変更区分",
    mode: "numeric",
    codes: [
      { code: "0", name: "変更なし" },
      { code: "1", name: "抹消" },
      { code: "3", name: "新規" },
      { code: "5", name: "変更" },
      { code: "9", name: "廃止" },
    ],
  },
  {
    seq: 2,
    name: "マスター種別",
    mode: "alphanumeric",
    codes: [{ code: "Y", name: "医薬品マスター" }],
  },
  {
    seq: 3,
    name: "医薬品コード",
    mode: "numeric",
  },
  {
    seq: 4,
    name: "医薬品名・規格名/漢字有効桁数",
    shortName: "漢字有効桁数",
    mode: "numeric",
  },
  {
    seq: 5,
    name: "医薬品名・規格名/漢字名称",
    shortName: "漢字名称",
    mode: "text",
    columnWidth: "auto",
  },
  {
    seq: 6,
    name: "医薬品名・規格名/カナ有効桁数",
    shortName: "カナ有効桁数",
    mode: "numeric",
  },
  {
    seq: 7,
    name: "医薬品名・規格名/カナ名称",
    shortName: "カナ名称",
    mode: "text",
    columnWidth: 160,
  },
  {
    seq: 8,
    name: "単位コード",
    mode: "numeric",
    codes: [
      { code: "0", name: "-" },
      { code: "1", name: "分" },
      { code: "2", name: "回" },
      { code: "3", name: "種" },
      { code: "4", name: "箱" },
      { code: "5", name: "巻" },
      { code: "6", name: "枚" },
      { code: "7", name: "本" },
      { code: "8", name: "組" },
      { code: "9", name: "セット" },
      { code: "10", name: "個" },
      { code: "11", name: "裂" },
      { code: "12", name: "方向" },
      { code: "13", name: "トローチ" },
      { code: "14", name: "アンプル" },
      { code: "15", name: "カプセル" },
      { code: "16", name: "錠" },
      { code: "17", name: "丸" },
      { code: "18", name: "包" },
      { code: "19", name: "瓶" },
      { code: "20", name: "袋" },
      { code: "21", name: "瓶（袋）" },
      { code: "22", name: "管" },
      { code: "23", name: "シリンジ" },
      { code: "24", name: "回分" },
      { code: "25", name: "テスト分" },
      { code: "26", name: "ガラス筒" },
      { code: "27", name: "桿錠" },
      { code: "28", name: "単位" },
      { code: "29", name: "万単位" },
      { code: "30", name: "フィート" },
      { code: "31", name: "滴" },
      { code: "32", name: "mg" },
      { code: "33", name: "g" },
      { code: "34", name: "Kg" },
      { code: "35", name: "cc" },
      { code: "36", name: "mL" },
      { code: "37", name: "L" },
      { code: "38", name: "mLV" },
      { code: "39", name: "バイアル" },
      { code: "40", name: "cm" },
      { code: "41", name: "cm2" },
      { code: "42", name: "m" },
      { code: "43", name: "μCi" },
      { code: "44", name: "mCi" },
      { code: "45", name: "μg" },
      { code: "46", name: "管（瓶）" },
      { code: "47", name: "筒" },
      { code: "48", name: "GBq" },
      { code: "49", name: "MBq" },
      { code: "50", name: "KBq" },
      { code: "51", name: "キット" },
      { code: "52", name: "国際単位" },
      { code: "53", name: "患者当り" },
      { code: "54", name: "気圧" },
      { code: "55", name: "缶" },
      { code: "56", name: "手術当り" },
      { code: "57", name: "容器" },
      { code: "58", name: "mL(g)" },
      { code: "59", name: "ブリスター" },
      { code: "60", name: "シート" },
      { code: "61", name: "カセット" },
      { code: "101", name: "分画" },
      { code: "102", name: "染色" },
      { code: "103", name: "種類" },
      { code: "104", name: "株" },
      { code: "105", name: "菌株" },
      { code: "106", name: "照射" },
      { code: "107", name: "臓器" },
      { code: "108", name: "件" },
      { code: "109", name: "部位" },
      { code: "110", name: "肢" },
      { code: "111", name: "局所" },
      { code: "112", name: "種目" },
      { code: "113", name: "スキャン" },
      { code: "114", name: "コマ" },
      { code: "115", name: "処理" },
      { code: "116", name: "指" },
      { code: "117", name: "歯" },
      { code: "118", name: "面" },
      { code: "119", name: "側" },
      { code: "120", name: "個所" },
      { code: "121", name: "日" },
      { code: "122", name: "椎間" },
      { code: "123", name: "筋" },
      { code: "124", name: "菌種" },
      { code: "125", name: "項目" },
      { code: "126", name: "箇所" },
      { code: "127", name: "椎弓" },
      { code: "128", name: "食" },
      { code: "129", name: "根管" },
      { code: "130", name: "3分の1顎" },
      { code: "131", name: "月" },
      { code: "132", name: "入院初日" },
      { code: "133", name: "入院中" },
      { code: "134", name: "退院時" },
      { code: "135", name: "初回" },
      { code: "136", name: "口腔" },
      { code: "137", name: "顎" },
      { code: "138", name: "週" },
      { code: "139", name: "窩洞" },
      { code: "140", name: "神経" },
      { code: "141", name: "一連" },
      { code: "142", name: "2週" },
      { code: "143", name: "2月" },
      { code: "144", name: "3月" },
      { code: "145", name: "4月" },
      { code: "146", name: "6月" },
      { code: "147", name: "12月" },
      { code: "148", name: "5年" },
      { code: "149", name: "妊娠中" },
      { code: "150", name: "検査当り" },
      { code: "151", name: "1疾患当り" },
      { code: "153", name: "装置" },
      { code: "154", name: "1歯1回" },
      { code: "155", name: "1口腔1回" },
      { code: "156", name: "床" },
      { code: "157", name: "1顎1回" },
      { code: "158", name: "椎体" },
      { code: "159", name: "初診時" },
      { code: "160", name: "1分娩当り" },
    ],
  },
  {
    seq: 9,
    name: "単位漢字有効桁数",
    mode: "numeric",
  },
  {
    seq: 10,
    name: "単位漢字名称",
    mode: "text",
  },
  {
    seq: 11,
    name: "新又は現金額/金額種別",
    shortName: "新又は現金額種別",
    mode: "numeric",
    codes: [
      { code: "1", name: "金額" },
      { code: "3", name: "薬剤使用量省略（歯科に限る。）" },
      { code: "7", name: "減点" },
    ],
  },
  {
    seq: 12,
    name: "新又は現金額",
    mode: "numeric",
  },
  {
    seq: 13,
    name: "予備1",
    mode: "numeric",
  },
  {
    seq: 14,
    name: "麻薬・毒薬・覚醒剤原料・向精神薬",
    mode: "numeric",
    codes: [
      { code: "0", name: "「１」から「５」以外の医薬品" },
      { code: "1", name: "麻薬" },
      { code: "2", name: "毒薬" },
      { code: "3", name: "覚醒剤原料" },
      { code: "5", name: "向精神薬" },
    ],
  },
  {
    seq: 15,
    name: "神経破壊剤",
    mode: "numeric",
    codes: [
      { code: "0", name: "神経破壊剤以外" },
      { code: "1", name: "神経破壊剤" },
    ],
  },
  {
    seq: 16,
    name: "生物学的製剤",
    mode: "numeric",
    codes: [
      { code: "0", name: "生物学的製剤加算対象品目以外" },
      { code: "1", name: "生物学的製剤加算対象品目" },
    ],
  },
  {
    seq: 17,
    name: "後発品",
    mode: "numeric",
    codes: [
      { code: "0", name: "後発医薬品以外" },
      { code: "1", name: "後発医薬品" },
    ],
  },
  {
    seq: 18,
    name: "予備2",
    mode: "numeric",
  },
  {
    seq: 19,
    name: "歯科特定薬剤",
    mode: "numeric",
    codes: [
      { code: "0", name: "歯科特定薬剤以外" },
      { code: "1", name: "歯科特定薬剤" },
    ],
  },
  {
    seq: 20,
    name: "造影（補助）剤",
    mode: "numeric",
    codes: [
      { code: "0", name: "「１」及び「２」以外の医薬品" },
      { code: "1", name: "造影剤" },
      { code: "2", name: "造影補助剤" },
    ],
  },
  {
    seq: 21,
    name: "注射容量",
    mode: "numeric",
  },
  {
    seq: 22,
    name: "収載方式等識別",
    mode: "numeric",
    codes: [
      { code: "0", name: "「１」から「８」以外の医薬品" },
      { code: "1", name: "日本薬局方収載医薬品（局方品）" },
      { code: "2", name: "局方品で生物学的製剤基準医薬品" },
      { code: "3", name: "局方品で生薬" },
      { code: "6", name: "生物学的製剤基準医薬品" },
      { code: "7", name: "生薬" },
      { code: "8", name: "「１」から「７」以外の統一名収載医薬品" },
    ],
  },
  {
    seq: 23,
    name: "商品名等関連",
    mode: "numeric",
  },
  {
    seq: 24,
    name: "旧金額/金額種別",
    shortName: "旧金額種別",
    mode: "numeric",
    codes: [
      { code: "0", name: "薬価基準改定又はそれ以降に新設された医薬品" },
      { code: "1", name: "金額" },
      { code: "3", name: "薬剤使用量省略（歯科に限る。）" },
      { code: "7", name: "減点" },
    ],
  },
  {
    seq: 25,
    name: "旧金額",
    mode: "numeric",
  },
  {
    seq: 26,
    name: "漢字名称変更区分",
    mode: "numeric",
    codes: [
      { code: "0", name: "変更なし" },
      { code: "1", name: "変更あり" },
    ],
  },
  {
    seq: 27,
    name: "カナ名称変更区分",
    mode: "numeric",
    codes: [
      { code: "0", name: "変更なし" },
      { code: "1", name: "変更あり" },
    ],
  },
  {
    seq: 28,
    name: "剤形",
    mode: "numeric",
    codes: [
      { code: "1", name: "内用薬" },
      { code: "3", name: "その他" },
      { code: "4", name: "注射薬" },
      { code: "6", name: "外用薬" },
      { code: "8", name: "歯科用薬剤" },
    ],
  },
  {
    seq: 29,
    name: "予備3",
    mode: "alphanumeric",
  },
  {
    seq: 30,
    name: "変更年月日",
    mode: "date",
  },
  {
    seq: 31,
    name: "廃止年月日",
    mode: "date",
  },
  {
    seq: 32,
    name: "薬価基準収載医薬品コード",
    mode: "alphanumeric",
  },
  {
    seq: 33,
    name: "公表順序番号",
    mode: "numeric",
  },
  {
    seq: 34,
    name: "経過措置年月日又は商品名医薬品コード使用期限",
    shortName: "経過措置年月日等",
    mode: "date",
  },
  {
    seq: 35,
    name: "基本漢字名称",
    mode: "text",
    columnWidth: "auto",
  },
  {
    seq: 36,
    name: "薬価基準収載年月日",
    mode: "date",
  },
  {
    seq: 37,
    name: "一般名コード",
    mode: "alphanumeric",
  },
  {
    seq: 38,
    name: "一般名処方の標準的な記載",
    shortName: "一般名処方記載",
    mode: "text",
    columnWidth: "auto",
  },
  {
    seq: 39,
    name: "一般名処方加算対象区分",
    shortName: "一般名処方加算",
    mode: "alphanumeric",
    codes: [
      { code: "0", name: "一般名処方マスタにない医薬品" },
      { code: "1", name: "加算１" },
      { code: "2", name: "加算１、２" },
    ],
  },
  {
    seq: 40,
    name: "抗ＨＩＶ薬区分",
    mode: "alphanumeric",
    codes: [
      { code: "0", name: "「１」以外の医薬品" },
      { code: "1", name: "抗ＨＩＶ薬" },
    ],
  },
  {
    seq: 41,
    name: "長期収載品関連",
    mode: "numeric",
  },
  {
    seq: 42,
    name: "選定療養区分",
    mode: "numeric",
    codes: [
      { code: "0", name: "「１」及び「２」以外の医薬品" },
      { code: "1", name: "対象医薬品（医療上必要があると認める場合等）" },
      { code: "2", name: "対象医薬品（患者希望）" },
    ],
  },
] as const satisfies readonly Field[];

export type IyakuhinMasterFieldName = (typeof iyakuhinMasterFields)[number]["name"];

type IyakuhinMasterRecord = Field & { name: IyakuhinMasterFieldName };
const fieldsByLayoutVersion = new Map<IyakuhinMasterLayoutVersion, IyakuhinMasterRecord[]>();

export function getIyakuhinMasterFields(
  layoutVersion: IyakuhinMasterLayoutVersion,
): IyakuhinMasterRecord[] {
  const cache = fieldsByLayoutVersion.get(layoutVersion);
  if (cache) return cache;

  const fields = iyakuhinMasterFields.filter((field: Field) => {
    return (field.validFrom ?? INITIAL_IYAKUHIN_MASTER_LAYOUT_VERSION) <= layoutVersion;
  });
  if (!fields.length) throw new Error(`No fields for layout version ${layoutVersion}`);
  fieldsByLayoutVersion.set(layoutVersion, fields);
  return fields;
}

export function getAllIyakuhinMasterFields() {
  return iyakuhinMasterFields;
}

const nameToField = new Map<IyakuhinMasterFieldName, Field>(
  iyakuhinMasterFields.map((field) => [field.name, field]),
);

const seqToField: Field[] = [];
for (const field of iyakuhinMasterFields) {
  seqToField[field.seq] = field;
}

export function getField(name: IyakuhinMasterFieldName): Field {
  return nameToField.get(name)!;
}

export function getFieldOrUndefined(name: string): Field | undefined {
  return nameToField.get(name as IyakuhinMasterFieldName);
}

export function getFieldBySeq(seq: number): Field | undefined {
  return seqToField[seq];
}
