<script setup>
import { computed, onMounted, ref, watchEffect } from "vue";
import { toast } from "vue3-toastify";
import Button from "primevue/button";
import Dropdown from "primevue/dropdown";
import Dialog from "primevue/dialog";
import useUser from "../../stores/fetchAuth";
const userData = ref([]);
const userStore = useUser();

const selectedRole = ref(null);
const visible = ref(false);
const roleOptions = ref([{ name: "StadiumOwner" }, { name: "Customer" }]);
onMounted(() => {
  userStore.getAllCustomers();
});

watchEffect(() => {
  userData.value = userStore.userData;
});

const filteredUserData = computed(() => {
  return userData.value.filter((user) => user.role !== "Admin");
});

const updateUser = async (id) => {
  if (selectedRole.value && selectedRole.value.name) {
    const role = selectedRole.value.name;
    await userStore.updateCustomer(id, role, toast);
    visible.value = false;
  } else {
    toast.error("Vui lòng chọn vai trò");
  }
};

const handleDeleteUser = async (id) => {
  if (window.confirm("Bạn có chắc chắn xóa không ?")) {
    await userStore.deleteCustomer(id, toast);
  }
};
</script>
<template>
  <div class="grid md:grid-cols-3 grid-cols-1 gap-4">
    <div
      v-for="user in filteredUserData"
      :key="user._id"
      class="flex flex-col gap-2 shadow-md px-2 py-4 rounded-lg"
    >
      <span>Email: {{ user.email }}</span>
      <span class="flex items-center"
        >Tên người dùng:
        <p class="capitalize">{{ user.username }}</p></span
      >
      <span>Vai trò: {{ user.role }} </span>

      <div class="flex items-center justify-center gap-4">
        <Button @click="visible = true" class="bg-blue-500">Cấp quyền</Button>
        <Dialog
          v-model:visible="visible"
          modal
          header="Đổi vai trò"
          class="w-[580px] px-4 py-4 flex flex-col gap-4"
        >
          <Dropdown
            v-model="selectedRole"
            :options="roleOptions"
            optionLabel="name"
            name="role"
            placeholder="Chọn vai trò"
            class="w-full p-4 border border-[#334155]"
          />

          <div class="flex justify-end gap-2 mt-4">
            <Button
              type="button"
              label="Thoát"
              class="bg-gray-500"
              @click="visible = false"
            ></Button>
            <Button
              type="button"
              label="Xác nhận"
              class="bg-primary"
              @click="() => updateUser(user._id)"
            ></Button>
          </div>
        </Dialog>
        <Button @click="handleDeleteUser(user._id)" class="bg-red-500">
          Xóa
        </Button>
      </div>
    </div>
  </div>
</template>
<style>
Button {
  color: white;
  padding: 12px 40px;
  border-radius: 6px;
}
</style>
