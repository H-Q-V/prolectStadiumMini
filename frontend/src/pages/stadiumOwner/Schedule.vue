<script setup>
import { onMounted, ref, watchEffect } from "vue";
import { useBookPitch } from "../../stores";
import { formatBookingTime } from "../../utils";
const bookStore = useBookPitch();
const bookData = ref([]);
onMounted(async () => {
  await bookStore.getStadiumOwnerBookings();
});

watchEffect(() => {
  bookData.value = bookStore.bookPitchData;
});
</script>
<template>
  <div class="grid grid-cols-2 gap-3">
    <div
      v-for="book in bookData"
      :key="book._id"
      class="px-4 py-6 rounded-lg shadow-md"
    >
      <h1 class="text-center font-bold text-2xl">Thông tin đặt sân</h1>
      <div class="flex justify-center gap-10 mt-5">
        <div class="flex flex-col gap-3">
          <h2 class="font-bold text-xl">Thông tin sân</h2>
          <span>Sân: {{ book?.stadium?.stadium_name }}</span>
          <span
            >Kiểu sân:
            {{
              book?.stadium?.stadium_styles
                ?.map((bookStyle) => bookStyle.name)
                .join(", ")
            }}</span
          >
          <span
            >Sân:
            {{
              book?.stadium?.stadium_styles
                ?.map((bookStyle) => bookStyle.type)
                .join(", ")
            }}</span
          >
          <span
            >Địa chỉ: {{ book?.stadium?.ward }} {{ book?.stadium?.city }}
            {{ book?.stadium?.provice }}</span
          >
          <p>
            Bắt đầu từ:
            {{
              book?.time
                ?.map((bookStyle) => formatBookingTime(bookStyle.startTime))
                .join(", ")
            }}
          </p>

          <p>
            Kết thúc
            {{
              book?.time
                ?.map((bookStyle) => formatBookingTime(bookStyle.endTime))
                .join(", ")
            }}
          </p>
          <p>Tình trạng: {{ book.status }}</p>
        </div>

        <div class="flex flex-col gap-3">
          <h2 class="font-bold text-xl">Thông tin khách hàng</h2>
          <h3>
            Khách hàng:
            <span class="capitalize">{{ book?.user?.username }}</span>
          </h3>
          <p>Số điện thoại: {{ book.phone }}</p>
          <span
            >Giá:
            {{
              book?.stadium?.stadium_styles
                ?.map((bookStyle) => bookStyle.price)
                .join(", ")
            }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>
<style></style>
