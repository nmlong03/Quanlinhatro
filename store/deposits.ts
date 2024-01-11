import { defineStore } from "pinia";

export const useDepositsStore = defineStore({
  id: "deposits",
  state: () => ({}),
  actions: {
    async getOneDeposits(id?: string | number) {
      const res = await useFetchData(`${DEPOSITS.GET_ONE_DEPOSITS}/${id}`, {
        method: "GET",
      });
      return res;
    },
    async getAllDeposits(params?: string | number) {
      const res = await useFetchData(`${DEPOSITS.GET_ALL_DEPOSITS}${params}`, {
        method: "GET",
      });
      return res;
    },
    async createDeposits(payload: any) {
      const res = await useFetchData(`${DEPOSITS.CREATE_DEPOSIT}`, {
        method: "POST",
        body: payload,
      });
      return res;
    },
    async updateDeposits(id: string, payload: any) {
      const res = await useFetchData(`${DEPOSITS.UPDATE_DEPOSITS}/${id}`, {
        method: "PUT",
        body: payload,
      });
      return res;
    },
    async deleteDeposits(id: number | string) {
      const res = await useFetchData(`${DEPOSITS.DELETE_DEPOSITS}/${id}`, {
        method: "DELETE",
      });
      return res;
    },
  },
});
