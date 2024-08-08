<script setup>
import { ref } from "vue";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import { toast } from "vue3-toastify";
import { useRouter } from "vue-router";
import { useUser } from "../stores";
const router = useRouter();
const email = ref("");
const username = ref("");
const password = ref("");

const userStore = useUser();
const handleSubmit = async () => {
  const data = {
    email: email.value,
    username: username.value,
    password: password.value,
  };
  await userStore.register(data, toast, router);
};
</script>

<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100 px-5">
    <div class="w-[580px] bg-white shadow-lg rounded-[20px] px-6 py-4">
      <div class="text-center">
        <div class="text-black text-3xl font-medium">Welcome</div>
        <span class="text-black font-medium">Sign up to continue</span>
      </div>

      <form @submit.prevent="handleSubmit">
        <label for="email" class="block text-black text-xl font-medium mb-2">
          Email
        </label>
        <InputText
          id="email"
          name="email"
          type="text"
          placeholder="Email address"
          class="w-full px-5 py-4 text-black border border-[#cbd5e1] mb-5"
          v-model="email"
        />

        <label for="username" class="block text-black text-xl font-medium mb-2">
          Tên người dùng
        </label>
        <InputText
          id="username"
          name="username"
          type="text"
          placeholder="Tên người dùng"
          class="w-full px-5 py-4 text-black border border-[#cbd5e1] mb-5"
          v-model="username"
        />

        <label for="password" class="block text-black font-medium text-xl mb-2">
          Mật khẩu
        </label>
        <InputText
          id="password"
          name="password"
          type="password"
          placeholder="Mật khẩu"
          class="w-full px-5 py-4 text-black border border-[#cbd5e1] mb-5"
          v-model="password"
        />

        <Button
          type="submit"
          label="Đăng kí"
          class="w-full px-3 py-5 text-xl bg-primary text-white"
        ></Button>
      </form>

      <div class="flex items-center justify-center gap-4 mt-4">
        <p class="text-black font-medium">Bạn đã có tài khoản?</p>
        <router-link to="/auth/login" class="text-primary"
          >Đăng nhập</router-link
        >
      </div>
    </div>
  </div>
</template>

<style scoped></style>
