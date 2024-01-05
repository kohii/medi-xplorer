import { ShinryoukouiMasterVirtualFieldId } from "@/features/shinryoukoui-master-fields/shinryoukoui-master-virtual-field";

export type DisplayColumnConfig = {
  kind: "normal";
  seq: number;
  option?: {
    showLabel?: boolean;
    showValue?: boolean;
    colorize?: boolean;
  }
} | {
  kind: "virtual";
  key: ShinryoukouiMasterVirtualFieldId;
  option?: {
    colorize?: boolean;
  }
}