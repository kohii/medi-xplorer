import { Chip } from "@/components/chip";
import { HStack } from "@/components/h-stack";
import { getField } from "@/features/shinryoukoui-master-fields/shinryoukoui-master-fields";

import { getCodeLabel } from "../fields/get-code-label";
import { getValue } from "../fields/get-values";

import { SectionHeading } from "./section-heading";

type OthersSectionProps = {
  row: string[];
};

export function OthersSection({ row }: OthersSectionProps) {
  const 告示等識別区分 = getValue(row, getField("告示等識別区分（１）"));
  const is基本項目 = 告示等識別区分 === "1" || 告示等識別区分 === "3" || 告示等識別区分 === "5";

  const labels = [];

  if (getValue(row, getField("外来管理加算区分")) === "1") {
    labels.push("外来管理加算を算定できない");
  }

  if (is基本項目 && getValue(row, getField("時間加算区分")) === "1") {
    labels.push("時間外加算等を算定可能");
  }

  if (is基本項目 && getValue(row, getField("外来感染対策向上加算等")) !== "0") {
    labels.push(getCodeLabel(row, getField("外来感染対策向上加算等"))?.replace("な診療行為", ""));
  }

  if (is基本項目 && getValue(row, getField("処置乳幼児加算区分")) !== "0") {
    labels.push(getCodeLabel(row, getField("処置乳幼児加算区分"))?.replace("な診療行為", ""));
  }

  if (is基本項目 && getValue(row, getField("極低出生体重児加算区分")) === "1") {
    labels.push("極低出生体重児加算（手術）又は新生児加算（手術）を算定可能");
  }

  const 入院基本料等減算対象識別 = getValue(row, getField("入院基本料等減算対象識別"));
  if (入院基本料等減算対象識別 === "1" || 入院基本料等減算対象識別 === "2") {
    labels.push(getCodeLabel(row, getField("入院基本料等減算対象識別")));
  }

  if (getValue(row, getField("短期滞在手術")) === "3") {
    labels.push("短期滞在手術等基本料１を算定可能");
  }

  const 副鼻腔手術用内視鏡加算 = getValue(row, getField("副鼻腔手術用内視鏡加算"));
  if (is基本項目 && 副鼻腔手術用内視鏡加算 === "1") {
    labels.push("副鼻腔手術用内視鏡加算を算定可能");
  }

  const 副鼻腔手術用骨軟部組織切除機器加算 = getValue(
    row,
    getField("副鼻腔手術用骨軟部組織切除機器加算"),
  );
  if (is基本項目 && 副鼻腔手術用骨軟部組織切除機器加算 === "1") {
    labels.push("副鼻腔手術用骨軟部組織切除機器加算を算定可能");
  }

  const 画像等手術支援加算 = getValue(row, getField("画像等手術支援加算"));
  if (is基本項目 && 画像等手術支援加算 !== "0") {
    labels.push(getCodeLabel(row, getField("画像等手術支援加算"))?.replace("な診療行為", ""));
  }

  const 長時間麻酔管理加算 = getValue(row, getField("長時間麻酔管理加算"));
  if (is基本項目 && 長時間麻酔管理加算 !== "0") {
    labels.push(getCodeLabel(row, getField("長時間麻酔管理加算"))?.replace("な診療行為", ""));
  }

  const モニタリング加算 = getValue(row, getField("モニタリング加算"));
  if (is基本項目 && モニタリング加算 !== "0") {
    labels.push(getCodeLabel(row, getField("モニタリング加算"))?.replace("な診療行為", ""));
  }

  if (is基本項目 && getValue(row, getField("凍結保存同種組織加算")) === "1") {
    labels.push("凍結保存同種組織加算を算定可能");
  }

  if (is基本項目 && getValue(row, getField("悪性腫瘍病理組織標本加算")) === "4") {
    labels.push("悪性腫瘍病理組織標本加算を算定する場合に実施している必要がある");
  }

  if (is基本項目 && getValue(row, getField("創外固定器加算")) === "1") {
    labels.push("創外固定器加算を算定可能");
  }

  if (is基本項目 && getValue(row, getField("超音波切削機器加算")) === "1") {
    labels.push("超音波切削機器加算を算定可能");
  }

  const 左心耳閉鎖術併施区分 = getValue(row, getField("左心耳閉鎖術併施区分"));
  if (is基本項目 && (左心耳閉鎖術併施区分 === "2" || 左心耳閉鎖術併施区分 === "4")) {
    labels.push(getCodeLabel(row, getField("左心耳閉鎖術併施区分")));
  }

  if (is基本項目 && getValue(row, getField("耳鼻咽喉科乳幼児処置加算")) === "1") {
    labels.push("耳鼻咽喉科乳幼児処置加算を算定可能");
  }

  if (is基本項目 && getValue(row, getField("耳鼻咽喉科小児抗菌薬適正使用支援加算")) === "1") {
    labels.push("耳鼻咽喉科小児抗菌薬適正使用支援加算を算定可能");
  }

  if (is基本項目 && getValue(row, getField("切開創局所陰圧閉鎖処置機器加算")) === "1") {
    labels.push("切開創局所陰圧閉鎖処置機器加算を算定可能");
  }

  if (labels.length === 0) {
    return null;
  }

  return (
    <section>
      <SectionHeading>その他</SectionHeading>
      <HStack>
        {labels.map((label) => (
          <Chip key={label}>{label}</Chip>
        ))}
      </HStack>
    </section>
  );
}
