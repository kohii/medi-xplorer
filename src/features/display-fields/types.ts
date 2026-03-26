export type CodeValueVariant = "label-with-code" | "label" | "code";

export type DisplayFieldConfig = {
  kind: "normal";
  seq: number;
  options?: {
    variant?: CodeValueVariant;
  }
} | {
  kind: "virtual";
  key: string;
} | {
  kind: "unknown";
  key: string;
}

// for internal use
export type IdentifiedDisplayFieldConfig = DisplayFieldConfig & { id: string };
