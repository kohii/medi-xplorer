import { Chip } from "@/components/chip";
import { HStack } from "@/components/h-stack";
import { getField } from "@/features/shinryoukoui-master-fields/shinryoukoui-master-fields";

import { getCodeLabel } from "../fields/get-code-label";
import { getValue } from "../fields/get-values";

import { SectionHeading } from "./section-heading";

type OthersSectionProps = {
	row: string[];
}

export function OthersSection({
  row,
}: OthersSectionProps) {
  const 告示等識別区分 = getValue(row, getField("告示等識別区分（１）"));
  const is基本項目 = 告示等識別区分 === "1" || 告示等識別区分 === "3" || 告示等識別区分 === "5";

  const labels = [];

  if (getValue(row, getField("外来管理加算区分")) === "1") {
    labels.push("外来管理加算を算定できない");
  }

  if (is基本項目 && getValue(row, getField("処置乳幼児加算区分")) !== "0") {
    labels.push(getCodeLabel(row, getField("処置乳幼児加算区分"))?.replace("な診療行為", ""));
  }

  if (is基本項目 && getValue(row, getField("極低出生体重児加算区分")) !== "0") {
    labels.push(getCodeLabel(row, getField("極低出生体重児加算区分"))?.replace("な診療行為", ""));
  }

  const 入院基本料等減算対象識別 = getValue(row, getField("入院基本料等減算対象識別"));
  if (入院基本料等減算対象識別 === "1" || 入院基本料等減算対象識別 === "2") {
    labels.push(getCodeLabel(row, getField("入院基本料等減算対象識別")));
  }

  if (getValue(row, getField("短期滞在手術")) === "3") {
    labels.push("短期滞在手術等基本料１を算定可能");
  }

  if (labels.length === 0) {
    return null;
  }

  return (
    <section>
      <SectionHeading>その他</SectionHeading>
      <HStack>
        {labels.map(label => (
          <Chip key={label} >{label}</Chip>
        ))}
      </HStack>
    </section>

  );
}