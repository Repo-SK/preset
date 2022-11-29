<script setup lang="ts">
import InputText from "@/views/components/input-text.vue";

const user = useProperty("security.user");

const form = useForm({
    method: "PUT",
    url: route("user-profile-information.update"),
    fields: {
        name: user.value?.name,
        email: user.value?.email,
    },
    errorBag: "updateProfileInformation",
});
</script>

<template>
    <form
        @submit.prevent="form.submit"
        class="shadow sm:overflow-hidden sm:rounded-md"
    >
        <div class="bg-theme-card py-6 px-4 sm:p-6">
            <div>
                <h2
                    id="payment-details-heading"
                    class="text-lg font-medium leading-6"
                >
                    Change Profile Details
                </h2>
            </div>

            <div class="space-y-5 pt-7">
                <!-- Name -->
                <InputText
                    v-model="form.fields.name"
                    :errors="form.errors.name"
                    id="name"
                    label="Name"
                />

                <!-- Email -->
                <InputText
                    v-model="form.fields.email"
                    :errors="form.errors.email"
                    id="email"
                    label="Email"
                />
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
                Update Profile
            </button>
        </div>
    </form>
</template>
