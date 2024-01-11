import { defineStore } from "pinia";

export const useAdministrativeStore = defineStore({
  id: "administrative",
  state: () => ({
    provinces: null,
    districts: null,
    wards: null,
  }),
  actions: {
    async getDistrictOfHaNoi(params: any) {
      const res = await useFetchProvince(
        `${ADMINISTRATIVE.GET_DISTRICTS_BY_PROVINCE}?provinceCode=${params.provinceCode}&limit=${params.limit}`,
        {
          method: "GET",
        }
      );
      return res;
    },
    async getWardByDistrict(params: any) {
      const res = await useFetchProvince(
        `${ADMINISTRATIVE.GET_WARDS_BY_DISTRICT}?districtCode=${params.districtCode}&limit=${params.limit}`,
        {
          method: "GET",
        }
      );
      return res;
    },
  },
});
