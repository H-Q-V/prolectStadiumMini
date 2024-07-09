<script setup>
const props = defineProps({
  index: {
    type: Number,
    default: 0,
  },
  item: {
    type: Object,
    default: () => {},
  },
});
</script>
<template>
  <li
    v-if="item && item.items"
    v-for="(menuItem, menuIndex) in item.items"
    :key="menuIndex"
  >
    <router-link
      :to="menuItem.to"
      class="flex items-center gap-2 px-3 py-2 rounded-xl text-lg"
    >
      <i :class="menuItem.icon"></i>
      <span>{{ menuItem.label }}</span>
    </router-link>
  </li>
</template>
<style scoped>
.router-link-exact-active {
  color: #81c784;
}
</style>
