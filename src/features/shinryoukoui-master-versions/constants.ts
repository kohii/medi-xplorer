// sorted by date desc
import versions from "./shinryoukoui-master-versions.json" assert { type: "json" };

export const SHINRYOUKOUI_MASTER_VERSION_KEYS: string[] = versions;

export const LATEST_SHINRYOUKOUI_MASTER_VERSION = SHINRYOUKOUI_MASTER_VERSION_KEYS[0];

export const SHINRYOUKOUI_MASTER_VERSION_LIST = versions.map(v => ({
  key: v,
  label: `${+v.slice(0, 4)}年${+v.slice(4, 6)}月${+v.slice(6, 8)}日`
}));
