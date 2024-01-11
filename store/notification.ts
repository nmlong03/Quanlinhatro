import { defineStore } from "pinia";

export const useNotificationStore = defineStore({
  id: "notification",
  state: () => ({}),
  actions: {
    async getAllNotification(params: any) {
      const res = await useFetchGuestData(`${NOTIFICATIONS.GET_ALL_NOTI}`, {
        method: "GET",
        params: params,
      });
      return res;
    },
    async getOneNotification(id: string) {
      const res = await useFetchGuestData(
        `${NOTIFICATIONS.GET_ONE_NOTI}/${id}`,
        {
          method: "GET",
        }
      );
      return res;
    },
    async createNotification(payload: any) {
      const res = await useFetchGuestData(`${NOTIFICATIONS.CREATE_NOTI}`, {
        method: "POST",
        body: payload,
      });
      return res;
    },
    async updateNotification(id: string, payload: any) {
      const res = await useFetchGuestData(
        `${NOTIFICATIONS.UPDATE_NOTI}/${id}`,
        {
          method: "PUT",
          body: payload,
        }
      );
      return res;
    },
    async deleteNotification(id: string) {
      const res = await useFetchGuestData(
        `${NOTIFICATIONS.DELETE_NOTI}/${id}`,
        {
          method: "DELETE",
        }
      );
      return res;
    },
    async getAllNotificationForOwner(params: any) {
      const res = await useFetchData(`${NOTIFICATIONS.GET_ALL_NOTI_OF_OWNER}`, {
        method: "GET",
        params: params,
      });
      return res;
    },
    async getOneNotificationForOwner(id: string) {
      const res = await useFetchData(
        `${NOTIFICATIONS.GET_ONE_NOTI_OF_OWNER}/${id}`,
        {
          method: "GET",
        }
      );
      return res;
    },
    async updateNotificationStatusForOwner(id: string, payload: any) {
      const res = await useFetchData(
        `${NOTIFICATIONS.UPDATE_STATUS_NOTI_FOR_OWNER}/${id}`,
        {
          method: "PUT",
          body: payload,
        }
      );
      return res;
    },
    async deleteNotificationForOwner(id: string) {
      const res = await useFetchData(
        `${NOTIFICATIONS.DELETE_NOTI_FOR_OWNER}/${id}`,
        {
          method: "DELETE",
        }
      );
      return res;
    },
  },
});
