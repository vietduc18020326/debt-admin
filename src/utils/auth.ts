import { decode } from "jsonwebtoken";
import { _Core } from "@/services/_Core";

const CLIENT_KEY = "CLIENT_KEY";
const ACCESS_TOKEN = "ACCESS_TOKEN";
const REFRESH_TOKEN = "REFRESH_TOKEN";

export const saveClientKey = (token: string) => {
  try {
    localStorage.setItem(CLIENT_KEY, token);
  } catch (error) {
    console.log("refresh token not saved");
  }
};

export const getClientKey = () => {
  try {
    return localStorage.getItem(CLIENT_KEY);
  } catch (error) {
    return null;
  }
};

export const saveAccessToken = (token: string) => {
  try {
    localStorage.setItem(ACCESS_TOKEN, token);
  } catch (error) {
    console.log("refresh token not saved");
  }
};

export const getAccessToken = () => {
  try {
    return localStorage.getItem(ACCESS_TOKEN);
  } catch (error) {
    return null;
  }
};

export const saveRefreshToken = (token: string) => {
  try {
    localStorage.setItem(REFRESH_TOKEN, token);
  } catch (error) {
    console.log("refresh token not saved");
  }
};

export const getRefreshToken = () => {
  try {
    return localStorage.getItem(REFRESH_TOKEN);
  } catch (error) {
    return null;
  }
};

export const getDecodeRefreshToken = () => {
  try {
    const decoded = decode(localStorage.getItem(REFRESH_TOKEN) || "") as {
      exp: number;
    };
    return decoded ? decoded : { exp: 0 };
  } catch (error) {
    return { exp: 0 };
  }
};

export const isSessionExpired = () => {
  const now = Date.now();
  const decoded = getDecodeRefreshToken();
  const exp = decoded.exp; // it is refresh token expired time

  return exp * 1000 < now;
};

export const isSessionStillAlive = () => {
  return !isSessionExpired();
};

export const isLoggedIn = () => {
  if (Boolean(getClientKey() && getAccessToken())) {
    _Core.accessToken = getAccessToken() || "";
    _Core.clientKey = getClientKey() || "";
  }
  return Boolean(getClientKey() && getAccessToken());
};

export const clearAllToken = () => {
  try {
    localStorage.removeItem(REFRESH_TOKEN);
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(CLIENT_KEY);
  } catch (err) {
    return null;
  }
};
