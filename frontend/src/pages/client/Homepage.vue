<script setup>
import { onMounted } from "vue";
import Introduce from "../../components/introduce/Introduce.vue";
import Media from "../../components/media/Media.vue";
import { LOCAL_STORAGE_TOKEN } from "../../utils/localStoreName";
import { useRouter } from "vue-router";
const router = useRouter();
const token = localStorage.getItem(LOCAL_STORAGE_TOKEN);
onMounted(() => {
  if (!token) {
    router.push({ name: "Login" });
  }
});
</script>
<template>
  <h1 class="text-2xl font-bold text-center">Hình ảnh nổi bật</h1>
  <Media></Media>
  <Introduce></Introduce>
</template>
<style lang=""></style>
