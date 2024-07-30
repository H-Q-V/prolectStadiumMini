<script setup>
import { onMounted, ref, watchEffect } from "vue";
import { useBookPitch } from "../../stores/fetchBookPitch";
import Button from "primevue/button";
import date from "date-and-time";
import { toast } from "vue3-toastify";
const customerBookPitchesData = ref([]);
const bookPitchStore = useBookPitch();
onMounted(async () => {
  await bookPitchStore.getCustomerBookPitches();
});

watchEffect(() => {
  customerBookPitchesData.value = bookPitchStore.customerBookPitchesData;
});

const formatBookingTime = (time) => {
  if (time) {
    const dateTime = new Date(time);
    if (!isNaN(dateTime.getTime())) {
      return date.format(dateTime, "YYYY/MM/DD HH:mm");
    }
  }
  return "Invalid date";
};

const handleDeleteBookPitch = async (id) => {
  if (window.confirm("Bạn có chắc chắn xóa không ?")) {
    await bookPitchStore.deleteBookPitch(id, toast);
  }
};
</script>
<template>
  <div class="grid grid-cols-3 gap-4">
    <div
      v-if="customerBookPitchesData.length > 0"
      v-for="booking in customerBookPitchesData"
      :key="booking._id"
      class="px-2 py-6 rounded-lg shadow-md"
    >
      <div class="flex flex-col gap-2">
        <h1 class="font-bold text-xl">Sân {{ booking.stadium_name }}</h1>
        <div class="flex items-center">
          <span>Kiểu sân: {{ booking.name }}</span>
          <span>(sân{{ booking.type }})</span>
        </div>
        <span
          >Địa chỉ: {{ booking.ward }} {{ booking.city }}
          {{ booking.provice }}</span
        >
        <span>Bắt đầu: {{ formatBookingTime(booking.originalStartTime) }}</span>
        <span>Kết thúc: {{ formatBookingTime(booking.originalEndTime) }}</span>

        <div class="flex items-center justify-center gap-4">
          <Button class="bg-blue-500">Sửa lịch</Button>
          <Button
            @click="handleDeleteBookPitch(booking._id)"
            class="bg-red-500 px-10 py-3"
            >Xóa lịch</Button
          >
        </div>
      </div>
    </div>

    <h1 v-else class="text-xl">Hiện chưa có lịch đặt sân nào</h1>
  </div>

  <router-link
    to="/list"
    class="fixed flex items-center justify-center bottom-3 right-3 w-[38px] h-[38px] bg-slate-500 rounded-full text-white z-10"
  >
    <i class="pi pi-fw pi-plus"></i>
  </router-link>
</template>
<style scoped>
Button {
  color: white;
  padding: 12px 40px;
  border-radius: 6px;
}
</style>
