<script setup>
import { onMounted, ref, watchEffect } from "vue";
import Stadium from "./Stadium.vue";
import { useStadium } from "../../stores";
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
    <div v-for="stadium of stadiumData">
      <Stadium
        :stadiumId="stadium?._id"
        :image="stadium?.image"
        :stadium_name="stadium?.stadium_name"
        :phone="stadium?.phone"
        :ward="stadium?.ward"
        :city="stadium?.city"
        :provice="stadium?.provice"
      ></Stadium>
    </div>
  </div>
</template>
<style></style>
