<script setup>
import { onMounted, ref } from "vue";
import InputText from "primevue/inputtext";
import DatePicker from "primevue/datepicker";
import Button from "primevue/button";
import { useStadium } from "../../stores/fetchStadium";
import { useRoute } from "vue-router";
import Tag from "../../components/tag/Tag.vue";
const username = ref(null);
const phone = ref(null);
const datetime1 = ref(null);
const datetime2 = ref(null);
const onSubmit = () => {
  const data = {
    username: username.value,
    phone: phone.value,
    datetime1: datetime1.value,
    datetime2: datetime2.value,
  };
};

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
  <form class="flex flex-col gap-[20px]" @submit.prevent="onSubmit">
    <div class="flex gap-[50px]">
      <div class="w-[580px] flex flex-col gap-[10px]">
        <h1 class="text-xl">Thông tin cá nhân</h1>
        <label for="username">Họ tên</label>
        <InputText
          id="username"
          type="text"
          v-model="username"
          class="common"
          placeholder="Họ tên"
        ></InputText>

        <label for="phone">Số điện thoại</label>
        <InputText
          id="phone"
          type="text"
          v-model="phone"
          class="common"
          placeholder="Số điện thoại"
        ></InputText>

        <label for="datetime1">Đặt từ</label>
        <DatePicker
          id="datetime1"
          v-model="datetime1"
          showTime
          hourFormat="24"
          fluid
          inputId="datetime"
        />

        <label for="datetime2">Đến</label>
        <DatePicker
          id="datetime2"
          v-model="datetime2"
          showTime
          hourFormat="24"
          fluid
          inputId="datetime"
        />

        <div class="flex items-end justify-end gap-3">
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
