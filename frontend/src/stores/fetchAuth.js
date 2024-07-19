import axios from "axios";
import { defineStore } from "pinia";
import { endpoint } from "../utils/endpoint";
import { LOCAL_STORAGE_TOKEN } from "../utils/localStoreName";

export const useUser = defineStore("user", {
  state: () => ({
    username: "",
  }),
  getters: {
    getUsername: (state) => state.username,
  },
  actions: {
    async register(data, toast, router) {
      try {
        await axios.post(`${endpoint}/register`, data);
        toast.success("Đăng kí thành công");
        router.push({ name: "Login" });
      } catch (error) {
        console.log("🚀 ~ register ~ error:", error);
        toast.error(error?.response?.data?.message);
      }
    },

    async login(data, toast, router) {
      try {
        const response = await axios.post(`${endpoint}/login`, data);
        this.username = response?.data?.username;
        toast.success("Đăng nhập thành công");
        localStorage.setItem(LOCAL_STORAGE_TOKEN, response?.data?.accessToken);
        localStorage.setItem("username", response?.data?.username);
        router.push({ name: "HomePage" });
      } catch (error) {
        console.log("🚀 ~ login ~ error:", error);
        toast.error(error?.response?.data);
      }
    },
  },
});
