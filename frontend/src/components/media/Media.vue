<script setup>
import { ref } from "vue";
import Carousel from "primevue/carousel";
import product1 from "../../components/image/product1.png";

const products = ref([
  {
    name: "Product 1",
    image: product1,
    price: 100,
  },
  {
    name: "Product 2",
    image: product1,
    price: 200,
  },
  {
    name: "Product 3",
    image: product1,
    price: 200,
  },
  {
    name: "Product 4",
    image: product1,
    price: 200,
  },
]);

const carouselResponsiveOptions = ref([
  {
    breakpoint: "1024px",
    numVisible: 3,
    numScroll: 3,
  },
  {
    breakpoint: "560px",
    numVisible: 1,
    numScroll: 1,
  },
]);
</script>
<template>
  <div class="w-full -z-10">
    <div class="card shadow-md">
      <Carousel
        :value="products"
        :numVisible="3"
        :numScroll="3"
        :responsiveOptions="carouselResponsiveOptions"
      >
        <template #item="slotProps">
          <div class="media-list border border-[#e2e8f0] p-3 rounded-xl mr-4">
            <div class="relative mx-auto">
              <img
                :src="slotProps.data.image"
                class="w-full md:h-[200px] h-[70px] rounded-xl object-cover"
              />
            </div>
          </div>
        </template>
      </Carousel>
    </div>
  </div>
</template>
<style scoped>
.card {
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  padding: 20px 0;
  margin-bottom: 2rem;
  border-radius: 12px;

  &:last-child {
    margin-bottom: 0;
  }

  .media-list:last-child {
    margin-right: 0;
  }
}
</style>
