import axios from "axios";
import { defineStore } from "pinia";
import { config, endpoint } from "../utils";
const useBookPitch = defineStore("bookPitch", {
  state: () => ({
    bookPitchData: [],
    customerBookPitchesData: [],
  }),
  getters: {},
  actions: {
    async bookPitch(data, toast, router, id, idStadiumStyle) {
      try {
        await axios.post(
          `${endpoint}/bookPitch/${id}/${idStadiumStyle}`,
          data,
          config
        );
        toast.success(
          "Đăng kí giữ giỗ thành công. Thời gian giữ chỗ sẽ hết sau 15 phút"
        );
        router.push(`/payment`);
      } catch (error) {
        console.log("🚀 ~ bookPitch ~ error:", error);
        toast.error(error?.response?.data?.message);
      }
    },

    async getAllBookPitches() {
      try {
        const response = await axios.get(`${endpoint}/getAllBookPitches`);
        this.bookPitchData = response?.data;
      } catch (error) {
        console.log("🚀 ~ getAllBookPitches ~ error:", error);
      }
    },

    async getBookPitch() {
      try {
        const response = await axios.get(
          `${endpoint}/getAnBookPitches`,
          config
        );
        this.bookPitchData = response?.data?.data;
      } catch (error) {
        console.log("🚀 ~ getBookPitch ~ error:", error);
      }
    },
    async deleteBookPitch(id, toast) {
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

    async payment() {
      try {
        const data = {};
        const response = await axios.post(`${endpoint}/payment`, data, config);
        window.location.href = response.data.url;
      } catch (error) {
        console.log("🚀 ~ payment ~ error:", error);
      }
    },

    async getCustomerBookPitches() {
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

    async getStadiumOwnerBookings() {
      try {
        const response = await axios.get(
          `${endpoint}/getStadiumOwnerBookings`,
          config
        );
        this.bookPitchData = response?.data?.message;
      } catch (error) {
        console.log("🚀 ~ getStadiumOwnerBookings ~ error:", error);
      }
    },

    async getFreeTime(id) {
      try {
        const response = await axios.get(
          `${endpoint}/getFreeTime/${id}`,
          config
        );

        this.bookPitchData = response?.data?.data;
      } catch (error) {
        console.log("🚀 ~ getFreeTime ~ error:", error);
      }
    },
  },
});

export default useBookPitch;
