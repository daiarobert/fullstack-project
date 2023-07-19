<template>
  <div class="delete-member">
    <h1 class="d-flex">{{ title }}?</h1>
    <p class="d-flex py-5">
      Are you sure you want to delete member
      <bold>{{ member.name }}</bold
      >?
    </p>
    <!-- Delete and cancel buttons -->
    <div class="buttons d-flex justify-content-start">
      <button
        type="submit"
        class="btn btn-outline-danger"
        @click="deleteMember"
      >
        Delete
      </button>
      <RouterLink class="btn btn-outline-primary" to="/">Cancel</RouterLink>
    </div>
  </div>
</template>

<script>
import { deleteMember, getMemberById } from "../../utils/api";
import { RouterLink } from "vue-router";

export default {
  components: {
    RouterLink,
  },
  data() {
    return {
      title: "Delete Member",
      memberId: null,
      member: [],
    };
  },
  mounted() {
    // Get Member Id
    this.memberId = parseInt(this.$route.params.memberId);

    // Get Member detailsby Id
    getMemberById(this.memberId)
      .then((response) => {
        this.member = response.data;
      })
      .catch((error) => {
        console.error(error);
      });
  },
  methods: {
    deleteMember() {
      // Delete Member
      deleteMember(this.memberId)
        .then((response) => {
          window.alert("Team was deleted successfully");
          console.log(response);
          this.$router.push("/");
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>

<style scoped>
.delete-member {
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
.btn-outline-primary {
  margin-left: 10px;
}
.remove-btn {
  max-width: 50px;
  margin-left: auto;
}
</style>
