import axios from "axios";
import { defineStore } from "pinia";
import { endpoint } from "../utils/endpoint";
import { LOCAL_STORAGE_TOKEN } from "../utils/localStoreName";

export const useUser = defineStore("user", {
  state: () => ({
    username: [],
    isRegistered: false,
    isLoggedIn: false,
  }),
  getters: {
    isRegistered: (state) => state.isRegistered,
    isLoggedIn: (state) => state.isLoggedIn,
    getUsername: (state) => state.username,
  },
  actions: {
    async register(data, toast, router) {
      try {
        await axios.post(`${endpoint}/register`, data);
        this.$patch({
          isRegistered: true,
        });
        router.push({ name: "Login" });
        toast.success("Đăng kí thành công");
      } catch (error) {
        console.log("🚀 ~ register ~ error:", error);
        toast.error("Đăng ký thất bại");
      }
    },

    async login(data, toast, router) {
      try {
        const response = await axios.post(`${endpoint}/login`, data);
        this.$patch({
          isLoggedIn: true,
          username: response?.data?.data?.username,
        });
        localStorage.setItem(
          LOCAL_STORAGE_TOKEN,
          response?.data?.data?.accessToken
        );
        router.push({ name: "HomePage" });
        toast.success("Đăng nhập thành công");
      } catch (error) {
        console.log("🚀 ~ login ~ error:", error);
        toast.error(error?.response?.data);
      }
    },
  },
});
