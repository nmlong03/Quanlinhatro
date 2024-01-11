// https://nuxt.com/docs/api/configuration/nuxt-config
import svgLoader from "vite-svg-loader";
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: [
    "vuetify/lib/styles/main.sass",
    "@mdi/font/css/materialdesignicons.min.css",
    "~/assets/css/main.css",
  ],
  modules: ["@pinia/nuxt", "@nuxtjs/google-fonts", "@vueuse/nuxt"],
  pinia: {
    autoImports: [
      // automatically imports `defineStore`
      ["defineStore", "definePiniaStore"], // import { defineStore as definePiniaStore } from 'pinia'
    ],
  },
  components: {
    global: true,
    dirs: [{ path: "~/components/global", prefix: "g-" }],
  },
  runtimeConfig: {
    public: {
      URL_API: process.env.URL_API,
      PROVINCE_API: process.env.PROVINCE_API,
    },
  },
  vite: {
    plugins: [svgLoader({})],
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  build: {
    transpile: ["vuetify", "@vuepic/vue-datepicker"],
  },
  ssr: false,
});