<script setup>
import { ref } from "vue";
import InputText from "primevue/inputtext";
import Checkbox from "primevue/checkbox";
import Button from "primevue/button";
const email = ref("");
const username = ref("");
const password = ref("");
const checked = ref(false);

const onSubmit = (e) => {
  e.preventDefault();
  const data = {
    email: email.value,
    password: password.value,
    rememberMe: checked.value,
  };
  console.log("🚀 ~ onSubmit ~ data:", data);
};
</script>

<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100 px-5">
    <div class="w-[580px] bg-white shadow-lg rounded-[20px] px-6 py-4">
      <div class="text-center">
        <div class="text-black text-3xl font-medium">Welcome</div>
        <span class="text-black font-medium">Sign up to continue</span>
      </div>

      <form @submit="onSubmit">
        <label for="email1" class="block text-black text-xl font-medium mb-2">
          Email
        </label>
        <InputText
          id="email1"
          type="text"
          placeholder="Email address"
          class="w-full px-5 py-4 text-black border border-[#cbd5e1] mb-5"
          v-model="email"
        />

        <label
          for="username1"
          class="block text-black text-xl font-medium mb-2"
        >
          Username
        </label>
        <InputText
          id="username1"
          type="text"
          placeholder="Username"
          class="w-full px-5 py-4 text-black border border-[#cbd5e1] mb-5"
          v-model="username"
        />

        <label for="password" class="block text-black font-medium text-xl mb-2">
          Password
        </label>
        <InputText
          id="password"
          type="text"
          placeholder="Password"
          class="w-full px-5 py-4 text-black border border-[#cbd5e1] mb-5"
          v-model="password"
        />

        <div class="flex items-center justify-between mb-5 gap-5">
          <div class="flex items-center">
            <Checkbox
              v-model="checked"
              id="rememberme"
              binary
              class="mr-2 border border-[#cbd5e1] rounded-md"
            ></Checkbox>
            <label class="text-black font-medium" for="rememberme1"
              >Remember me</label
            >
          </div>
        </div>

        <Button
          type="submit"
          label="Sign up"
          class="w-full px-3 py-5 text-xl bg-primary text-white"
        ></Button>
      </form>

      <div class="flex items-center justify-center gap-4 mt-4">
        <p class="text-black font-medium">Already have an account?</p>
        <a href="/auth/login" class="text-primary">Sign in</a>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
