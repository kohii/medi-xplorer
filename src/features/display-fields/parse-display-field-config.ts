import { getMasterFieldBySeq } from "@/features/fields/master-field-resolver";
import { getMasterVirtualField } from "@/features/fields/master-virtual-field-resolver";
import { MasterId } from "@/master-types";
import { isNumeric } from "@/utils/text";

import { DisplayFieldConfig } from "./types";


function parseDisplayFieldConfig(config: string, masterId: MasterId): DisplayFieldConfig {
  const [key, variant] = config.split("-");
  if (isNumeric(key)) {
    const seq = parseInt(key);
    if (!getMasterFieldBySeq(masterId, seq)) return { kind: "unknown", key };
    if (variant === "l") {
      return { kind: "normal", seq, options: { variant: "label" } };
    }
    if (variant === "c") {
      return { kind: "normal", seq, options: { variant: "code" } };
    }
    return { kind: "normal", seq };
  }
  if (!getMasterVirtualField(masterId, key)) return { kind: "unknown", key };
  return { kind: "virtual", key };
}

export function parseDisplayFieldConfigs(
  configs: string,
  masterId: MasterId,
): DisplayFieldConfig[] {
  if (!configs) return [];
  return configs.split("_").map((config) => parseDisplayFieldConfig(config, masterId));
}
