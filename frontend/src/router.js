import { createWebHistory, createRouter } from "vue-router";
import LayoutCommon from "./layout/client/LayoutCommon.vue";
import LayoutAdmin from "./layout/admin/LayoutAdmin.vue";
import LayoutStadiumOwner from "./layout/stadiumOwner/LayoutStadiumOwner.vue";
import { LOCAL_STORAGE_TOKEN } from "./utils/localStoreName";
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
        path: "/calendar",
        name: "Calendar",
        component: () => import("./components/calendar/Calendar.vue"),
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

  //stadium owner
  {
    path: "/stadiumOwner",
    component: LayoutStadiumOwner,
    children: [
      {
        path: "/stadiumOwner",
        name: "StadiumOwner",
        component: () => import("./pages/admin/AdminPage.vue"),
      },

      {
        path: "/stadiumOwner/list",
        name: "ListStadiumOwner",
        component: () =>
          import("./pages/stadiumOwner/ListStadiumOwnerPage.vue"),
      },
    ],
  },

  //admin
  {
    path: "/admin",
    component: LayoutAdmin,
    children: [
      {
        path: "/admin/",
        name: "Admin",
        component: () => import("./pages/admin/AdminPage.vue"),
      },

      {
        path: "/admin/customers",
        name: "ListCustomers",
        component: () => import("./pages/admin/ListCustomersPage.vue"),
      },

      {
        path: "/admin/list",
        name: "ListStadiumsByAdmin",
        component: () => import("./pages/admin/ListStadiumByAdminPage.vue"),
      },
    ],
  },

  {
    path: "/notfound",
    name: "NotFound",
    component: () => import("./pages/NotFoundPage.vue"),
  },

  {
    path: "/payment/:id/:stadiumID",
    name: "Payment",
    component: () => import("./pages/PaymentPage.vue"),
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

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem(LOCAL_STORAGE_TOKEN);
  const userRole = localStorage.getItem("userRole");

  const publicPages = [
    "/auth/login",
    "/auth/register",
    "/auth/forgot",
    "/auth/send-otp",
  ];
  const authRequired = !publicPages.includes(to.path);
  if (
    to.path === "/auth/login" ||
    to.path === "/auth/register" ||
    to.path === "/auth/forgot"
  ) {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN);
    localStorage.removeItem("username");
    localStorage.removeItem("userRole");
  }

  if (authRequired && !token) {
    return next("/auth/login");
  }

  if (to.path.startsWith("/admin") && userRole !== "Admin") {
    return next("/notfound");
  }

  if (to.path.startsWith("/stadiumOwner") && userRole !== "StadiumOwner") {
    return next("/notfound");
  }

  next();
});

export default router;
