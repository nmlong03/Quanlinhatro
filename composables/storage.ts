import Cookie from "js-cookie";
import { ACCESS_TOKEN, GUEST_ACCESS_TOKEN } from "~/utils/constants";

export const useSetToken = (token: any) => {
  if (!token) return;
  Cookie.set(ACCESS_TOKEN, token, { expires: 30 });
};

export const useGetToken = () => {
  if (process.server) return;
  const accessToken = Cookie.get(ACCESS_TOKEN);
  return accessToken ? accessToken : null;
};

export const useRemoveToken = () => {
  Cookie.remove(ACCESS_TOKEN);
};

export const useSetGuestToken = (token: any) => {
  if (!token) return;
  Cookie.set(GUEST_ACCESS_TOKEN, token, { expires: 30 });
};

export const useGetGuestToken = () => {
  if (process.server) return;
  const accessToken = Cookie.get(GUEST_ACCESS_TOKEN);
  return accessToken ? accessToken : null;
};

export const useRemoveGuestToken = () => {
  Cookie.remove(GUEST_ACCESS_TOKEN);
};
