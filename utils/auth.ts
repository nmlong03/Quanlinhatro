import { ACCESS_TOKEN } from "~/utils/constants";
import Cookie from "js-cookie";

export const setAccessToken = (accessToken: any) => {
  if (!accessToken) return;
  Cookie.set(ACCESS_TOKEN, accessToken, { expires: 30 });
};

export const getAccessToken = () => {
  if (process.server) return;
  const accessToken = Cookie.get(ACCESS_TOKEN);
  return accessToken ? accessToken : null;
};

export const removeToken = () => {
  Cookie.remove(ACCESS_TOKEN);
};

export const decodeJWT = (token: string) => {
  const base64Payload = token.split(".")[1];
  const payloadBuffer = Buffer.from(base64Payload, "base64");
  return JSON.parse(payloadBuffer.toString());
};
