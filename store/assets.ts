import { defineStore } from "pinia";

export const useAssetStore = defineStore({
  id: "assets",
  state: () => ({}),
  actions: {
    async getAllAssets() {
      const res = await useFetchData(`${ASSETS.GET_ALL_ASSETS}`, {
        method: "GET",
      });
      return res;
    },
    async getOneAsset(id: string) {
      const res = await useFetchData(`${ASSETS.GET_ONE_ASSET}/${id}`, {
        method: "GET",
      });
      return res;
    },
    async createNewAsset(payload: any) {
      const res = await useFetchData(`${ASSETS.CREATE_ASSET}`, {
        method: "POST",
        body: payload,
      });
      return res;
    },
    async deleteAsset(id: string) {
      const res = await useFetchData(`${ASSETS.DELETE_ASSET}/${id}`, {
        method: "DELETE",
      });
      return res;
    },
    async updateAsset(id: string, payload: any) {
      const res = await useFetchData(`${ASSETS.UPDATE_ASSET}/${id}`, {
        method: "PUT",
        body: payload,
      });
      return res;
    },
    async addAssetToRoom(roomId: string, assetId: string) {
      const res = await useFetchData(
        `${ASSETS.ADD_ASSET_TO_ROOM}/${roomId}/${assetId}`,
        {
          method: "POST",
        }
      );
      return res;
    },
    async deleteAssetFromRoom(roomId: string, assetId: string) {
      const res = await useFetchData(
        `${ASSETS.DELETE_ASSET_FROM_ROOM}/${roomId}/${assetId}`,
        {
          method: "PUT",
        }
      );
      return res;
    },
  },
});
