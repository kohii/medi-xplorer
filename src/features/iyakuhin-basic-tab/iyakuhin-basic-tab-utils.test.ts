import assert from "node:assert/strict";
import { describe, test } from "node:test";

import { getField } from "@/features/iyakuhin-master-fields/iyakuhin-master-fields";

import {
  formatCodeValue,
  formatOptionalDate,
  formatYakka,
  getIyakuhinBasicTabSummary,
  getRelatedSelectionRows,
  getRelatedUnifiedNameRow,
  getSelectionCategoryLabel,
  getShortListingLabel,
  hasBunruiKisei,
  hasOptionalDateValue,
} from "./iyakuhin-basic-tab-utils";

type IyakuhinFieldName = Parameters<typeof getField>[0];
const codeField = getField("医薬品コード");

function createRow(values: Partial<Record<IyakuhinFieldName, string>>): string[] {
  const row: string[] = [];
  for (const [name, value] of Object.entries(values)) {
    row[getField(name as IyakuhinFieldName).seq - 1] = value;
  }
  return row;
}

describe("iyakuhin-basic-tab-utils", () => {
  test("format helpers", () => {
    assert.equal(formatYakka(""), "-");
    assert.equal(formatYakka("0"), "-");
    assert.equal(formatYakka("123"), "123円");

    assert.equal(hasOptionalDateValue(""), false);
    assert.equal(hasOptionalDateValue("0"), false);
    assert.equal(hasOptionalDateValue("99999999"), false);
    assert.equal(hasOptionalDateValue("20240101"), true);
    assert.equal(formatOptionalDate("20240101"), "2024-01-01");

    assert.equal(getShortListingLabel("1"), "局方品");
    assert.equal(getShortListingLabel("8"), "統一名収載品");
    assert.equal(getShortListingLabel("9"), "-");

    assert.equal(getSelectionCategoryLabel("1"), "医療上必要があると認める場合等");
    assert.equal(getSelectionCategoryLabel("2"), "患者希望");
    assert.equal(getSelectionCategoryLabel("0"), "-");
  });

  test("formatCodeValue", () => {
    const row = createRow({
      "後発品": "1",
    });

    assert.equal(formatCodeValue(row, getField("後発品")), "1: 後発医薬品");
  });

  test("related rows", () => {
    const currentRow = createRow({
      "医薬品コード": "100000001",
      "選定療養区分": "1",
      "長期収載品関連": "200000001",
      "商品名等関連": "300000001",
    });
    const selectedRow = createRow({
      "医薬品コード": "200000001",
      "長期収載品関連": "100000001",
    });
    const unifiedRow = createRow({
      "医薬品コード": "300000001",
    });
    const unrelatedRow = createRow({
      "医薬品コード": "400000001",
      "長期収載品関連": "999999999",
    });
    const rows = [selectedRow, unifiedRow, unrelatedRow];
    const getRowByCode = (code: string) => rows.find((row) => row[codeField.seq - 1] === code);

    assert.deepEqual(
      getRelatedSelectionRows(currentRow, rows, getRowByCode),
      [selectedRow],
    );
    assert.deepEqual(
      getRelatedUnifiedNameRow(currentRow, getRowByCode),
      unifiedRow,
    );

    const selectionByRelatedDrug = createRow({
      "医薬品コード": "100000001",
      "選定療養区分": "2",
      "長期収載品関連": "300000001",
    });

    assert.deepEqual(
      getRelatedSelectionRows(selectionByRelatedDrug, rows, getRowByCode),
      [unifiedRow],
    );
  });

  test("summary and flags", () => {
    const row = createRow({
      "医薬品コード": "100000001",
      "医薬品名・規格名/漢字名称": "テスト薬",
      "基本漢字名称": "基本テスト薬",
      "新又は現金額/金額種別": "1",
      "旧金額/金額種別": "1",
      "注射容量": "0010",
      "一般名処方の標準的な記載": "  一般名  ",
      "選定療養区分": "1",
      "商品名等関連": "300000001",
      "薬価基準収載年月日": "20240101",
      "経過措置年月日又は商品名医薬品コード使用期限": "99999999",
      "後発品": "1",
      "抗ＨＩＶ薬区分": "1",
    });

    assert.deepEqual(getIyakuhinBasicTabSummary(row), {
      code: "100000001",
      kanjiMeisho: "テスト薬",
      kihonKanjiMeisho: "基本テスト薬",
      kinyuShubetsu: "1",
      kyuKinyuShubetsu: "1",
      chushaYoryo: "0010",
      ippanmeiKisai: "一般名",
      senryouyouKubun: "1",
      shouhinmeiTouKanren: "300000001",
      yakkaKijunShuusaiDate: "20240101",
      keikaSochiDate: "99999999",
    });
    assert.equal(hasBunruiKisei(row), true);
  });
});
