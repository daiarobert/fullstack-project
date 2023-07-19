<template>
  <div
    class="view-team d-flex flex-column justify-content-center align-items-start"
  >
    <h1>{{ title }}</h1>
    <label class="pt-3">Team Name:</label>
    <div class="pb-3">{{ team.team_name }}</div>
    <label>Team Members:</label>
    <div class="py-1">{{ team.member_names }}</div>
    <div class="buttons d-flex justify-content-around py-5">
      <RouterLink class="btn btn-outline-primary" :to="{ path: '/' }"
        >Cancel</RouterLink
      >
    </div>
  </div>
</template>

<script>
import { getTeamsById } from "../../utils/api";
import { RouterLink } from "vue-router";

export default {
  components: {
    RouterLink,
  },
  data() {
    return {
      title: "Team Details",
      name: "",
      teamId: null,
      team: [],
    };
  },
  mounted() {
    this.teamId = parseInt(this.$route.params.teamId) + 1;
    // Get team details by ID
    getTeamsById(this.teamId)
      .then((response) => {
        this.team = response.data;
      })
      .catch((error) => {
        console.error(error);
      });
  },
};
</script>

<style scoped>
.view-team {
  margin: 50px auto;
  padding: 100px;
  max-width: 650px;
  border-radius: 15px;
  box-shadow: 0 0 4px 4px rgba(60, 60, 60, 0.17);
}

.form-group {
  margin-bottom: 20px;
}

.btn {
  max-width: 130px;
  min-width: 80px;
}
.remove-btn {
  max-width: 50px;
  margin-left: auto;
}

label {
  display: block;
  font-weight: bold;
}

input,
select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button:hover {
  background-color: #0056b3;
}
</style>
