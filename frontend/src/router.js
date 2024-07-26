import { createWebHistory, createRouter } from "vue-router";
import LayoutCommon from "./layout/client/LayoutCommon.vue";
import LayoutAdmin from "./layout/admin/LayoutAdmin.vue";
const routes = [
  {
    path: "/",
    component: LayoutCommon,
    children: [
      {
        path: "/",
        name: "HomePage",
        component: () => import("./pages/client/Homepage.vue"),
      },
      {
        path: "/list",
        name: "ListStadium",
        component: () => import("./pages/client/ListStadiumPage.vue"),
      },
      {
        path: "/price-list/:id",
        name: "PriceList",
        component: () => import("./components/priceList/PriceList.vue"),
      },
      {
        path: "/stadium-detail/:id",
        name: "StadiumDetail",
        component: () => import("./pages/StadiumDetailPage.vue"),
      },

      {
        path: "/book-pitch/:id/:stadiumStyleID",
        name: "BookPitch",
        component: () => import("./pages/client/BookPitchPage.vue"),
      },

      {
        path: "/schedule",
        name: "Schedule",
        component: () => import("./pages/client/SchedulePage.vue"),
      },
    ],
  },

  {
    path: "/admin",
    component: LayoutAdmin,
    children: [
      {
        path: "/admin/",
        name: "",
        component: () => import("./pages/admin/AdminPage.vue"),
      },

      {
        path: "/admin/list",
        name: "ListStadiumAdmin",
        component: () => import("./pages/admin/ListStadiumAdminPage.vue"),
      },
    ],
  },

  {
    path: "/auth/login",
    name: "Login",
    component: () => import("./pages/LoginPage.vue"),
  },
  {
    path: "/auth/register",
    name: "Register",
    component: () => import("./pages/RegisterPage.vue"),
  },
  {
    path: "/auth/forgot",
    name: "Forgot",
    component: () => import("./pages/ForgotPage.vue"),
  },
  {
    path: "/auth/send-otp",
    name: "SendOTP",
    component: () => import("./pages/SendOtpPage.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
