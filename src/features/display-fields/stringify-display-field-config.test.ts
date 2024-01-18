import { stringifyDisplayFieldConfigs } from "./stringify-display-field-config";

describe("stringifyDisplayFieldConfigs", () => {
  test("empty", () => {
    const result = stringifyDisplayFieldConfigs([]);
    expect(result).toEqual("");
  });

  test("normal field", () => {
    const result = stringifyDisplayFieldConfigs([{
      kind: "normal",
      seq: 1
    }]);
    expect(result).toEqual("1");
  });

  test("normal field with label", () => {
    const result = stringifyDisplayFieldConfigs([{
      kind: "normal",
      seq: 1,
      options: {
        variant: "label"
      }
    }]);
    expect(result).toEqual("1-l");
  });

  test("normal field with code", () => {
    const result = stringifyDisplayFieldConfigs([{
      kind: "normal",
      seq: 1,
      options: {
        variant: "code"
      }
    }]);
    expect(result).toEqual("1-c");
  });

  test("virtual field", () => {
    const result = stringifyDisplayFieldConfigs([{
      kind: "virtual",
      key: "kubunNo"
    }]);
    expect(result).toEqual("kubunNo");
  });

  test("unknown field", () => {
    const result = stringifyDisplayFieldConfigs([{
      kind: "unknown",
      key: "foo"
    }]);
    expect(result).toEqual("foo");
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
    expect(result).toEqual("1_2_kubunNo");
  });
});
