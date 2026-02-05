import { useMemo } from "react";

import { DataTableColumn } from "@/components/data-table";
import { getValue } from "@/features/fields/get-values";
import { getField } from "@/features/iyaku-master-fields/iyaku-master-fields";

const codeField = getField("医薬品コード");
const nameField = getField("医薬品名・規格名/漢字名称");
const kanaField = getField("医薬品名・規格名/カナ名称");
const amountField = getField("新又は現金額");
const unitField = getField("単位漢字名称");

export function useIyakuTableColumns() {
  return useMemo<DataTableColumn[]>(() => {
    return [
      {
        id: "code",
        name: "医薬品コード",
        width: 130,
        value: (row) => getValue(row, codeField!),
      },
      {
        id: "name",
        name: "医薬品名・規格名",
        width: 320,
        value: (row) => getValue(row, nameField!),
      },
      {
        id: "kana",
        name: "カナ名称",
        width: 180,
        value: (row) => getValue(row, kanaField!),
      },
      {
        id: "amount",
        name: "新又は現金額",
        width: 140,
        value: (row) => getValue(row, amountField!),
      },
      {
        id: "unit",
        name: "単位",
        width: 120,
        value: (row) => getValue(row, unitField!),
      },
    ];
  }, []);
}
