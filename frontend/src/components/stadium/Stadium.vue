<script setup>
import { onMounted, ref, watch, watchEffect } from "vue";
import { useStadium } from "../../stores/fetchStadium";
const stadiumData = ref([]);
const stadiumStore = useStadium();
onMounted(async () => {
  await stadiumStore.getAllStadium();
});

watchEffect(() => {
  stadiumData.value = stadiumStore.stadiumData;
});
</script>
<template>
  <div class="grid md:grid-cols-3 grid-cols-1 gap-6">
    <div
      v-for="stadium in stadiumData"
      class="bg-white border border-[#e2e8f0] p-5 rounded-2xl"
    >
      <router-link
        :to="`/stadium-detail/${stadium._id}`"
        :key="stadium._id"
        class="flex flex-col gap-4"
      >
        <img
          :src="stadium.image"
          alt=""
          class="w-full h-[200px] rounded-md object-cover"
        />
        <span
          class="text-[#18458b] text-[18px] font-bold capitalize line-clamp-2"
          >Sân {{ stadium.stadium_name }}</span
        >
        <div class="flex items-center gap-2 text-[14px]">
          <i class="pi pi-fw pi-phone"></i>
          <span>{{ stadium.phone }}</span>
        </div>
        <div class="flex items-center gap-2 text-sm">
          <i class="pi pi-fw pi-map-marker"></i>
          <p class="capitalize line-clamp-2">{{ stadium.address }}</p>
        </div>
      </router-link>
    </div>
  </div>
</template>
<style></style>
