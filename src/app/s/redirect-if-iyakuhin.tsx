"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

import { MASTER_IDS } from "@/master-types";
import { SEARCH_PARAM_NAMES } from "@/search-param-names";

export function RedirectIfIyakuhin() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const masterId = searchParams.get(SEARCH_PARAM_NAMES.SEARCH.MASTER);

  useEffect(() => {
    if (masterId === MASTER_IDS.IYAKUHIN) {
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.delete(SEARCH_PARAM_NAMES.SEARCH.MASTER);
      const qs = newParams.toString();
      router.replace(`/y${qs ? `?${qs}` : ""}`);
    }
  }, [masterId, searchParams, router]);

  return null;
}
