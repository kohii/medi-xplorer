import { ShinryoukouiMasterVirtualFieldId } from "@/features/shinryoukoui-master-fields/shinryoukoui-master-virtual-field";

export type DisplayColumnConfig = {
  kind: "normal";
  seq: number;
  option?: {
    variant?: "label-value" | "label" | "value";
  }
} | {
  kind: "virtual";
  key: ShinryoukouiMasterVirtualFieldId;
} | {
  kind: "unknown";
  key: string;
}
