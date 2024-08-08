<script setup>
import { onMounted, ref, watchEffect } from "vue";
import { useStadium } from "../../stores";
import { useRoute } from "vue-router";
import Evaluate from "../../components/evaluate/Evaluate.vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
const stadiumData = ref([]);
const stadiumStyleData = ref([]);
const stadiumStore = useStadium();
const route = useRoute();
const stadiumID = route.params.id;
onMounted(async () => {
  await stadiumStore.getAStadium(stadiumID);
});

watchEffect(() => {
  stadiumData.value = stadiumStore.stadiumData;
});

onMounted(async () => {
  await stadiumStore.getStadiumsStyle(stadiumID);
});

watchEffect(() => {
  stadiumStyleData.value = stadiumStore.stadiumStyleData;
  console.log("🚀 ~ watchEffect ~ stadiumStyleData:", stadiumStyleData);
});
</script>
<template>
  <div class="flex flex-col gap-5">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold capitalize">
        Sân {{ stadiumData.stadium_name }}
      </h1>
    </div>

    <img :src="stadiumData.image" alt="" class="h-96 object-cover rounded-md" />

    <div class="flex items-center gap-2 text-lg">
      <i class="pi pi-fw pi-map-marker"></i>
      <p class="capitalize">
        {{ stadiumData.ward }} {{ stadiumData.city }} {{ stadiumData.provice }}
        {{ stadiumData?.address }}
      </p>
    </div>

    <div class="flex items-center gap-2 text-lg">
      <i class="pi pi-fw pi-phone"></i>
      <p>{{ stadiumData.phone }}</p>
    </div>
    <p class="text-sm text-[#1a1a1a]">{{ stadiumData.describe }}</p>

    <DataTable
      :value="stadiumStyleData"
      showGridlines
      tableStyle="min-width: 50rem"
    >
      <Column field="name" header="Tên sân"></Column>
      <Column field="type" header="Kiểu sân"></Column>
      <Column field="price" header="Giá"></Column>
      <Column field="time" header="Thời gian"></Column>
    </DataTable>

    <Evaluate></Evaluate>
  </div>
</template>
<style></style>
