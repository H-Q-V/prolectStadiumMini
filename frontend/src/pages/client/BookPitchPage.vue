<script setup>
import { onMounted, ref } from "vue";
import date from "date-and-time";
import InputText from "primevue/inputtext";
import DatePicker from "primevue/datepicker";
import Button from "primevue/button";
import { toast } from "vue3-toastify";
import { useStadium } from "../../stores/fetchStadium";
import { useRoute } from "vue-router";
import Tag from "../../components/tag/Tag.vue";
const phone = ref(null);
const startTime = ref(null);
const endTime = ref(null);
const stadiumData = ref([]);
const stadiumStore = useStadium();
const route = useRoute();
onMounted(async () => {
  await stadiumStore.getAnStadiumStyle(
    route.params.id,
    route.params.stadiumStyleID
  );
  stadiumData.value = stadiumStore.stadiumData;
});

const handleBookPitch = async () => {
  const data = {
    phone: phone.value,
    startTime: date.format(startTime.value, "YYYY/MM/DD HH:mm"),
    endTime: date.format(endTime.value, "YYYY/MM/DD HH:mm"),
  };
  console.log("🚀 ~ handleBookPitch ~ data:", data);
  const response = await stadiumStore.bookPitch(
    data,
    toast,
    route.params.stadiumID,
    route.params.stadiumStyleID
  );
  console.log("🚀 ~ handleBookPitch ~ response:", response);
};

const formatPrice = (price) => {
  return (
    new Intl.NumberFormat("vi-VN", {
      minimumFractionDigits: 0,
    }).format(price) + " VNĐ"
  );
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
          :value="stadiumData.address"
          :className="'gap-5'"
        ></Tag>
        <Tag
          :infor="'Giá:'"
          :value="formatPrice(stadiumData?.stadium_style?.price)"
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
</style>
