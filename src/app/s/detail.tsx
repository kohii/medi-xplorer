import { FieldValue } from "@/features/fields/field-value";
import { shinryokouiMasterFields } from "./shinryoukoui-master-fields";
import { getValue } from "@/features/fields/get-values";
import { Tabs } from "@/components/tabs";
import { useState } from "react";
import { VSplit, VSplitItem } from "@/components/v-split";
import { DetailRawTab } from "./detail-raw-tab";
import { DetailBasicTab } from "../../features/shinryoukoui-basic-tab/detail-basic-tab";

const tabs = [{
	label: "詳細",
	value: "detail",
}, {
	label: "Raw",
	value: "raw",
}]

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
						{selectedTab === "raw" && <DetailRawTab row={row} />}
						{selectedTab === "detail" && <DetailBasicTab row={row} rows={rows} />}
					</div>
				</VSplitItem>
			</VSplit>
		</div>
	);
}
