<script setup>
import Stadium from "../image/stadium.png";
import Calendar from "../image/calendar.png";
</script>
<template lang="">
  <div class="wrapper flex items-center text-center">
    <div class="flex flex-col items-center gap-2">
      <img :src="Stadium" alt="" class="w-[86px] h-[86px] object-cover" />
      <h1 class="text-xl font-bold">Tìm kiếm vị trí sân</h1>
      <p>
        Dữ liệu sân đấu dồi dào, liên tục cập nhật, giúp bạn dễ dàng tìm kiếm
        theo khu vực mong muốn
      </p>
    </div>

    <div class="flex flex-col items-center gap-2">
      <img :src="Calendar" alt="" class="w-[86px] h-[86px] object-cover"></img>
      <h1 class="text-xl font-bold">Đặt lịch online</h1>
      <p>
        Không cần đến trực tiếp, không cần gọi điện đặt lịch, bạn hoàn toàn có
        thể đặt sân ở bất kì đâu có internet
      </p>
    </div>

    <div class="flex flex-col items-center px-2 gap-2">
      <img :src="Stadium" alt="" class="w-[86px] h-[86px] object-cover" />
      <h1 class="text-xl font-bold">Tìm đối, bắt cặp đấu</h1>
      <p>
        Tìm kiếm, giao lưu các đội thi đấu thể thao, kết nối, xây dựng cộng đồng
        thể thao sôi nổi, mạnh mẽ
      </p>
    </div>
  </div>
</template>
<style scoped>
@media screen and (max-width: 768px) {
  .wrapper{
    display: flex ;
    flex-direction: column;
  }
}
</style>
