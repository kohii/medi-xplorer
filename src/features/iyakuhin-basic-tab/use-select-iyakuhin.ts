import { useCallback } from "react";

import { getField } from "@/features/iyakuhin-master-fields/iyakuhin-master-fields";
import { useUpdateSearchParams } from "@/hooks/use-update-search-params";

import { getValue } from "../fields/get-values";

const codeField = getField("医薬品コード");

export function useSelectIyakuhin() {
  const updateSearchParams = useUpdateSearchParams();

  const selectByRow = useCallback(
    (row: string[]) => {
      updateSearchParams({ code: getValue(row, codeField) });
    },
    [updateSearchParams],
  );

  return { selectByRow };
}
