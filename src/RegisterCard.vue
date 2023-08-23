<template>
  <div class="register-container">
    <div class="center">
      <div class="card">
        <div class="card-body">
          <h2 class="card-title">Register</h2>
          <form @submit.prevent="register">
            <div class="form-group">
              <label for="name">Name:</label>
              <input type="text" id="name" v-model="name" required />
            </div>
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
            <button type="submit" class="btn btn-primary">Register</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { registerAdmin } from "./utils/api";

export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
    };
  },
  methods: {
    register() {
      const adminData = {
        name: this.name,
        email: this.email,
        password: this.password,
      };

      registerAdmin(adminData)
        .then((response) => {
          console.log(response.data); // Handle the response from the server
        })
        .catch((error) => {
          console.error("Error registering admin:", error);
        });
    },
  },
};
</script>

<style scoped>
.register-container {
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
