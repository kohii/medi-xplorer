import { FieldValue } from "@/features/fields/field-value";

import { getIyakuMasterFields } from "../iyaku-master-fields/iyaku-master-fields";
import { IyakuMasterLayoutVersion } from "../iyaku-master-versions/layouts";

type IyakuRawTabProps = {
  row: string[];
  layoutVersion: IyakuMasterLayoutVersion;
};

export function IyakuRawTab({ row, layoutVersion }: IyakuRawTabProps) {
  const iyakuMasterFields = getIyakuMasterFields(layoutVersion);
  return (
    <table className="border-collapse border-spacing-0 table-fixed w-full text-sm">
      <tbody>
        {iyakuMasterFields.map((field, index) => (
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
