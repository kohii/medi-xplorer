export type ShinryoukouiMasterLayoutVersion = "2022" | "2024";

export type ShinryoukouiMasterLayout = {
  version: ShinryoukouiMasterLayoutVersion;
  from: string;
  shisetsuKijunFileName: string;
};

export const SHINRYOUKOUI_MASTER_LAYOUTS: ShinryoukouiMasterLayout[] = [
  {
    version: "2022",
    from: "20220401",
    shisetsuKijunFileName: "shisetsukijun_20231020.tsv",
  },
  {
    version: "2024",
    from: "20240329",
    shisetsuKijunFileName: "shisetsukijun_20240329.tsv",
  },
];

export const INITIAL_SHINRYOUKOUI_MASTER_LAYOUT_VERSION: ShinryoukouiMasterLayoutVersion =
  SHINRYOUKOUI_MASTER_LAYOUTS[0].version;

export function getLayoutVersion(date: string): ShinryoukouiMasterLayoutVersion {
  for (let i = SHINRYOUKOUI_MASTER_LAYOUTS.length - 1; i >= 0; i--) {
    if (date >= SHINRYOUKOUI_MASTER_LAYOUTS[i].from) {
      return SHINRYOUKOUI_MASTER_LAYOUTS[i].version;
    }
  }
  return SHINRYOUKOUI_MASTER_LAYOUTS[SHINRYOUKOUI_MASTER_LAYOUTS.length - 1].version;
}

export function getShinryoukouiLayoutFor(
  version: ShinryoukouiMasterLayoutVersion,
): ShinryoukouiMasterLayout {
  return (
    SHINRYOUKOUI_MASTER_LAYOUTS.find((layout) => layout.version === version) ??
    SHINRYOUKOUI_MASTER_LAYOUTS[SHINRYOUKOUI_MASTER_LAYOUTS.length - 1]
  );
}
