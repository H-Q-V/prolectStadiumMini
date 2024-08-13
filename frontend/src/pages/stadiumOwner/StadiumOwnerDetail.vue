<script setup>
import { onMounted, ref, watchEffect } from "vue";
import { useStadium } from "../../stores";
import { useRoute } from "vue-router";
import Evaluate from "../../components/evaluate/Evaluate.vue";
import Button from "primevue/button";
import { toast } from "vue3-toastify";
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";
const stadiumData = ref([]);
const stadiumStyleData = ref([]);
const stadiumStore = useStadium();
const route = useRoute();
const visible = ref(false);
const stadiumID = route.params.id;
const name = ref("");
const type = ref("");
const price = ref("");
const time = ref("");
onMounted(async () => {
  await stadiumStore.getAStadium(stadiumID);
  await stadiumStore.getStadiumsStyle(stadiumID);
});

watchEffect(() => {
  stadiumData.value = stadiumStore.stadiumData;
  stadiumStyleData.value = stadiumStore.stadiumStyleData;
});

const formatPrice = () => {
  let number = price.value.replace(/\D/g, "");
  if (number) {
    number = new Intl.NumberFormat("de-DE").format(number);
  }
  price.value = number;
};

const deleteStadiumStyle = async (id) => {
  const confirmDelete = confirm("Bạn có chắc chắn muốn xóa kiểu sân này?");
  if (confirmDelete) {
    try {
      await stadiumStore.deleteStadiumStyle(id, toast);
      stadiumStore.getStadiumsStyle(stadiumID);
    } catch (error) {
      console.error("Failed to delete stadium style:", error);
    }
  }
};
</script>
<template>
  <div class="flex flex-col gap-5">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold capitalize">
        Sân {{ stadiumData.stadium_name }}
      </h1>
    </div>

    <img :src="stadiumData.image" alt="" class="h-96 object-cover rounded-md" />

    <div class="flex items-center gap-2 text-lg">
      <i class="pi pi-fw pi-map-marker"></i>
      <p class="capitalize">
        {{ stadiumData.ward }} {{ stadiumData.city }} {{ stadiumData.provice }}
        {{ stadiumData?.address }}
      </p>
    </div>

    <div class="flex items-center gap-2 text-lg">
      <i class="pi pi-fw pi-phone"></i>
      <p>{{ stadiumData.phone }}</p>
    </div>
    <p class="text-sm text-[#1a1a1a]">{{ stadiumData.describe }}</p>

    <table
      v-if="stadiumStyleData?.stadium_styles?.length > 0"
      id="stadium-style"
    >
      <tr>
        <th>Tên sân</th>
        <th>Kiểu sân</th>
        <th>Giá tiền</th>
        <th>Thời gian</th>
        <th></th>
        <th></th>
      </tr>

      <tr
        v-for="(stadiumStyle, index) in stadiumStyleData?.stadium_styles"
        :key="index"
      >
        <td>
          <span> {{ stadiumStyle.name }}</span>
        </td>

        <td>
          <span>{{ stadiumStyle.type }}</span>
        </td>
        <td>
          <span>{{ stadiumStyle.price }} VNĐ</span>
        </td>

        <td>
          <span>{{ stadiumStyle.time }} phút</span>
        </td>

        <td>
          <Button
            @click="visible = true"
            class="bg-blue-500 px-4 py-2 text-white rounded-md"
            >Sửa</Button
          >
        </td>

        <Dialog
          v-model:visible="visible"
          modal
          header="Sửa Kiểu Sân"
          class="w-[680px] px-4 py-4"
        >
          <form class="flex flex-col gap-4">
            <InputText
              id="name"
              placeholder="Tên sân"
              type="text"
              v-model="name"
              class="inputext"
            ></InputText>

            <InputText
              id="type"
              name="type"
              placeholder="Kiểu sân"
              type="text"
              v-model="type"
              class="inputext"
            ></InputText>

            <InputText
              id="price"
              name="price"
              placeholder="Giá tiền"
              type="text"
              v-model="price"
              class="inputext"
              @input="formatPrice"
            ></InputText>

            <InputText
              id="time"
              name="time"
              placeholder="Thời gian"
              type="number"
              v-model="time"
              class="inputext"
            ></InputText>

            <div class="flex justify-end gap-2 mt-4">
              <Button
                label="Hủy"
                @click="visible = false"
                class="bg-gray-500"
              ></Button>
              <Button
                type="submit"
                label="Cập nhật"
                class="bg-primary"
              ></Button>
            </div>
          </form>
        </Dialog>

        <td>
          <Button
            @click="deleteStadiumStyle(stadiumStyle._id)"
            class="bg-red-500 px-4 py-2 text-white rounded-md"
            >Xóa</Button
          >
        </td>
      </tr>
    </table>

    <p v-else>Hiện chưa có kiểu sân nào</p>
    <Evaluate></Evaluate>
  </div>
</template>
<style scoped>
#stadium-style {
  width: 100%;
  border-collapse: collapse;
  margin: 25px 0;
  text-align: left;
}

#stadium-style th,
#stadium-style td {
  padding: 12px 15px;
  border: 1px solid #ddd;
  text-align: center;
}

#stadium-style th {
  background-color: #04aa6d;
  color: white;
  text-transform: uppercase;
  font-weight: bold;
}

#stadium-style tr {
  border-bottom: 1px solid #dddddd;
}

Button {
  color: white;
  padding: 12px 40px;
  border-radius: 6px;
}
.inputext {
  width: 100%;
  padding: 16px;
  border: 1px solid #334155;
}
</style>
