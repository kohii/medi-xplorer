"use client";

import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import { IyakuhinMasterDataProvider } from "@/contexts/iyakuhin-master-data-context";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      gcTime: Infinity,
    }
  }
});

export function IyakuhinDataProviders({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <IyakuhinMasterDataProvider>{children}</IyakuhinMasterDataProvider>
    </QueryClientProvider>
  );
}
