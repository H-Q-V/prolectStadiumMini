import { defineStore } from "pinia";
import axios from "axios";
import { endpoint } from "../utils/endpoint";
import { config } from "../utils/config";

const useStadium = defineStore("stadium", {
  state: () => ({
    stadiumData: [],
    resultSearch: [],
  }),
  getters: {},
  actions: {
    async createStadium(data, toast) {
      try {
        await axios.post(`${endpoint}/createStadium`, data, config);
        toast.success("Thêm mới thành công");
        this.getAllStadiumsByOwner();
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

    async getAllStadiumsByOwner() {
      try {
        const response = await axios.get(
          `${endpoint}/getAllStadiumsByOwner`,
          config
        );
        this.stadiumData = response?.data.data;
      } catch (error) {
        console.log("🚀 ~ getAllStadiumsByOwner ~ error:", error);
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
        await axios.delete(`${endpoint}/deleteStadium/${id}`, config);
        if (localStorage.getItem("userRole") === "Admin") {
          this.getAllStadium();
        } else if (localStorage.getItem("userRole") === "StadiumByOwner") {
          this.getAllStadiumsByOwner();
        }
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

export default useStadium;
