// 1. shift_jis -> utf-8
// 2. csv -> tsv
// 3. remove columns after 128th
// 4. place in public/master-data/s/

import { writeFileSync, readdirSync, readFileSync, mkdirSync } from "node:fs";

import * as CSV from "csv-string";

const INPUT_DIR = "raw-master-data/s/";
const OUTPUT_DIR = "public/master-data/s/";

mkdirSync(OUTPUT_DIR, { recursive: true });

const files = readdirSync(INPUT_DIR);

for (const file of files) {
  const inputPath = INPUT_DIR + file;
  const outputPath = OUTPUT_DIR + file.replace(".csv", ".tsv");
  const buffer = readFileSync(inputPath);
  const text = new TextDecoder("shift_jis").decode(buffer);

  const rows = CSV.parse(text);
  const tsv = rows.map((r) => r.slice(0, 127).join("\t")).join("\n");

  writeFileSync(outputPath, tsv);
}
