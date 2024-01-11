import { defineStore } from "pinia";

export const useMemberStore = defineStore({
  id: "member",
  state: () => ({}),
  actions: {
    async getAllMemberInRoom(id: string) {
      const res = await useFetchData(
        `${MEMBERS.GET_ALL_MEMBER_IN_ROOM}/${id}`,
        {
          method: "GET",
        }
      );
      return res;
    },
    async createRoomHost(payload: any) {
      const res = await useFetchData(`${MEMBERS.CREATE_ROOM_OWNER}`, {
        method: "POST",
        body: payload,
      });
      return res;
    },
    async createRoomMember(payload: any) {
      const res = await useFetchData(`${MEMBERS.CREATE_ROOM_MEMBER}`, {
        method: "POST",
        body: payload,
      });
      return res;
    },
    async updateRoomMember(payload: any, id: string) {
      const res = await useFetchData(`${MEMBERS.UPDATE_MEMBER}/${id}`, {
        method: "PUT",
        body: payload,
      });
      return res;
    },
    async updateRoomHost(payload: any, id: string) {
      const res = await useFetchData(`${MEMBERS.UPDATE_ROOM_OWNER}/${id}`, {
        method: "PUT",
        body: payload,
      });
      return res;
    },
    async deleteMember(id: string) {
      const res = await useFetchData(
        `${MEMBERS.DELETE_ONE_MEMBER_IN_ROOM}/${id}`,
        {
          method: "DELETE",
        }
      );
      return res;
    },
  },
});
