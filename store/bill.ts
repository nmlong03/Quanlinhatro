import { defineStore } from "pinia";

export const useBillStore = defineStore({
  id: "bill",
  state: () => ({}),
  actions: {
    async createMonthlyBill(payload: any) {
      const res = await useFetchData(`${BILL.CREATE_MONTHLY_BILL}`, {
        method: "POST",
        body: payload,
      });
      return res;
    },
    async getAllBill(payload: any) {
      const res = await useFetchData(`${BILL.GET_ALL_BILLS}`, {
        method: "GET",
        params: {
          motel: payload.motel,
          monthDate: payload.monthDate,
        },
      });
      return res;
    },
    async getOneBill(id: string) {
      const res = await useFetchData(`${BILL.GET_ONE_BILL}/${id}`, {
        method: "GET",
      });
      return res;
    },
    async updateBillPaidAmount(payload: any, id: string) {
      const res = await useFetchData(`${BILL.UPDATE_BILL_PAID_AMOUNT}/${id}`, {
        method: "PUT",
        body: payload,
      });
      return res;
    },
    async deleteBill(id: string) {
      const res = await useFetchData(`${BILL.DELETE_BILL}/${id}`, {
        method: "DELETE",
      });
      return res;
    },
    async sendMailMonthlyBill(id: string) {
      const res = await useFetchData(`${BILL.SEND_MAIL_MONTHLY_BILL}/${id}`, {
        method: "POST",
      });
      return res;
    },
    async generateBillPdf(id: string) {
      const res = await useFetchData(`${BILL.GENERATE_BILL_PDF}/${id}`, {
        method: "GET",
      });
      return res;
    },
  },
});
