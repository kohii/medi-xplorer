import { formatCodeValue, getAgeAdditionalFeeData, getKubunBangouColor, getTensuuranShuukeisakiShikibetsuLabel } from "@/app/s/shinryoukoui-master-utils";
import { ColorChip } from "@/components/color-chip";
import { HStack } from "@/components/h-stack";
import { SplitChip } from "@/components/split-chip";
import { UncontrolledToggle } from "@/components/toggle";
import { getValue } from "@/features/fields/get-values";

import { getField } from "../../app/s/shinryoukoui-master-fields";
import { shinryoukouiMasterVirtualFields } from "../../app/s/shinryoukoui-master-virtual-field";

import { AgeAdditionalFeeTable } from "./age-additional-fee-table";
import { ChuukasanList } from "./chuukasan-list";
import { SectionHeading } from "./section-heading";
import { ShinryoukouiList } from "./shinryoukoui-list";
import { SubHeading } from "./sub-heading";

export type DetailBasicTabProps = {
	row: string[];
	rows: string[][];
};

export function DetailBasicTab({ row, rows }: DetailBasicTabProps) {
	const kubunBangou = shinryoukouiMasterVirtualFields.区分番号.value(row);
	const ageAdditionalFeeData = getAgeAdditionalFeeData(row);
	return (
		<>
			<section className="mb-4">
				{kubunBangou !== "-" && <ColorChip color={getKubunBangouColor(kubunBangou)} className="mb-2">{kubunBangou}</ColorChip>}
				<div>
					<span className="text-slate-500">{getValue(row, getField("診療行為コード")!)}</span>
					<span className="text-slate-300 text-lg"> | </span>
					<span className="text-lg">{getValue(row, getField("基本漢字名称")!)}</span>
				</div>
				{getValue(row, getField("基本漢字名称")!) !== getValue(row, getField("診療行為省略名称/省略漢字名称")!) &&
					(<div className="text-sm my-1 text-slate-500">
						略称: {getValue(row, getField("診療行為省略名称/省略漢字名称")!)}
					</div>)
				}
			</section>

			<section>
				<SectionHeading>告示等識別区分</SectionHeading>
				<HStack>
					<SplitChip label="(1)">
						{formatCodeValue(row, getField("告示等識別区分（１）")!)}
					</SplitChip>
					<SplitChip label="(2)">
						{formatCodeValue(row, getField("告示等識別区分（２）")!)}
					</SplitChip>
				</HStack>
			</section>

			<section>
				<SectionHeading>算定可能な状況</SectionHeading>
				<HStack>
					<SplitChip label="入外適用区分">
						{formatCodeValue(row, getField("入外適用区分")!)}
					</SplitChip>
					<SplitChip label="病院・診療所区分">
						{formatCodeValue(row, getField("病院・診療所区分")!)}
					</SplitChip>
					<SplitChip label="後期高齢者医療適用区分">
						{formatCodeValue(row, getField("後期高齢者医療適用区分")!)}
					</SplitChip>
					<SplitChip label="上下限年齢">
						{shinryoukouiMasterVirtualFields.上下限年齢.value(row)}
					</SplitChip>
				</HStack>
			</section >

			<section>
				<SectionHeading>点数</SectionHeading>
				<HStack>
					<SplitChip label="点数">
						{shinryoukouiMasterVirtualFields.新又は現点数.value(row)}
					</SplitChip>
					<SplitChip label="旧点数">
						{shinryoukouiMasterVirtualFields.旧点数.value(row)}
					</SplitChip>
				</HStack>
			</section>

			<section>
				<SectionHeading>記録</SectionHeading>
				<HStack>
					<SplitChip label="点数欄集計先識別（入院外）">
						{emptyToHyphen(getTensuuranShuukeisakiShikibetsuLabel(
							getValue(row, getField("点数欄集計先識別（入院外）")!)
						))}
					</SplitChip>
					<SplitChip label="点数欄集計先識/別（入院）">
						{emptyToHyphen(getTensuuranShuukeisakiShikibetsuLabel(
							getValue(row, getField("点数欄集計先識別（入院）")!)
						))}
					</SplitChip>
				</HStack>
				<HStack className="mt-1">
					<SplitChip label="数量データの記録">
						{getValue(row, getField("データ規格コード")!) === "0" ? "不要" : `必要 (単位=${getValue(row, getField("データ規格名/漢字名称")!)})`}
					</SplitChip>
				</HStack>
			</section>

			{getValue(row, getField("注加算/注加算コード")!) !== "0" && (
				<section>
					<SectionHeading>注加算</SectionHeading>
					<>
						<HStack>
							<SplitChip label="注加算コード">
								{getValue(row, getField("注加算/注加算コード")!)}
							</SplitChip>
							<SplitChip label="注加算通番">
								{getValue(row, getField("注加算/注加算通番")!)}
							</SplitChip>
						</HStack>
						<UncontrolledToggle
							label="同じ注加算コードの診療行為..."
							className="mb-4 mt-2"
						>
							{(open) => open && (<ChuukasanList
								rows={rows}
								chuukasanCode={getValue(row, getField("注加算/注加算コード")!)}
								shinryoukouiCodeToHighlight={getValue(row, getField("診療行為コード")!)}
							/>)
							}
						</UncontrolledToggle>
					</>
				</section>
			)}

			{ageAdditionalFeeData.length > 0 && (
				<section>
					<SectionHeading>年齢加算</SectionHeading	>
					<AgeAdditionalFeeTable data={ageAdditionalFeeData} originalRows={rows} />
				</section>
			)}

			{getValue(row, getField("検査等実施判断区分")!) !== "0" && (<section>
				<SectionHeading>検査等実施判断</SectionHeading>
				<HStack>
					<SplitChip label="検査等実施判断区分">
						{formatCodeValue(row, getField("検査等実施判断区分")!)}
					</SplitChip>
					<SplitChip label="検査等実施判断グループ区分">
						{formatCodeValue(row, getField("検査等実施判断グループ区分")!)}
					</SplitChip>
				</HStack>
				{getValue(row, getField("検査等実施判断区分")!) === "2" && (<UncontrolledToggle
					label="対応する検査等の実施料..."
					className="my-1"
				>
					{(open) => open && (<ShinryoukouiList rows={rows} filter={[{
						fieldKey: "検査等実施判断区分",
						operator: ":",
						value: "1",
						negative: false,
					}, {
						fieldKey: "検査等実施判断グループ区分",
						operator: ":",
						value: getValue(row, getField("検査等実施判断グループ区分")!),
						negative: false,
					}]} />)}
				</UncontrolledToggle>)
				}
				{getValue(row, getField("検査等実施判断区分")!) === "1" && (
					<>
						<SubHeading>
							対応する判断料・診断料
						</SubHeading>
						<div className="pb-2">
							<ShinryoukouiList rows={rows} filter={[{
								fieldKey: "検査等実施判断区分",
								operator: ":",
								value: "2",
								negative: false,
							}, {
								fieldKey: "検査等実施判断グループ区分",
								operator: ":",
								value: getValue(row, getField("検査等実施判断グループ区分")!),
								negative: false,
							}]} />
						</div>
					</>)}
			</section>)}
		</>
	);
}

function emptyToHyphen(value: string | undefined): string {
	return value ? value : "-";
}
