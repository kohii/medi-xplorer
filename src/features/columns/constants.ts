import { getField } from "@/features/shinryoukoui-master-fields/shinryoukoui-master-fields";

import { DisplayColumnConfig } from "./types";

export const DEFAULT_COLUMN_CONFIGS: DisplayColumnConfig[] = [{
  kind: "virtual",
  key: "kubunNo"
}, {
  kind: "normal",
  seq: getField("診療行為コード").seq,
}, {
  kind: "normal",
  seq: getField("診療行為省略名称/省略漢字名称").seq,
}, {
  kind: "normal",
  seq: getField("告示等識別区分（１）").seq,
}, {
  kind: "virtual",
  key: "point",
}, {
  kind: "normal",
  seq: getField("変更年月日").seq,
}];