<template>
  <div class="add-team">
    <h1 class="d-flex align-items-start">{{ title }}</h1>
    <form class="team-form" @submit.prevent="submitForm">
      <div class="form-group py-3">
        <!-- Input field to add a new team name -->
        <InputSection
          v-model="name"
          :label="'Add a new Team: '"
          @input="name = $event.target.value"
        />
      </div>
      <!-- Save and cancel buttons -->
      <SaveCancelButtons />
    </form>
  </div>
</template>

<script>
import InputSection from "../InputSection.vue";
import { addTeam } from "../../utils/api";
import SaveCancelButtons from "../TeamListing/SaveCancelButtons.vue";

export default {
  components: {
    InputSection,
    SaveCancelButtons,
  },
  data() {
    return {
      title: "Add a new Team",
      name: "",
    };
  },
  methods: {
    submitForm() {
      // Create team data object with the provided name
      const createTeamData = {
        name: this.name,
      };

      // Add the team
      addTeam(createTeamData)
        .then((response) => {
          console.log(response.data);
          this.name = "";
          this.teamId = null;
          window.alert("Team was added successfully");
          this.$router.push("/");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.add-team {
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
