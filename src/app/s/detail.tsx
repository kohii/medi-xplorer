import { useState } from "react";

import { Tabs } from "@/components/tabs";
import { VSplit, VSplitItem } from "@/components/v-split";
import { FieldValue } from "@/features/fields/field-value";
import { getValue } from "@/features/fields/get-values";

import { ShinryoukouiBasicTab } from "../../features/shinryoukoui-basic-tab/shinryoukoui-basic-tab";
import { shinryokouiMasterFields } from "../../features/shinryoukoui-master-fields/shinryoukoui-master-fields";
import { ShinryoukouiRawTab } from "../../features/shinryoukoui-raw-tab/shinryoukoui-raw-tab";


const tabs = [{
  label: "詳細",
  value: "detail",
}, {
  label: "Raw",
  value: "raw",
}];

type DetailProps = {
	row: string[];
	rows: string[][];
}

export function Detail({ row, rows }: DetailProps) {
  const [selectedTab, setSelectedTab] = useState("detail");
  return (
    <div className="h-full">
      <VSplit gridTemplateRows="min-content minmax(0, 1fr)">
        <VSplitItem pos={1}>
          <Tabs value={selectedTab} onChange={setSelectedTab} tabs={tabs} />
        </VSplitItem>
        <VSplitItem pos={2} overflow="auto">
          <div className="p-4">
            {selectedTab === "raw" && <ShinryoukouiRawTab row={row} />}
            {selectedTab === "detail" && <ShinryoukouiBasicTab row={row} rows={rows} />}
          </div>
        </VSplitItem>
      </VSplit>
    </div>
  );
}
