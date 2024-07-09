<script setup>
import { ref } from "vue";
import InputText from "primevue/inputtext";
import Checkbox from "primevue/checkbox";
import Button from "primevue/button";
const email = ref("");
const password = ref("");
const checked = ref(false);
const onSubmit = () => {
  const data = {
    email: email.value,
    password: password.value,
    rememberMe: checked.value,
  };
  console.log("🚀 ~ onSubmit ~ data:", data);
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

      <form @submit.prevent="onSubmit">
        <label for="email1" class="block text-black text-xl font-medium mb-2"
          >Email</label
        >
        <InputText
          id="email"
          type="text"
          placeholder="Email address"
          class="w-full px-5 py-4 border border-[#cbd5e1] mb-5"
          v-model="email"
        />

        <label for="password1" class="block text-black font-medium text-xl mb-2"
          >Password</label
        >
        <InputText
          id="password"
          type="text"
          placeholder="Password"
          class="w-full px-5 py-4 border border-[#cbd5e1] mb-5"
          v-model="password"
        />

        <div class="flex items-center justify-between mb-5 gap-5">
          <div class="flex items-center">
            <Checkbox
              v-model="checked"
              id="remembermer"
              binary
              class="mr-2 border border-[#cbd5e1] rounded-md"
            ></Checkbox>
            <label class="text-black" for="rememberme1">Remember me</label>
          </div>
          <a
            class="font-medium no-underline ml-2 text-right cursor-pointer"
            style="color: #81c784"
            >Forgot password?</a
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
        <a href="/auth/register" class="text-primary">Sign up</a>
      </div>
    </div>
  </div>
</template>
<style scoped>
.p-checkbox-input {
  height: 20px;
}
</style>
