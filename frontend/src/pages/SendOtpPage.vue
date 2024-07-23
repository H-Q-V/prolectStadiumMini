<script setup>
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import { ref } from "vue";
import { useUser } from "../stores/fetchAuth";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";
const otp = ref("");
const userStore = useUser();
const router = useRouter();
const handleSend = async () => {
  const data = {
    otp: otp.value,
  };
  await userStore.verifyOTP(data, toast, router);
  console.log("🚀 ~ handleSend ~ data:", data);
};
</script>
<template>
  <div></div>
  <div
    class="flex items-center justify-center min-h-screen min-w-screen bg-gray-100 px-5"
  >
    <div class="w-[580px] bg-white shadow-lg rounded-[20px] px-6 py-10">
      <div class="text-center mb-5">
        <div class="text-black text-3xl font-medium mb-3">Xác nhận OTP</div>
      </div>

      <form @submit.prevent="handleSend">
        <InputText
          id="otp"
          name="otp"
          type="text"
          placeholder="Mã OTP"
          class="w-full px-5 py-4 border border-[#cbd5e1] mb-5"
          v-model="otp"
        />

        <Button
          type="submit"
          label="Gửi"
          class="w-full p-3 text-xl bg-primary text-white"
        ></Button>
      </form>
    </div>
  </div>
</template>
<style></style>
