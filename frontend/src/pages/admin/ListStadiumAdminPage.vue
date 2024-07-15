<script setup>
import Search from "../../components/search/Search.vue";
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import Dropdown from "primevue/dropdown";
import { onMounted, ref, watch, watchEffect } from "vue";
import InputText from "primevue/inputtext";
import Textarea from "primevue/textarea";
import { convertBase64, onFileChange } from "../../utils/uploadimage";
import StadiumAdmin from "../../components/stadium/StadiumAdmin.vue";
import { useStadium } from "../../stores/fetchStadium";
import { toast } from "vue3-toastify";
import { getAddress } from "../../utils/getAddress";
const visible = ref(false);
const image = ref("");
const stadium_name = ref(null);
const phone = ref(null);
const describe = ref(null);
const stadiumStore = useStadium();
const {
  province,
  district,
  ward,
  provinceOptions,
  districtOptions,
  wardOptions,
} = getAddress();

const handleFileChange = (e) => {
  onFileChange(e, image);
};

const handleAddStadium = async () => {
  const data = {
    image: await convertBase64(image.value),
    stadium_name: stadium_name.value,
    province: province.value.name,
    district: district.value.name,
    ward: ward.value.name,
    phone: phone.value,
    describe: describe.value,
  };
  await stadiumStore.createStadium(data, toast);
};
</script>
<template>
  <Search></Search>
  <h1 class="text-[#18458b] text-[24px] font-semibold text-center mb-4">
    Danh sách sân
  </h1>
  <StadiumAdmin></StadiumAdmin>
  <Button
    @click="visible = true"
    class="fixed bottom-3 right-3 w-[38px] h-[38px] bg-slate-500 rounded-full text-white z-10"
  >
    <i class="pi pi-fw pi-plus"></i>
  </Button>

  <Dialog
    v-model:visible="visible"
    modal
    header="Thêm sân"
    class="w-[580px] py-3 px-10 z-10"
  >
    <form @submit.prevent="handleAddStadium" class="flex flex-col gap-4">
      <div class="flex items-center gap-4">
        <label for="image" class="font-semibold w-24">Ảnh</label>
        <InputText id="image" name="iamge" class="input-text relative">
        </InputText>
        <label
          for="file"
          class="absolute right-10 -translate-x-1/2 cursor-pointer"
        >
          <i class="pi pi-upload"></i>
        </label>
        <input
          id="file"
          type="file"
          name="file"
          class="hidden"
          @change="handleFileChange"
        />
      </div>
      <div class="flex items-center gap-4">
        <label for="stadium_name" class="font-semibold w-24">Tên sân</label>
        <InputText
          id="stadium_name"
          name="stadium_name"
          class="input-text"
          v-model="stadium_name"
        />
      </div>

      <div class="flex items-center gap-4">
        <label for="province" class="font-semibold w-24">Tỉnh thành</label>
        <Dropdown
          v-model="province"
          :options="provinceOptions"
          optionLabel="name"
          class="input-text"
        />
      </div>

      <div class="flex items-center gap-4">
        <label for="district" class="font-semibold w-24">Quận huyện</label>
        <Dropdown
          v-model="district"
          :options="districtOptions"
          optionLabel="name"
          :disabled="!province"
          class="input-text"
        />
      </div>

      <div class="flex items-center gap-4">
        <label for="district" class="font-semibold w-24">Phường xã</label>
        <Dropdown
          v-model="ward"
          :options="wardOptions"
          optionLabel="name"
          :disabled="!district"
          class="input-text"
        />
      </div>

      <div class="flex items-center gap-4">
        <label for="phone" class="font-semibold w-24">Số điện thoại</label>
        <InputText id="phone" class="input-text" v-model="phone" />
      </div>

      <div class="flex items-center gap-4">
        <label for="describe" class="font-semibold w-24">Mô tả</label>
        <Textarea
          id="describe"
          class="input-text resize-none"
          v-model="describe"
        />
      </div>
      <div class="flex justify-end gap-4">
        <Button
          type="button"
          label="Thoát"
          severity="secondary"
          @click="visible = false"
        ></Button>
        <Button
          type="submit"
          label="Thêm"
          @click="visible = false"
          class="bg-blue-400 text-white px-4 py-2"
        ></Button>
      </div>
    </form>
  </Dialog>
</template>
<style scoped>
.input-text {
  width: 100%;
  padding: 4px 10px;
  border: 1px solid #cbd5e1;
}
</style>
