import { getField as getIyakuhinField } from "@/features/iyakuhin-master-fields/iyakuhin-master-fields";
import { getField as getShinryoukouiField } from "@/features/shinryoukoui-master-fields/shinryoukoui-master-fields";
import { MASTER_IDS, MasterId } from "@/master-types";

import { DisplayFieldConfig } from "./types";

export const DEFAULT_DISPLAY_FIELDS_BY_MASTER_ID: Record<MasterId, DisplayFieldConfig[]> = {
  [MASTER_IDS.SHINRYOUKOUI]: [
    {
      kind: "virtual",
      key: "kubunNo",
    },
    {
      kind: "normal",
      seq: getShinryoukouiField("診療行為コード").seq,
    },
    {
      kind: "normal",
      seq: getShinryoukouiField("診療行為省略名称/省略漢字名称").seq,
    },
    {
      kind: "normal",
      seq: getShinryoukouiField("告示等識別区分（１）").seq,
    },
    {
      kind: "virtual",
      key: "point",
    },
    {
      kind: "normal",
      seq: getShinryoukouiField("変更年月日").seq,
    },
  ],
  [MASTER_IDS.IYAKUHIN]: [
    {
      kind: "normal",
      seq: getIyakuhinField("医薬品コード").seq,
    },
    {
      kind: "normal",
      seq: getIyakuhinField("医薬品名・規格名/漢字名称").seq,
    },
    {
      kind: "normal",
      seq: getIyakuhinField("一般名処方の標準的な記載").seq,
    },
    {
      kind: "normal",
      seq: getIyakuhinField("剤形").seq,
      options: {
        variant: "label",
      },
    },
    {
      kind: "normal",
      seq: getIyakuhinField("単位漢字名称").seq,
    },
    {
      kind: "virtual",
      key: "yakka",
    },
    {
      kind: "virtual",
      key: "features",
    },
  ],
};

export function getDefaultDisplayFields(masterId: MasterId): DisplayFieldConfig[] {
  return DEFAULT_DISPLAY_FIELDS_BY_MASTER_ID[masterId];
}
