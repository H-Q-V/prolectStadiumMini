<script setup>
import { ref } from "vue";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import { toast } from "vue3-toastify";
import { useRouter } from "vue-router";
import { useUser } from "../stores/fetchAuth";
const router = useRouter();
const userStore = useUser();
const username = ref("");
const password = ref("");
const handleSubmit = async () => {
  const data = {
    username: username.value,
    password: password.value,
  };
  console.log("🚀 ~ handleSubmit ~ data:", data);
  await userStore.login(data, toast, router);
};
</script>
<template>
  <div
    class="flex items-center justify-center min-h-screen min-w-screen bg-gray-100 px-5"
  >
    <div class="w-[580px] bg-white shadow-lg rounded-[20px] px-6 py-6">
      <div class="text-center mb-5">
        <div class="text-black text-3xl font-medium mb-3">Welcome</div>
        <span class="text-black font-medium">Sign in to continue</span>
      </div>

      <form @submit.prevent="handleSubmit">
        <label for="username" class="block text-black text-xl font-medium mb-2"
          >Tên người dùng</label
        >
        <InputText
          id="username"
          name="username"
          type="text"
          placeholder="Tên người dùng"
          class="w-full px-5 py-4 border border-[#cbd5e1] mb-5"
          v-model="username"
        />

        <label for="password" class="block text-black font-medium text-xl mb-2"
          >Mật khẩu</label
        >
        <InputText
          id="password"
          name="password"
          type="text"
          placeholder="Mật khẩu"
          class="w-full px-5 py-4 border border-[#cbd5e1] mb-5"
          v-model="password"
        />

        <div class="flex items-center justify-end mb-5 gap-5">
          <router-link
            class="font-medium no-underline ml-2 text-right cursor-pointer"
            style="color: #81c784"
            >Forgot password?</router-link
          >
        </div>
        <Button
          type="submit"
          label="Sign In"
          class="w-full p-3 text-xl bg-primary text-white"
        ></Button>
      </form>

      <div class="flex items-center justify-center gap-4 mt-4">
        <p class="text-black">You haven't any account?</p>
        <router-link to="/auth/register" class="text-primary"
          >Sign up</router-link
        >
      </div>
    </div>
  </div>
</template>
<style scoped>
.p-checkbox-input {
  height: 20px;
}
</style>
