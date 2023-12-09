import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

export const useRouterFn = (): Pick<AppRouterInstance, "push" | "replace" | "prefetch"> => {
  const router = useRouter();
  const routerRef = useRef(router);
  routerRef.current = router;

  const [routerMethods] = useState<Pick<AppRouterInstance, "push" | "replace" | "prefetch">>({
    push: (path) => routerRef.current.push(path),
    replace: (path) => routerRef.current.replace(path),
    prefetch: (path) => routerRef.current.prefetch(path),
  });

  return routerMethods;
};