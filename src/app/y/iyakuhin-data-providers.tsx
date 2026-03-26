"use client";

import React from "react";

import { IyakuhinMasterDataProvider } from "@/contexts/iyakuhin-master-data-context";

export function IyakuhinDataProviders({ children }: { children: React.ReactNode }) {
  return <IyakuhinMasterDataProvider>{children}</IyakuhinMasterDataProvider>;
}
