<script setup>
const props = defineProps({
  forr: {
    type: String,
  },
  className: {
    type: String,
  },
  infor: {
    type: String,
  },
  value: {
    type: [String, Number],
  },
});
</script>
<template>
  <div :class="['flex items-center', className]">
    <label :for="forr" class="w-24">{{ infor }}</label>
    <span>{{ value }}</span>
  </div>
</template>
<style></style>
