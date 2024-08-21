<script setup>
import { onMounted, ref, watchEffect } from "vue";
import useRevenue from "../../stores/fetchRevenue";
import { useStadium } from "../../stores";
import Card from "../../components/card/Card.vue";

const revenueStore = useRevenue();
const stadiumStrore = useStadium();
const revenuesData = ref([]);
const stadiumData = ref([]);
onMounted(async () => {
  await revenueStore.getRevenuesOwner();
  await stadiumStrore.getAllStadiumsByOwner();
});

watchEffect(() => {
  revenuesData.value = revenueStore.revenuesData;
  stadiumData.value = stadiumStrore.stadiumData;
});
</script>
<template>
  <div class="grid grid-cols-4 gap-3">
    <Card
      :title="'Số lượng sân'"
      :icon="'pi-building'"
      :className="'bg-[#23b7e5]'"
      :value="`${stadiumData.length || 0} sân`"
    ></Card>

    <router-link
      to="/stadiumOwner/revenue"
      class="flex items-center bg-white px-4 py-4 shadow-md rounded-lg gap-4"
    >
      <div
        class="w-[42px] h-[42px] bg-[#23b7e5] rounded-full flex items-center justify-center"
      >
        <i class="pi pi-fw pi-credit-card text-white"></i>
      </div>

      <div class="flex flex-col gap-1">
        <p class="text-[#8c9097] text-lg">Doanh thu</p>
        <span class="text-2xl font-bold">
          {{
            new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(
              revenuesData?.monthlyRevenue?.reduce(
                (total, current) => total + current.revenue,
                0
              )
            ) || 0
          }}
        </span>
      </div>
    </router-link>
  </div>
</template>
<style></style>
