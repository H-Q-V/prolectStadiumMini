<script setup>
import Topbar from "../client/Topbar.vue";
import { ref } from "vue";
import SidebarStadiumOwner from "./SidebarStadiumOwner.vue";
import { LOCAL_STORAGE_TOKEN } from "../../utils/localStoreName";
import { useRouter } from "vue-router";
const router = useRouter();
const sidebarActive = ref(false);
const handleMenuToggle = () => {
  sidebarActive.value = !sidebarActive.value;
};

const token = localStorage.getItem(LOCAL_STORAGE_TOKEN);
if (!token) {
  router.push({ name: "Login" });
}
</script>
<template>
  <div class="layout-wrapper">
    <Topbar :onMenuToogle="handleMenuToggle"></Topbar>

    <div :class="['layout-sidebar', { active: sidebarActive }]">
      <SidebarStadiumOwner></SidebarStadiumOwner>
    </div>

    <div :class="['layout-main-container', { actives: sidebarActive }]">
      <div class="layout-main">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<style scoped>
.layout-wrapper {
  min-height: 100vh;
}

.layout-sidebar {
  position: fixed;
  width: 300px;
  height: calc(100vh - 9rem);
  z-index: 999;
  overflow-y: auto;
  user-select: none;
  top: 7rem;
  left: 2rem;
  transition: all 0.5s ease;
  border-radius: 12px;
  padding: 0.5rem 1.5rem;
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.02), 0px 0px 2px rgba(0, 0, 0, 0.05),
    0px 1px 4px rgba(0, 0, 0, 0.08);
}

.layout-sidebar.active {
  left: -300px;
  transition: all 0.5s ease-in;
}

.layout-main-container {
  min-height: 100vh;
  padding: 7rem 2rem 2rem calc(300px + 70px);
  transition: all 0.2s ease-in;
  z-index: -1;
}

.layout-main-container.actives {
  padding-right: 100px;
  padding-left: 100px;
  transition: all 0.5s ease-in;
}

.layout-main {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
