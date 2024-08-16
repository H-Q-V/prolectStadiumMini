<script setup>
import { ref, onMounted, watchEffect } from "vue";
import useRevenue from "../../stores/fetchRevenue";
import { formatDate } from "../../utils";
const revenueData = ref([]);
const revenueStore = useRevenue();
const checked = ref(true);

onMounted(async () => {
  await revenueStore.getRevenueOwner();
});

watchEffect(() => {
  revenueData.value = revenueStore.revenueData;
});
</script>

<template>
  <div>
    <div class="text-center mb-4">
      <label>
        <input type="radio" v-model="checked" :value="true" />
        Tháng
      </label>
      <label class="ml-4">
        <input type="radio" v-model="checked" :value="false" />
        Tuần
      </label>
    </div>

    <table id="revenue">
      <tr>
        <th>Sân vận động</th>
        <th>Bắt đầu</th>
        <th>Đến</th>
        <th>Doanh thu</th>
      </tr>

      <tr
        v-if="checked"
        v-for="(revenue, index) in revenueData.monthlyRevenue"
        :key="index"
      >
        <td>
          <span v-for="(stadium, i) in revenue.stadiums" :key="i">
            {{ stadium.stadiumName }}
          </span>
        </td>

        <td>
          {{ formatDate(revenue.start) }}
        </td>

        <td>
          {{ formatDate(revenue.end) }}
        </td>

        <td>
          <span v-for="(stadium, i) in revenue.stadiums" :key="i">
            {{
              stadium.total?.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })
            }}
          </span>
        </td>
      </tr>

      <tr v-else v-for="(revenue, i) in revenueData.weeklyRevenue" :key="i">
        <td>
          <span v-for="(stadium, i) in revenue.stadiums" :key="i">
            {{ stadium.stadiumName }}
          </span>
        </td>

        <td>
          {{ formatDate(revenue.start) }}
        </td>

        <td>
          {{ formatDate(revenue.end) }}
        </td>

        <td>
          <span v-for="(stadium, i) in revenue.stadiums" :key="i">
            {{
              stadium.total?.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })
            }}
          </span>
        </td>
      </tr>
    </table>
  </div>
</template>

<style scoped>
#revenue {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

#revenue th,
#revenue td {
  padding: 12px 15px;
  border: 1px solid #ddd;
  text-align: center;
}

#revenue th {
  background-color: #04aa6d;
  color: white;
  text-transform: uppercase;
  font-weight: bold;
}
</style>
