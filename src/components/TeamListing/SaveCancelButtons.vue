<template>
  <div class="buttons d-flex justify-content-around">
    <button type="submit" class="btn btn-outline-success">Save</button>
    <RouterLink class="btn btn-outline-danger" :to="{ path: '/' }"
      >Cancel</RouterLink
    >
  </div>
</template>

<script>
import { RouterLink } from "vue-router";

export default {
  components: {
    RouterLink,
  },
};
</script>

<style scoped></style>
