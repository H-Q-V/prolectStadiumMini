import axios from "axios";
import { defineStore } from "pinia";
import { config, endpoint } from "../utils";
const useRevenue = defineStore("revenue", {
  state: () => ({
    revenueData: [],
    revenuesData: [],
  }),
  getters: {},
  actions: {
    async getRevenues() {
      try {
        const response = await axios.get(`${endpoint}/getRevenues`, config);
        this.revenuesData = response?.data?.data;
      } catch (error) {
        console.log("🚀 ~ getRevenues ~ error:", error);
      }
    },
    async getRevenue() {
      try {
        const response = await axios.get(`${endpoint}/getRevenue`, config);
        this.revenueData = response?.data?.data;
        console.log("🚀 ~ getRevenue ~ response:", response);
      } catch (error) {
        console.log("🚀 ~ getRevenue ~ error:", error);
      }
    },
    async getRevenuesOwner() {
      try {
        const response = await axios.get(
          `${endpoint}/getRevenuesOwner`,
          config
        );
        this.revenuesData = response?.data?.data;
      } catch (error) {
        console.log("🚀 ~ getRevenuesOwner ~ error:", error);
      }
    },

    async getRevenueOwner() {
      try {
        const response = await axios.get(`${endpoint}/getRevenueOwner`, config);
        this.revenueData = response?.data?.data;
      } catch (error) {
        console.log("🚀 ~ getRevenueOwner ~ error:", error);
      }
    },
  },
});

export default useRevenue;
