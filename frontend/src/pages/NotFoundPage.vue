<script></script>
<template>
  <div
    class="surface-ground flex items-center justify-center min-h-screen min-w-screen overflow-hidden"
  >
    <div class="flex flex-col items-center justify-center">
      <div
        style="
          border-radius: 56px;
          padding: 0.3rem;
          background: linear-gradient(
            180deg,
            rgba(33, 150, 243, 0.4) 10%,
            rgba(33, 150, 243, 0) 30%
          );
        "
      >
        <div
          class="w-full surface-card py-8 px-5 sm:px-8 flex flex-col items-center"
          style="border-radius: 53px"
        >
          <span class="text-blue-500 font-bold text-3xl">404</span>
          <h1 class="text-900 font-bold text-3xl lg:text-5xl mb-2">
            Not Found
          </h1>
          <div class="text-600 mb-5">Requested resource is not available.</div>
          <router-link
            to="/"
            class="w-full flex items-center py-5 border-300 border-bottom-1"
          >
            <span
              class="flex justify-center items-center bg-cyan-400 border-round"
              style="height: 3.5rem; width: 3.5rem"
            >
              <i class="text-50 pi pi-fw pi-table text-2xl"></i>
            </span>
            <span class="ml-4 flex flex-column">
              <span class="text-900 lg:text-xl font-medium mb-0 block"
                >Frequently Asked Questions</span
              >
              <span class="text-600 lg:text-xl"
                >Ultricies mi quis hendrerit dolor.</span
              >
            </span>
          </router-link>
          <router-link
            to="/"
            class="w-full flex items-center py-5 border-300 border-bottom-1"
          >
            <span
              class="flex justify-center items-center bg-orange-400 border-round"
              style="height: 3.5rem; width: 3.5rem"
            >
              <i class="pi pi-fw pi-question-circle text-50 text-2xl"></i>
            </span>
            <span class="ml-4 flex flex-column">
              <span class="text-900 lg:text-xl font-medium mb-0"
                >Solution Center</span
              >
              <span class="text-600 lg:text-xl"
                >Phasellus faucibus scelerisque eleifend.</span
              >
            </span>
          </router-link>
          <router-link
            to="/"
            class="w-full flex items-center mb-5 py-5 border-300 border-bottom-1"
          >
            <span
              class="flex justify-center items-center bg-indigo-400 border-round"
              style="height: 3.5rem; width: 3.5rem"
            >
              <i class="pi pi-fw pi-unlock text-50 text-2xl"></i>
            </span>
            <span class="ml-4 flex flex-col">
              <span class="text-900 lg:text-xl font-medium mb-0"
                >Permission Manager</span
              >
              <span class="text-600 lg:text-xl"
                >Accumsan in nisl nisi scelerisque</span
              >
            </span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<style></style>
