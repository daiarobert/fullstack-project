<template>
  <div>
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
import { getCookie, deleteCookie } from "@/utils/cookies";

export default {
  data() {
    return {
      adminName: "",
    };
  },
  mounted() {
    this.adminName = getCookie("adminName");
  },
  methods: {
    logout() {
      // Clear the adminName from localStorage
      localStorage.removeItem("adminName");

      deleteCookie("jwt");

      // Redirect to the login page
      this.$router.push("/login");
    },
  },
};
</script>
