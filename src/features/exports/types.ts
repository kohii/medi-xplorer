import { CsvOptions } from "@/utils/csv";

export type ExportOptions = CsvOptions & {
  includeHeader: boolean;
}
