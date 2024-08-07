<script setup>
import { onMounted, ref, watchEffect } from "vue";
import StadiumByOwner from "./StadiumByOwner.vue";
import useStadium from "../../stores/fetchStadium";
const stadiumData = ref([]);
const stadiumStore = useStadium();
onMounted(async () => {
  await stadiumStore.getAllStadiumsByOwner();
});

watchEffect(() => {
  stadiumData.value = stadiumStore.stadiumData;
});
</script>
<template>
  <div class="grid md:grid-cols-4 grid-cols-1 gap-6">
    <div
      v-if="stadiumData.length > 0"
      v-for="stadium in stadiumData"
      :key="stadium._id"
    >
      <StadiumByOwner
        :stadiumId="stadium._id"
        :image="stadium.image"
        :stadium_name="stadium.stadium_name"
        :phone="stadium.phone"
        :ward="stadium.ward"
        :city="stadium.city"
        :provice="stadium.provice"
      ></StadiumByOwner>
    </div>

    <div v-else>
      <p class="text-lg">Hiện không có sân nào</p>
    </div>
  </div>
</template>
<style></style>
