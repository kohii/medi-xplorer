import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import React, { createContext, useContext, useMemo } from "react";

import { fetchMasterData } from "@/apis/fetch-master-data";
import { getValue } from "@/features/fields/get-values";
import { getField } from "@/features/shinryoukoui-master-fields/shinryoukoui-master-fields";
import {
  LATEST_SHINRYOUKOUI_MASTER_VERSION,
  SHINRYOUKOUI_MASTER_VERSION_KEYS,
} from "@/features/shinryoukoui-master-versions/constants";
import {
  ShinryoukouiMasterLayoutVersion,
  getLayoutVersion,
} from "@/features/shinryoukoui-master-versions/layouts";
import { useUpdateSearchParams } from "@/hooks/use-update-search-params";
import { SEARCH_PARAM_NAMES } from "@/search-param-names";

type ShinryoukouiMasterDataContextType = {
  version: string;
  layoutVersion: ShinryoukouiMasterLayoutVersion;
  setVersion: (version: string) => void;
  data?: string[][];
  isLoading: boolean;

  getRowByCode(code: string): string[] | undefined;
};

const ShinryoukouiMasterDataContext = createContext<ShinryoukouiMasterDataContextType>({
  version: LATEST_SHINRYOUKOUI_MASTER_VERSION,
  layoutVersion: getLayoutVersion(LATEST_SHINRYOUKOUI_MASTER_VERSION),
  setVersion: () => {},
  isLoading: true,
  getRowByCode() {
    return undefined;
  },
});

export function useShinryoukouiMasterData() {
  return useContext(ShinryoukouiMasterDataContext);
}

export function ShinryoukouiMasterDataProvider({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const updateSearchParams = useUpdateSearchParams();
  const paramVersion = searchParams.get(SEARCH_PARAM_NAMES.SEARCH.MASTER_VERSION);
  const version =
    paramVersion && SHINRYOUKOUI_MASTER_VERSION_KEYS.includes(paramVersion)
      ? paramVersion
      : LATEST_SHINRYOUKOUI_MASTER_VERSION;

  const { data, error, isLoading } = useQuery({
    queryKey: ["s", version],
    queryFn: () => fetchMasterData(version),
    refetchOnMount: false,
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
      layoutVersion: getLayoutVersion(version),
      setVersion(version: string) {
        updateSearchParams({
          [SEARCH_PARAM_NAMES.SEARCH.MASTER_VERSION]:
            version === LATEST_SHINRYOUKOUI_MASTER_VERSION ? undefined : version,
        });
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
