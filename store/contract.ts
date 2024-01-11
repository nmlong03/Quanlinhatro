import { defineStore } from "pinia";

export const useContractStore = defineStore({
  id: "contract",
  state: () => ({}),
  actions: {
    async getSampleContract() {
      const res = await useFetchData(`${CONTRACT.GET_SAMPLE_CONTRACT}`, {
        method: "GET",
      });
      return res;
    },
    async createSampleContract() {
      const res = await useFetchData(`${CONTRACT.CREATE_SAMPLE_CONTRACT}`, {
        method: "POST",
      });
      return res;
    },
    async updateSampleContract(payload: any) {
      const res = await useFetchData(`${CONTRACT.UPDATE_SAMPLE_CONTRACT}`, {
        method: "PUT",
        body: payload,
      });
      return res;
    },
    async createNewContractByRoom(payload: any, id: string) {
      const res = await useFetchData(
        `${CONTRACT.CREATE_NEW_CONTRACT_BY_ROOM}/${id}`,
        {
          method: "POST",
          body: payload,
        }
      );
      return res;
    },
    async updateContractInRoom(id: string) {
      const res = await useFetchData(
        `${CONTRACT.UPDATE_CONTRACT_IN_ROOM}/${id}`,
        {
          method: "PUT",
        }
      );
      return res;
    },
  },
});
