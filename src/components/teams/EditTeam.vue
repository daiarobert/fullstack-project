<template>
  <div class="edit-team">
    <h1>{{ title }}</h1>
    <form class="team-form" @submit.prevent="submitForm">
      <label>Team Name:</label>
      <div>{{ team.team_name }}</div>
      <!-- Input field for changing the team name -->
      <InputSection
        v-model="name"
        :label="`Change Team Name: `"
        @input="name = $event.target.value"
      />
      <label>Delete Team Members:</label>

      <div>
        <ul>
          <!-- List of team members with remove button -->
          <li
            class="d-flex justify-content-start"
            v-for="member in teamMembers"
            :key="member.id"
          >
            {{ member.name }}
            <button
              class="btn btn-outline-danger remove-btn"
              @click="() => removeMember(member.id, member)"
            >
              Remove
            </button>
          </li>
        </ul>
      </div>
      <label class="d-flex"
        >Select and hit + to add Members from other Teams</label
      >
      <div class="add-members-container d-flex p-2">
        <!-- Select field for all members -->
        <select v-model="selectedAllMembers">
          <option
            v-for="member in filteredAllMembers"
            :key="member.id"
            :value="member.id"
          >
            {{ member.name }}
          </option>
        </select>
        <button
          class="btn btn-outline-success add-btn"
          @click="addMemberFromOtherTeam()"
        >
          +
        </button>
      </div>
      <!-- Save and cancel buttons -->
      <SaveCancelButtons />
    </form>
  </div>
</template>

<script>
import {
  getTeamById,
  getMembersWithSameTeam,
  getMembers,
  deleteMember,
  updateMemberTeam,
  updateTeamName,
} from "../../utils/api";
import InputSection from "../InputSection.vue";
import SaveCancelButtons from "../TeamListing/SaveCancelButtons.vue";

export default {
  components: {
    InputSection,
    SaveCancelButtons,
  },
  data() {
    return {
      title: "Team Details",
      name: "",
      teamId: null,
      team: {},
      teamMembers: [],
      allMembers: [],
      selectedTeamMembers: [],
      selectedAllMembers: [],
    };
  },
  mounted() {
    this.teamId = parseInt(this.$route.params.teamId) + 1;
    this.fetchData();
  },
  computed: {
    filteredAllMembers() {
      // Filter out team members who are already in the team
      return this.allMembers.filter(
        (member) => !this.teamMembers.find((tm) => tm.id === member.id)
      );
    },
  },
  methods: {
    fetchData() {
      // Get team details, team members, and all members
      Promise.all([
        getTeamById(this.teamId),
        getMembersWithSameTeam(this.teamId),
        getMembers(),
      ])
        .then(([teamResponse, teamMembersResponse, allMembersResponse]) => {
          this.team = teamResponse.data;
          this.teamMembers = teamMembersResponse.data;
          this.allMembers = allMembersResponse.data;

          this.selectedTeamMembers = this.teamMembers.map(
            (member) => member.id
          );
        })
        .catch((error) => {
          console.error(error);
        });
    },

    addMemberFromOtherTeam() {
      // Add a member from other teams to the current team
      const memberId = this.selectedAllMembers;
      if (!memberId) return;
      const existingTeam = this.teamMembers.find(
        (member) => member.id === memberId
      );
      if (existingTeam) {
        console.error("Member is already in a team.");
        return;
      }

      updateMemberTeam(memberId, this.teamId)
        .then(() => {
          // Update the team members list after adding a member
          getMembersWithSameTeam(this.teamId)
            .then((response) => {
              this.teamMembers = response.data;
              window.alert("Member was transfered successfully");
            })
            .catch((error) => {
              console.error(error);
            });
        })
        .catch((error) => {
          console.error(`Error updating member ${memberId} team:`, error);
        });
    },

    submitForm() {
      // Update the team name
      this.team.name = this.name;
      updateTeamName(this.team.team_name, this.name)
        .then(() => {
          window.alert("Team name was changed successfully");
          this.$router.push("/");
        })
        .catch((error) => {
          console.error(`Error updating team name:`, error);
        });
    },
    removeMember(memberId) {
      // Remove a member from the team
      deleteMember(memberId)
        .then(() => {
          const index = this.teamMembers.findIndex(
            (teamMember) => teamMember.id === memberId
          );
          if (index !== -1) {
            window.alert("Member was deleted successfully");
            this.teamMembers.splice(index, 1);
          }
        })
        .catch((error) => {
          console.error(`Error removing member ${memberId}:`, error);
        });
    },
  },
};
</script>

<style scoped>
.edit-team {
  margin: 50px auto;
  padding: 25px;
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
.add-btn:hover {
  background-color: rgb(55, 145, 55);
}
.add-btn {
  margin-left: 30px;
}
.remove-btn {
  max-width: 50px;
  margin-left: auto;
  margin-bottom: 10px;
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
  color: white;
}
</style>
