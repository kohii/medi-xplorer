import { queryOptions, useQuery } from "@tanstack/react-query";
import React, { createContext, useContext, useMemo } from "react";

import { fetchShisetsukijunData } from "@/apis/fetch-shisetsukijun-data";
import {
  getShinryoukouiLayoutFor,
  ShinryoukouiMasterLayoutVersion,
} from "@/features/shinryoukoui-master-versions/layouts";

import { useShinryoukouiMasterData } from "./shinryoukoui-master-data-context";

type ShisetsukijunDataContextType = {
  data?: [string, string][];
  isLoading: boolean;

  getLabelByCode(code: string): string | undefined;
};

const ShisetsukijunDataContext = createContext<ShisetsukijunDataContextType>({
  isLoading: true,
  getLabelByCode() {
    return undefined;
  },
});

export function useShisetsukijunData() {
  return useContext(ShisetsukijunDataContext);
}

export function getShisetsukijunDataQueryOptions(layoutVersion: ShinryoukouiMasterLayoutVersion) {
  return queryOptions({
    queryKey: ["shisetsukijun", layoutVersion],
    queryFn: () => {
      const layout = getShinryoukouiLayoutFor(layoutVersion);
      return fetchShisetsukijunData(layout.shisetsuKijunFileName);
    },
    refetchOnMount: false,
  });
}

export function ShisetsukijunDataProvider({ children }: { children: React.ReactNode }) {
  const { layoutVersion } = useShinryoukouiMasterData();
  const { data, error, isLoading } = useQuery(getShisetsukijunDataQueryOptions(layoutVersion));

  if (error) {
    throw error;
  }

  const value = useMemo(() => {
    const codeToLabel = new Map<string, string>(data ?? []);
    return {
      data: data ?? [],
      isLoading,
      getLabelByCode(code: string) {
        return codeToLabel.get(code);
      },
    };
  }, [data, isLoading]);

  // Provide the example data to the children components
  return (
    <ShisetsukijunDataContext.Provider value={value}>{children}</ShisetsukijunDataContext.Provider>
  );
}
