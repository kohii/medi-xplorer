import React from "react";

import { useIyakuMasterData } from "@/contexts/iyaku-master-data-context";
import { IYAKU_MASTER_VERSION_LIST, LATEST_IYAKU_MASTER_VERSION } from "@/features/iyaku-master-versions/constants";

export const IyakuVersionSelect = React.memo(function IyakuVersionSelect() {
  const { version, setVersion } = useIyakuMasterData();

  if (!IYAKU_MASTER_VERSION_LIST.length) {
    return <span className="text-sm text-gray-400">マスター未取得</span>;
  }

  return (
    <>
      <label className="hidden sm:inline" htmlFor="iyaku-master-version">
        マスターのバージョン:{" "}
      </label>
      <select
        id="iyaku-master-version"
        onChange={(e) => setVersion(e.target.value)}
        className="text-blue-600 hover:text-blue-800 bg-white border-none text-sm appearance-none width-auto text-right cursor-pointer outline-none"
        value={version}
      >
        {IYAKU_MASTER_VERSION_LIST.map((v) => (
          <option key={v.key} value={v.key}>
            {v.key === LATEST_IYAKU_MASTER_VERSION ? `${v.label} (最新)` : v.label}
          </option>
        ))}
      </select>
    </>
  );
});
