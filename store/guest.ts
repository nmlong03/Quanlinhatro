import { defineStore } from "pinia";
import { useFetchGuestData } from "~/composables/useFetch";

export const useGuestStore = defineStore({
  id: "guest",
  state: () => ({}),
  actions: {
    async guestSignin(payload: any) {
      const res = await useFetchGuestData(`${GUEST.SIGN_IN}`, {
        method: "POST",
        body: payload,
      });
      return res;
    },
    async guestRoomInfo() {
      const res = await useFetchGuestData(`${GUEST.GET_INFO_ROOM}`, {
        method: "GET",
      });
      return res;
    },
    async guestRoomElectricity(params: any) {
      const res = await useFetchGuestData(`${GUEST.GET_INFO_ELECTRICITY}`, {
        method: "GET",
        query: params,
      });
      return res;
    },
    async guestRoomWater(params: any) {
      const res = await useFetchGuestData(`${GUEST.GET_INFO_WATER}`, {
        method: "GET",
        query: params,
      });
      return res;
    },
    async guestRoomBill() {
      const res = await useFetchGuestData(`${GUEST.GET_INFO_BILL}`, {
        method: "GET",
      });
      return res;
    },
  },
});
