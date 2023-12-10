import { Parser } from "csv-string/dist/Parser";

export function parseCsv(text: string): string[][] {
  const csv = new Parser(text);
  return csv.File();
}