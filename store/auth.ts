import { defineStore } from "pinia";

interface ISignin {
  email: string;
  password: string;
}

interface ISignup {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
}

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    owner: null,
  }),
  actions: {
    async signin(payload: ISignin) {
      const res = await useFetchData(`${AUTH.SIGNIN}`, {
        method: "POST",
        body: payload,
      });
      return res;
    },
    async signup(payload: ISignup) {
      const res = await useFetchData(`${AUTH.SIGNUP}`, {
        method: "POST",
        body: payload,
      });
      return res;
    },
    async confirmMail(params: string) {
      const res = await useFetchData(`${AUTH.CONFIRM_MAIL}/${params}`, {
        method: "PUT",
      });
      return res;
    },
  },
});
