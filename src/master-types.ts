export const MASTER_IDS = {
  SHINRYOUKOUI: "s",
  IYAKUHIN: "y",
} as const;

export type MasterId = (typeof MASTER_IDS)[keyof typeof MASTER_IDS];

export const DEFAULT_MASTER_ID: MasterId = MASTER_IDS.SHINRYOUKOUI;

export const MASTER_LABELS: Record<MasterId, string> = {
  [MASTER_IDS.SHINRYOUKOUI]: "診療行為",
  [MASTER_IDS.IYAKUHIN]: "医薬品",
};

export function normalizeMasterId(value: string | null): MasterId {
  return value === MASTER_IDS.IYAKUHIN ? MASTER_IDS.IYAKUHIN : MASTER_IDS.SHINRYOUKOUI;
}
