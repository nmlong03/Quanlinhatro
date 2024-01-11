import { defineStore } from "pinia";

export const useServiceStore = defineStore({
  id: "service",
  state: () => ({
    waterPrice: null,
    electricityPrice: null,
  }),
  actions: {
    async getAllServices(payload: any) {
      const res = await useFetchData(`${SERVICES.GET_SERVICES}`, {
        method: "GET",
        params: {
          isActive: payload?.isActive,
        },
      });
      this.waterPrice = res.data.services.find(
        (el: any) => el.name === "Nước"
      )?.price;
      this.electricityPrice = res.data.services.find(
        (el: any) => el.name === "Điện"
      )?.price;
      return res;
    },
    async getOneService(id: string) {
      const res = await useFetchData(`${SERVICES.GET_SERVICES}/${id}`, {
        method: "GET",
      });
      return res;
    },
    async createService(payload: any) {
      const res = await useFetchData(`${SERVICES.CREATE_SERVICES}`, {
        method: "POST",
        body: payload,
      });
      return res;
    },
    async updateService(payload: any) {
      const res = await useFetchData(
        `${SERVICES.UPDATE_SERVICES}/${payload["_id"]}`,
        {
          method: "PUT",
          body: payload["data"],
        }
      );
      return res;
    },
    async deleteService(id: number | string) {
      const res = await useFetchData(`${SERVICES.DELETE_SERVICES}/${id}`, {
        method: "DELETE",
      });
      return res;
    },
    async addServiceToRoom(roomId: string, serviceId: string) {
      const res = await useFetchData(
        `${SERVICES.ADD_SERVICE_TO_ROOM}/${roomId}/${serviceId}`,
        {
          method: "POST",
        }
      );
      return res;
    },
    async deleteServiceFromRoom(roomId: string, serviceId: string) {
      const res = await useFetchData(
        `${SERVICES.DELETE_SERVICE_FROM_ROOM}/${roomId}/${serviceId}`,
        {
          method: "DELETE",
        }
      );
      return res;
    },
    async deleteAllServiceRoom(serviceId: string) {
      const res = await useFetchData(
        `${SERVICES.DELETE_SERVICE_ALL_ROOM}/${serviceId}`,
        {
          method: "DELETE",
        }
      );
      return res;
    },
  },
});
