<script setup></script>
<template>
  <div class="grid grid-cols-4 gap-3">
    <div class="bg-white px-4 py-4 shadow-md rounded-lg">
      <div class="flex items-center gap-4">
        <div
          class="w-[42px] h-[42px] bg-[#23b7e5] rounded-full flex items-center justify-center"
        >
          <i class="pi pi-fw pi-credit-card text-white"></i>
        </div>

        <div class="flex flex-col gap-1">
          <p class="text-[#8c9097] text-lg">Tổng doanh thu</p>
          <span class="text-2xl font-bold">100</span>
        </div>
      </div>

      <router-link class="text-[#23b7e5]">Xem chi tiết</router-link>
    </div>
  </div>
</template>
<style></style>
