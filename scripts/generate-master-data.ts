// 1. shift_jis -> utf-8
// 2. csv -> tsv
// 3. remove columns after 128th
// 4. place in public/master-data/{s,y}/

import { writeFileSync, readdirSync, readFileSync, mkdirSync, existsSync } from "node:fs";

import * as CSV from "csv-string";

import { getIyakuhinMasterFields } from "../src/features/iyakuhin-master-fields/iyakuhin-master-fields";
import { IYAKUHIN_MASTER_LAYOUTS } from "../src/features/iyakuhin-master-versions/layouts";
import { getShinryoukouiMasterFields } from "../src/features/shinryoukoui-master-fields/shinryoukoui-master-fields";
import { SHINRYOUKOUI_MASTER_LAYOUTS } from "../src/features/shinryoukoui-master-versions/layouts";

type Layout = {
  version: string;
  from: string;
  fieldCount: number;
};

type GenerateOptions = {
  inputDir: string;
  outputDir: string;
  filePattern: RegExp;
  layouts: Layout[];
};

function generateMasterData({ inputDir, outputDir, filePattern, layouts }: GenerateOptions) {
  if (!existsSync(inputDir)) {
    console.warn(`Skip ${inputDir}: not found.`);
    return;
  }
  mkdirSync(outputDir, { recursive: true });

  const files = readdirSync(inputDir);
  for (const file of files) {
    if (!filePattern.test(file)) continue;
    const inputPath = inputDir + file;
    const outputPath = outputDir + file.replace(".csv", ".tsv");
    const buffer = readFileSync(inputPath);
    const text = new TextDecoder("shift_jis").decode(buffer);

    const dateMatch = filePattern.exec(file);
    if (!dateMatch) continue;
    const date = dateMatch[1];
    const layout = layouts.findLast((l) => l.from <= date);
    if (!layout) {
      throw new Error(`No layout found for ${file}`);
    }

    const rows = CSV.parse(text);
    const tsv = rows.map((r) => r.slice(0, layout.fieldCount).join("\t")).join("\n");

    writeFileSync(outputPath, tsv);
    console.log(
      `Generated ${outputPath}. layout: ${layout.version}, date: ${date}, fieldCount: ${layout.fieldCount}`,
    );
  }
}

const shinryoukouiLayouts = SHINRYOUKOUI_MASTER_LAYOUTS.map((l) => {
  const fields = getShinryoukouiMasterFields(l.version);
  return {
    ...l,
    fieldCount: fields[fields.length - 1].seq,
  };
});

const iyakuhinLayouts = IYAKUHIN_MASTER_LAYOUTS.map((l) => {
  const fields = getIyakuhinMasterFields(l.version);
  return {
    ...l,
    fieldCount: fields[fields.length - 1].seq,
  };
});

generateMasterData({
  inputDir: "raw-master-data/s/",
  outputDir: "public/master-data/s/",
  filePattern: /^s_ALL(20\d{6})\.csv$/,
  layouts: shinryoukouiLayouts,
});

generateMasterData({
  inputDir: "raw-master-data/y/",
  outputDir: "public/master-data/y/",
  filePattern: /^y_ALL(20\d{6})\.csv$/,
  layouts: iyakuhinLayouts,
});
