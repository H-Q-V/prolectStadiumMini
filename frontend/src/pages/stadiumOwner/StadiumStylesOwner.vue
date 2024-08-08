<script setup>
import Button from "primevue/button";
import Dropdown from "primevue/dropdown";
import InputText from "primevue/inputtext";
import { onMounted, ref, watchEffect } from "vue";
import { toast } from "vue3-toastify";
import { useStadium } from "../../stores";
const name = ref("");
const type = ref("");
const price = ref("");
const time = ref("");
const nameStadium = ref("");
const stadiumOptions = ref([]);
const stadiumStore = useStadium();
const stadiumData = ref([]);
onMounted(async () => {
  await stadiumStore.getAllStadiumsByOwner();
});

watchEffect(() => {
  stadiumData.value = stadiumStore.stadiumData;
  stadiumOptions.value = stadiumData.value.map((stadium) => ({
    id: stadium._id,
    name: stadium.stadium_name,
  }));
});
const handleAddStadiumStyle = async () => {
  const data = {
    name: name.value,
    type: type.value,
    price: price.value,
    time: time.value,
    nameStadium: nameStadium.value.name,
  };
  console.log("🚀 ~ handleAddStadiumStyle ~ data:", data);
  await stadiumStore.addStadiumStyle(data, toast);
};
</script>
<template>
  <div class="flex items-center justify-center">
    <form
      @submit.prevent="handleAddStadiumStyle"
      class="w-[580px] bg-white shadow-xl px-6 py-6 flex flex-col gap-4 rounded-2xl"
    >
      <h1 class="font-bold text-xl text-center">Thêm kiểu sân</h1>
      <InputText
        id="name"
        name="name"
        placeholder="Tên sân"
        class="input-text"
        v-model="name"
      />

      <InputText
        id="type"
        name="type"
        placeholder="Kiểu sân"
        class="input-text"
        v-model="type"
      />

      <InputText
        id="price"
        name="price"
        placeholder="Giá tiền"
        class="input-text"
        v-model="price"
      />

      <InputText
        id="time"
        name="time"
        placeholder="Thời gian"
        class="input-text"
        v-model="time"
      />

      <Dropdown
        v-model="nameStadium"
        :options="stadiumOptions"
        optionLabel="name"
        placeholder="Sân vận động"
        class="input-text"
      ></Dropdown>

      <div class="flex justify-end gap-4">
        <router-link
          to="list"
          class="px-4 py-2 bg-red-500 text-white rounded-md"
          >Hủy</router-link
        >
        <Button
          type="submit"
          label="Thêm"
          class="bg-blue-400 text-white px-4 py-2"
        ></Button>
      </div>
    </form>
  </div>
</template>
<style scoped>
.input-text {
  width: 100%;
  padding: 10px 10px;
  border: 1px solid #cbd5e1;
}
</style>
