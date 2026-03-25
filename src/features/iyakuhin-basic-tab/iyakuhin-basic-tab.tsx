import { useMemo } from "react";

import { ColorChip } from "@/components/color-chip";
import { HStack } from "@/components/h-stack";
import { LabeledChip } from "@/components/labeled-chip";
import { useIyakuhinMasterData } from "@/contexts/iyakuhin-master-data-context";
import { getCodeLabel } from "@/features/fields/get-code-label";
import { getValue } from "@/features/fields/get-values";
import { Field } from "@/features/fields/types";
import { SectionHeading } from "@/features/shinryoukoui-basic-tab/section-heading";
import { SubHeading } from "@/features/shinryoukoui-basic-tab/sub-heading";
import { formatDate } from "@/utils/format-data";

import { getField } from "../iyakuhin-master-fields/iyakuhin-master-fields";

import { RelatedIyakuhinTable } from "./related-iyakuhin-table";

export type IyakuhinBasicTabProps = {
  row: string[];
};

function formatCodeValue(row: string[], field: Field): string {
  const value = getValue(row, field);
  const label = getCodeLabel(row, field, true);
  return value + ": " + (label ?? "-");
}

function formatYakka(rawValue: string): string {
  if (!rawValue || rawValue === "0") return "-";
  return `${rawValue}円`;
}

function formatOptionalDate(rawValue: string): string {
  if (!rawValue || rawValue === "0" || rawValue === "99999999") return "-";
  return formatDate(rawValue);
}

function hasOptionalDateValue(rawValue: string): boolean {
  return rawValue !== "" && rawValue !== "0" && rawValue !== "99999999";
}

function getShortListingLabel(code: string): string {
  switch (code) {
    case "1": return "局方品";
    case "2": return "局方品・生物学的製剤基準";
    case "3": return "局方品・生薬";
    case "6": return "生物学的製剤基準";
    case "7": return "生薬";
    case "8": return "統一名収載品";
    default: return "-";
  }
}

function getSelectionCategoryLabel(code: string): string {
  switch (code) {
    case "1": return "医療上必要があると認める場合等";
    case "2": return "患者希望";
    default: return "-";
  }
}

export function IyakuhinBasicTab({ row }: IyakuhinBasicTabProps) {
  const { data, getRowByCode } = useIyakuhinMasterData();
  const code = getValue(row, getField("医薬品コード"));
  const kanjiMeisho = getValue(row, getField("医薬品名・規格名/漢字名称"));
  const kihonKanjiMeisho = getValue(row, getField("基本漢字名称"));
  const kinyuShubetsu = getValue(row, getField("新又は現金額/金額種別"));
  const kyuKinyuShubetsu = getValue(row, getField("旧金額/金額種別"));
  const chushaYoryo = getValue(row, getField("注射容量"));
  const ippanmeiKisai = getValue(row, getField("一般名処方の標準的な記載")).trim();
  const senryouyouKubun = getValue(row, getField("選定療養区分"));
  const shouhinmeiTouKanren = getValue(row, getField("商品名等関連"));
  const choukiShuusaihinKanren = getValue(row, getField("長期収載品関連"));
  const yakkaKijunShuusaiDate = getValue(row, getField("薬価基準収載年月日"));
  const keikaSochiDate = getValue(
    row,
    getField("経過措置年月日又は商品名医薬品コード使用期限"),
  );

  const relatedUnifiedNameRow = useMemo(
    () => (shouhinmeiTouKanren !== "0" ? getRowByCode(shouhinmeiTouKanren) : undefined),
    [getRowByCode, shouhinmeiTouKanren],
  );

  const relatedSelectionRows = useMemo(() => {
    const allRows = data ?? [];

    if (senryouyouKubun === "2") {
      const relatedRow = choukiShuusaihinKanren !== "0"
        ? getRowByCode(choukiShuusaihinKanren)
        : undefined;
      return relatedRow ? [relatedRow] : [];
    }

    if (senryouyouKubun === "1") {
      return allRows.filter((candidateRow) => {
        return getValue(candidateRow, getField("長期収載品関連")) === code;
      });
    }

    return [];
  }, [choukiShuusaihinKanren, code, data, getRowByCode, senryouyouKubun]);

  const hasBunruiKisei =
    getValue(row, getField("麻薬・毒薬・覚醒剤原料・向精神薬")) !== "0" ||
    getValue(row, getField("神経破壊剤")) !== "0" ||
    getValue(row, getField("生物学的製剤")) !== "0" ||
    getValue(row, getField("歯科特定薬剤")) !== "0" ||
    getValue(row, getField("造影（補助）剤")) !== "0" ||
    getValue(row, getField("抗ＨＩＶ薬区分")) !== "0";

  return (
    <>
      <section className="mb-4">
        <HStack className="mb-2 gap-2">
          {getValue(row, getField("後発品")) === "1" && (
            <ColorChip color="orange">後発品</ColorChip>
          )}
          {getValue(row, getField("麻薬・毒薬・覚醒剤原料・向精神薬")) !== "0" && (
            <ColorChip color="red">
              {getCodeLabel(row, getField("麻薬・毒薬・覚醒剤原料・向精神薬"), true)}
            </ColorChip>
          )}
          {getValue(row, getField("生物学的製剤")) === "1" && (
            <ColorChip color="blue">生物学的製剤</ColorChip>
          )}
          {getValue(row, getField("抗ＨＩＶ薬区分")) === "1" && (
            <ColorChip color="violet">抗HIV薬</ColorChip>
          )}
        </HStack>
        <div>
          <span className="text-slate-500">{code}</span>
          <span className="text-slate-300 text-lg"> | </span>
          <span className="text-lg">{kanjiMeisho}</span>
        </div>
        {kihonKanjiMeisho !== kanjiMeisho && (
          <div className="text-sm my-1 text-slate-500">
            基本名称: {kihonKanjiMeisho}
          </div>
        )}
        {ippanmeiKisai && (
          <div className="text-sm my-1 text-slate-500">
            一般名: {ippanmeiKisai}
          </div>
        )}
      </section>

      <section>
        <SectionHeading>基本情報</SectionHeading>
        <HStack>
          <LabeledChip label="剤形">
            {getCodeLabel(row, getField("剤形"), true)}
          </LabeledChip>
          <LabeledChip label="単位">
            {getValue(row, getField("単位漢字名称"))}
          </LabeledChip>
          <LabeledChip label="収載方式等識別">
            {getShortListingLabel(getValue(row, getField("収載方式等識別")))}
          </LabeledChip>
          <LabeledChip label="薬価基準収載医薬品コード">
            {getValue(row, getField("薬価基準収載医薬品コード"))}
          </LabeledChip>
        </HStack>
        {(hasOptionalDateValue(yakkaKijunShuusaiDate) || hasOptionalDateValue(keikaSochiDate)) && (
          <HStack className="mt-1">
            {hasOptionalDateValue(yakkaKijunShuusaiDate) && (
              <LabeledChip label="薬価基準収載年月日">
                {formatOptionalDate(yakkaKijunShuusaiDate)}
              </LabeledChip>
            )}
            {hasOptionalDateValue(keikaSochiDate) && (
              <LabeledChip label="経過措置年月日等">
                {formatOptionalDate(keikaSochiDate)}
              </LabeledChip>
            )}
          </HStack>
        )}
      </section>

      <section>
        <SectionHeading>薬価</SectionHeading>
        <HStack>
          {kinyuShubetsu === "1" ? (
            <LabeledChip label="薬価">
              {formatYakka(getValue(row, getField("新又は現金額")))}
            </LabeledChip>
          ) : (
            <LabeledChip label="金額種別">
              {formatCodeValue(row, getField("新又は現金額/金額種別"))}
            </LabeledChip>
          )}
          {kyuKinyuShubetsu !== "0" && (
            <LabeledChip label="旧薬価">
              {formatYakka(getValue(row, getField("旧金額")))}
            </LabeledChip>
          )}
        </HStack>
      </section>

      <section>
        <SectionHeading>一般名・後発品</SectionHeading>
        <HStack>
          <LabeledChip label="後発品">
            {getCodeLabel(row, getField("後発品"), true)}
          </LabeledChip>
          <LabeledChip label="一般名処方加算対象区分">
            {getCodeLabel(row, getField("一般名処方加算対象区分"), true)}
          </LabeledChip>
          <LabeledChip label="一般名コード">
            {getValue(row, getField("一般名コード"))}
          </LabeledChip>
        </HStack>
      </section>

      {senryouyouKubun !== "0" && (
        <section>
          <SectionHeading>選定療養</SectionHeading>
          <HStack>
            <LabeledChip label="選定療養区分">
              {getSelectionCategoryLabel(senryouyouKubun)}
            </LabeledChip>
          </HStack>
          {relatedSelectionRows.length > 0 && (
            <>
              <SubHeading>
                {senryouyouKubun === "1"
                  ? "対応する患者希望の医薬品"
                  : "対応する医療上必要があると認める場合等の医薬品"}
              </SubHeading>
              <RelatedIyakuhinTable rows={relatedSelectionRows} />
            </>
          )}
        </section>
      )}

      {shouhinmeiTouKanren !== "0" && (
        <section>
          <SectionHeading>関連医薬品</SectionHeading>
          <SubHeading>対応する統一名収載医薬品</SubHeading>
          {relatedUnifiedNameRow
            ? <RelatedIyakuhinTable rows={[relatedUnifiedNameRow]} />
            : <div className="text-sm text-slate-500">{shouhinmeiTouKanren}</div>}
        </section>
      )}

      {hasBunruiKisei && (
        <section>
          <SectionHeading>分類・規制</SectionHeading>
          <HStack>
            {getValue(row, getField("麻薬・毒薬・覚醒剤原料・向精神薬")) !== "0" && (
              <LabeledChip label="麻薬・毒薬・覚醒剤原料・向精神薬">
                {getCodeLabel(row, getField("麻薬・毒薬・覚醒剤原料・向精神薬"), true)}
              </LabeledChip>
            )}
            {getValue(row, getField("神経破壊剤")) !== "0" && (
              <LabeledChip label="神経破壊剤">
                {getCodeLabel(row, getField("神経破壊剤"), true)}
              </LabeledChip>
            )}
            {getValue(row, getField("生物学的製剤")) !== "0" && (
              <LabeledChip label="生物学的製剤">
                {getCodeLabel(row, getField("生物学的製剤"), true)}
              </LabeledChip>
            )}
            {getValue(row, getField("歯科特定薬剤")) !== "0" && (
              <LabeledChip label="歯科特定薬剤">
                {getCodeLabel(row, getField("歯科特定薬剤"), true)}
              </LabeledChip>
            )}
            {getValue(row, getField("造影（補助）剤")) !== "0" && (
              <LabeledChip label="造影（補助）剤">
                {getCodeLabel(row, getField("造影（補助）剤"), true)}
              </LabeledChip>
            )}
            {getValue(row, getField("抗ＨＩＶ薬区分")) !== "0" && (
              <LabeledChip label="抗ＨＩＶ薬区分">
                {getCodeLabel(row, getField("抗ＨＩＶ薬区分"), true)}
              </LabeledChip>
            )}
          </HStack>
        </section>
      )}

      {chushaYoryo > "0000" && (
        <section>
          <SectionHeading>注射</SectionHeading>
          <HStack>
            <LabeledChip label="注射容量">
              {(chushaYoryo.replace(/^0+/, "") || "0") + "mL"}
            </LabeledChip>
          </HStack>
        </section>
      )}
    </>
  );
}
