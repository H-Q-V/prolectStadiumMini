import axios from "axios";
import { defineStore } from "pinia";
export const useAddress = defineStore("address", {
  state: () => ({
    provinceData: [],
    cityData: [],
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

    async getCity(provinceID) {
      try {
        const response = await axios.get(
          `https://esgoo.net/api-tinhthanh/2/${provinceID}.htm`
        );
        this.cityData = response?.data?.data;
      } catch (error) {
        console.log("🚀 ~ getCity ~ error:", error);
      }
    },

    async getWard(cityID) {
      try {
        const response = await axios.get(
          `https://esgoo.net/api-tinhthanh/3/${cityID}.htm`
        );
        this.wardData = response?.data?.data;
      } catch (error) {
        console.log("🚀 ~ getWard ~ error:", error);
      }
    },
  },
});
