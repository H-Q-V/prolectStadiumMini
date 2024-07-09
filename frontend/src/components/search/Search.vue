<script setup>
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import { ref } from "vue";
import { useStadium } from "../../stores/fetchStadium";
const loading = ref([false]);
const name = ref("");
const address = ref("");
const result = ref([]);
const stadiumStore = useStadium();
const load = (index) => {
  loading.value[index] = true;
  setTimeout(() => {
    loading.value[index] = false;
  }, 2000);
};
const onSearch = async () => {
  load(0);
  const dataSearch = {
    name: name.value,
    address: address.value,
  };
  console.log("🚀 ~ onSearch ~ dataSearch:", dataSearch);
  result.value = await stadiumStore.searchStadium(
    dataSearch.name,
    dataSearch.address
  );
  console.log("🚀 ~ onSearch ~ result:", result.value);
};
</script>
<template>
  <form @submit.prevent="onSearch">
    <InputText
      type="text"
      placeholder="Nhập tên sân "
      class="inputText"
      v-model="name"
    ></InputText>
    <InputText
      type="text"
      placeholder="Nhập địa chỉ "
      v-model="address"
      class="inputText"
    ></InputText>

    <Button
      type="submit"
      label="Tìm kiếm"
      :loading="loading[0]"
      icon="pi pi-search"
      class="buttonSearch"
    />
  </form>
</template>
<style scoped>
form {
  display: flex;
}
.inputText {
  color: #334155;
  flex: 1;
  padding: 16px;
  border: 1px solid#334155;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  color: #334155;
}

.buttonSearch {
  background-color: #81c784;
  flex: 1;
  padding: 16px;
  border: 1px solid#334155;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
</style>
