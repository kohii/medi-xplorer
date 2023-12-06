import versions from "./shinryoukoui-master-versions.json" assert { type: "json" };

export const SHINRYOUKOUI_MASTER_VERSION_LIST: {
	key: string;
	label: string;
}[] = versions;

export const SHINRYOUKOUI_MASTER_VERSION_KEYS = SHINRYOUKOUI_MASTER_VERSION_LIST.map(item => item.key);

export const LATEST_SHINRYOUKOUI_MASTER_VERSION = SHINRYOUKOUI_MASTER_VERSION_LIST[0].key;

export type ShinryoukouiMasterVersion = typeof SHINRYOUKOUI_MASTER_VERSION_LIST[number]["key"];

export const MASTER_VERSION_SEARCH_PARAM_NAME = "v";