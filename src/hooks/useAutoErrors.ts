import { useEffect } from "react";
import { message } from "antd";
import { AxiosError } from "axios";

export const useAutoToastErrors = (
  errors: (AxiosError | Error | undefined)[]
) => {
  useEffect(() => {
    for (let _error of errors) {
      if (_error) {
        // @ts-ignore
        const m = _error?.response?.data?.message || _error?.message || "";
        message.error(m as string).then();
        return;
      }
    }
  }, [...errors]);
};
