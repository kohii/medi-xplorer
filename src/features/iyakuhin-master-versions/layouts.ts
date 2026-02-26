export type IyakuhinMasterLayoutVersion = "2024";

export type IyakuhinMasterLayout = {
  version: IyakuhinMasterLayoutVersion;
  from: string;
};

export const IYAKUHIN_MASTER_LAYOUTS: IyakuhinMasterLayout[] = [
  {
    version: "2024",
    from: "20240101",
  },
];

export const INITIAL_IYAKUHIN_MASTER_LAYOUT_VERSION: IyakuhinMasterLayoutVersion =
  IYAKUHIN_MASTER_LAYOUTS[0].version;

export function getIyakuhinLayoutVersion(date: string): IyakuhinMasterLayoutVersion {
  for (let i = IYAKUHIN_MASTER_LAYOUTS.length - 1; i >= 0; i--) {
    if (date >= IYAKUHIN_MASTER_LAYOUTS[i].from) {
      return IYAKUHIN_MASTER_LAYOUTS[i].version;
    }
  }
  return IYAKUHIN_MASTER_LAYOUTS[IYAKUHIN_MASTER_LAYOUTS.length - 1].version;
}

export function getIyakuhinLayoutFor(version: IyakuhinMasterLayoutVersion): IyakuhinMasterLayout {
  return (
    IYAKUHIN_MASTER_LAYOUTS.find((layout) => layout.version === version) ??
    IYAKUHIN_MASTER_LAYOUTS[IYAKUHIN_MASTER_LAYOUTS.length - 1]
  );
}
