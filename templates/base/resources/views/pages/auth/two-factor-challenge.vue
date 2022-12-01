<script setup lang="ts">
import InputText from "@/views/components/input-text.vue";

const form = useForm({
  method: "POST",
  url: route("two-factor.login"),
  fields: {
    code: "",
  },
});
</script>

<template layout="auth">
  <form @submit.prevent="form.submit" class="space-y-5">
    <!-- Code -->
    <InputText
      v-model="form.fields.code"
      :errors="form.errors.code"
      id="code"
      label="Authentication token or recovery code"
      type="text"
      :required="true"
    />

    <button
      type="submit"
      class="button w-full"
      :class="{ 'loading-absolute': form.processing }"
      :disabled="form.processing"
    >
      Login
    </button>
  </form>
</template>
