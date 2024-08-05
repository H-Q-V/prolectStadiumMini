<script setup>
import Topbar from "../client/Topbar.vue";
import { ref } from "vue";
import SidebarStadiumOwner from "./SidebarStadiumOwner.vue";
const sidebarActive = ref(false);
const handleMenuToggle = () => {
  sidebarActive.value = !sidebarActive.value;
};
</script>
<template>
  <div class="layout-wrapper">
    <Topbar :onMenuToogle="handleMenuToggle"></Topbar>

    <div :class="['layout-sidebar', { active: sidebarActive }]">
      <SidebarStadiumOwner></SidebarStadiumOwner>
    </div>

    <div class="layout-main-container">
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
  height: 100vh;
  top: 100px;
  left: -450px;
  background-color: #fff;
  padding: 10px 10px;
  border-radius: 6px;
  overflow-y: auto;
  transition: 0.6s ease;
  transition-property: left;
  z-index: 10000;
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.02), 0px 0px 2px rgba(0, 0, 0, 0.05),
    0px 1px 4px rgba(0, 0, 0, 0.08);
}

.layout-sidebar::-webkit-scrollbar {
  width: 0px;
}

.layout-sidebar.active {
  left: 20px;
  height: 100%;
}

.layout-main-container {
  min-height: 100vh;
  padding: 7rem;
}

.layout-main {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

@media (max-width: 480px) {
  .layout-main-container {
    padding: 7rem 20px;
  }
}
</style>
