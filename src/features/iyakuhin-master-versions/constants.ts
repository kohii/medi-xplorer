// sorted by date desc
import versions from "./iyakuhin-master-versions.json" with { type: "json" };

export const IYAKUHIN_MASTER_VERSION_KEYS: string[] = versions;

export const LATEST_IYAKUHIN_MASTER_VERSION = IYAKUHIN_MASTER_VERSION_KEYS[0] ?? "";

export const IYAKUHIN_MASTER_VERSION_LIST = versions.map((v) => ({
  key: v,
  label: `${+v.slice(0, 4)}年${+v.slice(4, 6)}月${+v.slice(6, 8)}日`,
}));
