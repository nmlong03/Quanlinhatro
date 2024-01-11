import { defineStore } from "pinia";

export const useLiquidateStore = defineStore({
  id: "liquidate-bill",
  state: () => ({}),
  actions: {
    async getAllLiquidateBill(params: any) {
      const res = await useFetchData(
        `${LIQUIDATE_BILL.GET_ALL_LIQUIDATE_BILL}`,
        {
          method: "GET",
          params: params,
        }
      );
      return res;
    },
    async getOneLiquidateBill(id: string) {
      const res = await useFetchData(
        `${LIQUIDATE_BILL.GET_ONE_LIQUIDATE_BILL}/${id}`,
        {
          method: "GET",
        }
      );
      return res;
    },
    async createLiquidateBill(payload: any) {
      const res = await useFetchData(
        `${LIQUIDATE_BILL.CREATE_LIQUIDATE_BILL}`,
        {
          method: "POST",
          body: payload,
        }
      );
      return res;
    },
    async sendingLiquidateBillMail(id: string) {
      const res = await useFetchData(
        `${LIQUIDATE_BILL.SEND_LIQUIDATE_BILL_MAIL}/${id}`,
        {
          method: "POST",
        }
      );
      return res;
    },
  },
});
