import { useQuery } from "@tanstack/react-query";
import React, { createContext, useContext, useMemo } from "react";

import { fetchMasterData } from "@/app/apis/fetch-master-data";
import { getField } from "@/app/s/shinryoukoui-master-fields";
import { getValue } from "@/features/fields/get-values";

type ShinryoukouiMasterDataContextType = {
	data?: string[][];
	isLoading: boolean;

	getRowByCode(code: string): string[] | undefined;
};

const ShinryoukouiMasterDataContext = createContext<ShinryoukouiMasterDataContextType>({
	isLoading: true,
	getRowByCode(code) {
		return undefined;
	},
});

export function useShinryoukouiMasterData() {
	return useContext(ShinryoukouiMasterDataContext);
}

export function ShinryoukouiMasterDataProvider({ children }: { children: React.ReactNode }) {
	const { data, error, isLoading } = useQuery({
		queryKey: ["s"],
		queryFn: fetchMasterData,
	});

	if (error) {
		throw error;
	}

	const value = useMemo(() => {
		const codeField = getField("診療行為コード")!;
		const codeToRow = new Map<string, string[]>(
			data?.map((row) => {
				const code = getValue(row, codeField);
				return [code, row];
			}) ?? [],
		);
		return {
			data: data ?? [],
			isLoading,
			getRowByCode(code: string) {
				return codeToRow.get(code);
			},
		};
	}, [data, isLoading]);

	// Provide the example data to the children components
	return (
		<ShinryoukouiMasterDataContext.Provider value={value}>
			{children}
		</ShinryoukouiMasterDataContext.Provider>
	);
}
