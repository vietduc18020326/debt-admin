import { Fetch } from "@/services/_Fetch";
import { EUserRole, IUser } from "@/store/users/type";
import { ICredential } from "@/store/credentials/type";
import {
  setCredentialQueries,
  syncCredential,
} from "@/store/credentials/index";
import { unstable_batchedUpdates } from "react-dom";
import { getMe } from "@/store/users";
import { compact } from "lodash";

export async function requestAllCredentials() {
  const { data } = await Fetch.postWithToken<{
    credentials?: ICredential[];
  }>(`https://credentials-load${process.env.NEXT_PUBLIC_DOMAIN}`);

  unstable_batchedUpdates(() => {
    if (data?.credentials) {
      syncCredential(data.credentials);
    }
    setCredentialQueries({
      all: compact(
        (data?.credentials || []).map((item) => {
          if (item.email !== getMe()?.email) return item.email;
          return undefined;
        })
      ),
    });
  });

  return data;
}

export async function requestVerifyUser(
  params: { email: string },
  type: "activate" | "deactivate"
) {
  const { data } = await Fetch.postWithToken<{
    credential?: ICredential;
  }>(`https://credential-${type}${process.env.NEXT_PUBLIC_DOMAIN}`, params);

  unstable_batchedUpdates(() => {
    if (data?.credential) {
      syncCredential([data.credential]);
    }
  });

  return data;
}

export async function requestEditCredential(params: {
  email: string;
  name: string;
  role: EUserRole;
}) {
  const { data } = await Fetch.postWithToken<{
    credential?: ICredential;
  }>(`https://credential-update${process.env.NEXT_PUBLIC_DOMAIN}`, params);

  unstable_batchedUpdates(() => {
    if (data?.credential) {
      syncCredential([data.credential]);
    }
  });

  return data;
}
