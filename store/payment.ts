import { defineStore } from "pinia";

export const usePaymentStore = defineStore({
  id: "payment",
  state: () => ({}),
  actions: {
    async getAllPaymentMethod(params: any) {
      const res = await useFetchData(`${PAYMENT.GET_ALL_PAYMENT}`, {
        method: "GET",
        params: params,
      });
      return res;
    },
    async getOnePaymentMethod(id: string) {
      const res = await useFetchData(`${PAYMENT.GET_ONE_PAYMENT}/${id}`, {
        method: "GET",
      });
      return res;
    },
    async createPaymentMethod(payload: any) {
      const res = await useFetchData(`${PAYMENT.CREATE_PAYMENT}`, {
        method: "POST",
        body: payload,
      });
      return res;
    },
    async updatePaymentMethod(id: string, payload: any) {
      const res = await useFetchData(`${PAYMENT.UPDATE_PAYMENT}/${id}`, {
        method: "PUT",
        body: payload,
      });
      return res;
    },
    async deletePaymentMethod(id: string) {
      const res = await useFetchData(`${PAYMENT.DELETE_PAYMENT}/${id}`, {
        method: "DELETE",
      });
      return res;
    },
    async getAllPaymentMethodByGuest(params: any) {
      const res = await useFetchGuestData(`${PAYMENT.GET_ALL_PAYMENT}`, {
        method: "GET",
        params: params,
      });
      return res;
    },
  },
});
