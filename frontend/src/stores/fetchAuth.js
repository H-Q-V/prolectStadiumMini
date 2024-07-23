import axios from "axios";
import { defineStore } from "pinia";
import { endpoint } from "../utils/endpoint";
import { LOCAL_STORAGE_TOKEN } from "../utils/localStoreName";

export const useUser = defineStore("user", {
  state: () => ({}),
  getters: {},
  actions: {
    async register(data, toast, router) {
      try {
        await axios.post(`${endpoint}/register`, data);
        router.push({ name: "SendOTP" });
        toast.success("Đăng kí thành công, vui lòng nhập OTP để xác nhận");
      } catch (error) {
        console.log("🚀 ~ register ~ error:", error);
        toast.error(error?.response?.data);
      }
    },

    async login(data, toast, router) {
      try {
        const response = await axios.post(`${endpoint}/login`, data);
        toast.success("Đăng nhập thành công");
        localStorage.setItem(LOCAL_STORAGE_TOKEN, response?.data?.accessToken);
        localStorage.setItem("username", response?.data?.username);
        router.push({ name: "HomePage" });
      } catch (error) {
        console.log("🚀 ~ login ~ error:", error);
        toast.error(error?.response?.data);
      }
    },

    async verifyOTP(data, toast, router) {
      try {
        await axios.post(`${endpoint}/verify-otp`, data);
        toast.success("Xác thực OTP thành công");
        router.push({ name: "Login" });
      } catch (error) {
        console.log("🚀 ~ verifyOTP ~ error:", error);
        toast.error(error?.response?.data);
      }
    },
  },
});
