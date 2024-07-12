import { default as axios, AxiosRequestConfig, AxiosResponse } from "axios";
import qs from "querystring";
import { _Core } from "./_Core";

const IS_SERVER_ERROR = false;

class SFetch {
  handleInvalidKey?: (params: any) => any;

  private __paramsToQueryString = (params: any): string => {
    return qs.stringify(params);
  };

  private __getRequiredParams = (): Record<string, any> => ({
    __code: "native",
    access_token: _Core.accessToken,
    client_key: _Core.clientKey,
    authentic: 1,
    major_version: 1,
  });

  __getRealUrl = (url: string, options: Record<string, any> = {}): string => {
    const sysUrl = options?.__sysUrl || _Core.sysUrl;

    if (url.match(/^@root/)) {
      return url.replace("@root", `https://${sysUrl}`);
    }

    if (url.match(/^@wsm/)) {
      return url.replace("@wsm", _Core.socketUrl);
    }

    if (url.match(/^@share/)) {
      return url.replace("@share", _Core.shareUrl);
    }

    if (url.match(/^@true/)) {
      if (_Core.runLocal)
        return url.replace("@true", "https://" + _Core.localDomain);
      return url.replace("@true", "https://" + _Core.systemPath + "." + sysUrl);
    }

    if (url.startsWith("@")) {
      if (_Core.runLocal)
        return url.replace(/^@(\w+)(.*)/, _Core.localDomain + "/$1$2");
      return url.replace(/^@(\w+)(.*)/, "https://$1." + sysUrl + "$2");
    }

    if (url.startsWith(_Core.urlScheme + "-")) {
      return url.replace(
        /^true-(\w+):\/\/(.*)/,
        "https://" + _Core.systemPath + "." + sysUrl + "/$1/$2"
      );
    }

    if (url.startsWith("base" + "-")) {
      return url.replace(
        /^base-(\w+):\/\/(.*)/,
        "https://" + _Core.systemPath + "." + sysUrl + "/$1/$2"
      );
    }

    return url;
  };

  get(
    url: string,
    params: Object | undefined = undefined,
    config?: AxiosRequestConfig
  ) {
    const qs = this.__paramsToQueryString(params);
    return axios.get(this.__getRealUrl(url) + (qs ? `?${qs}` : ""), config);
  }

  async simplePost<ResponseType>(
    url: string,
    params: Record<string, any>,
    config: AxiosRequestConfig = {}
  ) {
    const _response = await axios.post(
      this.__getRealUrl(url, params),
      this.__paramsToQueryString({
        ...params,
      }),
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        ...config,
      }
    );

    const response = IS_SERVER_ERROR
      ? {
          ..._response,
          data: JSON.parse(
            _response.data.split("<br />\n" + "<b>Notice</b>:")[0]
          ),
        }
      : _response;

    if (!("code" in response.data)) {
      throw new Error("SERVER_BUSY");
    }

    // eslint-disable-next-line
    if (response.data.code == 0) {
      const { message } = response.data;

      if (
        [
          "INVALID_CLIENT_KEY",
          "FORCE_LOGOUT_INVALID_TOKEN",
          "INVALID_ACCESS_TOKEN",
        ].indexOf(message) >= 0 &&
        this.handleInvalidKey
      ) {
        this.handleInvalidKey(params);
      }

      throw new Error(response.data.message || "");
    }

    return response as unknown as AxiosResponse<ResponseType>;
  }

  async post<ResponseType>(
    url: string,
    params: Record<string, any>,
    config: AxiosRequestConfig = {}
  ) {
    const _response = await axios.post(
      this.__getRealUrl(url, params),
      this.__paramsToQueryString({
        ...params,
        ...this.__getRequiredParams(),
      }),
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        ...config,
      }
    );

    const response = IS_SERVER_ERROR
      ? {
          ..._response,
          data: JSON.parse(
            _response.data.split("<br />\n" + "<b>Notice</b>:")[0]
          ),
        }
      : _response;

    if (!("code" in response.data)) {
      throw new Error("SERVER_BUSY");
    }

    // eslint-disable-next-line
    if (response.data.code == 0) {
      const { message } = response.data;

      if (
        [
          "INVALID_CLIENT_KEY",
          "FORCE_LOGOUT_INVALID_TOKEN",
          "INVALID_ACCESS_TOKEN",
        ].indexOf(message) >= 0 &&
        this.handleInvalidKey
      ) {
        this.handleInvalidKey(params);
      }

      throw new Error(response.data.message || "");
    }

    return response as unknown as AxiosResponse<ResponseType>;
  }

  async postWithToken<ResponseType>(
    url: string,
    params: Record<string, any> = {},
    {
      requestTimeout,
      ...config
    }: AxiosRequestConfig & { requestTimeout?: number } = {
      requestTimeout: 30000,
    }
  ) {
    const formData = new FormData();
    const requiredParams = this.__getRequiredParams();

    params = { ...requiredParams, ...params };

    for (let key of Object.keys(params)) {
      if (Array.isArray(params[key])) {
        for (let index = 0; index < params[key].length; index++) {
          const value = params[key][index];
          if (key === "file") {
            if (value?.uri?.startsWith?.("ph://")) {
              // const convertedFile = await convertFileHeic(value);
              // formData.append(key + "-" + index, convertedFile as any);
            } else {
              formData.append(key + "-" + index, value);
            }
          } else {
            formData.append(key + "[]", value);
          }
        }
      } else {
        const value = params[key];
        // if (key === "file" && value?.uri?.startsWith?.("ph://")) {
        //   const convertedFile = await convertFileHeic(value);
        //   formData.append("file", convertedFile as any);
        //   continue;
        // }
        formData.append(key, params[key]);
      }
    }

    const _cancelToken = axios.CancelToken.source();
    const _timeoutId = setTimeout(() => {
      _cancelToken.cancel(config?.timeoutErrorMessage ?? "REQUEST_TIMED_OUT");
    }, requestTimeout || 30000);

    const _response = await axios.post(
      this.__getRealUrl(url, params),
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
        cancelToken: _cancelToken.token,
        transformRequest: (data) => data,
        ...config,
        onDownloadProgress: (progressEvent) => {
          clearTimeout(_timeoutId);
          config?.onDownloadProgress?.(progressEvent);
        },
      }
    );

    /* unlink */
    // if (params["file"]) {
    //   if (Array.isArray(params["file"]) && params["file"]?.length) {
    //     for (let index = 0; index < params["file"].length; index++) {
    //       const value = params["file"][index];
    //       if (value?.uri?.startsWith?.("ph://")) {
    //         const destPath = `${RNFS.TemporaryDirectoryPath}${value.name}`;
    //         await RNFS.unlink(destPath);
    //       }
    //     }
    //   } else {
    //     const value = params["file"];
    //     if (value?.uri?.startsWith?.("ph://")) {
    //       const destPath = `${RNFS.TemporaryDirectoryPath}${value.name}`;
    //       await RNFS.unlink(destPath);
    //     }
    //   }
    // }

    clearTimeout(_timeoutId);

    const response = IS_SERVER_ERROR
      ? {
          ..._response,
          data: JSON.parse(
            _response.data.split("<br />\n" + "<b>Notice</b>:")[0]
          ),
        }
      : _response;

    if (response.data && typeof response.data === "string")
      throw new Error(response.data);

    if (response.data && parseInt(response.data.code) === 0) {
      console.warn("Error while fetching data", {
        url: this.__getRealUrl(url),
        params,
        data: response.data,
      });

      const { message } = response.data;

      if (
        [
          "INVALID_CLIENT_KEY",
          "FORCE_LOGOUT_INVALID_TOKEN",
          "INVALID_ACCESS_TOKEN",
        ].indexOf(message) >= 0 &&
        this.handleInvalidKey
      ) {
        this.handleInvalidKey(params);
      }

      throw new Error(response.data.message || "Unknown Error");
    }

    return response as unknown as AxiosResponse<ResponseType>;
  }

  async getWithToken<ResponseType>(
    url: string,
    params: Record<string, any> = {},
    {
      requestTimeout,
      ...config
    }: AxiosRequestConfig & { requestTimeout?: number } = {
      requestTimeout: 30000,
    }
  ) {
    const response = await axios.get(
      this.__getRealUrl(url, params) +
        "?" +
        this.__paramsToQueryString({
          ...params,
          ...this.__getRequiredParams(),
        })
    );

    // if (!('code' in response.data)) {
    //   throw new Error('SERVER_BUSY');
    // }

    // eslint-disable-next-line
    if (response.data.code == 0) {
      // const { message } = response.data;

      // if (
      //   [
      //     'INVALID_CLIENT_KEY',
      //     'FORCE_LOGOUT_INVALID_TOKEN',
      //     'INVALID_ACCESS_TOKEN',
      //   ].indexOf(message) >= 0 &&
      //   this.handleInvalidKey
      // ) {
      //   this.handleInvalidKey(params);
      // }

      throw new Error(response.data.message || "");
    }

    return response as unknown as AxiosResponse<ResponseType>;
  }
}

// Singleton
export const Fetch = new SFetch();

// const convertFileHeic = async (item: FileType) => {
//   const destPath = `${RNFS.TemporaryDirectoryPath}${item.name}`;
//   const MAX_HEIGHT = 1000;
//
//   const width =
//     item.height && item.width
//       ? item.height > MAX_HEIGHT
//         ? (item.width * MAX_HEIGHT) / item.height
//         : item.width
//       : 100;
//
//   const height = Math.min(item.height || 100, MAX_HEIGHT);
//
//   const _filepath = await (item.type?.startsWith("video")
//     ? RNFS.copyAssetsVideoIOS(item.uri, destPath)
//     : RNFS.copyAssetsFileIOS(item.uri, destPath, width, height, 1, 1));
//
//   return {
//     ...item,
//     uri: "file://" + _filepath,
//     path: "file://" + _filepath,
//   };
// };
