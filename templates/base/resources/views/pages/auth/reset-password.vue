<script setup lang="ts">
import unquote from "@/utilities/unquote";

const props = defineProps<{
  token?: string;
  email?: string;
}>();

const form = useForm({
  method: "POST",
  url: route("password.update"),
  fields: {
    email: props.email,
    password: "",
    password_confirmation: "",
    token: props.token,
  },
});

onMounted(() => {
  if (!props.token) {
    router.get(route("login"));
  }
});
</script>

<template layout="auth">
  <form @submit.prevent="form.submit" class="space-y-5">
    <!-- Email -->
    <InputText
      v-model="form.fields.email"
      :errors="form.errors.email"
      id="email"
      label="Email"
      type="email"
      :required="true"
    />

    <!-- Password -->
    <InputText
      v-model="form.fields.password"
      :errors="form.errors.password"
      id="password"
      label="Password"
      type="password"
      :required="true"
    />

    <!-- Confirm Password -->
    <InputText
      v-model="form.fields.password_confirmation"
      :errors="form.errors.password_confirmation"
      id="password_confirmation"
      label="Confirm password"
      type="password"
      :required="true"
    />

    <!-- fortify returns status in quotes (e.g. "message sent") -->
    <span class="text-sm font-medium text-theme-success">{{
      unquote(useProperty("status").value || "")
    }}</span>

    <button
      type="submit"
      class="button w-full"
      :class="{ 'loading-absolute': form.processing }"
      :disabled="form.processing"
    >
      Reset Password
    </button>
  </form>
</template>
