import {
  getFieldBySeq as getIyakuhinFieldBySeq,
  getFieldOrUndefined as getIyakuhinFieldOrUndefined,
  getIyakuhinMasterFields,
} from "@/features/iyakuhin-master-fields/iyakuhin-master-fields";
import {
  getFieldBySeq as getShinryoukouiFieldBySeq,
  getFieldOrUndefined as getShinryoukouiFieldOrUndefined,
  getShinryoukouiMasterFields,
} from "@/features/shinryoukoui-master-fields/shinryoukoui-master-fields";
import { MASTER_IDS, MasterId } from "@/master-types";

import { Field } from "./types";

export function getMasterFields(masterId: MasterId, layoutVersion: string): Field[] {
  if (masterId === MASTER_IDS.IYAKUHIN) {
    return getIyakuhinMasterFields(layoutVersion as "2024");
  }
  return getShinryoukouiMasterFields(layoutVersion as "2022" | "2024");
}

export function getMasterFieldByName(masterId: MasterId, name: string): Field | undefined {
  if (masterId === MASTER_IDS.IYAKUHIN) {
    return getIyakuhinFieldOrUndefined(name);
  }
  return getShinryoukouiFieldOrUndefined(name);
}

export function getMasterFieldBySeq(masterId: MasterId, seq: number): Field | undefined {
  if (masterId === MASTER_IDS.IYAKUHIN) {
    return getIyakuhinFieldBySeq(seq);
  }
  return getShinryoukouiFieldBySeq(seq);
}
