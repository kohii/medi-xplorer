import { isNumeric } from "@/utils/text";

import { getFieldBySeq } from "../shinryoukoui-master-fields/shinryoukoui-master-fields";
import { ShinryoukouiMasterVirtualFieldId, getShinryoukouiMasterVirtualField } from "../shinryoukoui-master-fields/shinryoukoui-master-virtual-field";

import { DisplayFieldConfig } from "./types";


function parseDisplayFieldConfig(config: string): DisplayFieldConfig {
  const [key, variant] = config.split("-");
  if (isNumeric(key)) {
    const seq = parseInt(key);
    if (!getFieldBySeq(seq)) return { kind: "unknown", key };
    if (variant === "l") {
      return { kind: "normal", seq, options: { variant: "label" } };
    }
    if (variant === "c") {
      return { kind: "normal", seq, options: { variant: "code" } };
    }
    return { kind: "normal", seq };
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!getShinryoukouiMasterVirtualField(key as any)) return { kind: "unknown", key };
  return { kind: "virtual", key: key as ShinryoukouiMasterVirtualFieldId };
}

export function parseDisplayFieldConfigs(configs: string): DisplayFieldConfig[] {
  if (!configs) return [];
  return configs.split("_").map(parseDisplayFieldConfig);
}
