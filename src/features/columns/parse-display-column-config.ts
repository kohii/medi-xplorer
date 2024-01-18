import { isNumeric } from "@/utils/text";

import { getFieldBySeq } from "../shinryoukoui-master-fields/shinryoukoui-master-fields";
import { ShinryoukouiMasterVirtualFieldId, getShinryoukouiMasterVirtualField } from "../shinryoukoui-master-fields/shinryoukoui-master-virtual-field";

import { DisplayColumnConfig } from "./types";


function parseDisplayColumnConfig(config: string): DisplayColumnConfig {
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

export function parseDisplayColumnConfigs(configs: string): DisplayColumnConfig[] {
  if (!configs) return [];
  return configs.split("_").map(parseDisplayColumnConfig);
}
