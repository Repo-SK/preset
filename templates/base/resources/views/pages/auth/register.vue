<script setup lang="ts">
import InputText from "@/views/components/input-text.vue";
import { RouterLink } from "@hybridly/vue";

const form = useForm({
    method: "POST",
    url: route("register"),
    fields: {
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    },
});
</script>

<template layout="auth">
    <form @submit.prevent="form.submit" class="space-y-5">
        <!-- Name -->
        <InputText
            v-model="form.fields.name"
            :errors="form.errors.name"
            id="name"
            label="Name"
            :required="true"
        />

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

        <div
            class="flex flex-col items-start justify-between space-x-0 space-y-2 md:flex-row md:items-center md:space-x-4 md:space-y-0"
        >
            <RouterLink :href="route('login')" class="button-link">
                Already have an account?
            </RouterLink>

            <button
                type="submit"
                class="button w-full py-2 md:w-max"
                :class="{ loading: form.processing }"
                :disabled="form.processing"
            >
                Sign up
            </button>
        </div>
    </form>
</template>
