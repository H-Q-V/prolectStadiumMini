<script setup>
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Dropdown from "primevue/dropdown";
import { ref } from "vue";
import { useStadium } from "../../stores/fetchStadium";
import { getAddress } from "../../utils/getAddress";
const { provice, city, ward, proviceOptions, cityOptions, wardOptions } =
  getAddress();
const loading = ref([false]);
const name = ref("");
const result = ref([]);
const stadiumStore = useStadium();
const load = (index) => {
  loading.value[index] = true;
  setTimeout(() => {
    loading.value[index] = false;
  }, 2000);
};

const handleSearch = async () => {
  load(0);
  const dataSearch = {
    name: name.value,
    province: provice.value,
    city: city.value,
    ward: ward.value,
  };
  console.log("🚀 ~ onSearch ~ dataSearch:", dataSearch);
  try {
    await stadiumStore.searchStadium(
      dataSearch.name,
      dataSearch.province,
      dataSearch.city
    );
  } catch (error) {
    console.log("🚀 ~ handleSearch ~ error:", error);
  }
};
</script>
<template>
  <form @submit.prevent="handleSearch">
    <InputText
      type="text"
      placeholder="Nhập tên sân "
      class="inputText"
      v-model="name"
    ></InputText>

    <Dropdown
      v-model="provice"
      :options="proviceOptions"
      optionLabel="name"
      placeholder="Chọn tỉnh thành"
      class="inputText"
    />
    <Dropdown
      v-model="city"
      :options="cityOptions"
      optionLabel="name"
      placeholder="Chọn quận huyện"
      :disabled="!provice"
      class="inputText"
    />

    <Dropdown
      v-model="ward"
      :options="wardOptions"
      optionLabel="name"
      placeholder="Chọn phường xã"
      :disabled="!city"
      class="inputText"
    />
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
