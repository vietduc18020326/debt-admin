import { useEffect } from "react";
import { AxiosError } from "axios";
import { message } from "antd";

export const useAutoToastErrors = (
  errors: (AxiosError | Error | undefined)[],
  options?: {
    bottomOffset?: number;
  }
) => {
  useEffect(() => {
    for (let _error of errors) {
      if (_error) {
        // @ts-ignore
        const m = _error?.response?.data?.message || _error.message || _error;

        message.error(m as string).then();
        return;
      }
    }
  }, [...errors, options]);
};
