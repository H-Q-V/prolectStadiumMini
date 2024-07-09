import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";
import { endpoint } from "../utils/endpoint";
export const useStadium = defineStore("stadium", () => {
  const stadiumData = ref([]);
  const getAllStadium = async () => {
    try {
      const response = await axios.get(`${endpoint}/getAllStadium`);
      stadiumData.value = response?.data;
    } catch (error) {
      console.log("🚀 ~ getAllStadium ~ error:", error);
    }
  };
  const getAStadium = async (id) => {
    try {
      const response = await axios.get(`${endpoint}/getAnStadium/${id}`);
      stadiumData.value = response?.data;
    } catch (error) {
      console.log("🚀 ~ getAStadium ~ error:", error);
    }
  };

  const searchStadium = async (stadiumName, address) => {
    const resultSearch = ref([]);
    try {
      const response = await axios.get(
        `${endpoint}/searchStadium?query=${stadiumName}&&${address}`
      );
      resultSearch.value = response?.data;
      console.log("🚀 ~ searchStadium ~ response:", response);
    } catch (error) {
      console.log("🚀 ~ searchStadium ~ error:", error);
    }
  };

  return {
    stadiumData,
    getAllStadium,
    getAStadium,
    searchStadium,
  };
});
