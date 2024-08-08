<script setup>
import { ref } from "vue";
import MenuItem from "../MenuItem.vue";
import { LOCAL_STORAGE_TOKEN } from "../../utils/localStoreName";
import { useRouter } from "vue-router";
const model = ref([
  {
    items: [{ label: "Trang chủ", icon: "pi pi-fw pi-home", to: "/" }],
  },
  {
    items: [{ label: "Danh sách sân", icon: "pi pi-fw pi-list", to: "/list" }],
  },
  {
    items: [
      { label: "Lịch đặt sân", icon: "pi pi-fw pi-calendar", to: "/schedule" },
    ],
  },
  {
    items: [
      {
        label: "Thoát",
        icon: "pi pi-fw pi-sign-out",
        to: "/auth/login",
        action: "logout",
      },
    ],
  },
]);
const router = useRouter();

const handleLogout = () => {
  localStorage.removeItem(LOCAL_STORAGE_TOKEN);
  localStorage.removeItem("username");
  localStorage.removeItem("userRole");
  localStorage.removeItem("email");
  router.push("/auth/login");
};

const handleMenuClick = (menuItem) => {
  if (menuItem.action === "logout") {
    handleLogout();
  } else if (menuItem.to) {
    router.push(menuItem.to);
  }
};
</script>
<template>
  <ul class="layout-menu">
    <template v-for="(group, index) in model" :key="index">
      <MenuItem :item="group" :index="index" @menuClick="handleMenuClick" />
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
