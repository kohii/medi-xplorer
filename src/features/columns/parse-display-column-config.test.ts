import { parseDisplayColumnConfigs } from "./parse-display-column-config";

describe("parseDisplayColumnConfigs", () => {
  test("empty", () => {
    const result = parseDisplayColumnConfigs("");
    expect(result).toEqual([]);
  });

  test("normal column", () => {
    const result = parseDisplayColumnConfigs("1");
    expect(result).toEqual([{
      kind: "normal",
      seq: 1
    }]);
  });

  test("normal column with label", () => {
    const result = parseDisplayColumnConfigs("1-l");
    expect(result).toEqual([{
      kind: "normal",
      seq: 1,
      options: {
        variant: "label"
      }
    }]);
  });

  test("normal column with code", () => {
    const result = parseDisplayColumnConfigs("1-c");
    expect(result).toEqual([{
      kind: "normal",
      seq: 1,
      options: {
        variant: "code"
      }
    }]);
  });

  test("virtual column", () => {
    const result = parseDisplayColumnConfigs("kubunNo");
    expect(result).toEqual([{
      kind: "virtual",
      key: "kubunNo"
    }]);
  });

  test("unknown column", () => {
    const result = parseDisplayColumnConfigs("foo");
    expect(result).toEqual([{
      kind: "unknown",
      key: "foo"
    }]);
  });

  test("multiple columns", () => {
    const result = parseDisplayColumnConfigs("1_2_kubunNo");
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
