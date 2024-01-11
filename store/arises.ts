import { defineStore } from "pinia";

export const useArisesStore = defineStore({
  id: "arises",
  state: () => ({}),
  actions: {
    async getAllArises(params: string) {
      const res = await useFetchData(`${ARISES.GET_ALL_ARISES}${params}`, {
        method: "GET",
      });
      return res;
    },
    async getOneArises(id: string | number) {
      const res = await useFetchData(
        `${ARISES.GET_ONE_ARISES}/${id}/get-one-arise`,
        {
          method: "GET",
        }
      );
      return res;
    },
    async createArises(payload: any) {
      const res = await useFetchData(`${ARISES.CREATE_ARISES}`, {
        method: "POST",
        body: payload,
      });
      return res;
    },
    async updateArises(payload: any) {
      const res = await useFetchData(
        `${ARISES.UPDATE_ARISES}/${payload["_id"]}`,
        {
          method: "PUT",
          body: payload["data"],
        }
      );
      return res;
    },
    async deleteArises(id: number | string) {
      const res = await useFetchData(`${ARISES.DELETE_ARISES}/${id}`, {
        method: "DELETE",
      });
      return res;
    },
  },
});
