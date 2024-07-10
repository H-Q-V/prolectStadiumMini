import { defineStore } from "pinia";
import axios from "axios";
import { endpoint } from "../utils/endpoint";

export const useStadium = defineStore("stadium", {
  state: () => ({
    stadiumData: [],
    resultSearch: [],
  }),
  getters: {},
  actions: {
    async createStadium(data) {
      try {
        await axios.post(`${endpoint}/createStadium`, data);
        this.getAllStadium();
      } catch (error) {
        console.log("🚀 ~ createStadium ~ error:", error);
      }
    },
    async getAllStadium() {
      try {
        const response = await axios.get(`${endpoint}/getAllStadium`);
        this.stadiumData = response?.data.data;
      } catch (error) {
        console.log("🚀 ~ getAllStadium ~ error:", error);
      }
    },
    async getAStadium(id) {
      try {
        const response = await axios.get(`${endpoint}/getAnStadium/${id}`);
        this.stadiumData = response?.data;
      } catch (error) {
        console.log("🚀 ~ getAStadium ~ error:", error);
      }
    },
    async deleteStadium(id) {
      try {
        await axios.delete(`${endpoint}/deleteStadium/${id}`);
        this.getAllStadium();
      } catch (error) {
        console.log("🚀 ~ deleteStadium ~ error:", error);
      }
    },
    async getAnStadiumStyle(id, stadiumStyleID) {
      try {
        const response = await axios.get(
          `${endpoint}/getAnStadiumStyle/${id}/${stadiumStyleID}`
        );
        this.stadiumData = response?.data;
      } catch (error) {
        console.log("🚀 ~ getAnStadiumStyle ~ error:", error);
      }
    },
    async searchStadium(stadiumName, address) {
      try {
        const response = await axios.get(
          `${endpoint}/searchStadium?query=${stadiumName}&&${address}`
        );
        resultSearch.value = response?.data;
        console.log("🚀 ~ searchStadium ~ response:", response);
      } catch (error) {
        console.log("🚀 ~ searchStadium ~ error:", error);
      }
    },
  },
});
