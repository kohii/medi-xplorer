"use client";

import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

import { IyakuMasterDataProvider } from "@/contexts/iyaku-master-data-context";
import { ShinryoukouiMasterDataProvider } from "@/contexts/shinryoukoui-master-data-context";
import { MASTER_IDS, normalizeMasterId } from "@/master-types";
import { SEARCH_PARAM_NAMES } from "@/search-param-names";

import { ShisetsukijunDataProvider } from "../../contexts/shisetsukijun-data-context";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      gcTime: Infinity,
    }
  }
});

export function SearchResultDataProviders({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const masterId = normalizeMasterId(searchParams.get(SEARCH_PARAM_NAMES.SEARCH.MASTER));
  return (
    <QueryClientProvider client={queryClient} >
      {masterId === MASTER_IDS.IYAKU ? (
        <IyakuMasterDataProvider>{children}</IyakuMasterDataProvider>
      ) : (
        <ShinryoukouiMasterDataProvider>
          <ShisetsukijunDataProvider>
            {children}
          </ShisetsukijunDataProvider>
        </ShinryoukouiMasterDataProvider>
      )}
    </QueryClientProvider>
  );
}
