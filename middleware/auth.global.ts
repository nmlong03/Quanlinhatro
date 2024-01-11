import jwt_decode from "jwt-decode";
import { useGetGuestToken, useGetToken } from "~/composables/storage";
export default defineNuxtRouteMiddleware((to, from) => {
  const accessToken = useGetToken();
  const guestAccessToken = useGetGuestToken();
  let decoded: any = {};
  if (guestAccessToken) {
    decoded = jwt_decode(guestAccessToken);
  }
  if (process.server) return;
  if (to.name === "quen-mat-khau") return;
  if (to.name === "dang-ky") return;
  if (to.name === "dang-nhap") return;
  if (!accessToken && !guestAccessToken && to.name !== "dang-nhap-guest") {
    return navigateTo("/dang-nhap-guest");
  }
  if (guestAccessToken && to.name === "quan-ly-guest") {
    return navigateTo(`/quan-ly-guest/${decoded.id}`);
  }
});
