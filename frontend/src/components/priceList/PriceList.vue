<script setup>
import { useRoute } from "vue-router";
import { useStadium } from "../../stores/fetchStadium";
import { onMounted, ref } from "vue";

const stadiumData = ref([]);
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
        <router-link
          v-for="(stadiumStyle, index) in stadiumData.stadium_styles"
          :key="index"
          :to="`/book-pitch/${stadiumData._id}/${stadiumStyle._id}`"
          class="link"
        >
          <div class="flex items-center gap-2">
            <span> {{ stadiumStyle.name }}</span>
            <span> (Sân {{ stadiumStyle.type }})</span>
          </div>
        </router-link>
      </td>
      <td>
        <router-link
          v-for="(stadium_style, index) in stadiumData.stadium_styles"
          :key="index"
          :to="`/book-pitch/${stadiumData._id}/${stadium_style._id}`"
          class="link"
        >
          <div>{{ stadium_style.price }} Đ</div>
        </router-link>
      </td>
    </tr>
  </table>
</template>
<style scoped>
#price-list {
  width: 100%;
  border-collapse: collapse;
  margin: 25px 0;
  text-align: left;
}

#price-list th,
#price-list td {
  padding: 12px 15px;
  border: 1px solid #ddd;
}

#price-list th {
  background-color: #04aa6d;
  color: white;
  text-transform: uppercase;
  font-weight: bold;
}

#price-list tr {
  border-bottom: 1px solid #dddddd;
}

.link {
  display: block;
  width: 100%;
}

.link:hover {
  background-color: #ddd;
}
</style>
