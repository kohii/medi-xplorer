import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import React, { createContext, useContext, useMemo } from "react";

import { fetchIyakuMasterData } from "@/apis/fetch-iyaku-master-data";
import { getValue } from "@/features/fields/get-values";
import { getField } from "@/features/iyaku-master-fields/iyaku-master-fields";
import {
  IYAKU_MASTER_VERSION_KEYS,
  LATEST_IYAKU_MASTER_VERSION,
} from "@/features/iyaku-master-versions/constants";
import { getIyakuLayoutVersion, IyakuMasterLayoutVersion } from "@/features/iyaku-master-versions/layouts";
import { useUpdateSearchParams } from "@/hooks/use-update-search-params";
import { SEARCH_PARAM_NAMES } from "@/search-param-names";

type IyakuMasterDataContextType = {
  version: string;
  layoutVersion: IyakuMasterLayoutVersion;
  setVersion: (version: string) => void;
  data?: string[][];
  isLoading: boolean;

  getRowByCode(code: string): string[] | undefined;
};

const IyakuMasterDataContext = createContext<IyakuMasterDataContextType>({
  version: LATEST_IYAKU_MASTER_VERSION,
  layoutVersion: getIyakuLayoutVersion(LATEST_IYAKU_MASTER_VERSION || "99999999"),
  setVersion: () => {},
  isLoading: true,
  getRowByCode() {
    return undefined;
  },
});

export function useIyakuMasterData() {
  return useContext(IyakuMasterDataContext);
}

export function IyakuMasterDataProvider({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const updateSearchParams = useUpdateSearchParams();
  const paramVersion = searchParams.get(SEARCH_PARAM_NAMES.SEARCH.MASTER_VERSION);
  const version =
    paramVersion && IYAKU_MASTER_VERSION_KEYS.includes(paramVersion)
      ? paramVersion
      : LATEST_IYAKU_MASTER_VERSION;

  const { data, error, isLoading } = useQuery({
    queryKey: ["y", version],
    queryFn: () => fetchIyakuMasterData(version),
    refetchOnMount: false,
    enabled: Boolean(version),
  });

  if (error) {
    throw error;
  }

  const value = useMemo(() => {
    const codeField = getField("医薬品コード")!;
    const codeToRow = new Map<string, string[]>(
      data?.map((row) => {
        const code = getValue(row, codeField);
        return [code, row];
      }) ?? [],
    );
    return {
      version,
      layoutVersion: getIyakuLayoutVersion(version || "99999999"),
      setVersion(version: string) {
        updateSearchParams({
          [SEARCH_PARAM_NAMES.SEARCH.MASTER_VERSION]:
            version === LATEST_IYAKU_MASTER_VERSION ? undefined : version,
        });
      },
      data: data ?? [],
      isLoading,
      getRowByCode(code: string) {
        return codeToRow.get(code);
      },
    };
  }, [data, isLoading, updateSearchParams, version]);

  return (
    <IyakuMasterDataContext.Provider value={value}>
      {children}
    </IyakuMasterDataContext.Provider>
  );
}
