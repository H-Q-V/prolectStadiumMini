<script setup>
import { onMounted, ref, watchEffect } from "vue";
import Textarea from "primevue/textarea";
import InputText from "primevue/inputtext";
import { toast } from "vue3-toastify";
import { useRoute, useRouter } from "vue-router";
import Button from "primevue/button";
import { useBookPitch, useStadium } from "../../stores";
import { formatDateTime } from "../../utils";
const phone = ref(null);
const startTime = ref(null);
const endTime = ref(null);
const note = ref(null);
const stadiumData = ref([]);
const stadiumStore = useStadium();
const bookPitchStore = useBookPitch();
const route = useRoute();
const router = useRouter();
onMounted(async () => {
  await stadiumStore.getAnStadiumStyle(
    route.params.id,
    route.params.stadiumStyleID
  );

  startTime.value = route.query.start;
  endTime.value = route.query.end;
});

watchEffect(() => {
  stadiumData.value = stadiumStore.stadiumData;
});

const handleBookPitch = async () => {
  const data = {
    phone: phone.value,
    startTime: formatDateTime(startTime.value),
    endTime: formatDateTime(endTime.value),
    note: note.value,
  };
  console.log("🚀 ~ handleBookPitch ~ data:", data);
  await bookPitchStore.bookPitch(
    data,
    toast,
    router,
    route.params.id,
    route.params.stadiumStyleID
  );
};

const validateInput = (e) => {
  const value = e.target.value;
  e.target.value = value.replace(/[^0-9]/g, "");
  phone.value = e.target.value;
};
</script>
<template>
  <h1 class="text-2xl font-bold text-center">
    Đặt lịch ở {{ stadiumData?.stadium_style?.name }} (Sân
    {{ stadiumData?.stadium_style?.type }})
  </h1>

  <form @submit.prevent="handleBookPitch" class="px-10">
    <div class="flex items-center gap-10">
      <div class="flex flex-1 flex-col gap-4">
        <h1 class="font-bold text-2xl text-center">Thông tin khách hàng</h1>
        <div class="flex flex-col gap-[10px]">
          <label for="phone">Số điện thoại</label>
          <InputText
            id="phone"
            name="phone"
            type="text"
            v-model="phone"
            class="common"
            @input="validateInput"
          ></InputText>

          <label for="note">Ghi chú</label>
          <Textarea
            id="note"
            name="note"
            rows="3"
            v-model="note"
            autoResize
            class="common"
          ></Textarea>
        </div>
      </div>

      <div class="flex flex-1 flex-col gap-4">
        <h1 class="font-bold text-2xl text-center">Thông tin đặt sân</h1>
        <span>Giá</span>
        <span>Bắt đầu: {{ formatDateTime(startTime) }}</span>
        <span>Kết thúc: {{ formatDateTime(endTime) }}</span>
        <span>Địa chỉ</span>
      </div>
    </div>

    <div class="flex items-center justify-center gap-3 mt-10">
      <Button
        type="submit"
        class="bg-[#286090] font-medium py-2 px-10 text-white rounded-md"
        >Đặt lịch</Button
      >
      <router-link
        to="/list"
        class="py-2 px-6 border border-[#286090] text-[#286090] rounded-md"
        >Hủy</router-link
      >
    </div>
  </form>
</template>
<style scoped>
.common {
  padding: 6px 12px;
  border: 1px solid #6f6f6f;
}

::v-deep .p-dialog-content {
  overflow-y: hidden;
}
</style>
