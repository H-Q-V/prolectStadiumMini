<script setup>
import Carousel from "primevue/carousel";
import product1 from "../../components/image/product1.png";
import Textarea from "primevue/textarea";
import Button from "primevue/button";
import { ref } from "vue";
const products = ref([
  { name: "Product 1", image: product1 },
  { name: "Product 2", image: product1 },
  { name: "Product 3", image: product1 },
  { name: "Product 4", image: product1 },
]);
const comments = ref("");

const onComment = () => {
  const commmentData = {
    comments: comments.value,
  };
  console.log("🚀 ~ onComment ~ commmentData:", commmentData);
};
</script>
<template>
  <h1 class="text-2xl font-bold">Đánh giá khách hàng</h1>

  <Carousel :value="products" :numVisible="3" :numScroll="3">
    <template #item="slotProps">
      <div
        class="card flex flex-col border border-[#e7e7e7] p-5 rounded-lg mr-4"
      >
        <div class="flex items-center gap-4">
          <img
            :src="slotProps.data.image"
            class="w-[32px] h-[32px] rounded-full object-cover"
          />
          <span class="font-bold">{{ slotProps.data.name }}</span>
        </div>

        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores
          libero, illum deserunt nihil ducimus minus vero consequuntur sed
          magnam possimus, ratione explicabo repellendus cupiditate accusantium!
          Inventore maiores ratione aliquid dolorem.
        </p>
      </div>
    </template>
  </Carousel>

  <form class="w-full flex flex-col gap-2" @submit.prevent="onComment">
    <div class="flex gap-2">
      <img
        :src="product1"
        alt=""
        class="w-[40px] h-[40px] rounded-full translate-y-1/2 object-cover"
      />

      <div class="w-full flex flex-col gap-4">
        <Textarea
          class="resize-none border border-[#e7e7e7] px-4 py-4"
          placeholder="Viết đánh giá của bạn"
          v-model="comments"
        ></Textarea>

        <Button type="submit" class="bg-primary w-[150px] px-2 py-2 text-white"
          >Gửi
        </Button>
      </div>
    </div>
  </form>
</template>
<style scoped></style>
