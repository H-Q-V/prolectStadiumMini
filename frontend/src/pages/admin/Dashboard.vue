<script setup>
import { computed, onMounted, ref, watchEffect } from "vue";
import { useStadium, useUser } from "../../stores";
import Card from "../../components/card/Card.vue";
import useRevenue from "../../stores/fetchRevenue";
import CardLink from "../../components/card/CardLink.vue";
import { formatPrice } from "../../utils";

const userStore = useUser();
const revenueStore = useRevenue();
const stadiumStore = useStadium();
const userData = ref([]);
const revenuesData = ref([]);
const stadiumData = ref([]);
onMounted(async () => {
  await userStore.getAllCustomers();
  await revenueStore.getRevenues();
  await stadiumStore.getAllStadium();
});

watchEffect(() => {
  userData.value = userStore.userData;
  revenuesData.value = revenueStore.revenuesData;
  stadiumData.value = stadiumStore.stadiumData;
});

const currentUser = computed(() => userStore.currentUser);
const users = computed(() => {
  return userData.value.filter(
    (user) => !(user.email === currentUser.value.email)
  );
});
</script>
<template>
  <div class="grid grid-cols-4 gap-3">
    <Card
      :title="'Số lượng người dùng'"
      :icon="'pi-user'"
      :value="users.length || 0"
      :className="'bg-purple-500'"
    ></Card>

    <Card
      :title="'Số lượng sân vận động'"
      :icon="'pi-building-columns'"
      :value="`${stadiumData.length || 0} sân`"
      :className="'bg-blue-500'"
    ></Card>

    <CardLink
      :to="'/admin/revenue'"
      :icon="'pi-credit-card'"
      :className="'bg-[#23b7e5]'"
      :title="'Doanh thu'"
      :value="
        formatPrice(
          revenuesData?.monthlyRevenue?.reduce(
            (total, current) => total + current.revenue,
            0
          ) || 0
        )
      "
    ></CardLink>
  </div>
</template>
<style scoped></style>
