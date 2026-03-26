import React from "react";

import { useIyakuhinMasterData } from "@/contexts/iyakuhin-master-data-context";
import {
  IYAKUHIN_MASTER_VERSION_LIST,
  LATEST_IYAKUHIN_MASTER_VERSION,
} from "@/features/iyakuhin-master-versions/constants";

export const IyakuhinVersionSelect = React.memo(function IyakuhinVersionSelect() {
  const { version, setVersion } = useIyakuhinMasterData();

  if (!IYAKUHIN_MASTER_VERSION_LIST.length) {
    return <span className="text-sm text-gray-400">マスター未取得</span>;
  }

  return (
    <>
      <label className="hidden sm:inline" htmlFor="iyakuhin-master-version">
        マスターのバージョン:{" "}
      </label>
      <select
        id="iyakuhin-master-version"
        onChange={(e) => setVersion(e.target.value)}
        className="text-blue-600 hover:text-blue-800 bg-white border-none text-sm appearance-none width-auto text-right cursor-pointer outline-none"
        value={version}
      >
        {IYAKUHIN_MASTER_VERSION_LIST.map((v) => (
          <option key={v.key} value={v.key}>
            {v.key === LATEST_IYAKUHIN_MASTER_VERSION ? `${v.label} (最新)` : v.label}
          </option>
        ))}
      </select>
    </>
  );
});
