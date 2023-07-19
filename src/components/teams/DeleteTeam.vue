<template>
  <div class="delete-team">
    <h1 class="d-flex">{{ title }} {{ team.team_name }}?</h1>
    <p class="py-3">
      Are you sure you want to delete team {{ team.team_name }} and all it's
      members?
    </p>
    <!-- Delete and cancel buttons -->
    <div class="buttons d-flex">
      <button type="submit" class="btn btn-outline-danger" @click="deleteTeam">
        Delete
      </button>
      <RouterLink class="btn btn-outline-primary" to="/">Cancel</RouterLink>
    </div>
  </div>
</template>

<script>
import {
  deleteTeam,
  getTeamsById,
  deleteAllMembersFromTeam,
} from "../../utils/api";
import { RouterLink } from "vue-router";

export default {
  components: {
    RouterLink,
  },
  data() {
    return {
      title: "Delete",
      teamId: null,
      team: [],
    };
  },
  mounted() {
    this.teamId = parseInt(this.$route.params.teamId) + 1;
    // Get the team details by ID
    getTeamsById(this.teamId)
      .then((response) => {
        this.team = response.data;
        console.log(this.team);
      })
      .catch((error) => {
        console.error(error);
      });
  },
  methods: {
    deleteTeam() {
      // Delete all members from the team
      deleteAllMembersFromTeam(this.teamId)
        .then((deleteMembersResponse) => {
          console.log("Members deleted successfully");
          console.log(deleteMembersResponse);

          // Delete the team itself
          deleteTeam(this.teamId)
            .then((deleteTeamResponse) => {
              console.log(deleteTeamResponse);
              window.alert("Team was deleted successfully");
              this.$router.push("/");
            })
            .catch((error) => {
              console.error(error);
            });
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>

<style scoped>
.delete-team {
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
.btn-outline-danger {
  margin-right: 10px;
}
p {
  text-align: start;
}
</style>
