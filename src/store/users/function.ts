import { Fetch } from "@/services/_Fetch";
import {
  getRefreshToken,
  saveAccessToken,
  saveClientKey,
  saveRefreshToken,
} from "@/utils";
import { IUser } from "@/store/users/type";
import { setUserQueries, syncMe, syncUser } from "@/store/users/index";
import { _Core } from "@/services/_Core";

export async function loginIn(params: { client_key: string }) {
  const { data } = await Fetch.postWithToken<{
    access_token: string;
    refresh_token: string;
    me?: IUser;
  }>(`https://login${process.env.NEXT_PUBLIC_DOMAIN}`, {
    ...params,
  });

  saveClientKey(params.client_key);
  _Core.clientKey = params.client_key;
  if (data?.access_token) {
    saveAccessToken(data?.access_token);
    _Core.accessToken = data.access_token;
  }

  if (data?.refresh_token) {
    saveRefreshToken(data?.refresh_token);
  }

  if (data?.me) {
    syncMe(data.me);
  }

  return data;
}

export async function requestRefreshToken() {
  const { data } = await Fetch.postWithToken<{
    access_token?: string;
  }>(`https://refreshtoken${process.env.NEXT_PUBLIC_DOMAIN}`, {
    refresh_token: getRefreshToken(),
  });

  if (data?.access_token) {
    saveAccessToken(data.access_token);
    _Core.accessToken = data.access_token;
  }

  return data;
}

export async function requestLoadMe() {
  const { data } = await Fetch.postWithToken<{
    me?: IUser;
    users?: IUser[];
  }>(`https://me-load${process.env.NEXT_PUBLIC_DOMAIN}`);

  if (data?.me) {
    syncMe(data.me);
  }

  if (data?.users) {
    syncUser(data.users);
    setUserQueries({
      all: data.users.map((user) => user.id.toString()),
    });
  }

  return data;
}
