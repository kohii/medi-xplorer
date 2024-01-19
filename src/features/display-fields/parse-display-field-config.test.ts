import { parseDisplayFieldConfigs } from "./parse-display-field-config";

describe("parseDisplayFieldConfigs", () => {
  test("empty", () => {
    const result = parseDisplayFieldConfigs("");
    expect(result).toEqual([]);
  });

  test("normal column", () => {
    const result = parseDisplayFieldConfigs("1");
    expect(result).toEqual([{
      kind: "normal",
      seq: 1
    }]);
  });

  test("normal column with label", () => {
    const result = parseDisplayFieldConfigs("1-l");
    expect(result).toEqual([{
      kind: "normal",
      seq: 1,
      options: {
        variant: "label"
      }
    }]);
  });

  test("normal column with code", () => {
    const result = parseDisplayFieldConfigs("1-c");
    expect(result).toEqual([{
      kind: "normal",
      seq: 1,
      options: {
        variant: "code"
      }
    }]);
  });

  test("virtual column", () => {
    const result = parseDisplayFieldConfigs("kubunNo");
    expect(result).toEqual([{
      kind: "virtual",
      key: "kubunNo"
    }]);
  });

  test("unknown column", () => {
    const result = parseDisplayFieldConfigs("foo");
    expect(result).toEqual([{
      kind: "unknown",
      key: "foo"
    }]);
  });

  test("multiple fields", () => {
    const result = parseDisplayFieldConfigs("1_2_kubunNo");
    expect(result).toEqual([
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
