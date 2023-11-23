import { VirtualField } from "@/features/fields/virtual-field";
import { getField } from "./shinryoukoui-master-fields";
import { getValue } from "@/features/fields/get-values";

const fields = {
	"コード表用番号（アルファベット部）": getField("コード表用番号（アルファベット部）")!,
	"コード表用番号（アルファベット部を除く）/区分番号": getField("コード表用番号（アルファベット部を除く）/区分番号")!,
	"コード表用番号（アルファベット部を除く）/枝番": getField("コード表用番号（アルファベット部を除く）/枝番")!,
} as const;


export const shinryoukouiMasterVirtualFields = {
	"区分番号": {
		name: "区分番号",
		value(row: string[]) {
			const alphabet = getValue(row, fields["コード表用番号（アルファベット部）"]);
			if (alphabet === "-" || alphabet === "*") {
				return "-";
			}
			const kubun = getValue(row, fields["コード表用番号（アルファベット部を除く）/区分番号"]);
			const edaban = getValue(row, fields["コード表用番号（アルファベット部を除く）/枝番"]);
			return `${alphabet}${kubun}-${edaban}`;
		}
	},
} satisfies Record<string, VirtualField>;
