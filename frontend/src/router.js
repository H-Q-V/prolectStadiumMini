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
        // meta: { requiresAuth: true, role: "customer" },
      },
      {
        path: "/list",
        name: "ListStadium",
        component: () => import("./pages/client/ListStadiumPage.vue"),
        // meta: { requiresAuth: true, role: "customer" },
      },
      {
        path: "/price-list/:id",
        name: "PriceList",
        component: () => import("./components/priceList/PriceList.vue"),
        // meta: { requiresAuth: true, role: "customer" },
      },

      {
        path: "/calendar/:id",
        name: "Calendar",
        component: () => import("./components/calendar/Calendar.vue"),
        // meta: { requiresAuth: true, role: "customer" },
      },

      {
        path: "/stadium-detail/:id",
        name: "StadiumDetail",
        component: () => import("./pages/StadiumDetailPage.vue"),
        // meta: { requiresAuth: true, role: "customer" },
      },

      {
        path: "/book-pitch/:id/:stadiumStyleID",
        name: "BookPitch",
        component: () => import("./pages/client/BookPitchPage.vue"),
        // meta: { requiresAuth: true, role: "customer" },
      },

      {
        path: "/schedule",
        name: "Schedule",
        component: () => import("./pages/client/SchedulePage.vue"),
        // meta: { requiresAuth: true, role: "customer" },
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
        meta: { requiresAuth: true, role: "stadiumOwner" },
      },

      {
        path: "/stadiumOwner/list",
        name: "ListStadiumOwner",
        component: () =>
          import("./pages/stadiumOwner/ListStadiumOwnerPage.vue"),
        meta: { requiresAuth: true, role: "stadiumOwner" },
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
        meta: { requiresAuth: true, role: "admin" },
      },

      {
        path: "/admin/customers",
        name: "listCustomers",
        component: () => import("./pages/admin/ListCustomersPage.vue"),
        meta: { requiresAuth: true, role: "admin" },
      },
    ],
  },

  {
    path: "/notfound",
    name: "NotFound",
    component: () => import("./pages/NotFoundPage.vue"),
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

// router.beforeEach((to, from, next) => {
//   const token = localStorage.getItem(LOCAL_STORAGE_TOKEN);
//   const userRole = localStorage.getItem("userRole"); // Assuming you store the user role in local storage

//   if (to.matched.some((record) => record.meta.requiresAuth)) {
//     if (!token) {
//       // Redirect to login if not authenticated
//       next({ name: "Login" });
//     } else {
//       // Check if the user has the required role
//       const role = to.meta.role;
//       if (role && role !== userRole) {
//         // Redirect to a forbidden page or show an error if the role doesn't match
//         next({ name: "Forbidden" });
//       } else {
//         next();
//       }
//     }
//   } else {
//     next(); // Proceed if the route does not require authentication
//   }
// });
export default router;
