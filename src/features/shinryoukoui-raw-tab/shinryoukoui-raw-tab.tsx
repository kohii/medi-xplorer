import { FieldValue } from "@/features/fields/field-value";

import { getShinryoukouiMasterFields } from "../shinryoukoui-master-fields/shinryoukoui-master-fields";
import { ShinryoukouiMasterLayoutVersion } from "../shinryoukoui-master-versions/layouts";

type DetailRawTabProps = {
  row: string[];
  layoutVersion: ShinryoukouiMasterLayoutVersion;
};

export function ShinryoukouiRawTab({ row, layoutVersion }: DetailRawTabProps) {
  const shinryokouiMasterFields = getShinryoukouiMasterFields(layoutVersion);
  return (
    <table className="border-collapse border-spacing-0 table-fixed w-full text-sm">
      <tbody>
        {shinryokouiMasterFields.map((field, index) => (
          <tr key={index}>
            <th className="w-2/5 py-1 pr-4 text-left font-medium">
              {field.seq}. {field.name}
            </th>
            <td>
              <FieldValue field={field} row={row} raw />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
