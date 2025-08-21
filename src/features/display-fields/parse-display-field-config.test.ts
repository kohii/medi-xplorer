import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { parseDisplayFieldConfigs } from "./parse-display-field-config";

describe("parseDisplayFieldConfigs", () => {
  test("empty", () => {
    const result = parseDisplayFieldConfigs("");
    assert.deepEqual(result, []);
  });

  test("normal column", () => {
    const result = parseDisplayFieldConfigs("1");
    assert.deepEqual(result, [{
      kind: "normal",
      seq: 1
    }]);
  });

  test("normal column with label", () => {
    const result = parseDisplayFieldConfigs("1-l");
    assert.deepEqual(result, [{
      kind: "normal",
      seq: 1,
      options: {
        variant: "label"
      }
    }]);
  });

  test("normal column with code", () => {
    const result = parseDisplayFieldConfigs("1-c");
    assert.deepEqual(result, [{
      kind: "normal",
      seq: 1,
      options: {
        variant: "code"
      }
    }]);
  });

  test("virtual column", () => {
    const result = parseDisplayFieldConfigs("kubunNo");
    assert.deepEqual(result, [{
      kind: "virtual",
      key: "kubunNo"
    }]);
  });

  test("unknown column", () => {
    const result = parseDisplayFieldConfigs("foo");
    assert.deepEqual(result, [{
      kind: "unknown",
      key: "foo"
    }]);
  });

  test("multiple fields", () => {
    const result = parseDisplayFieldConfigs("1_2_kubunNo");
    assert.deepEqual(result, [
      {
        kind: "normal",
        seq: 1
      },
      {
        kind: "normal",
        seq: 2
      },
      {
        kind: "virtual",
        key: "kubunNo"
      }
    ]);
  });
});
