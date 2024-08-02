<script setup>
import { onMounted, ref, watchEffect } from "vue";
import Search from "../../components/search/Search.vue";
import StadiumByOwner from "../../components/stadium/StadiumByOwner.vue";
import ListStadiumByOwner from "../../components/stadium/ListStadiumByOwner.vue";
import { useStadium } from "../../stores";
const stadiumData = ref([]);
const stadiumStore = useStadium();
const searchResults = ref([]);
const handleSearchResults = (results) => {
  searchResults.value = results;
  console.log("🚀 ~ handleSearchResults ~ searchResults:", searchResults);
};
onMounted(async () => {
  await stadiumStore.getAllStadium();
});

watchEffect(() => {
  stadiumData.value = stadiumStore.stadiumData;
});
</script>
<template>
  <Search @searchResults="handleSearchResults"></Search>
  <h1 class="text-[#18458b] text-[24px] font-semibold text-center mb-4">
    Danh sách sân
  </h1>
  <div v-if="searchResults?.length > 0">
    <div class="grid md:grid-cols-3 grid-cols-1 gap-6">
      <div v-for="stadium in searchResults" :key="stadium._id">
        <StadiumByOwner
          v-if="stadiumData"
          :stadiumId="stadium._id"
          :image="stadium.image"
          :stadium_name="stadium.stadium_name"
          :phone="stadium.phone"
          :ward="stadium.ward"
          :city="stadium.city"
          :provice="stadium.provice"
        ></StadiumByOwner>
      </div>
    </div>
  </div>

  <div v-else>
    <ListStadiumByOwner></ListStadiumByOwner>
  </div>
</template>
<style></style>
