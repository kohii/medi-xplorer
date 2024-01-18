import { stringifyDisplayColumnConfigs } from "./stringify-display-column-config";

describe("stringifyDisplayColumnConfigs", () => {
  test("empty", () => {
    const result = stringifyDisplayColumnConfigs([]);
    expect(result).toEqual("");
  });

  test("normal column", () => {
    const result = stringifyDisplayColumnConfigs([{
      kind: "normal",
      seq: 1
    }]);
    expect(result).toEqual("1");
  });

  test("normal column with label", () => {
    const result = stringifyDisplayColumnConfigs([{
      kind: "normal",
      seq: 1,
      options: {
        variant: "label"
      }
    }]);
    expect(result).toEqual("1-l");
  });

  test("normal column with code", () => {
    const result = stringifyDisplayColumnConfigs([{
      kind: "normal",
      seq: 1,
      options: {
        variant: "code"
      }
    }]);
    expect(result).toEqual("1-c");
  });

  test("virtual column", () => {
    const result = stringifyDisplayColumnConfigs([{
      kind: "virtual",
      key: "kubunNo"
    }]);
    expect(result).toEqual("kubunNo");
  });

  test("unknown column", () => {
    const result = stringifyDisplayColumnConfigs([{
      kind: "unknown",
      key: "foo"
    }]);
    expect(result).toEqual("foo");
  });

  test("multiple columns", () => {
    const result = stringifyDisplayColumnConfigs([
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
    expect(result).toEqual("1_2_kubunNo");
  });
});
