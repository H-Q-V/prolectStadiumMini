<script setup>
import Button from "primevue/button";
import Tag from "../components/tag/Tag.vue";
import { onMounted, ref, watchEffect } from "vue";
import { useBookPitch } from "../stores";
import { formatTime } from "../utils";
const bookStore = useBookPitch();
const bookData = ref([]);
onMounted(async () => {
  await bookStore.getBookPitch();
});

watchEffect(() => {
  bookData.value = bookStore.bookPitchData;
});

const handlePayment = async () => {
  await bookStore.payment();
};
</script>
<template>
  <form
    @submit.prevent="handlePayment"
    class="flex items-center justify-center h-screen"
  >
    <div v-if="bookData" v-for="book in bookData" class="flex flex-col gap-3">
      <h1 class="text-2xl font-bold">Thông tin thanh toán</h1>

      <Tag
        :infor="'Số điện thoại'"
        :value="book.phone"
        :className="'gap-5'"
      ></Tag>

      <Tag
        :infor="'Sân vận động'"
        :value="book.stadium_name"
        :className="'gap-5'"
      ></Tag>

      <Tag
        :infor="'Kiểu sân'"
        :value="`Sân ${book.type}`"
        :className="'gap-5'"
      ></Tag>

      <Tag :infor="'Vị trí'" :value="`${book.name}`" :className="'gap-5'"></Tag>
      <Tag
        :infor="'Bắt đầu'"
        :value="formatTime(book.time[0]?.startTime)"
      ></Tag>
      <Tag :infor="'Kết thúc'" :value="formatTime(book.time[0]?.endTime)"></Tag>
      <Tag :infor="'Giá'" :value="book.totalAmount" :class="'gap-5'"></Tag>
      <Tag :infor="'Tiền cọc'" :value="book.deposit" :class="'gap-5'"></Tag>

      <div class="flex items-center gap-3">
        <Button
          type="submit"
          label="Thanh toán"
          class="bg-[#286090] font-medium py-2 px-6 text-white rounded-md"
        ></Button>

        <router-link
          to="/list"
          class="py-2 px-6 border border-[#286090] text-[#286090] rounded-md"
          >Hủy</router-link
        >
      </div>
    </div>
  </form>
</template>
<style></style>
