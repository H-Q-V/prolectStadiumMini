<script setup>
const props = defineProps({
  className: {
    type: String,
  },
  icon: {
    type: String,
  },
  title: {
    type: String,
  },
  value: {
    type: [String, Number],
  },
});
</script>
<template>
  <div class="flex items-center gap-4 bg-white px-4 py-4 shadow-md rounded-lg">
    <div
      :class="[
        'w-[42px] h-[42px] rounded-full flex items-center justify-center',
        className,
      ]"
    >
      <i :class="['pi pi-fw text-white', icon]"></i>
    </div>

    <div class="flex flex-col gap-1">
      <p class="text-[#8c9097] text-lg">{{ title }}</p>
      <span class="text-2xl font-bold">{{ value }}</span>
    </div>
  </div>
</template>
<style></style>
