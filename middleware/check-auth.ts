export default defineNuxtRouteMiddleware((to, from) => {
  const accessToken = useGetToken();
  if (process.server) return;
  if (accessToken && (to.name === "dang-nhap" || to.name === "quen-mat-khau")) {
    return navigateTo("/");
  }
});
