<script setup>
import Carousel from "primevue/carousel";
import product1 from "../../components/image/product1.png";
import Textarea from "primevue/textarea";
import Button from "primevue/button";
import { onMounted, ref, watchEffect } from "vue";
import useStadium from "../../stores/fetchStadium";
import { useRoute } from "vue-router";
import { toast } from "vue3-toastify";
const comments = ref("");
const route = useRoute();
const stadiumStore = useStadium();
const commentInfo = ref([]);
const handleComment = async () => {
  const commmentData = {
    comments: comments.value,
  };

  await stadiumStore.commment(commmentData, route.params.id, toast);
  comments.value = "";
  await stadiumStore.getComments(route.params.id);
};

onMounted(async () => {
  await stadiumStore.getComments(route.params.id);
});

watchEffect(() => {
  commentInfo.value = stadiumStore.commentData;
});
</script>
<template>
  <h1 class="text-2xl font-bold">Đánh giá khách hàng</h1>

  <div v-if="commentInfo.length === 0" class="text-lg text-gray-500">
    Chưa có đánh giá nào
  </div>

  <Carousel v-else :value="commentInfo" :numVisible="3">
    <template #item="comment">
      <div
        class="card flex flex-col border border-[#e7e7e7] p-5 rounded-lg mr-4"
      >
        <div class="flex items-center gap-4">
          <img
            :src="product1"
            class="w-[32px] h-[32px] rounded-full object-cover"
          />

          <div class="flex flex-col">
            <span class="capitalize font-bold">{{
              comment?.data?.user?.username
            }}</span>

            <p>{{ comment?.data?.comments }}</p>
          </div>
        </div>
      </div>
    </template>
  </Carousel>

  <form class="w-full flex flex-col gap-2" @submit.prevent="handleComment">
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
<style></style>
