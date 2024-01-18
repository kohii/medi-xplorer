import { useMemo } from "react";

import { ColorChip } from "@/components/color-chip";
import { DataTableColumn } from "@/components/data-table";
import { DisplayColumnConfig } from "@/features/columns/types";
import { getCodeLabel } from "@/features/fields/get-code-label";
import { getValue } from "@/features/fields/get-values";
import { getFieldBySeq } from "@/features/shinryoukoui-master-fields/shinryoukoui-master-fields";
import { getShinryoukouiMasterVirtualField } from "@/features/shinryoukoui-master-fields/shinryoukoui-master-virtual-field";
import { getNthColorChipColor } from "@/utils/color-chip-color";
import { formatDate } from "@/utils/format-data";


const UNKNOWN_COLUMN: Omit<DataTableColumn, "id"> = {
  name: "(unknown)",
  value: () => "",
  width: 100,
};

export function useTableColumns(displayColumnConfigs: DisplayColumnConfig[]): DataTableColumn[] {
  return useMemo(() => {
    return displayColumnConfigs.map(config => {
      switch (config.kind) {
        case "normal": {
          const { seq } = config;
          const field = getFieldBySeq(seq);
          if (!field) {
            return {
              id: crypto.randomUUID(),
              ...UNKNOWN_COLUMN
            };
          }
          return {
            id: crypto.randomUUID(),
            name: field.shortName ?? field.name,
            value(row: string[]) {
              const value = getValue(row, field);
              return field.mode === "date" ? formatDate(value) : value;
            },
            styledValue: field.codes ? (row: string[]) => {
              const value = getValue(row, field);
              let v: string;
              switch (config.options?.variant ?? "label-with-code") {
                case "label-with-code": {
                  const label = getCodeLabel(row, field, true);
                  if (!label) {
                    v = value;
                  } else {
                    v = value + ": " + label;
                  }
                  break;
                }
                case "label": {
                  v = getCodeLabel(row, field, true) ?? value;
                  break;
                }
                case "code": {
                  v = value;
                  break;
                }
              }
              return <ColorChip color={getNthColorChipColor(+value)}>{v}</ColorChip>;

            } : undefined,
            width: field.columnWidth === "auto" ? undefined : (field.columnWidth ?? 128),
          } satisfies DataTableColumn;
        }
        case "virtual": {
          const { key } = config;
          const field = getShinryoukouiMasterVirtualField(key);
          return {
            id: crypto.randomUUID(),
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
          return {
            id: crypto.randomUUID(),
            ...UNKNOWN_COLUMN
          };
      }
    });
  }, [displayColumnConfigs]);
}