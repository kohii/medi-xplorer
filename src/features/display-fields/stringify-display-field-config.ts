import { getMasterFieldBySeq } from "@/features/fields/master-field-resolver";
import { MasterId } from "@/master-types";
import { assertUnreachable } from "@/utils/assert-unreachable";

import { DisplayFieldConfig } from "./types";

function stringifyDisplayFieldConfig(masterId: MasterId, config: DisplayFieldConfig): string {
  switch (config.kind) {
    case "normal": {
      const { seq, options: option } = config;
      const field = getMasterFieldBySeq(masterId, seq);

      if (field?.codes) {
        const variant = option?.variant ?? "label-with-code";
        if (variant === "label") {
          return `${seq}-l`;
        }
        if (variant === "code") {
          return `${seq}-c`;
        }
      }
      return `${seq}`;
    }
    case "virtual": {
      const { key } = config;
      return `${key}`;
    }
    case "unknown": {
      const { key } = config;
      return `${key}`;
    }
    default:
      assertUnreachable(config);
  }
}

export function stringifyDisplayFieldConfigs(
  masterId: MasterId,
  displayFields: DisplayFieldConfig[],
): string {
  return displayFields.map((field) => stringifyDisplayFieldConfig(masterId, field)).join("_");
}
