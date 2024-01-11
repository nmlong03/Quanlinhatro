import { defineStore } from "pinia";

export const useStatisticalStore = defineStore({
  id: "statistical",
  state: () => ({}),
  actions: {
    async getStatistical() {
      const res = await useFetchData(`${STATISTICAL.REVENUE_STATISTICAL}`, {
        method: "GET",
      });
      return res;
    },
  },
});
