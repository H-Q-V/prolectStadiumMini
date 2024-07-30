<script setup>
import { onMounted, ref, watchEffect } from "vue";
import date from "date-and-time";
import InputText from "primevue/inputtext";
import DatePicker from "primevue/datepicker";
import Button from "primevue/button";
import { toast } from "vue3-toastify";
import { useStadium } from "../../stores/fetchStadium";
import { useRoute, useRouter } from "vue-router";
import Tag from "../../components/tag/Tag.vue";
import { useBookPitch } from "../../stores/fetchBookPitch";
import Dialog from "primevue/dialog";
import Calendar from "../../components/calendar/Calendar.vue";
import Checkbox from "primevue/checkbox";
const phone = ref(null);
const startTime = ref(null);
const endTime = ref(null);
const isRecurring = ref(false);
const recurringFrequency = ref("");
const recurringEndDate = ref(null);
const stadiumData = ref([]);
const stadiumStore = useStadium();
const bookPitchStore = useBookPitch();
const route = useRoute();
const router = useRouter();
const visible = ref(false);
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
    recurringFrequency: recurringFrequency.value,
    recurringEndDate: recurringEndDate.value
      ? date.format(recurringEndDate.value, "YYYY/MM/DD")
      : null,
  };
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
    <div class="flex gap-[50px]">
      <div class="w-[580px] flex flex-col gap-[10px]">
        <h1 class="text-xl">Thông tin cá nhân</h1>
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
            id="periodic"
            binary
            class="border border-solid border-[#6f6f6f] rounded-md"
          ></Checkbox>
          <label for="periodic">Đặt sân định kì</label>
        </div>

        <div v-if="isRecurring" class="flex flex-col gap-[10px]">
          <Select
            v-model="recurringFrequency"
            id="frequency"
            class="border border-[#6f6f6f] rounded-md px-2 py-4"
          >
            <Option value="daily">Hàng ngày</Option>
            <Option value="weekly">Hàng tuần</Option>
            <Option value="monthly">Hàng tháng</Option>
          </Select>
          <label for="recurringEndDate">Ngày kết thúc định kỳ</label>
          <DatePicker v-model="recurringEndDate" id="recurringEndDate" />
        </div>
      </div>

      <div class="flex flex-col gap-[10px]">
        <h1 class="text-xl">Thông tin chi tiết sân</h1>

        <Tag
          :infor="'Số điện thoại'"
          :value="stadiumData.phone"
          :className="'gap-5'"
        ></Tag>

        <Tag
          :infor="'Địa chỉ '"
          :value="`${stadiumData.ward} ${stadiumData.city} ${stadiumData.provice}`"
          :className="'gap-5'"
        ></Tag>
        <Tag
          :infor="'Giá'"
          :value="stadiumData?.stadium_style?.price"
          :class="'gap-5'"
        ></Tag>

        <div class="flex items-center gap-3">
          <Button
            type="submit"
            label="Đặt sân"
            class="bg-[#286090] font-medium py-2 px-6 text-white"
          ></Button>

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
