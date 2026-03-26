"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { getIyakuhinMasterDataQueryOptions } from "@/contexts/iyakuhin-master-data-context";
import { getShinryoukouiMasterDataQueryOptions } from "@/contexts/shinryoukoui-master-data-context";
import { getShisetsukijunDataQueryOptions } from "@/contexts/shisetsukijun-data-context";
import { LATEST_IYAKUHIN_MASTER_VERSION } from "@/features/iyakuhin-master-versions/constants";
import { LATEST_SHINRYOUKOUI_MASTER_VERSION } from "@/features/shinryoukoui-master-versions/constants";
import { getLayoutVersion } from "@/features/shinryoukoui-master-versions/layouts";

export function PrefetchSearchResultPage() {
  const { prefetch } = useRouter();
  const queryClient = useQueryClient();

  // prefetch pages
  useEffect(() => {
    prefetch("/s");
    prefetch("/y");
  }, [prefetch]);

  // prefetch data for the default search flow
  useEffect(() => {
    const layoutVersion = getLayoutVersion(LATEST_SHINRYOUKOUI_MASTER_VERSION);
    void queryClient.prefetchQuery(
      getShinryoukouiMasterDataQueryOptions(LATEST_SHINRYOUKOUI_MASTER_VERSION),
    );
    void queryClient.prefetchQuery(getShisetsukijunDataQueryOptions(layoutVersion));
  }, [queryClient]);

  // Defer the larger drug master until the browser is idle.
  useEffect(() => {
    const prefetchIyakuhin = () => {
      if (!LATEST_IYAKUHIN_MASTER_VERSION) {
        return;
      }
      void queryClient.prefetchQuery(
        getIyakuhinMasterDataQueryOptions(LATEST_IYAKUHIN_MASTER_VERSION),
      );
    };

    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(prefetchIyakuhin, { timeout: 2000 });
      return () => {
        window.cancelIdleCallback(id);
      };
    }

    const timeoutId = globalThis.setTimeout(prefetchIyakuhin, 1500);
    return () => {
      globalThis.clearTimeout(timeoutId);
    };
  }, [queryClient]);

  return null;
}
