import { useSearchParams } from "next/navigation";

import { Tabs } from "@/components/tabs";
import { VSplit, VSplitItem } from "@/components/v-split";
import { ShinryoukouiMasterLayoutVersion } from "@/features/shinryoukoui-master-versions/layouts";
import { useUpdateSearchParams } from "@/hooks/use-update-search-params";

import { ShinryoukouiBasicTab } from "../../features/shinryoukoui-basic-tab/shinryoukoui-basic-tab";
import { ShinryoukouiRawTab } from "../../features/shinryoukoui-raw-tab/shinryoukoui-raw-tab";

const tabs = [
  {
    label: "詳細",
    value: "basic",
  },
  {
    label: "Raw",
    value: "raw",
  },
] as const;
const tabValues = tabs.map((t) => t.value);
type Tab = (typeof tabValues)[number];

function useSelectedTab() {
  const searchParams = useSearchParams();
  const selectedTabInSearchParam = searchParams.get("tab");
  const selectedTab: Tab =
    selectedTabInSearchParam && tabValues.includes(selectedTabInSearchParam as Tab)
      ? (selectedTabInSearchParam as Tab)
      : tabValues[0];

  const updateSearchParams = useUpdateSearchParams();
  const setSelectedTab = (tab: Tab) => {
    updateSearchParams(
      {
        tab: tab === tabs[0]["value"] ? undefined : tab,
      },
      {
        mode: "replace",
      },
    );
  };
  return [selectedTab, setSelectedTab] as const;
}

type DetailProps = {
  row: string[];
  rows: string[][];
  layoutVersion: ShinryoukouiMasterLayoutVersion;
};

export function Detail({ row, rows, layoutVersion }: DetailProps) {
  const [selectedTab, setSelectedTab] = useSelectedTab();

  return (
    <div className="h-full">
      <VSplit gridTemplateRows="min-content minmax(0, 1fr)">
        <VSplitItem pos={1}>
          <Tabs value={selectedTab} onChange={setSelectedTab} tabs={tabs} />
        </VSplitItem>
        <VSplitItem pos={2} overflow="auto">
          <div className="p-4">
            {selectedTab === "basic" && <ShinryoukouiBasicTab row={row} rows={rows} />}
            {selectedTab === "raw" && (
              <ShinryoukouiRawTab row={row} layoutVersion={layoutVersion} />
            )}
          </div>
        </VSplitItem>
      </VSplit>
    </div>
  );
}
