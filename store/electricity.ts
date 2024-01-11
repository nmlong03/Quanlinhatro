import { defineStore } from "pinia";
import { ELECTRICITY } from "~/utils/endpoint";

export const useElectricityStore = defineStore({
  id: "electricity",
  state: () => ({}),
  actions: {
    async getAllElectricity(params?: any) {
      const res = await useFetchData(
        `${ELECTRICITY.GET_ELECTRICITY}?${params ? params : ""}`,
        {
          method: "GET",
        }
      );
      return res;
    },
    async updateElectricity(payload: any) {
      const res = await useFetchData(`${ELECTRICITY.UPDATE_ELECTRICITY}`, {
        method: "POST",
        body: payload,
      });
      return res;
    },
  },
});
