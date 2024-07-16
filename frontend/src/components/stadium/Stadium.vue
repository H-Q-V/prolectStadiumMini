<script setup>
const props = defineProps({
  stadiumId: { type: String, required: true },
  image: { type: String, required: true },
  stadium_name: { type: String, required: true },
  phone: { type: String, required: true },
  ward: { type: String, required: true },
  city: { type: String, required: true },
  provice: { type: String, required: true },
});
</script>
<template>
  <div class="bg-white border border-[#e2e8f0] p-5 rounded-2xl">
    <router-link
      :to="`/stadium-detail/${stadiumId}`"
      class="flex flex-col gap-4"
    >
      <img
        :src="image"
        alt=""
        class="w-full h-[200px] rounded-md object-cover"
      />
      <span class="text-[#18458b] text-[18px] font-bold capitalize line-clamp-2"
        >Sân {{ stadium_name }}</span
      >
      <div class="flex items-center gap-2 text-[14px]">
        <i class="pi pi-fw pi-phone"></i>
        <span>{{ phone }}</span>
      </div>
      <div class="flex items-center gap-2 text-sm">
        <i class="pi pi-fw pi-map-marker"></i>
        <p class="capitalize">{{ ward }} {{ city }} {{ provice }}</p>
      </div>
    </router-link>
  </div>
</template>
<style></style>
