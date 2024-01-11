import { UseFetchOptions } from "nuxt/dist/app";
import { useGetGuestToken } from "./storage";
const config = useRuntimeConfig();

export const useFetchData = async (
  url: string,
  options: UseFetchOptions<object>
) => {
  const { data, pending, error, refresh }: any = await useFetch(url, {
    baseURL: config.public.URL_API,
    ...options,
    onRequest({ request, options }: any) {
      const accessToken = useGetToken();
      if (!accessToken) {
        return;
      }
      options.headers = options.headers || {};
      options.headers.authorization = `Bearer ${accessToken}`;
      options.headers["x-custom-lang"] = "vi";
    },
    onRequestError({ request, options, error }) {
      // Handle the request errors
    },
    onResponse({ request, response, options }) {
      // Process the response data
    },
    onResponseError({ request, response, options }) {
      // Handle the response errors
    },
  });
  return {
    data: data?.value,
    pending,
    error: error?.value,
  };
};

export const useFetchProvince = async (
  url: string,
  options: UseFetchOptions<object>
) => {
  const { data, pending, error, refresh }: any = await useFetch(url, {
    baseURL: config.public.PROVINCE_API,
    ...options,
    onRequest({ request, options }: any) {
      const accessToken = useGetToken();
      if (!accessToken) {
        return;
      }
      options.headers = options.headers || {};
      options.headers.authorization = `Bearer ${accessToken}`;
      options.headers["x-custom-lang"] = "vi";
    },
    onRequestError({ request, options, error }) {
      // Handle the request errors
    },
    onResponse({ request, response, options }) {
      // Process the response data
    },
    onResponseError({ request, response, options }) {
      // Handle the response errors
    },
  });
  return {
    data: data?.value,
    pending,
    error: error?.value,
  };
};

export const useFetchGuestData = async (
  url: string,
  options: UseFetchOptions<object>
) => {
  const { data, pending, error, refresh }: any = await useFetch(url, {
    baseURL: config.public.URL_API,
    ...options,
    onRequest({ request, options }: any) {
      const accessToken = useGetGuestToken();
      if (!accessToken) {
        return;
      }
      options.headers = options.headers || {};
      options.headers.authorization = `Bearer ${accessToken}`;
      options.headers["x-custom-lang"] = "vi";
    },
    onRequestError({ request, options, error }) {
      // Handle the request errors
    },
    onResponse({ request, response, options }) {
      // Process the response data
    },
    onResponseError({ request, response, options }) {
      // Handle the response errors
    },
  });
  return {
    data: data?.value,
    pending,
    error: error?.value,
  };
};
