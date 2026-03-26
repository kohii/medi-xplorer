import { SimpleTable, SimpleTableColumn } from "@/components/simple-table";
import { getCodeLabel } from "@/features/fields/get-code-label";
import { getValue } from "@/features/fields/get-values";
import { getField } from "@/features/iyakuhin-master-fields/iyakuhin-master-fields";

import { useSelectIyakuhin } from "./use-select-iyakuhin";

export type RelatedIyakuhinTableProps = {
  rows: string[][];
};

const codeField = getField("医薬品コード");
const nameField = getField("医薬品名・規格名/漢字名称");
const zaikeiField = getField("剤形");
const amountField = getField("新又は現金額");
const amountTypeField = getField("新又は現金額/金額種別");

const columns: SimpleTableColumn<string[]>[] = [
  {
    name: "医薬品コード",
    render: (row) => getValue(row, codeField),
    width: 140,
  },
  {
    name: "名称",
    render: (row) => getValue(row, nameField),
  },
  {
    name: "剤形",
    render: (row) => getCodeLabel(row, zaikeiField) ?? getValue(row, zaikeiField),
    width: 120,
  },
  {
    name: "薬価",
    render: (row) => {
      if (getValue(row, amountTypeField) !== "1") {
        return getCodeLabel(row, amountTypeField) ?? getValue(row, amountTypeField);
      }
      return `${getValue(row, amountField)}円`;
    },
    width: 140,
  },
];

export function RelatedIyakuhinTable({ rows }: RelatedIyakuhinTableProps) {
  const { selectByRow } = useSelectIyakuhin();

  return (
    <SimpleTable
      columns={columns}
      data={rows}
      density="compact"
      onRowClick={selectByRow}
    />
  );
}
