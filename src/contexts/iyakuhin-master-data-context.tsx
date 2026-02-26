import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import React, { createContext, useContext, useMemo } from "react";

import { fetchIyakuhinMasterData } from "@/apis/fetch-iyakuhin-master-data";
import { getValue } from "@/features/fields/get-values";
import { getField } from "@/features/iyakuhin-master-fields/iyakuhin-master-fields";
import {
  IYAKUHIN_MASTER_VERSION_KEYS,
  LATEST_IYAKUHIN_MASTER_VERSION,
} from "@/features/iyakuhin-master-versions/constants";
import { getIyakuhinLayoutVersion, IyakuhinMasterLayoutVersion } from "@/features/iyakuhin-master-versions/layouts";
import { useUpdateSearchParams } from "@/hooks/use-update-search-params";
import { SEARCH_PARAM_NAMES } from "@/search-param-names";

type IyakuhinMasterDataContextType = {
  version: string;
  layoutVersion: IyakuhinMasterLayoutVersion;
  setVersion: (version: string) => void;
  data?: string[][];
  isLoading: boolean;

  getRowByCode(code: string): string[] | undefined;
};

const IyakuhinMasterDataContext = createContext<IyakuhinMasterDataContextType>({
  version: LATEST_IYAKUHIN_MASTER_VERSION,
  layoutVersion: getIyakuhinLayoutVersion(LATEST_IYAKUHIN_MASTER_VERSION || "99999999"),
  setVersion: () => {},
  isLoading: true,
  getRowByCode() {
    return undefined;
  },
});

export function useIyakuhinMasterData() {
  return useContext(IyakuhinMasterDataContext);
}

export function IyakuhinMasterDataProvider({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const updateSearchParams = useUpdateSearchParams();
  const paramVersion = searchParams.get(SEARCH_PARAM_NAMES.SEARCH.MASTER_VERSION);
  const version =
    paramVersion && IYAKUHIN_MASTER_VERSION_KEYS.includes(paramVersion)
      ? paramVersion
      : LATEST_IYAKUHIN_MASTER_VERSION;

  const { data, error, isLoading } = useQuery({
    queryKey: ["y", version],
    queryFn: () => fetchIyakuhinMasterData(version),
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
      layoutVersion: getIyakuhinLayoutVersion(version || "99999999"),
      setVersion(version: string) {
        updateSearchParams({
          [SEARCH_PARAM_NAMES.SEARCH.MASTER_VERSION]:
            version === LATEST_IYAKUHIN_MASTER_VERSION ? undefined : version,
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
    <IyakuhinMasterDataContext.Provider value={value}>
      {children}
    </IyakuhinMasterDataContext.Provider>
  );
}
