import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";

createApp(App).use(router).mount("#app");

// router.beforeEach((to, from, next) => {
//   const token = getCookie("jwt"); // Function to retrieve the JWT token from cookies
//   if (to.path !== "/login" && !token) {
//     // If the user is not logged in and trying to access a protected route, redirect to login
//     next({ path: "/login" });
//   } else {
//     next();
//   }
// });

// // Function to retrieve the JWT token from cookies
// function getCookie(name) {
//   const value = `; ${document.cookie}`;
//   const parts = value.split(`; ${name}=`);
//   if (parts.length === 2) return parts.pop().split(";").shift();
// }
