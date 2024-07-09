<script setup>
import { ref } from "vue";
import MenuItem from "../MenuItem.vue";
const model = ref([
  {
    items: [{ label: "Trang chủ", icon: "pi pi-fw pi-home", to: "/admin/" }],
  },
  {
    items: [
      { label: "Danh sách sân", icon: "pi pi-fw pi-list", to: "/admin/list" },
    ],
  },
  {
    items: [
      { label: "Thoát", icon: "pi pi-fw pi-sign-out", to: "/auth/login" },
    ],
  },
]);
</script>
<template>
  <ul class="layout-menu">
    <template v-for="(item, index) in model" :key="item">
      <MenuItem :item="item" :index="index"></MenuItem>
    </template>
  </ul>
</template>
<style scoped>
.layout-menu {
  padding: 10px 0;
  list-style-type: none;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
