<template>
  <table class="table">
    <thead>
      <tr>
        <th scope="col" class="team-tab">Team</th>
        <th scope="col">Team Action</th>
        <th scope="col" class="member-tab">Member</th>
        <th scope="col">Member Action</th>
      </tr>
    </thead>
    <tbody v-if="paginatedTeams.length > 0">
      <tr v-for="(team, index) in paginatedTeams" :key="index">
        <td>{{ team.teamName }}</td>
        <td>
          <RouterLink
            class="btn btn-outline-success"
            :to="`/viewTeam/${team.teamId - 1}`"
          >
            View
          </RouterLink>
          <RouterLink
            class="btn btn-outline-warning"
            :to="`/editTeam/${team.teamId - 1}`"
          >
            Edit
          </RouterLink>
          <RouterLink
            class="btn btn-outline-danger"
            :to="`/delete/${team.teamId - 1}`"
          >
            Delete
          </RouterLink>
        </td>
        <td>{{ team.memberName }}</td>
        <td v-if="team.memberName">
          <RouterLink
            class="btn btn-outline-warning"
            :to="`/editMember/${team.memberId}`"
          >
            Edit
          </RouterLink>
          <RouterLink
            class="btn btn-outline-danger"
            :to="`/deleteMember/${team.memberId}`"
          >
            Delete
          </RouterLink>
        </td>
      </tr>
    </tbody>
    <tbody v-else>
      <tr>
        <td colspan="4" class="text-center">
          No members or Teams found with this name.
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { RouterLink } from "vue-router";

export default {
  name: "TeamTable",
  props: {
    paginatedTeams: {
      type: Array,
      required: true,
    },
  },
  components: {
    RouterLink,
  },
};
</script>

<style scoped>
.team-tab {
  background-color: #42b983;
  color: white;
}
.member-tab {
  background-color: #4299b9;
  color: white;
}
.hello {
  margin: 150px;
}
.btn {
  margin-right: 5px;
  min-width: 75px;
}
</style>
