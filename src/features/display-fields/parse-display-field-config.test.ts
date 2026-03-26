import assert from "node:assert/strict";
import { describe, test } from "node:test";

import { MASTER_IDS } from "@/master-types";

import { parseDisplayFieldConfigs } from "./parse-display-field-config";

describe("parseDisplayFieldConfigs", () => {
  test("empty", () => {
    const result = parseDisplayFieldConfigs("", MASTER_IDS.SHINRYOUKOUI);
    assert.deepEqual(result, []);
  });

  test("normal column", () => {
    const result = parseDisplayFieldConfigs("1", MASTER_IDS.SHINRYOUKOUI);
    assert.deepEqual(result, [
      {
        kind: "normal",
        seq: 1,
      },
    ]);
  });

  test("normal column with label", () => {
    const result = parseDisplayFieldConfigs("1-l", MASTER_IDS.SHINRYOUKOUI);
    assert.deepEqual(result, [
      {
        kind: "normal",
        seq: 1,
        options: {
          variant: "label",
        },
      },
    ]);
  });

  test("normal column with code", () => {
    const result = parseDisplayFieldConfigs("1-c", MASTER_IDS.SHINRYOUKOUI);
    assert.deepEqual(result, [
      {
        kind: "normal",
        seq: 1,
        options: {
          variant: "code",
        },
      },
    ]);
  });

  test("virtual column", () => {
    const result = parseDisplayFieldConfigs("kubunNo", MASTER_IDS.SHINRYOUKOUI);
    assert.deepEqual(result, [
      {
        kind: "virtual",
        key: "kubunNo",
      },
    ]);
  });

  test("unknown column", () => {
    const result = parseDisplayFieldConfigs("foo", MASTER_IDS.SHINRYOUKOUI);
    assert.deepEqual(result, [
      {
        kind: "unknown",
        key: "foo",
      },
    ]);
  });

  test("multiple fields", () => {
    const result = parseDisplayFieldConfigs("1_2_kubunNo", MASTER_IDS.SHINRYOUKOUI);
    assert.deepEqual(result, [
      {
        kind: "normal",
        seq: 1,
      },
      {
        kind: "normal",
        seq: 2,
      },
      {
        kind: "virtual",
        key: "kubunNo",
      },
    ]);
  });

  test("iyakuhin virtual column", () => {
    const result = parseDisplayFieldConfigs("yakka", MASTER_IDS.IYAKUHIN);
    assert.deepEqual(result, [
      {
        kind: "virtual",
        key: "yakka",
      },
    ]);
  });
});
