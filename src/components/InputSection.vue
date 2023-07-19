<template>
  <div class="form-component d-flex flex-column align-items-start">
    <label :for="name">{{ label }}</label>
    <input
      class="w-100"
      :type="type"
      :id="name"
      :name="name"
      v-model="inputValue"
      @input="handleInput"
      required
    />
    <div class="error-message" v-if="errorMessage">{{ errorMessage }}</div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "text",
    },
  },
  data() {
    return {
      inputValue: "",
    };
  },
  methods: {
    handleInput() {
      // Remove periods and commas from the input value
      this.inputValue = this.inputValue.replace(/[.,]/g, "");
      this.inputValue = this.sanitizeInput(this.inputValue);
    },
    sanitizeInput(value) {
      // Perform input sanitization logic to mitigate malicious injection
      // Remove or escape characters with special meaning in HTML
      const sanitizedValue = value
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/&/g, "&amp;")
        .replace(/'/g, "&#39;")
        .replace(/"/g, "&quot;");

      // Remove or neutralize additional characters that can be used for injection
      const neutralizedValue = sanitizedValue
        .replace(/\(/g, "&#40;")
        .replace(/\)/g, "&#41;")
        .replace(/\{/g, "&#123;")
        .replace(/\}/g, "&#125;")
        .replace(/\[/g, "&#91;")
        .replace(/\]/g, "&#93;")
        .replace(/`/g, "&#96;");

      return neutralizedValue;
    },
  },
};
</script>

<style scoped>
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
