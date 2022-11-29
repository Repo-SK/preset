<script setup lang="ts">
import InputText from "@/views/components/input-text.vue";
import { RouterLink } from "@hybridly/vue";

const form = useForm({
    method: "POST",
    url: route("login"),
    fields: {
        email: "",
        password: "",
        remember: true,
    },
});
</script>

<template layout="auth">
    <span>{{ useProperty("status") }}</span>
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

        <!-- Remember me -->
        <div class="flex items-center space-x-2">
            <input
                v-model="form.fields.remember"
                class="checkbox"
                type="checkbox"
                name="remember"
                id="remember"
            />
            <label class="text-sm text-theme-muted" for="remember"
                >Remember me</label
            >
        </div>

        <div
            class="flex flex-col items-start justify-between space-x-0 space-y-2 md:flex-row md:items-center md:space-x-4 md:space-y-0"
        >
            <RouterLink :href="route('register')" class="button-link">
                Register account
            </RouterLink>

            <RouterLink :href="route('password.request')" class="button-link">
                Forgot your password?
            </RouterLink>

            <button
                type="submit"
                class="button w-full py-2 md:w-max"
                :class="{ loading: form.processing }"
                :disabled="form.processing"
            >
                Sign in
            </button>
        </div>
    </form>
</template>
