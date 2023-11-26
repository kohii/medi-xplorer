import { VirtualField } from "@/features/fields/virtual-field";
import { getField } from "./shinryoukoui-master-fields";
import { getValue } from "@/features/fields/get-values";
import { formatPoint } from "./shinryoukoui-master-utils";
import { trimLeadingZero } from "@/utils/text";

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
	"新又は現点数": {
		name: "新又は現点数",
		value(row: string[]) {
			return formatPoint(
				getValue(row, getField('新又は現点数/点数識別')!),
				getValue(row, getField('新又は現点数/新又は現点数')!),
			);
		},
	},
	"旧点数": {
		name: "旧点数",
		value(row: string[]) {
			return formatPoint(
				getValue(row, getField('旧点数/点数識別')!),
				getValue(row, getField('旧点数/旧点数')!),
			);
		},
	},
	"上下限年齢": {
		name: "上下限年齢",
		value(row: string[]) {
			const lowerAgeField = getField('上下限年齢/下限年齢')!;
			const upperAgeField = getField('上下限年齢/上限年齢')!;
			const lower = getValue(row, lowerAgeField);
			const upper = getValue(row, upperAgeField);

			if (upper === "00" && lower === "00") {
				return "-";
			}
			const lowerAge = (() => {
				if (lower === "00") {
					return "";
				}
				const code = lowerAgeField.codes?.find(c => c.code === lower);
				if (code) {
					return code.name;
				}

				return `${trimLeadingZero(lower)}歳以上`;
			})();
			const upperAge = (() => {
				if (upper === "00") {
					return "";
				}
				const code = upperAgeField.codes?.find(c => c.code === upper);
				if (code) {
					return code.name;
				}

				return `${trimLeadingZero(upper)}歳未満`;
			})();

			return `${lowerAge}〜${upperAge}`;
		},
	},
} satisfies Record<string, VirtualField>;
