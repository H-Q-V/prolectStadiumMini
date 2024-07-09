<script setup>
import { onMounted, ref } from "vue";
import { useStadium } from "../../stores/fetchStadium";
import axios from "axios";
import { endpoint } from "../../utils/endpoint";
const stadiumData = ref([]);
const stadiumStore = useStadium();
onMounted(async () => {
  await stadiumStore.getAllStadium();
  stadiumData.value = stadiumStore.stadiumData;
});

const deleteStadium = async (id) => {
  if (window.confirm("Bạn có chắc chắn xóa không ?")) {
    try {
      await axios.delete(`${endpoint}/deleteStadium/${id}`);
    } catch (error) {
      console.log("🚀 ~ deleteStadium ~ error:", error);
    }
  }
};
</script>
<template>
  <div class="grid md:grid-cols-3 grid-cols-1 gap-6">
    <div
      v-for="stadium in stadiumData"
      :key="stadium._id"
      class="relative bg-white border border-[#e2e8f0] p-5 rounded-2xl group"
    >
      <router-link
        :to="`/stadium-detail/${stadium._id}`"
        class="flex flex-col gap-4"
      >
        <img
          :src="stadium.image"
          alt=""
          class="w-full h-[200px] rounded-md object-cover"
        />
        <span
          class="text-[#18458b] text-[18px] font-bold capitalize line-clamp-2"
        >
          Sân {{ stadium.stadium_name }}
        </span>
        <div class="flex items-center gap-2 text-[14px]">
          <i class="pi pi-fw pi-phone"></i>
          <span>{{ stadium.phone }}</span>
        </div>
        <div class="flex items-center gap-2 text-sm">
          <i class="pi pi-fw pi-map-marker"></i>
          <p class="capitalize line-clamp-2">{{ stadium.address }}</p>
        </div>
      </router-link>

      <button
        class="absolute top-1 right-2 -translate-x-2/3 translate-y-2/3 bg-slate-600 rounded-full p-2 text-white opacity-0 group-hover:opacity-100 hover:bg-red-500 transition-opacity duration-300"
        @click="deleteStadium(stadium._id)"
      >
        <i class="pi pi-fw pi-trash"></i>
      </button>
    </div>
  </div>
</template>
<style scoped>
.group:hover .group-hover\:opacity-100 {
  opacity: 1;
}
</style>
