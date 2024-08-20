<script setup>
import { onMounted, ref, watchEffect } from "vue";
import useRevenue from "../../stores/fetchRevenue";
import { formatDate } from "../../utils";
const revenueStore = useRevenue();
const revenueData = ref([]);
const checked = ref(true);
onMounted(async () => {
  await revenueStore.getRevenue();
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
      <thead>
        <tr>
          <th>Sân vận động</th>
          <th>Bắt đầu</th>
          <th>Đến</th>
          <th>Doanh thu</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="checked">
          <!-- Monthly Revenue -->
          <tr
            v-for="(revenue, index) in revenueData?.monthlyRevenue"
            :key="'monthly-' + index"
          >
            <template
              v-for="(stadium, i) in revenue.stadiums"
              :key="'stadium-' + i"
            >
              <!-- Display stadium details -->
              <td>{{ stadium.stadiumName }}</td>
              <td v-if="i === 0">{{ formatDate(revenue.start) }}</td>
              <td v-if="i === 0">{{ formatDate(revenue.end) }}</td>
              <td>
                {{
                  stadium.total?.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })
                }}
              </td>
            </template>
          </tr>
        </template>

        <template v-else>
          <!-- Weekly Revenue -->
          <tr
            v-for="(revenue, index) in revenueData?.weeklyRevenue"
            :key="'weekly-' + index"
          >
            <template
              v-for="(stadium, i) in revenue.stadiums"
              :key="'stadium-' + i"
            >
              <!-- Display stadium details -->
              <td>{{ stadium.stadiumName }}</td>
              <td v-if="i === 0">{{ formatDate(revenue.start) }}</td>
              <td v-if="i === 0">{{ formatDate(revenue.end) }}</td>
              <td>
                {{
                  stadium.total?.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })
                }}
              </td>
            </template>
          </tr>
        </template>
      </tbody>
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
