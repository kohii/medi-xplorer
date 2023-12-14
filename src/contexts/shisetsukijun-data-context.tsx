import { useQuery } from "@tanstack/react-query";
import React, { createContext, useContext, useMemo } from "react";

import { fetchShisetsukijunData } from "@/apis/fetch-shisetsukijun-data";

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

export function ShisetsukijunDataProvider({ children }: { children: React.ReactNode }) {
  const { data, error, isLoading } = useQuery({
    queryKey: ["shisetsukijun"],
    queryFn: fetchShisetsukijunData,
  });

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
    <ShisetsukijunDataContext.Provider value={value}>
      {children}
    </ShisetsukijunDataContext.Provider>
  );
}
