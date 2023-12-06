import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import React, { createContext, useContext, useMemo, useState } from "react";

import { fetchMasterData } from "@/apis/fetch-master-data";
import { getValue } from "@/features/fields/get-values";
import { getField } from "@/features/shinryoukoui-master-fields/shinryoukoui-master-fields";
import { LATEST_SHINRYOUKOUI_MASTER_VERSION, MASTER_VERSION_SEARCH_PARAM_NAME, SHINRYOUKOUI_MASTER_VERSION_KEYS, ShinryoukouiMasterVersion } from "@/features/shinryoukoui-master-versions/constants";
import { useUpdateSearchParams } from "@/hooks/use-update-search-params";

type ShinryoukouiMasterDataContextType = {
	version: ShinryoukouiMasterVersion;
	setVersion: (version: ShinryoukouiMasterVersion) => void;
	data?: string[][];
	isLoading: boolean;

	getRowByCode(code: string): string[] | undefined;
};

const ShinryoukouiMasterDataContext = createContext<ShinryoukouiMasterDataContextType>({
	version: LATEST_SHINRYOUKOUI_MASTER_VERSION,
	setVersion: () => { },
	isLoading: true,
	getRowByCode(code) {
		return undefined;
	},
});

export function useShinryoukouiMasterData() {
	return useContext(ShinryoukouiMasterDataContext);
}

export function ShinryoukouiMasterDataProvider({ children }: { children: React.ReactNode }) {
	const searchParams = useSearchParams();
	const updateSearchParams = useUpdateSearchParams();
	const paramVersion = searchParams.get(MASTER_VERSION_SEARCH_PARAM_NAME);
	const version: ShinryoukouiMasterVersion = paramVersion && SHINRYOUKOUI_MASTER_VERSION_KEYS.includes(paramVersion as ShinryoukouiMasterVersion) ?
		paramVersion as ShinryoukouiMasterVersion :
		LATEST_SHINRYOUKOUI_MASTER_VERSION;

	const { data, error, isLoading } = useQuery({
		queryKey: ["s", version],
		queryFn: () => fetchMasterData(version),
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
			version,
			setVersion(version: ShinryoukouiMasterVersion) {
				updateSearchParams({ [MASTER_VERSION_SEARCH_PARAM_NAME]: version === LATEST_SHINRYOUKOUI_MASTER_VERSION ? undefined : version });
			},
			data: data ?? [],
			isLoading,
			getRowByCode(code: string) {
				return codeToRow.get(code);
			},
		};
	}, [data, isLoading, updateSearchParams, version]);

	// Provide the example data to the children components
	return (
		<ShinryoukouiMasterDataContext.Provider value={value}>
			{children}
		</ShinryoukouiMasterDataContext.Provider>
	);
}
