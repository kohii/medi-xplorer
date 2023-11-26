import { getValue } from "@/features/fields/get-values";
import { getField } from "../../app/s/shinryoukoui-master-fields";
import { SplitChip } from "@/components/split-chip";
import { SectionHeading } from "../../app/s/section-heading";
import { shinryoukouiMasterVirtualFields } from "../../app/s/shinryoukoui-master-virtual-field";
import { ChuukasanList } from "./chuukasan-list";
import { formatCodeValue, getKubunBangouColor, getTensuuranShuukeisakiShikibetsuLabel } from "@/app/s/shinryoukoui-master-utils";
import { Toggle } from "@/components/toggle";
import { useState } from "react";
import { ColorChip } from "@/components/color-chip";
import { stringifyQuery } from "../search/stringify-query";
import { Link } from "@/components/link";
import { ShinryoukouiList } from "./shinryoukoui-list";
import { useUpdateSearchParams } from "@/hooks/use-update-search-params";

export type DetailBasicTabProps = {
	row: string[];
	rows: string[][];
};

export function DetailBasicTab({ row, rows }: DetailBasicTabProps) {
	const [chuukasanListOpen, setChuukasanListOpen] = useState(false);
	const kubunBangou = shinryoukouiMasterVirtualFields.区分番号.value(row);
	return (
		<>
			<section className="mb-4">
				{kubunBangou !== "-" && <ColorChip color={getKubunBangouColor(kubunBangou)} className="mb-2">{kubunBangou}</ColorChip>}
				<div>
					<span className="text-slate-500">{getValue(row, getField("診療行為コード")!)}</span>
					<span className="text-slate-300 text-lg"> | </span>
					<span className="text-lg">{getValue(row, getField('基本漢字名称')!)}</span>
				</div>
				{getValue(row, getField('基本漢字名称')!) !== getValue(row, getField('診療行為省略名称/省略漢字名称')!) &&
					<div className="text-sm my-1 text-slate-500">
						略称: {getValue(row, getField('診療行為省略名称/省略漢字名称')!)}
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
				<div className="flex items-center gap-1">
					<SplitChip label="入外適用区分">
						{formatCodeValue(row, getField("入外適用区分")!)}
					</SplitChip>
					<SplitChip label="病院・診療所区分">
						{formatCodeValue(row, getField("病院・診療所区分")!)}
					</SplitChip>
					<SplitChip label="後期高齢者医療適用区分">
						{formatCodeValue(row, getField("後期高齢者医療適用区分")!)}
					</SplitChip>
				</div>
			</section >
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
				/>
				{chuukasanListOpen && <div className="p-2">
					<ChuukasanList
						rows={rows}
						chuukasanCode={getValue(row, getField("注加算/注加算コード")!)}
						shinryoukouiCodeToHighlight={getValue(row, getField("診療行為コード")!)}
					/>
				</div>}
			</section>
			}
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
				<SplitChip label="点数欄集計先識別（入院外）" className="mr-1">
					{emptyToHyphen(getTensuuranShuukeisakiShikibetsuLabel(
						getValue(row, getField("点数欄集計先識別（入院外）")!)
					))}
				</SplitChip>
				<SplitChip label="点数欄集計先識別（入院）">
					{emptyToHyphen(getTensuuranShuukeisakiShikibetsuLabel(
						getValue(row, getField("点数欄集計先識別（入院）")!)
					))}
				</SplitChip>
				<br />
				<SplitChip label="数量データの記録" className="mr-1">
					{getValue(row, getField("データ規格コード")!) === "0" ? "不要" : `必要 (単位=${getValue(row, getField("データ規格名/漢字名称")!)})`}
				</SplitChip>
			</section>
			{getValue(row, getField("検査等実施判断区分")!) !== "0" && <section>
				<SectionHeading>検査等実施判断</SectionHeading>
				<SplitChip label="検査等実施判断区分" className="mr-1">
					{formatCodeValue(row, getField("検査等実施判断区分")!)}
				</SplitChip>
				<SplitChip label="検査等実施判断グループ区分">
					{formatCodeValue(row, getField("検査等実施判断グループ区分")!)}
				</SplitChip>
				{getValue(row, getField("検査等実施判断区分")!) === "2" && <div className="mt-1">
					<Link href={`s?q=` + encodeURIComponent(stringifyQuery([{
						fieldKey: "検査等実施判断区分",
						operator: ":",
						value: "1",
						negative: false,
					}, {
						fieldKey: "検査等実施判断グループ区分",
						operator: ":",
						value: getValue(row, getField("検査等実施判断グループ区分")!),
						negative: false,
					}]))}
						className="text-blue-600"
					>
						対応する検査等の実施料
					</Link>
				</div>}
				{getValue(row, getField("検査等実施判断区分")!) === "1" && (
					<>
						<div className="mt-2 mb-1 font-medium text-slate-500">
							対応する判断料・診断料
						</div>
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
					</>)}
			</section>}
		</>
	)
}

function emptyToHyphen(value: string | undefined): string {
	return value ? value : "-";
}

