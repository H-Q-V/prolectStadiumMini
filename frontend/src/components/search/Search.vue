<script setup>
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Dropdown from "primevue/dropdown";
import { onMounted, ref, watch, watchEffect } from "vue";
import { useStadium } from "../../stores/fetchStadium";
import { useAddress } from "../../stores/fetchAddress";
const loading = ref([false]);
const name = ref("");
const result = ref([]);
const stadiumStore = useStadium();
const addressStore = useAddress();
const provinceData = ref([]);
const districtData = ref([]);
const selectedProvince = ref(null);
const selectedDistrict = ref(null);
const provinceOptions = ref([]);
const districtOptions = ref([]);
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
    selectedProvince: selectedProvince.value,
    selectedDistrict: selectedDistrict.value,
  };
  console.log("🚀 ~ onSearch ~ dataSearch:", dataSearch);
  try {
    await stadiumStore.searchStadium(
      dataSearch.name,
      dataSearch.selectedProvince,
      dataSearch.selectedDistrict
    );
  } catch (error) {
    console.log("🚀 ~ handleSearch ~ error:", error);
  }
};

onMounted(async () => {
  await addressStore.getAllProvince();
});

watchEffect(() => {
  provinceData.value = addressStore.provinceData;
  provinceOptions.value = provinceData.value.map((province) => ({
    id: province.id,
    name: province.full_name,
  }));
});

watch(selectedProvince, async (newProvince) => {
  const provinceID = newProvince.id;
  await addressStore.getdistrict(provinceID);
  districtData.value = addressStore.districtData;

  districtOptions.value = districtData.value.map((district) => ({
    id: district.id,
    name: district.full_name,
  }));
});
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
      v-model="selectedProvince"
      :options="provinceOptions"
      optionLabel="name"
      placeholder="Chọn tỉnh thành"
      class="inputText"
    />
    <Dropdown
      v-model="selectedDistrict"
      :options="districtOptions"
      optionLabel="name"
      placeholder="Chọn quận huyện"
      :disabled="!selectedProvince"
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
