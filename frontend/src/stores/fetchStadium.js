import { defineStore } from "pinia";
import axios from "axios";
import { endpoint } from "../utils/endpoint";
import { LOCAL_STORAGE_TOKEN } from "../utils/localStoreName";

export const useStadium = defineStore("stadium", {
  state: () => ({
    stadiumData: [],
    resultSearch: [],
  }),
  getters: {},
  actions: {
    async createStadium(data, toast) {
      try {
        await axios.post(`${endpoint}/createStadium`, data);
        toast.success("Thêm mới thành công");
        this.getAllStadium();
      } catch (error) {
        console.log("🚀 ~ createStadium ~ error:", error);
        toast.error(error?.response?.data?.message);
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

    async deleteStadium(id, toast) {
      try {
        await axios.delete(`${endpoint}/deleteStadium/${id}`);
        this.getAllStadium();
        toast.success("Xóa thành công");
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

    async searchStadium(stadiumName, provice, city, ward) {
      try {
        const response = await axios.get(
          `${endpoint}/searchStadium?search=${stadiumName}&provice=${provice}&city=${city}&ward=${ward}`
        );
        this.resultSearch = response?.data;
      } catch (error) {
        console.log("🚀 ~ searchStadium ~ error:", error);
      }
    },
  },
});
