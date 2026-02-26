import { FieldValue } from "@/features/fields/field-value";

import { getIyakuhinMasterFields } from "../iyakuhin-master-fields/iyakuhin-master-fields";
import { IyakuhinMasterLayoutVersion } from "../iyakuhin-master-versions/layouts";

type IyakuhinRawTabProps = {
  row: string[];
  layoutVersion: IyakuhinMasterLayoutVersion;
};

export function IyakuhinRawTab({ row, layoutVersion }: IyakuhinRawTabProps) {
  const iyakuhinMasterFields = getIyakuhinMasterFields(layoutVersion);
  return (
    <table className="border-collapse border-spacing-0 table-fixed w-full text-sm">
      <tbody>
        {iyakuhinMasterFields.map((field, index) => (
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
