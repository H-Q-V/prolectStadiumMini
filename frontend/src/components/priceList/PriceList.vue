<script setup>
import { useRoute } from "vue-router";
import { useStadium } from "../../stores/fetchStadium";
import { onMounted, ref } from "vue";

const stadiumData = ref([]);
console.log("🚀 ~ stadiumData:", stadiumData);
const stadiumStore = useStadium();
const route = useRoute();
onMounted(async () => {
  await stadiumStore.getAStadium(route.params.id);
  stadiumData.value = stadiumStore.stadiumData;
});
</script>
<template>
  <h1 class="text-2xl font-bold text-center">
    Đặt sân {{ stadiumData.stadium_name }}
  </h1>
  <table id="price-list">
    <tr>
      <th>Sân</th>
      <th>Giá</th>
    </tr>

    <tr>
      <td>
        <router-link :to="`/book-pitch/${stadiumData._id}`">
          <div
            v-for="(stadiumStyle, index) in stadiumData.stadium_style"
            :key="index"
            class="flex items-center gap-2"
          >
            <span> {{ stadiumStyle.name }}</span>
            <span> (Sân {{ stadiumStyle.type }})</span>
          </div>
        </router-link>
      </td>
      <td>
        <router-link :to="`/book-pitch/${stadiumData._id}`">
          <span
            v-for="(stadium_style, index) in stadiumData.stadium_style"
            :key="index"
          >
            {{ stadium_style.price }} Đ
          </span>
        </router-link>
      </td>
    </tr>
  </table>
</template>
<style scoped>
#price-list td,
#price-list th {
  border: 1px solid #ddd;
  padding: 8px;
  width: 50%;
}

#price-list tr:hover {
  background-color: #ddd;
}

#price-list th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #04aa6d;
  color: white;
}
</style>
