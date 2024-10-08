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
        path: "/stadium-detail/:id",
        name: "StadiumDetail",
        component: () => import("./pages/StadiumDetailPage.vue"),
      },

      {
        path: "/book-pitch/:id/:stadiumStyleID",
        name: "BookPitch",
        component: () => import("./pages/client/BookPitch.vue"),
      },

      {
        path: "/schedule",
        name: "Schedule",
        component: () => import("./pages/client/Schedule.vue"),
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
        component: () => import("./pages/stadiumOwner/Dashboard.vue"),
      },

      {
        path: "/stadiumOwner/revenue",
        name: "RevenueOwner",
        component: () => import("./pages/stadiumOwner/RevenueDetails.vue"),
      },

      {
        path: "/stadiumOwner/list",
        name: "ListStadiumOwner",
        component: () =>
          import("./pages/stadiumOwner/ListStadiumOwnerPage.vue"),
      },

      {
        path: "/stadium-owner-detail/:id",
        name: "StadiumOwnerDetail",
        component: () => import("./pages/stadiumOwner/StadiumOwnerDetail.vue"),
      },

      {
        path: "/stadiumOwner/stadium_style",
        name: "StadiumStylesOwner",
        component: () => import("./pages/stadiumOwner/StadiumStylesOwner.vue"),
      },

      {
        path: "/stadiumOwner/schedule",
        name: "ScheduleOwner",
        component: () => import("./pages/stadiumOwner/Schedule.vue"),
      },
    ],
  },

  //admin
  {
    path: "/admin",
    component: LayoutAdmin,
    children: [
      {
        path: "/admin",
        name: "Admin",
        component: () => import("./pages/admin/Dashboard.vue"),
      },

      {
        path: "/admin/customers",
        name: "ListCustomers",
        component: () => import("./pages/admin/ListCustomersPage.vue"),
      },

      {
        path: "/admin/revenue",
        name: "RevenueAdmin",
        component: () => import("./pages/admin/RevenueDetails.vue"),
      },
      {
        path: "/admin/list",
        name: "ListStadiumsByAdmin",
        component: () => import("./pages/admin/ListStadiumByAdminPage.vue"),
      },
    ],
  },

  {
    path: "/book-pitch/:id",
    name: "Calendar",
    component: () => import("./components/calendar/Calendar.vue"),
  },

  {
    path: "/notfound",
    name: "NotFound",
    component: () => import("./pages/NotFoundPage.vue"),
  },

  {
    path: "/payment",
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

  if (to.path === "/") {
    if (userRole === "StadiumOwner") {
      return next({ name: "StadiumOwner" });
    }
    if (userRole === "Admin") {
      return next({ name: "Admin" });
    }
  }
  next();
});

export default router;
