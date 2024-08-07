<script setup>
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Dropdown from "primevue/dropdown";
import { ref, watchEffect } from "vue";
import { useStadium } from "../../stores";
import { getAddress } from "../../utils";

const { provice, city, ward, proviceOptions, cityOptions, wardOptions } =
  getAddress();
const name = ref("");
const address = ref("");
const result = ref([]);
const stadiumStore = useStadium();
const emit = defineEmits(["searchResults", "loadingStateChange"]);
const isLoading = ref(false);
const handleSearch = async () => {
  isLoading.value = true;
  emit("loadingStateChange", true);
  const dataSearch = {
    name: name.value || "",
    provice: provice?.value?.name || "",
    city: city?.value?.name || "",
    ward: ward?.value?.name || "",
  };
  try {
    await stadiumStore.searchStadium(
      dataSearch.name,
      dataSearch.provice,
      dataSearch.city,
      dataSearch.ward
    );

    watchEffect(() => {
      result.value = stadiumStore.resultSearch;
      emit("searchResults", result.value);
      setTimeout(() => {
        isLoading.value = false;
        emit("loadingStateChange", false);
      }, 3000);
    });

    name.value = "";
    provice.value = "";
    city.value = "";
    ward.value = "";
  } catch (error) {
    console.log("🚀 ~ handleSearch ~ error:", error);
    setTimeout(() => {
      isLoading.value = false;
      emit("loadingStateChange", false);
    }, 3000);
  }
};
</script>
<template>
  <form @submit.prevent="handleSearch">
    <InputText
      type="text"
      placeholder="Nhập tên sân "
      name="name"
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

    <InputText
      v-model="address"
      placeholder="Nhập địa chỉ"
      :disabled="!ward"
      class="inputText"
    />
    <Button
      type="submit"
      label="Tìm kiếm"
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
  padding: 16px;
  border: 1px solid#334155;
  flex: 1;
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

@media (max-width: 768px) {
  form {
    display: flex;
    flex-direction: column;
  }
}
</style>
