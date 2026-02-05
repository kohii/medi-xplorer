import { FieldValue } from "@/features/fields/field-value";
import { getIyakuMasterFields } from "@/features/iyaku-master-fields/iyaku-master-fields";
import { IyakuMasterLayoutVersion } from "@/features/iyaku-master-versions/layouts";

type IyakuDetailProps = {
  row: string[];
  layoutVersion: IyakuMasterLayoutVersion;
};

export function IyakuDetail({ row, layoutVersion }: IyakuDetailProps) {
  const fields = getIyakuMasterFields(layoutVersion);
  return (
    <div className="p-4">
      <table className="border-collapse border-spacing-0 table-fixed w-full text-sm">
        <tbody>
          {fields.map((field) => (
            <tr key={field.seq}>
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
    </div>
  );
}
