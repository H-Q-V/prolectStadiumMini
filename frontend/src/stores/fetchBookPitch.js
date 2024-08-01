import axios from "axios";
import { defineStore } from "pinia";
import { endpoint } from "../utils/endpoint";
import { LOCAL_STORAGE_TOKEN } from "../utils/localStoreName";

export const useBookPitch = defineStore("bookPitch", {
  state: () => ({
    bookPitchData: [],
    customerBookPitchesData: [],
  }),
  getters: {},
  actions: {
    async bookPitch(data, toast, router, id, idStadiumStyle) {
      const config = {
        headers: {
          token: `Bearer ${localStorage.getItem(LOCAL_STORAGE_TOKEN)}`,
        },
      };
      try {
        await axios.post(
          `${endpoint}/bookPitch/${id}/${idStadiumStyle}`,
          data,
          config
        );
        toast.success("Đặt chỗ thành công");
        router.push(`/payment/${id}/${idStadiumStyle}`);
      } catch (error) {
        console.log("🚀 ~ bookPitch ~ error:", error);
        toast.error(error?.response?.data?.message);
      }
    },

    async getAllBookPitches() {
      try {
        const response = await axios.get(`${endpoint}/getAllBookPitches`);
        this.bookPitchData = response?.data;
        console.log("🚀 ~ getAllBookPitches ~ response:", response);
      } catch (error) {
        console.log("🚀 ~ getAllBookPitches ~ error:", error);
      }
    },

    async deleteBookPitch(id, toast) {
      const config = {
        headers: {
          token: `Bearer ${localStorage.getItem(LOCAL_STORAGE_TOKEN)}`,
        },
      };
      try {
        const response = await axios.delete(
          `${endpoint}/deleteBookPitches/${id}`,
          config
        );
        this.getCustomerBookPitches();
        toast.success("Xóa lịch thành công");
        console.log("🚀 ~ deleteBookPitch ~ response:", response);
      } catch (error) {
        console.log("🚀 ~ deleteBookPitch ~ error:", error);
      }
    },

    async getCustomerBookPitches() {
      const config = {
        headers: {
          token: `Bearer ${localStorage.getItem(LOCAL_STORAGE_TOKEN)}`,
        },
      };
      try {
        const response = await axios.get(
          `${endpoint}/getCustomerBookPitches`,
          config
        );
        this.customerBookPitchesData = response?.data?.message;
      } catch (error) {
        console.log("🚀 ~ getCustomerBookPitches ~ error:", error);
      }
    },
  },
});
