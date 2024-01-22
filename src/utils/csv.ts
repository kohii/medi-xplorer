export type CsvOptions = {
  delimiter: "," | "\t";
  quoteWhen: "always" | "auto" | "never";
  rowDelimiter: "\n" | "\r\n";
};

export interface CsvDataSource {
  rowCount(): number;
  columnCount(rowIndex: number): number;
  getValue(r: number, c: number): string;
}

export class SimpleCsvDataSource implements CsvDataSource {
  data: string[][];

  constructor(data: string[][]) {
    this.data = data;
  }

  rowCount(): number {
    return this.data.length;
  }

  columnCount(rowIndex: number): number {
    return this.data[rowIndex]?.length ?? 0;
  }

  getValue(r: number, c: number): string {
    return this.data[r]?.[c] ?? "";
  }
}

export function createCsv(data: CsvDataSource, options: CsvOptions): string {
  let text = "";
  for (let r = 0, rowCount = data.rowCount(); r < rowCount; r++) {
    if (r !== 0) {
      text += options.rowDelimiter;
    }
    for (let c = 0, columnCount = data.columnCount(r); c < columnCount; c++) {
      if (c !== 0) {
        text += options.delimiter;
      }
      text += applyQuote(data.getValue(r, c), options);
    }
  }
  return text;
}

export function createCsvLine(rowData: string[], options: CsvOptions): string {
  let text = "";
  for (let c = 0, columnCount = rowData.length; c < columnCount; c++) {
    if (c !== 0) {
      text += options.delimiter;
    }
    text += applyQuote(rowData[c]!, options);
  }
  return text;
}

const newLines = /\r?\n/g;

function applyQuote(s: string, options: CsvOptions) {
  let doQuote: boolean;
  switch (options.quoteWhen) {
    case "always":
      doQuote = true;
      break;
    case "auto":
      doQuote = Boolean(s) && (s.includes(options.delimiter) || newLines.test(s));
      break;
    case "never":
    default:
      doQuote = false;
  }
  if (!doQuote) {
    return s;
  }
  return '"' + escapeQuote(s, '"') + '"';
}

function escapeQuote(s: string, quote: string | undefined) {
  if (!quote) return s;
  return s.replaceAll(quote, quote + quote);
}
