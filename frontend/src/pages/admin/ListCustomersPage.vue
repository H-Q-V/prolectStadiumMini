<script setup>
import "../../components/primevuecss/dialog.css";
import { computed, onMounted, ref, watchEffect } from "vue";
import InputText from "primevue/inputtext";
import { toast } from "vue3-toastify";
import Button from "primevue/button";
import Dropdown from "primevue/dropdown";
import Dialog from "primevue/dialog";
import { useUser } from "../../stores";

const userData = ref([]);
const userStore = useUser();
const email = ref("");
const username = ref("");
const password = ref("");
const selectedRole = ref(null);
const visibleDialog = ref(false);
const addUser = ref(false);
const roleOptions = ref([
  { name: "StadiumOwner" },
  { name: "Admin" },
  { name: "Customer" },
]);

onMounted(() => {
  userStore.getAllCustomers();
});

watchEffect(() => {
  userData.value = userStore.userData;
});

const currentUser = computed(() => userStore.currentUser);

const filteredUserData = computed(() => {
  return userData.value.filter(
    (user) => !(user.role === "Admin" && user.email === currentUser.value.email)
  );
});
const handleAddCustomer = async () => {
  const data = {
    email: email.value,
    username: username.value,
    password: password.value,
    role: selectedRole.value.name,
  };
  await userStore.addCustomers(data, toast);
  await userStore.getAllCustomers();
};

const handleUpdateUser = async () => {
  const data = {
    email: email.value,
    username: username.value,
    password: password.value,
    role: selectedRole.value.name,
  };
  const user = userData.value.find((user) => user.email === email.value);
  if (user) {
    await userStore.updateCustomer(user._id, data, toast);
    await userStore.getAllCustomers();
    visibleDialog.value = false;
  } else {
    toast.error("Không tìm thấy người dùng");
  }
};

const handleDeleteUser = async (id) => {
  if (window.confirm("Bạn có chắc chắn xóa không ?")) {
    await userStore.deleteCustomer(id, toast);
  }
};

const openUpdateDialog = (user) => {
  email.value = user.email;
  username.value = user.username;
  password.value = user.password;
  selectedRole.value = roleOptions.value.find(
    (role) => role.name === user.role
  );
  visibleDialog.value = true;
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
      <span class="flex items-center">
        Tên người dùng:
        <p class="capitalize">{{ user.username }}</p>
      </span>
      <span>Vai trò: {{ user.role }} </span>

      <div class="flex items-center justify-center gap-4">
        <Button @click="openUpdateDialog(user)" class="bg-blue-500"
          >Cập nhật</Button
        >
        <Button @click="handleDeleteUser(user._id)" class="bg-red-500"
          >Xóa</Button
        >
      </div>
    </div>

    <Button
      @click="addUser = true"
      class="fixed bottom-3 right-3 w-[38px] h-[38px] bg-slate-500 rounded-full text-white z-10"
    >
      <i class="pi pi-fw pi-plus"></i>
    </Button>

    <Dialog
      v-model:visible="addUser"
      modal
      header="Thêm người dùng"
      class="w-[680px] px-4 py-4"
    >
      <form @submit.prevent="handleAddCustomer" class="flex flex-col gap-4">
        <InputText
          id="email"
          placeholder="Email"
          type="text"
          v-model="email"
          class="inputext"
        ></InputText>

        <InputText
          id="username"
          name="username"
          placeholder="Tên người dùng"
          type="text"
          v-model="username"
          class="inputext"
        ></InputText>

        <InputText
          id="password"
          name="password"
          placeholder="Mật khẩu"
          type="password"
          v-model="password"
          class="inputext"
        ></InputText>

        <Dropdown
          v-model="selectedRole"
          :options="roleOptions"
          optionLabel="name"
          name="role"
          placeholder="Chọn vai trò"
          class="inputext"
        />

        <div class="flex justify-end gap-2 mt-4">
          <Button
            label="Thoát"
            @click="addUser = false"
            class="bg-gray-500"
          ></Button>
          <Button type="submit" label="Thêm" class="bg-primary"></Button>
        </div>
      </form>
    </Dialog>

    <Dialog
      v-model:visible="visibleDialog"
      modal
      header="Cập nhật"
      class="w-[680px] px-4 py-4 flex flex-col gap-4"
    >
      <form @submit.prevent="handleUpdateUser" class="flex flex-col gap-4">
        <InputText
          id="email"
          name="email"
          placeholder="Email"
          type="text"
          v-model="email"
          class="inputext"
        ></InputText>

        <InputText
          id="username"
          name="username"
          placeholder="Tên người dùng"
          type="text"
          v-model="username"
          class="inputext"
        ></InputText>

        <InputText
          id="password"
          name="password"
          placeholder="Mật khẩu"
          type="password"
          v-model="password"
          class="inputext"
        ></InputText>

        <Dropdown
          v-model="selectedRole"
          :options="roleOptions"
          optionLabel="name"
          name="role"
          placeholder="Chọn vai trò"
          class="inputext"
        />

        <div class="flex justify-end gap-2 mt-4">
          <Button
            type="button"
            label="Thoát"
            class="bg-gray-500"
            @click="visibleDialog = false"
          ></Button>
          <Button type="submit" label="Xác nhận" class="bg-primary"></Button>
        </div>
      </form>
    </Dialog>
  </div>
</template>

<style scoped>
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
