"use client";

import React from "react";

import { ShinryoukouiMasterDataProvider } from "@/contexts/shinryoukoui-master-data-context";

import { ShisetsukijunDataProvider } from "../../contexts/shisetsukijun-data-context";

export function SearchResultDataProviders({ children }: { children: React.ReactNode }) {
  return (
    <ShinryoukouiMasterDataProvider>
      <ShisetsukijunDataProvider>{children}</ShisetsukijunDataProvider>
    </ShinryoukouiMasterDataProvider>
  );
}
