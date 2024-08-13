<script setup>
import { toast } from "vue3-toastify";
import { useStadium } from "../../stores";
const props = defineProps({
  stadiumId: { type: String, required: true },
  image: { type: String, required: true },
  stadium_name: { type: String, required: true },
  phone: { type: String, required: true },
  ward: { type: String, required: true },
  city: { type: String, required: true },
  provice: { type: String, required: true },
});

const stadiumStore = useStadium();
const handleDeleteStadium = async (id) => {
  if (window.confirm("Bạn có chắc chắn xóa không ?")) {
    await stadiumStore.deleteStadium(id, toast);
  }
};
</script>
<template>
  <div class="relative bg-white border border-[#e2e8f0] p-5 rounded-2xl group">
    <router-link
      :to="`/stadium-owner-detail/${stadiumId}`"
      class="flex flex-col gap-4"
    >
      <img
        :src="image"
        alt=""
        class="w-full h-[200px] rounded-md object-cover"
      />
      <span
        class="text-[#18458b] text-[18px] font-bold capitalize line-clamp-2"
      >
        Sân {{ stadium_name }}
      </span>
      <div class="flex items-center gap-2 text-[14px]">
        <i class="pi pi-fw pi-phone"></i>
        <span>{{ phone }}</span>
      </div>
      <div class="flex items-center gap-2 text-sm">
        <i class="pi pi-fw pi-map-marker"></i>
        <p class="capitalize line-clamp-2">
          {{ ward }} {{ city }} {{ provice }}
        </p>
      </div>
    </router-link>

    <button
      class="absolute top-1 left-2 translate-x-2/3 translate-y-2/3 bg-slate-600 rounded-full p-2 text-white opacity-0 group-hover:opacity-100 hover:bg-red-500 transition-opacity duration-300"
    >
      <i class="pi pi-fw pi-pencil"></i>
    </button>

    <button
      class="absolute top-1 right-2 -translate-x-2/3 translate-y-2/3 bg-slate-600 rounded-full p-2 text-white opacity-0 group-hover:opacity-100 hover:bg-red-500 transition-opacity duration-300"
      @click="handleDeleteStadium(stadiumId)"
    >
      <i class="pi pi-fw pi-trash"></i>
    </button>
  </div>
</template>
<style scoped>
.group:hover .group-hover\:opacity-100 {
  opacity: 1;
}
</style>
