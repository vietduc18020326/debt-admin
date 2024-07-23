import { usePathname, useRouter } from "next/navigation";
import { getRealErrorMessage } from "@/utils";
import { useCallback, useEffect } from "react";
import {
  requestLoadMe,
  requestRefreshToken,
  clearAllToken,
  isLoggedIn,
} from "shared-core";
import { AxiosError } from "axios";
import { message } from "antd";

export function useAuth() {
  const publicPages = ["/sign-in", "/sign-up"];

  const pathname = usePathname();
  const { push } = useRouter();

  const onAuthError = useCallback(async (e: AxiosError) => {
    // @ts-ignore
    const m = e?.response?.data?.message || e.message || e;
    if (m.toLowerCase().includes("expired")) {
      await onRefreshToken();
      return;
    }

    if (m == "invalid_client_key") {
      clearAllToken();
    }
    push("/sign-in");
    await message.error(getRealErrorMessage(m as string));
  }, []);

  const onRefreshToken = useCallback(async () => {
    try {
      await requestRefreshToken();
      await requestLoadMe();

      return push("/home");
    } catch (err: any) {
      onAuthError(err).then();
    }
  }, []);

  const onAuth = useCallback(
    async (pathname: string) => {
      try {
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
      } catch (error: any) {
        onAuthError(error).then();
      }
    },
    [pathname]
  );

  useEffect(() => {
    onAuth(pathname).then();
  }, [pathname]);
}
