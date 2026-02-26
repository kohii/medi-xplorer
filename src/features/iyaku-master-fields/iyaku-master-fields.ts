import { Field } from "../fields/types";
import { IyakuMasterLayoutVersion, INITIAL_IYAKU_MASTER_LAYOUT_VERSION } from "../iyaku-master-versions/layouts";

const iyakuMasterFields = [
  {
    seq: 1,
    name: "変更区分",
    mode: "numeric",
    codes: [
      { code: "0", name: "前マスターと同じ" },
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

export type IyakuMasterFieldName = (typeof iyakuMasterFields)[number]["name"];

type IyakuMasterRecord = Field & { name: IyakuMasterFieldName };
const fieldsByLayoutVersion = new Map<IyakuMasterLayoutVersion, IyakuMasterRecord[]>();

export function getIyakuMasterFields(layoutVersion: IyakuMasterLayoutVersion): IyakuMasterRecord[] {
  const cache = fieldsByLayoutVersion.get(layoutVersion);
  if (cache) return cache;

  const fields = iyakuMasterFields.filter((field: Field) => {
    return (field.validFrom ?? INITIAL_IYAKU_MASTER_LAYOUT_VERSION) <= layoutVersion;
  });
  if (!fields.length) throw new Error(`No fields for layout version ${layoutVersion}`);
  fieldsByLayoutVersion.set(layoutVersion, fields);
  return fields;
}

export function getAllIyakuMasterFields() {
  return iyakuMasterFields;
}

const nameToField = new Map<IyakuMasterFieldName, Field>(
  iyakuMasterFields.map((field) => [field.name, field]),
);

const seqToField: Field[] = [];
for (const field of iyakuMasterFields) {
  seqToField[field.seq] = field;
}

export function getField(name: IyakuMasterFieldName): Field {
  return nameToField.get(name)!;
}

export function getFieldOrUndefined(name: string): Field | undefined {
  return nameToField.get(name as IyakuMasterFieldName);
}

export function getFieldBySeq(seq: number): Field | undefined {
  return seqToField[seq];
}
