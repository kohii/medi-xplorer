import assert from "node:assert/strict";
import { describe, test } from "node:test";

import { stringifyDisplayFieldConfigs } from "./stringify-display-field-config";

describe("stringifyDisplayFieldConfigs", () => {
  test("empty", () => {
    const result = stringifyDisplayFieldConfigs([]);
    assert.equal(result, "");
  });

  test("normal field", () => {
    const result = stringifyDisplayFieldConfigs([{
      kind: "normal",
      seq: 1
    }]);
    assert.equal(result, "1");
  });

  test("normal field with label", () => {
    const result = stringifyDisplayFieldConfigs([{
      kind: "normal",
      seq: 1,
      options: {
        variant: "label"
      }
    }]);
    assert.equal(result, "1-l");
  });

  test("normal field with code", () => {
    const result = stringifyDisplayFieldConfigs([{
      kind: "normal",
      seq: 1,
      options: {
        variant: "code"
      }
    }]);
    assert.equal(result, "1-c");
  });

  test("virtual field", () => {
    const result = stringifyDisplayFieldConfigs([{
      kind: "virtual",
      key: "kubunNo"
    }]);
    assert.equal(result, "kubunNo");
  });

  test("unknown field", () => {
    const result = stringifyDisplayFieldConfigs([{
      kind: "unknown",
      key: "foo"
    }]);
    assert.equal(result, "foo");
  });

  test("multiple fields", () => {
    const result = stringifyDisplayFieldConfigs([
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
    assert.equal(result, "1_2_kubunNo");
  });
});
