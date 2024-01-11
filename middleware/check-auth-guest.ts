export default defineNuxtRouteMiddleware((to, from) => {
  const accessToken = useGetGuestToken();
  if (process.server) return;
  if (accessToken && to.name === "dang-nhap-guest") {
    return navigateTo("/quan-ly-guest");
  }
  if (accessToken && to.name === "dang-nhap-guest") {
    return navigateTo("/quan-ly-guest");
  }
});
