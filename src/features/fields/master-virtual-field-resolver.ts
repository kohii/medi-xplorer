import {
  getIyakuhinMasterVirtualField,
  iyakuhinMasterVirtualFields,
} from "@/features/iyakuhin-master-fields/iyakuhin-master-virtual-field";
import {
  getShinryoukouiMasterVirtualField,
  shinryoukouiMasterVirtualFields,
} from "@/features/shinryoukoui-master-fields/shinryoukoui-master-virtual-field";
import { MASTER_IDS, MasterId } from "@/master-types";

import { VirtualField } from "./virtual-field";

export function getMasterVirtualFields(masterId: MasterId): Record<string, VirtualField> {
  if (masterId === MASTER_IDS.IYAKUHIN) {
    return iyakuhinMasterVirtualFields;
  }
  return shinryoukouiMasterVirtualFields;
}

export function getMasterVirtualField(
  masterId: MasterId,
  key: string,
): VirtualField | undefined {
  if (masterId === MASTER_IDS.IYAKUHIN) {
    return getIyakuhinMasterVirtualField(key as keyof typeof iyakuhinMasterVirtualFields);
  }
  return getShinryoukouiMasterVirtualField(
    key as keyof typeof shinryoukouiMasterVirtualFields,
  );
}
