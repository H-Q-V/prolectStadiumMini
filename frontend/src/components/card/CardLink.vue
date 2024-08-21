<script setup>
const props = defineProps({
  to: {
    type: String,
  },
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
  <router-link
    :to="to"
    class="flex items-center bg-white px-4 py-4 shadow-md rounded-lg gap-4"
  >
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
  </router-link>
</template>
