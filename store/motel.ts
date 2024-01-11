import { defineStore } from "pinia";

export const useMotelStore = defineStore({
  id: "motel",
  state: () => ({
    motels: null,
  }),
  actions: {
    async getMotels(id: string) {
      const res = await useFetchData(`${MOTELS.GET_LIST_MOTELS}?owner=${id}`, {
        method: "GET",
      });
      return res;
    },
    async getOneMotels(id: string) {
      const res = await useFetchData(`${MOTELS.GET_ONE_MOTELS}/${id}`, {
        method: "GET",
      });
      return res;
    },
    async createMotel(payload: any) {
      const res = await useFetchData(`${MOTELS.CREATE_MOTEL}`, {
        method: "POST",
        body: payload,
      });
      return res;
    },
    async updateMotel(payload: any, id: string) {
      const res = await useFetchData(`${MOTELS.UPDATE_MOTEL}/${id}`, {
        method: "PUT",
        body: payload,
      });
      return res;
    },

    async deleteMotel(id: number | string) {
      const res = await useFetchData(`${MOTELS.DELETE_MOTEL}/${id}`, {
        method: "DELETE",
      });
      return res;
    },
  },
});
