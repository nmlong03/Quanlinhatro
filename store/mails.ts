import { defineStore } from "pinia";

export const useMailsStore = defineStore({
  id: "mails",
  state: () => ({}),
  actions: {
    async getAllMails(params?: any) {
      const res = await useFetchData(`${MAILS.GET_ALL_MAIL}?${params}`, {
        method: "GET",
      });
      return res;
    },
    async getOneMails(id: string) {
      const res = await useFetchData(`${MAILS.GET_ONE_MAIL}/${id}`, {
        method: "GET",
      });
      return res;
    },
    async createMails(payload: any) {
      const res = await useFetchData(`${MAILS.CREATE_MAIL}`, {
        method: "POST",
        body: payload,
      });
      return res;
    },
  },
});
