import { FieldValue } from "@/features/fields/field-value";
import { shinryokouiMasterFields } from "./shinryoukoui-master-fields";
import { getValue } from "@/features/fields/get-values";

type DetailProps = {
	row: string[];
}

export function Detail({ row }: DetailProps) {
	return (
		<table className="border-collapse border-spacing-0 table-fixed w-full text-sm">
			<tbody>
				{
					shinryokouiMasterFields.map((field, index) => (
						<tr key={index}>
							<th className="w-2/5 p-1 pr-4 text-right font-medium">{field.name}</th>
							<td>
								<FieldValue field={field} value={getValue(row, field)} />
							</td>
						</tr>
					))
				}
			</tbody>
		</table >
	);
}
