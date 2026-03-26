import { useCallback, useMemo } from "react";

import { getMasterFieldBySeq } from "@/features/fields/master-field-resolver";
import { getMasterVirtualField } from "@/features/fields/master-virtual-field-resolver";
import { MasterId } from "@/master-types";
import { assertUnreachable } from "@/utils/assert-unreachable";
import { copyToClipboard } from "@/utils/clipboard";
import { createCsv } from "@/utils/csv";

import { DisplayFieldConfig } from "../display-fields/types";
import { getCodeLabel } from "../fields/get-code-label";
import { getValue } from "../fields/get-values";

import { ExportOptions } from "./types";

export function useExportData(
  masterId: MasterId,
  rows: string[][],
  fields: DisplayFieldConfig[],
  options: ExportOptions,
) {
  const stringifyRows = useCallback(() => {
    let data: string[][] = rows.map((row) => {
      return fields.map(f => {
        switch (f.kind) {
          case "normal": {
            const { seq, options: option } = f;
            const field = getMasterFieldBySeq(masterId, seq)!;

            if (field.codes) {
              const variant = option?.variant ?? "label-with-code";
              if (variant === "label") {
                return getCodeLabel(row, field) ?? "";
              }
              if (variant === "code") {
                return getValue(row, field);
              }
              return `${getValue(row, field)}: ${getCodeLabel(row, field)}`;
            }
            return getValue(row, field);
          }
          case "virtual": {
            const { key } = f;
            const field = getMasterVirtualField(masterId, key)!;
            return field.value(row);
          }
          case "unknown": {
            return "(unknown)";
          }
          default:
            assertUnreachable(f);
        }
      });
    });
    if (options.includeHeader) {
      const headerData: string[] = fields.map(f => {
        switch (f.kind) {
          case "normal": {
            const field = getMasterFieldBySeq(masterId, f.seq);
            return field?.name ?? "";
          }
          case "virtual": {
            const { key } = f;
            const field = getMasterVirtualField(masterId, key)!;
            return field.name;
          }
          case "unknown": {
            return "(unknown)";
          }
          default:
            assertUnreachable(f);
        }
      });
      data = [headerData, ...data];
    }

    return createCsv({
      rowCount() {
        return data.length;
      },
      columnCount() {
        return fields.length;
      },
      getValue(r, c) {
        return data[r][c];
      },
    }, options);
  }, [fields, masterId, options, rows]);

  return useMemo(() => {
    return {
      download() {
        const csv = stringifyRows();
        const blob = new Blob([csv], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "data.csv";
        a.click();
      },
      async copy() {
        const csv = stringifyRows();
        await copyToClipboard(csv);
      }
    };
  }, [stringifyRows]);
}
