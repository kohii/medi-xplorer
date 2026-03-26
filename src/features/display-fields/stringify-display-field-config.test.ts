import assert from "node:assert/strict";
import { describe, test } from "node:test";

import { MASTER_IDS } from "@/master-types";

import { stringifyDisplayFieldConfigs } from "./stringify-display-field-config";

describe("stringifyDisplayFieldConfigs", () => {
  test("empty", () => {
    const result = stringifyDisplayFieldConfigs(MASTER_IDS.SHINRYOUKOUI, []);
    assert.equal(result, "");
  });

  test("normal field", () => {
    const result = stringifyDisplayFieldConfigs(MASTER_IDS.SHINRYOUKOUI, [
      {
        kind: "normal",
        seq: 1,
      },
    ]);
    assert.equal(result, "1");
  });

  test("normal field with label", () => {
    const result = stringifyDisplayFieldConfigs(MASTER_IDS.SHINRYOUKOUI, [
      {
        kind: "normal",
        seq: 1,
        options: {
          variant: "label",
        },
      },
    ]);
    assert.equal(result, "1-l");
  });

  test("normal field with code", () => {
    const result = stringifyDisplayFieldConfigs(MASTER_IDS.SHINRYOUKOUI, [
      {
        kind: "normal",
        seq: 1,
        options: {
          variant: "code",
        },
      },
    ]);
    assert.equal(result, "1-c");
  });

  test("virtual field", () => {
    const result = stringifyDisplayFieldConfigs(MASTER_IDS.SHINRYOUKOUI, [
      {
        kind: "virtual",
        key: "kubunNo",
      },
    ]);
    assert.equal(result, "kubunNo");
  });

  test("unknown field", () => {
    const result = stringifyDisplayFieldConfigs(MASTER_IDS.SHINRYOUKOUI, [
      {
        kind: "unknown",
        key: "foo",
      },
    ]);
    assert.equal(result, "foo");
  });

  test("multiple fields", () => {
    const result = stringifyDisplayFieldConfigs(MASTER_IDS.SHINRYOUKOUI, [
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
    assert.equal(result, "1_2_kubunNo");
  });

  test("iyakuhin virtual field", () => {
    const result = stringifyDisplayFieldConfigs(MASTER_IDS.IYAKUHIN, [
      {
        kind: "virtual",
        key: "yakka",
      },
    ]);
    assert.equal(result, "yakka");
  });
});
