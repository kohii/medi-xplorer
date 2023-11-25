import { getCodeLabel } from "@/features/fields/get-code-label";
import { getValue } from "@/features/fields/get-values";
import { getField } from "../../app/s/shinryoukoui-master-fields";
import { SplitChip } from "@/components/split-chip";
import { SectionHeading } from "../../app/s/section-heading";
import { Field } from "@/features/fields/types";
import { shinryoukouiMasterVirtualFields } from "../../app/s/shinryoukoui-master-virtual-field";
import { ChuukasanList } from "./chuukasan-list";
import { formatCodeValue } from "@/app/s/shinryoukoui-master-utils";
import { Toggle } from "@/components/toggle";
import { useState } from "react";

const FIELDS = {
	"診療行為省略名称/省略漢字名称": getField('診療行為省略名称/省略漢字名称')!,
	"基本漢字名称": getField('基本漢字名称')!,
	"入外適用区分": getField('入外適用区分')!,
} as const;

export type DetailBasicTabProps = {
	row: string[];
	rows: string[][];
};

export function DetailBasicTab({ row, rows }: DetailBasicTabProps) {
	const [chuukasanListOpen, setChuukasanListOpen] = useState(false);
	return (
		<>
			<section className="mb-4">
				<div className="text-sm">{getValue(row, getField("診療行為コード")!)}</div>
				<div className="text-lg">{getValue(row, FIELDS["基本漢字名称"])}</div>
				{getValue(row, FIELDS["基本漢字名称"]) !== getValue(row, FIELDS["診療行為省略名称/省略漢字名称"]) &&
					<div className="text-sm my-1 text-gray-500">
						略称: {getValue(row, FIELDS["診療行為省略名称/省略漢字名称"])}
					</div>
				}
			</section>
			<section>
				<SectionHeading>告示等識別区分</SectionHeading>
				<SplitChip label="(1)" className="mr-1" >
					{formatCodeValue(row, getField("告示等識別区分（１）")!)}
				</SplitChip>
				<SplitChip label="(2)" >
					{formatCodeValue(row, getField("告示等識別区分（２）")!)}
				</SplitChip>
			</section>
			<section>
				<SectionHeading>算定可能な状況</SectionHeading>
				<SplitChip label="入外適用区分" className="mr-1">
					{formatCodeValue(row, FIELDS["入外適用区分"])}
				</SplitChip>
				<SplitChip label="病院・診療所区分">
					{formatCodeValue(row, getField("病院・診療所区分")!)}
				</SplitChip>
			</section>
			{getValue(row, getField("注加算/注加算コード")!) !== "0" && <section>
				<SectionHeading>注加算</SectionHeading>
				<SplitChip label="注加算コード" className="mr-1">
					{getValue(row, getField("注加算/注加算コード")!)}
				</SplitChip>
				<SplitChip label="注加算通番">
					{getValue(row, getField("注加算/注加算通番")!)}
				</SplitChip>
				<Toggle
					label="同じ注加算コードの診療行為..."
					className="my-1"
					open={chuukasanListOpen}
					onToggle={setChuukasanListOpen}
				>
					{chuukasanListOpen && <div className="p-2">
						<ChuukasanList
							rows={rows}
							chuukasanCode={getValue(row, getField("注加算/注加算コード")!)}
							shinryoukouiCodeToHighlight={getValue(row, getField("診療行為コード")!)}
						/>
					</div>}
				</Toggle>
			</section>}
			<section>
				<SectionHeading>点数</SectionHeading>
				<SplitChip label="点数" className="mr-1">
					{shinryoukouiMasterVirtualFields.新又は現点数.value(row)}
				</SplitChip>
				<SplitChip label="旧点数">
					{shinryoukouiMasterVirtualFields.旧点数.value(row)}
				</SplitChip>
			</section>
			<section>
				<SectionHeading>記録</SectionHeading>
				<SplitChip label="数量データの記録" className="mr-1">
					{getValue(row, getField("データ規格コード")!) === "0" ? "不要" : `必要 (単位=${getValue(row, getField("データ規格名/漢字名称")!)})`}
				</SplitChip>
			</section>
		</>
	)
}
