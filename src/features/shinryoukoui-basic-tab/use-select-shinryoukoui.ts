import { useMemo } from "react";

import { getField } from "@/app/s/shinryoukoui-master-fields";
import { useUpdateSearchParams } from "@/hooks/use-update-search-params";

import { getValue } from "../fields/get-values";

export function useSelectShinryoukoui() {
	const updateSearchParams = useUpdateSearchParams();

	return useMemo(() => ({
		selectByCode: (code: string) => {
			updateSearchParams({ code });
		},
		selectByRow: (row: string[]) => {
			updateSearchParams({ code: getValue(row, getField("診療行為コード")) });
		}
	}), [updateSearchParams]);
}
