import { useMemo } from "react";

import { ColorChip } from "@/components/color-chip";
import { DataTableColumn } from "@/components/data-table";
import { DisplayFieldConfig } from "@/features/display-fields/types";
import { getCodeLabel } from "@/features/fields/get-code-label";
import { getValue } from "@/features/fields/get-values";
import { getMasterFieldBySeq } from "@/features/fields/master-field-resolver";
import { getMasterVirtualField } from "@/features/fields/master-virtual-field-resolver";
import { MasterId } from "@/master-types";
import { getNthColorChipColor } from "@/utils/color-chip-color";
import { formatDate } from "@/utils/format-data";

function getColumnId(config: DisplayFieldConfig): string {
  switch (config.kind) {
    case "normal":
      return `normal:${config.seq}:${config.options?.variant ?? "label-with-code"}`;
    case "virtual":
      return `virtual:${config.key}`;
    case "unknown":
      return `unknown:${config.key}`;
  }
}

const UNKNOWN_COLUMN: Omit<DataTableColumn, "id"> = {
  name: "(unknown)",
  value: () => "",
  width: 100,
};

export function useDisplayTableColumns(
  masterId: MasterId,
  displayFieldConfigs: DisplayFieldConfig[],
): DataTableColumn[] {
  return useMemo(() => {
    return displayFieldConfigs.map((config) => {
      switch (config.kind) {
        case "normal": {
          const field = getMasterFieldBySeq(masterId, config.seq);
          if (!field) {
            return {
              id: getColumnId(config),
              ...UNKNOWN_COLUMN,
            };
          }
          return {
            id: getColumnId(config),
            name: field.shortName ?? field.name,
            value(row: string[]) {
              const value = getValue(row, field);
              return field.mode === "date" ? formatDate(value) : value;
            },
            styledValue: field.codes
              ? (row: string[]) => {
                  const value = getValue(row, field);
                  let displayValue: string;
                  switch (config.options?.variant ?? "label-with-code") {
                    case "label-with-code": {
                      const label = getCodeLabel(row, field, true);
                      displayValue = label ? `${value}: ${label}` : value;
                      break;
                    }
                    case "label":
                      displayValue = getCodeLabel(row, field, true) ?? value;
                      break;
                    case "code":
                      displayValue = value;
                      break;
                  }
                  return <ColorChip color={getNthColorChipColor(+value)}>{displayValue}</ColorChip>;
                }
              : undefined,
            width: field.columnWidth === "auto" ? undefined : (field.columnWidth ?? 128),
          } satisfies DataTableColumn;
        }
        case "virtual": {
          const field = getMasterVirtualField(masterId, config.key);
          if (!field) {
            return {
              id: getColumnId(config),
              ...UNKNOWN_COLUMN,
            };
          }
          return {
            id: getColumnId(config),
            name: field.name,
            value(row: string[]) {
              return field.value(row);
            },
            styledValue(row: string[]) {
              if (field.render) {
                return field.render(row);
              }

              const value = field.value(row);
              if (field.colorize) {
                const color = field.colorize(value);
                return color ? <ColorChip color={color}>{value}</ColorChip> : value;
              }
              return value;
            },
            width: field.columnWidth,
          } satisfies DataTableColumn;
        }
        case "unknown":
          return {
            id: getColumnId(config),
            ...UNKNOWN_COLUMN,
          };
      }
    });
  }, [displayFieldConfigs, masterId]);
}
