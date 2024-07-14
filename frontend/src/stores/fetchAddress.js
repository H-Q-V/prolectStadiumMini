import axios from "axios";
import { defineStore } from "pinia";
export const useAddress = defineStore("address", {
  state: () => ({
    provinceData: [],
    districtData: [],
    wardData: [],
  }),
  getters: {},
  actions: {
    async getAllProvince() {
      try {
        const response = await axios.get(
          "https://esgoo.net/api-tinhthanh/1/0.htm"
        );
        this.provinceData = response?.data?.data;
      } catch (error) {
        console.log("🚀 ~ getAllAddress ~ error:", error);
      }
    },

    async getdistrict(provinceID) {
      try {
        const response = await axios.get(
          `https://esgoo.net/api-tinhthanh/2/${provinceID}.htm`
        );
        this.districtData = response?.data?.data;
      } catch (error) {
        console.log("🚀 ~ getdistrict ~ error:", error);
      }
    },

    async getWard(districtID) {
      try {
        const response = await axios.get(
          `https://esgoo.net/api-tinhthanh/3/${districtID}.htm`
        );
        this.wardData = response?.data?.data;
      } catch (error) {
        console.log("🚀 ~ getWard ~ error:", error);
      }
    },
  },
});
