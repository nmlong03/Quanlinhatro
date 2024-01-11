import { defineStore } from "pinia";

export const useWaterStore = defineStore({
  id: "water",
  state: () => ({}),
  actions: {
    async getAllWater(params?: any) {
      const res = await useFetchData(
        `${WATER.GET_WATER}?${params ? params : ""}`,
        {
          method: "GET",
        }
      );
      return res;
    },
    async updateWater(payload: any) {
      const res = await useFetchData(`${WATER.UPDATE_WATER}`, {
        method: "POST",
        body: payload,
      });
      return res;
    },
  },
});
