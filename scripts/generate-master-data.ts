// 1. shift_jis -> utf-8
// 2. csv -> tsv
// 3. remove columns after 128th
// 4. place in public/master-data/s/

import { writeFileSync, readdirSync, readFileSync, mkdirSync } from "node:fs";

import * as CSV from "csv-string";

import { getShinryoukouiMasterFields } from "../src/features/shinryoukoui-master-fields/shinryoukoui-master-fields";
import { SHINRYOUKOUI_MASTER_LAYOUTS } from "../src/features/shinryoukoui-master-versions/layouts";

const INPUT_DIR = "raw-master-data/s/";
const OUTPUT_DIR = "public/master-data/s/";

const layouts = SHINRYOUKOUI_MASTER_LAYOUTS.map((l) => {
  const fields = getShinryoukouiMasterFields(l.version);
  return {
    ...l,
    fieldCount: fields[fields.length - 1].seq,
  };
});

mkdirSync(OUTPUT_DIR, { recursive: true });

const files = readdirSync(INPUT_DIR);

for (const file of files) {
  const inputPath = INPUT_DIR + file;
  const outputPath = OUTPUT_DIR + file.replace(".csv", ".tsv");
  const buffer = readFileSync(inputPath);
  const text = new TextDecoder("shift_jis").decode(buffer);

  const date = /^s_ALL(20\d{6})\.csv$/.exec(file)![1];
  const layout = layouts.findLast((l) => l.from <= date)!;

  const rows = CSV.parse(text);
  const tsv = rows.map((r) => r.slice(0, layout.fieldCount).join("\t")).join("\n");

  writeFileSync(outputPath, tsv);
  console.log(
    `Generated ${outputPath}. layout: ${layout.version}, date: ${date}, fieldCount: ${layout.fieldCount}`,
  );
}
