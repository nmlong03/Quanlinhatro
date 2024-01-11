import { defineStore } from "pinia";

export const useRoomStore = defineStore({
  id: "room",
  state: () => ({}),
  actions: {
    async getAllRoomOfMotel(payload: any) {
      const res = await useFetchData(
        `${ROOM.GET_LIST_ROOM}/${payload.motelId}`,
        {
          method: "GET",
          query: payload,
        }
      );
      return res;
    },
    async getRoomDetail(id: string) {
      const res = await useFetchData(`${ROOM.GET_ONE_ROOM}/${id}`, {
        method: "GET",
      });
      return res;
    },
    async createRoom(payload: any) {
      const res = await useFetchData(`${ROOM.CREATE_ROOM}`, {
        method: "POST",
        body: payload,
      });
      return res;
    },
    async getAllRoomOfOwner() {
      const res = await useFetchData(`${ROOM.GET_ALL_ROOM_OF_OWNER}`, {
        method: "GET",
      });
      return res;
    },
    async getRoomStatic() {
      const res = await useFetchData(`${ROOM.ROOM_STATISTICAL}`, {
        method: "GET",
      });
      return res;
    },
    async updateRoom(payload: any, id: string) {
      const res = await useFetchData(`${ROOM.UPDATE_ROOM}/${id}`, {
        method: "PUT",
        body: payload,
      });
      return res;
    },
    async moveMember(payload: any) {
      const res = await useFetchData(`${ROOM.MOVE_MEMBER_ROOM}`, {
        method: "PUT",
        body: payload,
      });
      return res;
    },
    async deleteRoom(id: string) {
      const res = await useFetchData(`${ROOM.DELETE_ROOM}/${id}`, {
        method: "DELETE",
      });
      return res;
    },
    async getAllEmptyRoomOfMotel(id: string, payload: any) {
      const res = await useFetchData(`${ROOM.GET_LIST_ROOM}/${id}`, {
        method: "GET",
        query: {
          status: payload.status,
        },
      });
      return res;
    },
    async returnRoom(id: string) {
      const res = await useFetchData(`${ROOM.RETURN_ROOM}/${id}`, {
        method: "PUT",
      });
      return res;
    },
  },
});
