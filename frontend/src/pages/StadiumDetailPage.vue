<script setup>
import Evaluate from "../components/evaluate/Evaluate.vue";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useStadium } from "../stores";
const stadiumData = ref([]);
const visible = ref(false);
const stadiumStore = useStadium();
const route = useRoute();
const id = route.params.id;
onMounted(async () => {
  await stadiumStore.getAStadium(id);
  stadiumData.value = stadiumStore.stadiumData;
});
</script>
<template>
  <div class="flex flex-col gap-5">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold capitalize">
        Sân {{ stadiumData.stadium_name }}
      </h1>
      <Button
        class="flex items-center gap-2 px-4 py-2 bg-[#19458a] text-white rounded-md"
        @click="visible = true"
      >
        <i class="pi pi-fw pi-calendar"></i>
        <span class="text-lg font-medium">Đặt sân</span>
      </Button>

      <Dialog
        header="Chọn hình thức đặt"
        v-model:visible="visible"
        modal
        class="w-[300px] px-4 py-4"
      >
        <div class="flex flex-col gap-2 font-normal">
          <router-link
            :to="`/book-pitch/${id}`"
            class="w-full hover:bg-gray-300 hover:rounded-md text-center"
            >Đặt sân</router-link
          >
          <router-link
            :to="`/book-pitch/${id}`"
            class="w-full hover:bg-gray-300 hover:rounded-md text-center"
            >Đặt sân định kì</router-link
          >
        </div>
      </Dialog>
    </div>

    <img :src="stadiumData.image" alt="" class="h-96 object-cover rounded-md" />

    <div class="flex items-center gap-2 text-lg">
      <i class="pi pi-fw pi-map-marker"></i>
      <p class="capitalize">
        {{ stadiumData?.ward }} {{ stadiumData?.city }}
        {{ stadiumData?.provice }}
        {{ stadiumData?.address }}
      </p>
    </div>

    <div class="flex items-center gap-2 text-lg">
      <i class="pi pi-fw pi-phone"></i>
      <p>{{ stadiumData.phone }}</p>
    </div>
    <p class="text-sm text-[#1a1a1a]">{{ stadiumData.describe }}</p>
    <Evaluate></Evaluate>
  </div>
</template>
<style scoped></style>
