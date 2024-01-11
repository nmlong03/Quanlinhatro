import { defineStore } from "pinia";

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    user: null,
  }),
  actions: {
    async getOneUser() {
      const res = await useFetchData(`${USER.GET_ONE_USER}`, {
        method: "GET",
      });
      this.user = res.data.message;
      return res;
    },
    async updateUser(payload: any, id: string) {
      const res = await useFetchData(`${USER.UPDATE_USER}/${id}`, {
        method: "PUT",
        body: payload,
      });
      return res;
    },
  },
});
