import FloatingVue from "floating-vue";
import "floating-vue/dist/style.css";
import { Tooltip, Dropdown, Menu } from "floating-vue";
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(FloatingVue);
  nuxtApp.vueApp.component("SMenu", Menu);
  nuxtApp.vueApp.component("STooltip", Tooltip);
  nuxtApp.vueApp.component("VDropDown", Dropdown);
});
