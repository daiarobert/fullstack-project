<template>
  <div class="login-container">
    <div class="center">
      <div class="card">
        <div class="card-body">
          <h2 class="card-title">Login</h2>
          <form @submit.prevent="handleLogin">
            <div class="form-group">
              <label for="email">Email:</label>
              <input type="email" id="email" v-model="email" required />
            </div>
            <div class="form-group">
              <label for="password">Password:</label>
              <input
                type="password"
                id="password"
                v-model="password"
                required
              />
            </div>
            <button type="submit" class="btn btn-primary">Login</button>
          </form>
          <div class="login-credentials">
            <label>Email:</label>
            <p class="email-credentials">1@1.com</p>
            <label>Password:</label>
            <p class="password-credentials">1</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { login } from "../../utils/api";
import router from "@/router";
//import { setCookie } from "./utils/cookies";

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    handleLogin() {
      login(this.email, this.password)
        .then((response) => {
          console.log("Response:", response);

          localStorage.setItem("adminName", response.data.name);

          router.push({ path: "/", query: { name: response.data.name } });
        })
        .catch((error) => {
          console.error("Login failed:", error.message);
          // Check if there's a response and a response.data property
          if (error.response && error.response.data) {
            console.log("Error data:", error.response.data);
          }
        });
    },
  },
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.card {
  max-width: 400px;
  height: 400px !important;
  width: 400px;
  margin-top: -150px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card-body {
  padding: 20px;
}

.card-title {
  font-size: 24px;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.login-credentials {
  display: flex;
  margin-top: 15px;
}
.email-credentials {
  margin-right: 25px;
}
label {
  display: block;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
