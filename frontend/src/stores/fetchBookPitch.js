import axios from "axios";
import { defineStore } from "pinia";
import { endpoint } from "../utils/endpoint";

export const useBookPitch = defineStore("bookPitch", {
  state: () => ({
    bookPitchData: [],
  }),
  getters: {},
  actions: {
    async getAllBookPitches() {
      try {
        const response = await axios.get(`${endpoint}/getAllBookPitches`);
        this.bookPitchData = response?.data;
        console.log("🚀 ~ getAllBookPitches ~ response:", response);
      } catch (error) {
        console.log("🚀 ~ getAllBookPitches ~ error:", error);
      }
    },
  },
});
