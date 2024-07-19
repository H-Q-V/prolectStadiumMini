<script setup>
import { ref } from "vue";
import Search from "../../components/search/Search.vue";
import ListStadium from "../../components/stadium/ListStadium.vue";
import Stadium from "../../components/stadium/Stadium.vue";
const searchResults = ref([]);

const handleSearchResults = (results) => {
  searchResults.value = results;
  console.log("🚀 ~ handleSearchResults ~ searchResults:", searchResults);
};
</script>
<template>
  <Search @searchResults="handleSearchResults"></Search>
  <h1 class="text-[#18458b] text-[24px] font-semibold text-center mb-4">
    Danh sách sân
  </h1>

  <div v-if="searchResults.length > 0">
    <div class="grid md:grid-cols-3 grid-cols-1 gap-6">
      <div v-for="stadium in searchResults" :key="stadium._id">
        <Stadium
          :stadiumId="stadium._id"
          :image="stadium.image"
          :stadium_name="stadium.stadium_name"
          :phone="stadium.phone"
          :ward="stadium.ward"
          :city="stadium.city"
          :provice="stadium.provice"
        ></Stadium>
      </div>
    </div>
  </div>

  <div v-else>
    <ListStadium></ListStadium>
  </div>
</template>
<style></style>
