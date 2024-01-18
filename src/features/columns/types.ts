import { ShinryoukouiMasterVirtualFieldId } from "@/features/shinryoukoui-master-fields/shinryoukoui-master-virtual-field";

export type CodeValueVariant = "label-with-code" | "label" | "code";

export type DisplayColumnConfig = {
  kind: "normal";
  seq: number;
  options?: {
    variant?: CodeValueVariant;
  }
} | {
  kind: "virtual";
  key: ShinryoukouiMasterVirtualFieldId;
} | {
  kind: "unknown";
  key: string;
}

// for internal use
export type IdentifiedDisplayColumnConfig = DisplayColumnConfig & { id: string };