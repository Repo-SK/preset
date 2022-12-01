<script setup lang="ts">
import InputText from "@/views/components/input-text.vue";

const form = useForm({
  method: "PUT",
  url: route("user-password.update"),
  fields: {
    current_password: "",
    password: "",
    password_confirmation: "",
  },
  errorBag: "updatePassword",
});
</script>

<template>
  <form
    @submit.prevent="form.submit"
    class="shadow sm:overflow-hidden sm:rounded-md"
  >
    <div class="bg-theme-card py-6 px-4 sm:p-6">
      <div>
        <h2 class="text-lg font-medium leading-6">Change Password</h2>
      </div>

      <div class="space-y-5 pt-7">
        <InputText
          v-model="form.fields.current_password"
          :errors="form.errors.current_password"
          id="password"
          label="Current Password"
          type="password"
          required
        />

        <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
          <InputText
            v-model="form.fields.password"
            :errors="form.errors.password"
            id="new-password"
            label="New Password"
            type="password"
            required
          />
          <InputText
            v-model="form.fields.password_confirmation"
            :errors="form.errors.password_confirmation"
            id="confirm-password"
            label="Confirm New Password"
            type="password"
            required
          />
        </div>
      </div>
    </div>

    <div
      class="flex justify-end bg-gray-50 px-4 py-3 text-right dark:bg-neutral-900 sm:px-6"
    >
      <button
        type="submit"
        class="button"
        :class="{ loading: form.processing }"
        :disabled="form.processing"
      >
        Update Password
      </button>
    </div>
  </form>
</template>
