<script setup>
import { onMounted, ref, watchEffect } from "vue";
import date from "date-and-time";
import InputText from "primevue/inputtext";
import DatePicker from "primevue/datepicker";
import { toast } from "vue3-toastify";
import { useRoute, useRouter } from "vue-router";
import Checkbox from "primevue/checkbox";
import Dropdown from "primevue/dropdown";
import Button from "primevue/button";
import { useBookPitch, useStadium } from "../../stores";
const phone = ref(null);
const startTime = ref(null);
const endTime = ref(null);
const isRecurring = ref(false);
const selectPeriodic = ref(null);
const periodicOptions = ref([{ name: "Hàng tuần" }, { name: "Hàng tháng" }]);
const timePeriodsToBook = ref(null);
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
});

watchEffect(() => {
  stadiumData.value = stadiumStore.stadiumData;
});

const handleBookPitch = async () => {
  const data = {
    phone: phone.value,
    startTime: date.format(startTime.value, "YYYY/MM/DD HH:mm"),
    endTime: date.format(endTime.value, "YYYY/MM/DD HH:mm"),
    isRecurring: isRecurring.value,
    bookingType: selectPeriodic?.value?.name || "",
    timePeriodsToBook: timePeriodsToBook.value
      ? date.format(timePeriodsToBook.value, "YYYY/MM/DD")
      : "",
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

const formatPrice = (price) => {
  return (
    new Intl.NumberFormat("vi-VN", {
      minimumFractionDigits: 0,
    }).format(price) + " VNĐ"
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
  <form @submit.prevent="handleBookPitch" class="flex flex-col gap-[20px]">
    <div class="flex items-center justify-center">
      <div class="w-[780px] flex flex-col gap-[10px]">
        <label for="phone">Số điện thoại</label>
        <InputText
          id="phone"
          type="text"
          v-model="phone"
          class="common"
          @input="validateInput"
        ></InputText>

        <label for="startTime">Thời gian bắt đầu</label>
        <DatePicker
          id="startTime"
          v-model="startTime"
          showTime
          hourFormat="24"
          fluid
          inputId="datetime"
        />

        <label for="endTime">Thời gian kết thúc</label>
        <DatePicker
          id="endTime"
          v-model="endTime"
          showTime
          hourFormat="24"
          fluid
          inputId="datetime"
        />

        <div class="flex items-center gap-2">
          <Checkbox
            v-model="isRecurring"
            id="isRecurring"
            name="isRecurring"
            binary
            class="border border-solid border-[#6f6f6f] rounded-md"
          ></Checkbox>
          <label for="periodic">Đặt sân định kì</label>
        </div>

        <div v-if="isRecurring" class="flex flex-col gap-[10px]">
          <Dropdown
            v-model="selectPeriodic"
            :options="periodicOptions"
            optionLabel="name"
            name="role"
            placeholder="Chọn lịch đặt"
            class="w-full p-4 border border-[#334155]"
          />
          <label for="timePeriodsToBook">Ngày kết thúc định kỳ</label>
          <DatePicker
            v-model="timePeriodsToBook"
            id="timePeriodsToBook"
            name="timePeriodsToBook"
          />
        </div>
        <div class="flex items-center justify-center gap-3 mt-2">
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
      </div>
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
