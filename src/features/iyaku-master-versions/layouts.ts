export type IyakuMasterLayoutVersion = "2024";

export type IyakuMasterLayout = {
  version: IyakuMasterLayoutVersion;
  from: string;
};

export const IYAKU_MASTER_LAYOUTS: IyakuMasterLayout[] = [
  {
    version: "2024",
    from: "20240101",
  },
];

export const INITIAL_IYAKU_MASTER_LAYOUT_VERSION: IyakuMasterLayoutVersion =
  IYAKU_MASTER_LAYOUTS[0].version;

export function getIyakuLayoutVersion(date: string): IyakuMasterLayoutVersion {
  for (let i = IYAKU_MASTER_LAYOUTS.length - 1; i >= 0; i--) {
    if (date >= IYAKU_MASTER_LAYOUTS[i].from) {
      return IYAKU_MASTER_LAYOUTS[i].version;
    }
  }
  return IYAKU_MASTER_LAYOUTS[IYAKU_MASTER_LAYOUTS.length - 1].version;
}

export function getIyakuLayoutFor(version: IyakuMasterLayoutVersion): IyakuMasterLayout {
  return (
    IYAKU_MASTER_LAYOUTS.find((layout) => layout.version === version) ??
    IYAKU_MASTER_LAYOUTS[IYAKU_MASTER_LAYOUTS.length - 1]
  );
}
