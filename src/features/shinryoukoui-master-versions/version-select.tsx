import React from "react";

import { useShinryoukouiMasterData } from "@/contexts/shinryoukoui-master-data-context";
import { LATEST_SHINRYOUKOUI_MASTER_VERSION, SHINRYOUKOUI_MASTER_VERSION_LIST } from "@/features/shinryoukoui-master-versions/constants";

export const VersionSelect = React.memo(function VersionSelect() {
  const { version, setVersion } = useShinryoukouiMasterData();
  const label = SHINRYOUKOUI_MASTER_VERSION_LIST.find((v) => v.key === version)!.label;

  return (
    <>
      <select
        onChange={(e) => setVersion(e.target.value)}
        className="text-blue-500 hover:text-blue-700 bg-white border-none text-sm appearance-none width-auto text-right cursor-pointer outline-none"
        value={version}
      >
        {SHINRYOUKOUI_MASTER_VERSION_LIST.map((v) => (
          <option key={v.key} value={v.key}>
						マスターのバージョン: {v.key === LATEST_SHINRYOUKOUI_MASTER_VERSION ? `${v.label} (最新)` : v.label}
          </option>
        ))}
      </select>
    </>
  );
});
