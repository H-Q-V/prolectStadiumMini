import axios from "axios";
import { defineStore } from "pinia";
import { endpoint } from "../utils/endpoint";
import { LOCAL_STORAGE_TOKEN } from "../utils/localStoreName";
import { config } from "../utils/config";

const useUser = defineStore("user", {
  state: () => ({
    userData: [],
  }),
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
        localStorage.setItem("userRole", response?.data?.role);
        if (response?.data?.role === "Admin") {
          router.push({ name: "Admin" });
        } else if (response?.data?.role === "StadiumOwner") {
          router.push({ name: "StadiumOwner" });
        } else {
          router.push({ name: "HomePage" });
        }
      } catch (error) {
        console.log("🚀 ~ login ~ error:", error);
        toast.error(error?.response?.data);
      }
    },

    async getAllCustomers() {
      try {
        const response = await axios.get(`${endpoint}/getAllCustomer`, config);
        this.userData = response?.data;
      } catch (error) {
        console.log("🚀 ~ getAllCustomers ~ error:", error);
      }
    },

    async updateCustomer(customerId, role, toast) {
      try {
        const response = await axios.put(
          `${endpoint}/updateCustomer/${customerId}`,
          { role },
          config
        );
        this.getAllCustomers();
        toast.success(response?.data?.message);
      } catch (error) {
        console.log("🚀 ~ updateCustomer ~ error:", error);
      }
    },

    async deleteCustomer(customerId, toast) {
      try {
        const response = await axios.delete(
          `${endpoint}/deleteCustomer/${customerId}`,
          config
        );
        console.log("🚀 ~ deleteCustomer ~ response:", response);
        this.getAllCustomers();
        toast.success("Xóa thành công");
      } catch (error) {
        console.log("🚀 ~ deleteCustomer ~ error:", error);
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

export default useUser;
