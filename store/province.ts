import { defineStore } from "pinia";

export const useProvinceStore = defineStore({
  id: "province",
  state: () => ({
    provinces: null,
  }),
  actions: {
    async getDistrictOfHaNoi(payload: any) {
      const res = await useFetchData(`${PROVINCES.GET_PROVINCES}`, {
        method: "GET",
        params: {
          depth: payload?.depth,
        },
      });
      return res;
    },
    async getWardByDistrict(code: string) {
      const res = await useFetchData(`${PROVINCES.GET_DISTRICT}/${code}`, {
        method: "GET",
      });
      return res;
    },
  },
});
