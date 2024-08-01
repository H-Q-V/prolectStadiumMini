<script setup>
import Button from "primevue/button";
import Tag from "../components/tag/Tag.vue";
import { onMounted, ref, watchEffect } from "vue";
import { useStadium } from "../stores/fetchStadium";
import { useRoute } from "vue-router";
const stadiumStore = useStadium();
const stadiumData = ref([]);
const route = useRoute();
onMounted(async () => {
  await stadiumStore.getAnStadiumStyle(route.params.id, route.params.stadiumID);
});

watchEffect(() => {
  stadiumData.value = stadiumStore.stadiumData;
});
</script>
<template>
  <div class="flex flex-col gap-10 items-center justify-center h-screen">
    <div class="w-[680px] flex items-center gap-10">
      <img
        class="w-[200px] h-[200px]"
        src="https://qr.sepay.vn/img?acc=0010000000355&bank=Vietcombank&amount=100000&des=ung%20ho%20quy%20bao%20tro%20tre%20em"
        alt="QR code"
      />

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
            class="bg-[#286090] font-medium py-2 px-6 text-white rounded-md"
            >Đặt sân</Button
          >

          <router-link
            to="/list"
            class="py-2 px-6 border border-[#286090] text-[#286090] rounded-md"
            >Hủy</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>
<style></style>
