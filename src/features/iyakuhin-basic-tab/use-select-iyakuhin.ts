import { useMemo } from "react";

import { getField } from "@/features/iyakuhin-master-fields/iyakuhin-master-fields";
import { useUpdateSearchParams } from "@/hooks/use-update-search-params";

import { getValue } from "../fields/get-values";

export function useSelectIyakuhin() {
  const updateSearchParams = useUpdateSearchParams();

  return useMemo(
    () => ({
      selectByCode: (code: string) => {
        updateSearchParams({ code });
      },
      selectByRow: (row: string[]) => {
        updateSearchParams({ code: getValue(row, getField("医薬品コード")) });
      },
    }),
    [updateSearchParams],
  );
}
