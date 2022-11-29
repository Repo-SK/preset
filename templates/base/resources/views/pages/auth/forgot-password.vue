<script setup lang="ts">
import InputText from "@/views/components/input-text.vue";

const form = useForm({
    method: "POST",
    url: route("password.email"),
    fields: {
        email: "",
    },
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

        <span>{{ useProperty("status") }}</span>

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
