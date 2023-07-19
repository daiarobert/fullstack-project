<template>
  <div class="edit-member">
    <h1 class="d-flex">{{ title }}</h1>
    <form class="team-form" @submit.prevent="submitForm">
      <label class="d-flex member-name">{{ member.name }}</label>
      <!-- Input field to change member name -->
      <InputSection
        v-model="name"
        :label="`Change Member Name: `"
        @input="name = $event.target.value"
      />
      <!-- Save and cancel buttons -->
      <div class="buttons d-flex py-5">
        <SaveCancelButtons />
      </div>
    </form>
  </div>
</template>

<script>
import { getMemberById, updateMemberName } from "../../utils/api";
import InputSection from "../InputSection.vue";
import SaveCancelButtons from "../TeamListing/SaveCancelButtons.vue";

export default {
  components: {
    InputSection,
    SaveCancelButtons,
  },
  data() {
    return {
      title: "Edit Member Details",
      memberId: null,
      member: {},
      name: "",
    };
  },
  mounted() {
    // Get the Member Id from the route params
    this.memberId = parseInt(this.$route.params.memberId);
    this.fetchData();
  },
  methods: {
    fetchData() {
      //Get Member Data by Id
      Promise.all([getMemberById(this.memberId)])
        .then(([memberResponse]) => {
          console.log(this.memberId);
          this.member = memberResponse.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },

    submitForm() {
      // Update the member name
      this.member.name = this.name;
      updateMemberName(this.member.id, this.name)
        .then(() => {
          window.alert("Member name was changed successfully");
          this.$router.push("/");
        })
        .catch((error) => {
          console.error(`Error updating team name:`, error);
        });
    },
  },
};
</script>

<style scoped>
.edit-member {
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
.member-name {
  font-size: 25px;
  margin-bottom: 20px;
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
</style>
