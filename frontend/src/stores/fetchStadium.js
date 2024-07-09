import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";
import { endpoint } from "../utils/endpoint";
export const useStadium = defineStore("stadium", () => {
  const stadiumData = ref([]);
  const getAllStadium = async () => {
    try {
      const response = await axios.get(`${endpoint}/getAllStadium`);
      stadiumData.value = response?.data?.data;
    } catch (error) {
      console.log("🚀 ~ getAllStadium ~ error:", error);
    }
  };
  const getAStadium = async (id) => {
    try {
      const response = await axios.get(`${endpoint}/getAnStadium/${id}`);
      stadiumData.value = response?.data?.data;
    } catch (error) {
      console.log("🚀 ~ getAStadium ~ error:", error);
    }
  };

  return {
    stadiumData,
    getAllStadium,
    getAStadium,
  };
});
