import { ColorChip } from "@/components/color-chip";
import { HStack } from "@/components/h-stack";
import { LabeledChip } from "@/components/labeled-chip";
import { getCodeLabel } from "@/features/fields/get-code-label";
import { getValue } from "@/features/fields/get-values";
import { Field } from "@/features/fields/types";
import { SectionHeading } from "@/features/shinryoukoui-basic-tab/section-heading";
import { ColorChipColor } from "@/utils/color-chip-color";

import { getField } from "../iyaku-master-fields/iyaku-master-fields";

export type IyakuBasicTabProps = {
  row: string[];
};

function formatCodeValue(row: string[], field: Field): string {
  const value = getValue(row, field);
  const label = getCodeLabel(row, field, true);
  return value + ": " + (label ?? "-");
}

function formatYakka(rawValue: string): string {
  // rawValue is 13 digits: 10 integer digits + 2 decimal digits (no decimal point in raw data)
  // e.g., "0000001234500" means 12345.00 yen
  const intPart = rawValue.slice(0, -2).replace(/^0+/, "") || "0";
  const decPart = rawValue.slice(-2);
  return decPart === "00" ? `${intPart}円` : `${intPart}.${decPart}円`;
}

function getZaikeiColor(code: string): ColorChipColor | undefined {
  switch (code) {
    case "1": return "blue";    // 内用薬
    case "4": return "red";     // 注射薬
    case "6": return "green";   // 外用薬
    case "8": return "purple";  // 歯科用薬剤
    case "3": return "stone";   // その他
    default: return undefined;
  }
}

export function IyakuBasicTab({ row }: IyakuBasicTabProps) {
  const zaikeiCode = getValue(row, getField("剤形"));
  const zaikeiLabel = getCodeLabel(row, getField("剤形"), true);
  const kanjiMeisho = getValue(row, getField("医薬品名・規格名/漢字名称"));
  const kihonKanjiMeisho = getValue(row, getField("基本漢字名称"));
  const kinyuShubetsu = getValue(row, getField("新又は現金額/金額種別"));
  const kyuKinyuShubetsu = getValue(row, getField("旧金額/金額種別"));
  const chushaYoryo = getValue(row, getField("注射容量"));
  const ippanmeiKisai = getValue(row, getField("一般名処方の標準的な記載"));

  const hasBunruiKisei =
    getValue(row, getField("麻薬・毒薬・覚醒剤原料・向精神薬")) !== "0" ||
    getValue(row, getField("神経破壊剤")) !== "0" ||
    getValue(row, getField("生物学的製剤")) !== "0" ||
    getValue(row, getField("歯科特定薬剤")) !== "0" ||
    getValue(row, getField("造影（補助）剤")) !== "0" ||
    getValue(row, getField("抗ＨＩＶ薬区分")) !== "0";

  const hasKanren =
    getValue(row, getField("商品名等関連")) !== "0" ||
    getValue(row, getField("長期収載品関連")) !== "0" ||
    getValue(row, getField("選定療養区分")) !== "0";

  const haichishiNengetsuhi = getValue(row, getField("廃止年月日"));
  const keikaSochiNengetsuhi = getValue(row, getField("経過措置年月日又は商品名医薬品コード使用期限"));

  return (
    <>
      <section className="mb-4">
        <HStack className="mb-2 gap-2">
          {zaikeiLabel && (
            <ColorChip color={getZaikeiColor(zaikeiCode)}>{zaikeiLabel}</ColorChip>
          )}
          {getValue(row, getField("後発品")) === "1" && (
            <ColorChip color="orange">後発品</ColorChip>
          )}
          {getValue(row, getField("変更区分")) !== "0" && (
            <ColorChip color="red">{formatCodeValue(row, getField("変更区分"))}</ColorChip>
          )}
        </HStack>
        <div>
          <span className="text-slate-500">{getValue(row, getField("医薬品コード"))}</span>
          <span className="text-slate-300 text-lg"> | </span>
          <span className="text-lg">{kanjiMeisho}</span>
        </div>
        {kihonKanjiMeisho !== kanjiMeisho && (
          <div className="text-sm my-1 text-slate-500">
            基本名称: {kihonKanjiMeisho}
          </div>
        )}
      </section>

      <section>
        <SectionHeading>基本情報</SectionHeading>
        <HStack>
          <LabeledChip label="剤形">
            {formatCodeValue(row, getField("剤形"))}
          </LabeledChip>
          <LabeledChip label="収載方式等識別">
            {formatCodeValue(row, getField("収載方式等識別"))}
          </LabeledChip>
          <LabeledChip label="後発品">
            {formatCodeValue(row, getField("後発品"))}
          </LabeledChip>
          <LabeledChip label="単位">
            {getValue(row, getField("単位漢字名称"))}
          </LabeledChip>
        </HStack>
      </section>

      <section>
        <SectionHeading>薬価</SectionHeading>
        <HStack>
          {kinyuShubetsu === "1" ? (
            <LabeledChip label="新又は現薬価">
              {formatYakka(getValue(row, getField("新又は現金額")))}
            </LabeledChip>
          ) : (
            <LabeledChip label="新又は現金額種別">
              {formatCodeValue(row, getField("新又は現金額/金額種別"))}
            </LabeledChip>
          )}
          {kyuKinyuShubetsu !== "0" && (
            <LabeledChip label="旧薬価">
              {formatYakka(getValue(row, getField("旧金額")))}
            </LabeledChip>
          )}
          <LabeledChip label="薬価基準収載年月日">
            {getValue(row, getField("薬価基準収載年月日"))}
          </LabeledChip>
          <LabeledChip label="薬価基準収載医薬品コード">
            {getValue(row, getField("薬価基準収載医薬品コード"))}
          </LabeledChip>
        </HStack>
      </section>

      {hasBunruiKisei && (
        <section>
          <SectionHeading>分類・規制</SectionHeading>
          <HStack>
            {getValue(row, getField("麻薬・毒薬・覚醒剤原料・向精神薬")) !== "0" && (
              <LabeledChip label="麻薬・毒薬・覚醒剤原料・向精神薬">
                {formatCodeValue(row, getField("麻薬・毒薬・覚醒剤原料・向精神薬"))}
              </LabeledChip>
            )}
            {getValue(row, getField("神経破壊剤")) !== "0" && (
              <LabeledChip label="神経破壊剤">
                {formatCodeValue(row, getField("神経破壊剤"))}
              </LabeledChip>
            )}
            {getValue(row, getField("生物学的製剤")) !== "0" && (
              <LabeledChip label="生物学的製剤">
                {formatCodeValue(row, getField("生物学的製剤"))}
              </LabeledChip>
            )}
            {getValue(row, getField("歯科特定薬剤")) !== "0" && (
              <LabeledChip label="歯科特定薬剤">
                {formatCodeValue(row, getField("歯科特定薬剤"))}
              </LabeledChip>
            )}
            {getValue(row, getField("造影（補助）剤")) !== "0" && (
              <LabeledChip label="造影（補助）剤">
                {formatCodeValue(row, getField("造影（補助）剤"))}
              </LabeledChip>
            )}
            {getValue(row, getField("抗ＨＩＶ薬区分")) !== "0" && (
              <LabeledChip label="抗ＨＩＶ薬区分">
                {formatCodeValue(row, getField("抗ＨＩＶ薬区分"))}
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
              {chushaYoryo.replace(/^0+/, "") || "0"}
            </LabeledChip>
          </HStack>
        </section>
      )}

      <section>
        <SectionHeading>一般名処方</SectionHeading>
        <HStack>
          <LabeledChip label="一般名コード">
            {getValue(row, getField("一般名コード"))}
          </LabeledChip>
          <LabeledChip label="一般名処方加算対象区分">
            {formatCodeValue(row, getField("一般名処方加算対象区分"))}
          </LabeledChip>
        </HStack>
        {ippanmeiKisai && ippanmeiKisai.trim() && (
          <div className="mt-1 text-sm text-slate-600">
            {ippanmeiKisai.trim()}
          </div>
        )}
      </section>

      {hasKanren && (
        <section>
          <SectionHeading>関連</SectionHeading>
          <HStack>
            {getValue(row, getField("商品名等関連")) !== "0" && (
              <LabeledChip label="商品名等関連">
                {getValue(row, getField("商品名等関連"))}
              </LabeledChip>
            )}
            {getValue(row, getField("長期収載品関連")) !== "0" && (
              <LabeledChip label="長期収載品関連">
                {getValue(row, getField("長期収載品関連"))}
              </LabeledChip>
            )}
            {getValue(row, getField("選定療養区分")) !== "0" && (
              <LabeledChip label="選定療養区分">
                {formatCodeValue(row, getField("選定療養区分"))}
              </LabeledChip>
            )}
          </HStack>
        </section>
      )}

      <section>
        <SectionHeading>変更履歴</SectionHeading>
        <HStack>
          <LabeledChip label="変更区分">
            {formatCodeValue(row, getField("変更区分"))}
          </LabeledChip>
          <LabeledChip label="変更年月日">
            {getValue(row, getField("変更年月日"))}
          </LabeledChip>
          {haichishiNengetsuhi && haichishiNengetsuhi.replace(/0/g, "") !== "" && (
            <LabeledChip label="廃止年月日">
              {haichishiNengetsuhi}
            </LabeledChip>
          )}
          <LabeledChip label="漢字名称変更区分">
            {formatCodeValue(row, getField("漢字名称変更区分"))}
          </LabeledChip>
          <LabeledChip label="カナ名称変更区分">
            {formatCodeValue(row, getField("カナ名称変更区分"))}
          </LabeledChip>
          {keikaSochiNengetsuhi && keikaSochiNengetsuhi.replace(/0/g, "") !== "" && (
            <LabeledChip label="経過措置年月日等">
              {keikaSochiNengetsuhi}
            </LabeledChip>
          )}
        </HStack>
      </section>
    </>
  );
}
