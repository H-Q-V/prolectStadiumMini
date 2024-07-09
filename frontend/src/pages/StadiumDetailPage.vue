<script setup>
import Evaluate from "../components/evaluate/Evaluate.vue";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useStadium } from "../stores/fetchStadium";
const stadiumData = ref([]);
const stadiumStore = useStadium();
const route = useRoute();
onMounted(async () => {
  await stadiumStore.getAStadium(route.params.id);
  stadiumData.value = stadiumStore.stadiumData;
});
</script>
<template>
  <div class="flex flex-col gap-5">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold capitalize">
        Sân {{ stadiumData.stadium_name }}
      </h1>
      <router-link
        :to="`/price-list/${stadiumData._id}`"
        class="flex items-center gap-2 px-4 py-2 bg-[#19458a] text-white rounded-md"
      >
        <i class="pi pi-fw pi-calendar"></i>
        <span class="text-lg font-medium">Đặt sân</span>
      </router-link>
    </div>

    <div class="flex items-center gap-2 text-lg">
      <i class="pi pi-fw pi-map-marker"></i>
      <p>{{ stadiumData.address }}</p>
    </div>

    <div class="flex items-center gap-2 text-lg">
      <i class="pi pi-fw pi-phone"></i>
      <p>{{ stadiumData.phone }}</p>
    </div>
    <img :src="stadiumData.image" alt="" class="h-96 object-cover rounded-md" />
    <p class="text-sm text-[#1a1a1a]">{{ stadiumData.describe }}</p>
    <Evaluate></Evaluate>
  </div>
</template>
<style scoped></style>
