<script setup>
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import { ref } from "vue";
const email = ref("");
const password = ref("");
const handleSubmit = () => {
  const data = {
    email: email.value,
    password: password.value,
  };
};
</script>
<template>
  <div
    class="flex items-center justify-center min-h-screen min-w-screen bg-gray-100 px-5"
  >
    <div class="w-[580px] bg-white shadow-lg rounded-[20px] px-6 py-10">
      <div class="text-center mb-5">
        <div class="text-black text-3xl font-medium mb-3">Quên mật khẩu</div>
      </div>

      <form @submit.prevent="handleSubmit">
        <label for="email" class="block text-black font-medium text-xl mb-2"
          >Email</label
        >
        <InputText
          id="email"
          name="email"
          type="text"
          placeholder="Email"
          class="w-full px-5 py-4 border border-[#cbd5e1] mb-5"
          v-model="email"
        />

        <label for="password" class="block text-black font-medium text-xl mb-2"
          >Mật khẩu mới</label
        >
        <InputText
          id="password"
          name="password"
          type="text"
          placeholder="Mật khẩu mới"
          class="w-full px-5 py-4 border border-[#cbd5e1] mb-5"
          v-model="password"
        />

        <Button
          type="submit"
          label="Xác nhận"
          class="w-full p-3 text-xl bg-primary text-white"
        ></Button>
      </form>
    </div>
  </div>
</template>
<style>
.p-checkbox-input {
  height: 20px;
}
</style>
