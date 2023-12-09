"use client";

import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import { ShinryoukouiMasterDataProvider } from "@/contexts/shinryoukoui-master-data-context";

import { ShisetsukijunDataProvider } from "../../contexts/shisetsukijun-data-context";

const queryClient = new QueryClient();

export function SearchResultDataProviders({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient} >
      <ShinryoukouiMasterDataProvider>
        <ShisetsukijunDataProvider>
          {children}
        </ShisetsukijunDataProvider>
      </ShinryoukouiMasterDataProvider>
    </QueryClientProvider>
  );
}
