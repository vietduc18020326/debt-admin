import { useCallback, useMemo } from "react";
import { Fetch } from "@/services/_Fetch";
import {
  clearAllToken,
  getBrowserUniqueId,
  saveAccessToken,
  saveClientKey,
  saveRefreshToken,
} from "@/utils";
import md5 from "md5";
import { message } from "antd";
import { AxiosError } from "axios";
import { redirect } from "next/navigation";
import { loginIn, requestSignup } from "@/store/users/function";

export function useManualLogin() {
  const onAuthError = useCallback(async (e: AxiosError) => {
    // @ts-ignore
    const m = e?.response?.data?.message || e.message;
    await message.error(m as string);
  }, []);

  const onCreateClient = useCallback(async () => {
    try {
      const timestamp = Math.floor(new Date().valueOf() / 1000);
      const os = "web";
      const device_id = getBrowserUniqueId();
      const authentic = md5(
        device_id +
          "&" +
          os +
          "&" +
          timestamp +
          "&" +
          process.env.NEXT_PUBLIC_AUTHENTIC_KEY
      );
      const { data } = await Fetch.postWithToken<{
        client_key?: string;
      }>(`https://createclient${process.env.NEXT_PUBLIC_DOMAIN}`, {
        timestamp,
        device_id,
        authentic,
        os,
      });

      return data?.client_key;
    } catch (e: any) {
      onAuthError(e).then();
      throw e;
    }
  }, []);

  const signIn = useCallback(
    async (params: { email: string; password: string }) => {
      try {
        const client_key = await onCreateClient();

        if (client_key) {
          await loginIn({
            ...params,
            client_key,
          });
        }
      } catch (e: any) {
        onAuthError(e).then();
      }
    },
    []
  );

  const signUp = useCallback(
    async (params: { email: string; password: string }) => {
      try {
        const client_key = await onCreateClient();

        if (client_key) {
          await requestSignup({
            ...params,
            client_key,
          });
        }
      } catch (e: any) {
        onAuthError(e).then();
        throw e;
      }
    },
    []
  );

  const onLogout = useCallback(() => {
    clearAllToken();
  }, []);

  return useMemo(
    () => ({
      onCreateClient,
      signIn,
      signUp,
      onLogout,
    }),
    [onCreateClient, signIn, signUp, onLogout]
  );
}
