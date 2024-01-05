import { useMemo } from "react";

import { ColorChip, getNthColorChipColor } from "@/components/color-chip";
import { DataTableColumn } from "@/components/data-table";
import { DisplayColumnConfig } from "@/features/columns/types";
import { getCodeLabel } from "@/features/fields/get-code-label";
import { getValue } from "@/features/fields/get-values";
import { getField, getFieldBySeq } from "@/features/shinryoukoui-master-fields/shinryoukoui-master-fields";
import { getShinryoukouiMasterVirtualField } from "@/features/shinryoukoui-master-fields/shinryoukoui-master-virtual-field";
import { formatDate } from "@/utils/format-data";

const DEFAULT_COLUMN_CONFIGS: DisplayColumnConfig[] = [{
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

const UNKNOWN_COLUMN: DataTableColumn = {
  name: "(unknown)",
  value: () => "",
  width: 100,
};

export function useTableColumns(): DataTableColumn[] {
  return useMemo(() => {
    return DEFAULT_COLUMN_CONFIGS.map(config => {
      switch (config.kind) {
        case "normal": {
          const { seq } = config;
          const field = getFieldBySeq(seq);
          if (!field) {
            return UNKNOWN_COLUMN;
          }
          return {
            name: field.shortName ?? field.name,
            value(row: string[]) {
              const value = getValue(row, field);
              return field.mode === "date" ? formatDate(value) : value;
            },
            styledValue: field.codes ? (row: string[]) => {
              const value = getValue(row, field);
              let v: string;
              switch (config.option?.variant ?? "label-value") {
                case "label-value": {
                  const label = getCodeLabel(row, field, true);
                  v = value + ": " + label;
                  break;
                }
                case "label": {
                  v = getCodeLabel(row, field, true) ?? value;
                  break;
                }
                case "value": {
                  v = value;
                  break;
                }
              }
              return <ColorChip color={getNthColorChipColor(+value)}>{v}</ColorChip>;
            } : undefined,
            width: field.columnWidth,
          } satisfies DataTableColumn;
        }
        case "virtual": {
          const { key } = config;
          const field = getShinryoukouiMasterVirtualField(key);
          return {
            name: field.name,
            value(row: string[]) {
              return field.value(row);
            },
            styledValue(row: string[]) {
              const value = field.value(row);
              const v = value;

              if (field.colorize) {
                const color = field.colorize(value);
                return color ? <ColorChip color={color}>{v}</ColorChip> : v;
              }
              return v;
            },
            width: field.columnWidth,
          } satisfies DataTableColumn;
        }
        case "unknown":
          return UNKNOWN_COLUMN;
      }
    });
  }, []);
}