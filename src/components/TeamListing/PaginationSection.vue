<template>
  <nav>
    <ul class="pagination justify-content-center">
      <li class="page-item" :class="{ disabled: currentPage === 1 }">
        <button class="page-link" @click="previousPage">&laquo;</button>
      </li>
      <li
        class="page-item"
        v-for="page in totalPage"
        :key="page"
        :class="{ active: currentPage === page }"
      >
        <button class="page-link" @click="goToPage(page)">{{ page }}</button>
      </li>
      <li class="page-item" :class="{ disabled: currentPage === totalPage }">
        <button class="page-link" @click="nextPage">&raquo;</button>
      </li>
    </ul>
  </nav>
</template>
<script>
export default {
  props: {
    currentPage: {
      type: Number,
      required: true,
    },
    totalPage: {
      type: Number,
      required: true,
    },
  },
  methods: {
    previousPage() {
      if (this.currentPage > 1) {
        this.$emit("pageChange", this.currentPage - 1);
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPage) {
        this.$emit("pageChange", this.currentPage + 1);
      }
    },
    goToPage(page) {
      if (page >= 1 && page <= this.totalPage) {
        this.$emit("pageChange", page);
      }
    },
  },
};
</script>
<style lang=""></style>
