import { ColorChip } from "@/components/color-chip";
import { HStack } from "@/components/h-stack";
import { LabeledChip } from "@/components/labeled-chip";
import { getCodeLabel } from "@/features/fields/get-code-label";
import { getValue } from "@/features/fields/get-values";
import { Field } from "@/features/fields/types";
import { SectionHeading } from "@/features/shinryoukoui-basic-tab/section-heading";
import { ColorChipColor } from "@/utils/color-chip-color";

import { getField } from "../iyakuhin-master-fields/iyakuhin-master-fields";

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
  // rawValue already contains a decimal point (e.g., "15.10", "9.80")
  return `${rawValue}円`;
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

export function IyakuhinBasicTab({ row }: IyakuhinBasicTabProps) {
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

  const hasChoukiSentei =
    getValue(row, getField("商品名等関連")) !== "0" ||
    getValue(row, getField("長期収載品関連")) !== "0" ||
    getValue(row, getField("選定療養区分")) !== "0";


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
          <LabeledChip label="単位">
            {getValue(row, getField("単位漢字名称"))}
          </LabeledChip>
          <LabeledChip label="収載方式等識別">
            {formatCodeValue(row, getField("収載方式等識別"))}
          </LabeledChip>
          <LabeledChip label="薬価基準収載医薬品コード">
            {getValue(row, getField("薬価基準収載医薬品コード"))}
          </LabeledChip>
        </HStack>
      </section>

      <section>
        <SectionHeading>薬価</SectionHeading>
        <HStack>
          {kinyuShubetsu === "1" ? (
            <LabeledChip label="薬価">
              {formatYakka(getValue(row, getField("新又は現金額")))} / {getValue(row, getField("単位漢字名称"))}
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
        </HStack>
      </section>

      <section>
        <SectionHeading>後発品・一般名処方</SectionHeading>
        <HStack>
          <LabeledChip label="後発品">
            {formatCodeValue(row, getField("後発品"))}
          </LabeledChip>
          <LabeledChip label="一般名処方加算対象区分">
            {formatCodeValue(row, getField("一般名処方加算対象区分"))}
          </LabeledChip>
          <LabeledChip label="一般名コード">
            {getValue(row, getField("一般名コード"))}
          </LabeledChip>
        </HStack>
        {ippanmeiKisai && ippanmeiKisai.trim() && (
          <HStack className="mt-1">
            <LabeledChip label="一般名処方の標準的な記載">
              {ippanmeiKisai.trim()}
            </LabeledChip>
          </HStack>
        )}
      </section>

      {hasChoukiSentei && (
        <section>
          <SectionHeading>長期収載品・選定療養</SectionHeading>
          <HStack>
            {getValue(row, getField("選定療養区分")) !== "0" && (
              <LabeledChip label="選定療養区分">
                {formatCodeValue(row, getField("選定療養区分"))}
              </LabeledChip>
            )}
            {getValue(row, getField("長期収載品関連")) !== "0" && (
              <LabeledChip label="長期収載品関連">
                {getValue(row, getField("長期収載品関連"))}
              </LabeledChip>
            )}
            {getValue(row, getField("商品名等関連")) !== "0" && (
              <LabeledChip label="商品名等関連">
                {getValue(row, getField("商品名等関連"))}
              </LabeledChip>
            )}
          </HStack>
        </section>
      )}

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

    </>
  );
}
