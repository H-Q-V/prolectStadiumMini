<script setup>
import { ref, computed } from "vue";
import { useUser } from "../../stores/fetchAuth";
const props = defineProps({
  onMenuToogle: {
    type: Function,
  },
});
const topbarMenuActive = ref(false);
const onTopbarMenuButton = () => {
  topbarMenuActive.value = !topbarMenuActive.value;
};
const topbarMenuClasses = computed(() => {
  return {
    "layout-topbar-menu-mobile-active": topbarMenuActive.value,
  };
});
</script>
<template>
  <div class="layout-topbar">
    <button
      class="p-link layout-menu-button layout-topbar-button"
      @click="onMenuToogle"
    >
      <i class="pi pi-bars"></i>
    </button>

    <button
      class="p-link layout-topbar-menu-button layout-topbar-button"
      @click="onTopbarMenuButton()"
    >
      <i class="pi pi-ellipsis-v"></i>
    </button>

    <div class="layout-topbar-menu" :class="topbarMenuClasses">
      <button @click="onTopbarMenuButton()" class="p-link layout-topbar-button">
        <i class="pi pi-calendar"></i>
        <span>Calendar</span>
      </button>
      <button class="p-link layout-topbar-button">
        <i class="text-black pi pi-user"></i>
        <span>Profile</span>
      </button>
      <button class="layout-topbar-button">
        <i class="text-black pi pi-cog"></i>
        <span>Settings</span>
      </button>

      <div class="bg-primary px-6 py-4 rounded-lg text-white text-center">
        {{ username }}
      </div>
    </div>
  </div>
</template>
<style>
.layout-topbar {
  background-color: #ffffff;
  position: fixed;
  height: 5rem;
  left: 0;
  top: 0;
  width: 100%;
  padding: 0 2rem;
  transition: left 0.2s;
  display: flex;
  align-items: center;
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.02), 0px 0px 2px rgba(0, 0, 0, 0.05),
    0px 1px 4px rgba(0, 0, 0, 0.08);
  z-index: 100;
  img {
    height: 2.5rem;
    margin-right: 0.5rem;
  }

  &:focus {
    @include focused();
  }
}

.layout-topbar-button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  position: relative;
  color: #64748b;
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
  cursor: pointer;
  transition: background-color 0.2s;

  i {
    font-size: 1.5rem;
  }

  span {
    font-size: 1rem;
    display: none;
  }
}

.layout-menu-button {
  margin-left: 2rem;
}

.layout-topbar-menu-button {
  display: none;

  i {
    font-size: 1.25rem;
  }
}

.layout-topbar-menu {
  margin: 0 0 0 auto;
  padding: 0;
  list-style: none;
  display: flex;

  .layout-topbar-button {
    margin-left: 1rem;
  }
}

@media (max-width: 991px) {
  .layout-topbar {
    justify-content: space-between;
    .layout-menu-button {
      margin-left: 0;
      order: 1;
    }

    .layout-topbar-menu-button {
      display: inline-flex;
      margin-left: 0;
      order: 3;
    }

    .layout-topbar-menu {
      margin-left: 0;
      position: absolute;
      flex-direction: column;
      background-color: #ffffff;
      box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.02),
        0px 0px 2px rgba(0, 0, 0, 0.05), 0px 1px 4px rgba(0, 0, 0, 0.08);
      border-radius: 12px;
      padding: 1rem;
      right: 2rem;
      top: 5rem;
      min-width: 15rem;
      display: none;
      -webkit-animation: scalein 0.15s linear;
      animation: scalein 0.15s linear;

      &.layout-topbar-menu-mobile-active {
        display: block;
      }

      .layout-topbar-button {
        margin-left: 0;
        display: flex;
        width: 100%;
        height: auto;
        justify-content: flex-start;
        border-radius: 12px;
        padding: 1rem;

        i {
          font-size: 1rem;
          margin-right: 0.5rem;
        }

        span {
          font-weight: medium;
          display: block;
        }
      }
    }
  }
}
</style>
