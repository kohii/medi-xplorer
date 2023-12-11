import { Chip } from "@/components/chip";
import { ColorChip, getNthColorChipColor } from "@/components/color-chip";
import { HStack } from "@/components/h-stack";
import { SplitChip } from "@/components/split-chip";
import { UncontrolledToggle } from "@/components/toggle";
import { getValue } from "@/features/fields/get-values";
import { formatCodeValue, getAgeAdditionalFeeData, getKubunBangouColor, getTensuuranShuukeisakiShikibetsuLabel, normalizeUnit } from "@/features/shinryoukoui-master-fields/shinryoukoui-master-utils";

import { getCodeLabel } from "../fields/get-code-label";
import { getField } from "../shinryoukoui-master-fields/shinryoukoui-master-fields";
import { shinryoukouiMasterVirtualFields } from "../shinryoukoui-master-fields/shinryoukoui-master-virtual-field";

import { AgeAdditionalFeeTable } from "./age-additional-fee-table";
import { ChuukasanTable } from "./chuukasan-table";
import { KizamichiFormula } from "./kizamichi-formula";
import { KokujiShikibetsu1Chip } from "./kokuji-shikibetsu1-chip";
import { OthersSection } from "./others-section";
import { SectionHeading } from "./section-heading";
import { ShinryoukouiTable } from "./shinryoukoui-table";
import { ShisetsukijunList } from "./shisetsukijun-list";
import { SubHeading } from "./sub-heading";

export type DetailBasicTabProps = {
  row: string[];
  rows: string[][];
};

export function ShinryoukouiBasicTab({ row, rows }: DetailBasicTabProps) {
  const kubunBangou = shinryoukouiMasterVirtualFields.区分番号.value(row);
  const ageAdditionalFeeData = getAgeAdditionalFeeData(row);
  const 告示等識別区分 = getValue(row, getField("告示等識別区分（１）"));
  const is基本項目 = 告示等識別区分 === "1" || 告示等識別区分 === "3" || 告示等識別区分 === "5";

  return (
    <>
      <section className="mb-4">
        <HStack className="mb-2 gap-2">
          {kubunBangou !== "-" && <ColorChip color={getKubunBangouColor(kubunBangou)} >{kubunBangou}</ColorChip>}
          <KokujiShikibetsu1Chip row={row} />
        </HStack>
        <div>
          <span className="text-slate-500">{getValue(row, getField("診療行為コード"))}</span>
          <span className="text-slate-300 text-lg"> | </span>
          <span className="text-lg">{getValue(row, getField("基本漢字名称"))}</span>
        </div>
        {getValue(row, getField("基本漢字名称")) !== getValue(row, getField("診療行為省略名称/省略漢字名称")) &&
          (<div className="text-sm my-1 text-slate-500">
            略称: {getValue(row, getField("診療行為省略名称/省略漢字名称"))}
          </div>)
        }
      </section>

      <section>
        <SectionHeading>基本情報</SectionHeading>
        <HStack>
          <SplitChip label="告示等識別区分（１）">
            {formatCodeValue(row, getField("告示等識別区分（１）"))}
          </SplitChip>
          <SplitChip label="告示等識別区分（２）">
            {formatCodeValue(row, getField("告示等識別区分（２）"))}
          </SplitChip>
          {getValue(row, getField("異動関連")) !== "0" &&
            (<SplitChip label="異動前の診療行為コード">
              {getValue(row, getField("異動関連"))}
            </SplitChip>)
          }
        </HStack>
      </section>

      <section>
        <SectionHeading>算定可能な状況</SectionHeading>
        <HStack>
          <SplitChip label="入外適用区分">
            {formatCodeValue(row, getField("入外適用区分"))}
          </SplitChip>
          <SplitChip label="病院・診療所区分">
            {formatCodeValue(row, getField("病院・診療所区分"))}
          </SplitChip>
          <SplitChip label="後期高齢者医療適用区分">
            {formatCodeValue(row, getField("後期高齢者医療適用区分"))}
          </SplitChip>
          <SplitChip label="上下限年齢">
            {shinryoukouiMasterVirtualFields.上下限年齢.value(row)}
          </SplitChip>
          <SplitChip label="上限回数">
            {shinryoukouiMasterVirtualFields.上限回数.value(row)}
          </SplitChip>
          <SplitChip label="病床数区分">
            {formatCodeValue(row, getField("病床数区分"))}
          </SplitChip>
          <SplitChip label="ＤＰＣ適用区分">
            {formatCodeValue(row, getField("ＤＰＣ適用区分"))}
          </SplitChip>
        </HStack>
        <ShisetsukijunList row={row} />
      </section>

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
        {is基本項目 && (
          <HStack className="mt-1">
            <SplitChip label="逓減対象区分">
              {formatCodeValue(row, getField("逓減対象区分"))}
            </SplitChip>
          </HStack>
        )}

        {getValue(row, getField("きざみ値/きざみ値計算識別")) === "1" && (
          <div>
            <SubHeading>きざみ値</SubHeading>
            <KizamichiFormula row={row} />
          </div>
        )}
      </section >

      <section>
        <SectionHeading>記録</SectionHeading>
        <HStack>
          <SplitChip label="点数欄集計先識別（入院外）">
            {emptyToHyphen(getTensuuranShuukeisakiShikibetsuLabel(
              getValue(row, getField("点数欄集計先識別（入院外）"))
            ))}
          </SplitChip>
          <SplitChip label="点数欄集計先識/別（入院）">
            {emptyToHyphen(getTensuuranShuukeisakiShikibetsuLabel(
              getValue(row, getField("点数欄集計先識別（入院）"))
            ))}
          </SplitChip>
        </HStack>
        <HStack className="mt-1">
          <SplitChip label="データ規格">
            {getValue(row, getField("データ規格コード")) === "0" ? "数量の記録は不要" : `数量の記録が必要 (単位=${normalizeUnit(getValue(row, getField("データ規格名/漢字名称")))})`}
          </SplitChip>
        </HStack>
      </section>

      {
        getValue(row, getField("注加算/注加算コード")) !== "0" && (
          <section>
            <SectionHeading>注加算</SectionHeading>
            <>
              <HStack>
                <SplitChip label="注加算コード">
                  {getValue(row, getField("注加算/注加算コード"))}
                </SplitChip>
                <SplitChip label="注加算通番">
                  {getValue(row, getField("注加算/注加算通番"))}
                </SplitChip>
              </HStack>
              <UncontrolledToggle
                label="同じ注加算コードの診療行為..."
                className="mb-4 mt-2"
              >
                {(open) => open && (<ChuukasanTable
                  rows={rows}
                  chuukasanCode={getValue(row, getField("注加算/注加算コード"))}
                  shinryoukouiCodeToHighlight={getValue(row, getField("診療行為コード"))}
                />)
                }
              </UncontrolledToggle>
            </>
          </section>
        )
      }

      {
        ageAdditionalFeeData.length > 0 && (
          <section>
            <SectionHeading>年齢加算</SectionHeading	>
            <AgeAdditionalFeeTable data={ageAdditionalFeeData} originalRows={rows} />
          </section>
        )
      }

      {
        (getValue(row, getField("検査等実施判断区分")) !== "0" ||
          getValue(row, getField("包括対象検査")) !== "0") &&
        (<section>
          <SectionHeading>検査</SectionHeading>
          <HStack>
            <SplitChip label="検査等実施判断区分">
              {formatCodeValue(row, getField("検査等実施判断区分"))}
            </SplitChip>
            <SplitChip label="検査等実施判断グループ区分">
              {formatCodeValue(row, getField("検査等実施判断グループ区分"))}
            </SplitChip>
            {getValue(row, getField("検査等実施判断区分")) === "1" &&
              (<SplitChip label="包括対象検査">
                {formatCodeValue(row, getField("包括対象検査"))}
              </SplitChip>)
            }
          </HStack>
          {getValue(row, getField("検査等実施判断区分")) === "2" && (<UncontrolledToggle
            label="対応する検査等の実施料..."
            className="my-2"
          >
            {(open) => open && (<ShinryoukouiTable rows={rows} filter={[{
              fieldKey: "検査等実施判断区分",
              operator: ":",
              value: "1",
              negative: false,
            }, {
              fieldKey: "検査等実施判断グループ区分",
              operator: ":",
              value: getValue(row, getField("検査等実施判断グループ区分")),
              negative: false,
            }]} />)}
          </UncontrolledToggle>)
          }
          {getValue(row, getField("検査等実施判断区分")) === "1" && (
            <>
              <SubHeading>
                対応する判断料・診断料
              </SubHeading>
              <div className="pb-2">
                <ShinryoukouiTable rows={rows} filter={[{
                  fieldKey: "検査等実施判断区分",
                  operator: ":",
                  value: "2",
                  negative: false,
                }, {
                  fieldKey: "検査等実施判断グループ区分",
                  operator: ":",
                  value: getValue(row, getField("検査等実施判断グループ区分")),
                  negative: false,
                }]} />
              </div>
            </>)}
        </section>
        )
      }
      <OthersSection row={row} />
    </>
  );
}

function emptyToHyphen(value: string | undefined): string {
  return value ? value : "-";
}
