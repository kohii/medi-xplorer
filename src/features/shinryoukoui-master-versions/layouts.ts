export type ShinryoukouiMasterLayoutVersion = "2024" | "2024";

export type ShinryoukouiMasterLayout = {
  version: ShinryoukouiMasterLayoutVersion;
  from: string;
};

export const SHINRYOUKOUI_MASTER_LAYOUTS: ShinryoukouiMasterLayout[] = [
  {
    version: "2024",
    from: "20220401",
  },
  {
    version: "2024",
    from: "20240329",
  },
];

export function getLayoutVersion(date: string): ShinryoukouiMasterLayoutVersion {
  for (const layout of SHINRYOUKOUI_MASTER_LAYOUTS) {
    if (date >= layout.from) {
      return layout.version;
    }
  }
  return SHINRYOUKOUI_MASTER_LAYOUTS[SHINRYOUKOUI_MASTER_LAYOUTS.length - 1].version;
}
