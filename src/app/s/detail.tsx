import { FieldValue } from "@/features/fields/field-value";
import { shinryokouiMasterFields } from "./shinryoukoui-master-fields";

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
							<th className="w-1/3 p-1 pr-4 text-right">{field.name}</th>
							<td>
								<FieldValue field={field} value={row[index]} />
							</td>
						</tr>
					))
				}
			</tbody>
		</table >
	);
}
