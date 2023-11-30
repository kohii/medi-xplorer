export const SHINRYOUKOUI_MASTER_VERSION_LIST = [
	{ key: "20231101", label: "2023年11月1日" },
	{ key: "20231002", label: "2023年10月2日" },
	{ key: "20230922", label: "2023年9月22日" },
	{ key: "20230901", label: "2023年9月1日" },
	{ key: "20230801", label: "2023年8月1日" },
	{ key: "20230523", label: "2023年5月23日" },
	{ key: "20230424", label: "2023年4月24日" },
	{ key: "20230317", label: "2023年3月17日" },
	{ key: "20230227", label: "2023年2月27日" },
	{ key: "20230201", label: "2023年2月1日" },
] as const;

export const SHINRYOUKOUI_MASTER_VERSION_KEYS = SHINRYOUKOUI_MASTER_VERSION_LIST.map(item => item.key);

export const LATEST_SHINRYOUKOUI_MASTER_VERSION = SHINRYOUKOUI_MASTER_VERSION_LIST[0].key;

export type ShinryoukouiMasterVersion = typeof SHINRYOUKOUI_MASTER_VERSION_LIST[number]["key"];

export const MASTER_VERSION_SEARCH_PARAM_NAME = "v";