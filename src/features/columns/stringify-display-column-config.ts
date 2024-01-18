import { assertUnreachable } from "@/utils/assert-unreachable";

import { getFieldBySeq } from "../shinryoukoui-master-fields/shinryoukoui-master-fields";

import { DisplayColumnConfig } from "./types";

function stringifyDisplayColumnConfig(config: DisplayColumnConfig): string {
  switch (config.kind) {
    case "normal": {
      const { seq, options: option } = config;
      const field = getFieldBySeq(seq);

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

export function stringifyDisplayColumnConfigs(displayColumns: DisplayColumnConfig[]): string {
  return displayColumns.map(stringifyDisplayColumnConfig).join("_");
}
