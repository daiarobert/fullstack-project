<template>
  <div class="add-member">
    <h1 class="d-flex">{{ title }}</h1>
    <form class="member-form" @submit.prevent="submitForm">
      <!-- Name input section -->
      <div class="form-group">
        <InputSection
          v-model="name"
          :label="'Name: '"
          @input="name = $event.target.value"
        />
      </div>
      <!-- Team selection dropdown -->
      <div class="form-group d-flex flex-column align-items-start">
        <label for="team">Select Team: </label>
        <select id="role" v-model="teamId" required>
          <option v-for="team in teams" :key="team.id" :value="team.id">
            {{ team.name }}
          </option>
        </select>
      </div>
      <!-- Form submission and cancel buttons -->
      <SaveCancelButtons />
    </form>
  </div>
</template>

<script>
import InputSection from "../InputSection.vue";
import { getTeams, addMember } from "../../utils/api";
import SaveCancelButtons from "../TeamListing/SaveCancelButtons.vue";

export default {
  components: {
    InputSection,
    SaveCancelButtons,
  },
  data() {
    return {
      title: "Add Member",
      name: "",
      teamId: null,
      teams: [],
    };
  },
  mounted() {
    this.fetchTeams();
  },
  methods: {
    fetchTeams() {
      // Retrieve teams data
      getTeams()
        .then((response) => {
          this.teams = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    submitForm() {
      // Prepare member data to be created
      const createMemberData = {
        name: this.name,
        team_id: this.teamId,
      };
      // Add member
      addMember(createMemberData)
        .then((response) => {
          console.log(response.data);
          this.name = "";
          this.teamId = null;
          window.alert("Member was added successfully");
          this.$router.push("/");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
.add-member {
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
.btn-outline-success {
  margin-right: 10px;
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
  height: 41px;
}

button:hover {
  background-color: #0056b3;
}
</style>
