import { usePathname, useRouter } from "next/navigation";
import { clearAllToken, isLoggedIn } from "@/utils";
import { useCallback, useEffect } from "react";
import { _Core } from "@/services/_Core";
import { requestLoadMe } from "@/store/users/function";
import { useAsyncFn } from "react-use";
import { useAutoToastErrors } from "@/hooks/useAutoErrors";

export function useAuth() {
  const publicPages = ["/sign-in", "/sign-up"];

  const pathname = usePathname();
  const { push } = useRouter();

  const [{ error }, onAuth] = useAsyncFn(
    async (pathname: string) => {
      const isInsidePublicPages = publicPages.some((p) => p === pathname);

      if (isLoggedIn()) {
        // load me
        await requestLoadMe();

        return push("/home");
      }

      if (!isLoggedIn() && !isInsidePublicPages) {
        clearAllToken();
        return push("/sign-in");
      }
    },
    [pathname]
  );

  useEffect(() => {
    onAuth(pathname).then();
  }, [pathname]);

  useAutoToastErrors([error]);
}
