<script setup>
import { onMounted, ref } from "vue";
import Search from "../../components/search/Search.vue";
import ListStadium from "../../components/stadium/ListStadium.vue";
import Stadium from "../../components/stadium/Stadium.vue";
import Skeleton from "primevue/skeleton";
const searchResults = ref([]);
const isLoading = ref(false);
const handleSearchResults = (results) => {
  searchResults.value = results;
  isLoading.value = false;
};

const handleLoadingStateChange = (loading) => {
  isLoading.value = loading;
};
</script>
<template>
  <Search
    @searchResults="handleSearchResults"
    @loadingStateChange="handleLoadingStateChange"
  ></Search>
  <h1 class="text-[#18458b] text-[24px] font-semibold text-center mb-4">
    Danh sách sân
  </h1>

  <div v-if="isLoading">
    <div class="grid md:grid-cols-3 grid-cols-1 gap-6">
      <div
        v-for="n in 3"
        :key="n"
        class="flex flex-col border border-[#e7e7e7] p-5 rounded-lg"
      >
        <Skeleton class="w-full !h-[200px] rounded-lg" />
        <div class="flex flex-col gap-2 mt-4">
          <Skeleton class="w-full h-[20px] rounded-lg" />
          <Skeleton class="w-full h-[20px] rounded-lg" />
          <Skeleton class="w-full h-[20px] rounded-lg" />
        </div>
      </div>
    </div>
  </div>

  <div v-else-if="searchResults.length > 0">
    <div class="grid md:grid-cols-4 grid-cols-1 gap-6">
      <div v-for="stadium in searchResults" :key="stadium._id">
        <Stadium
          v-if="stadium"
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
