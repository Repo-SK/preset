<script setup lang="ts">
defineProps<{
    id?: string;
    label?: string;
    name?: string;
    placeholder?: string;
    type?: string;
    required?: boolean;
    modelValue?: string;
    errors?: string;
}>();
</script>

<template>
    <div>
        <label :for="id" class="text-sm text-theme-muted">{{ label }}</label>
        <input
            v-on:input="
                $emit(
                    'update:modelValue',
                    ($event?.target as HTMLTextAreaElement)?.value
                )
            "
            :name="name"
            :id="id"
            class="input"
            :type="type || 'text'"
            :required="required ?? undefined"
            :value="modelValue"
        />
        <span v-if="errors" v-text="errors" class="text-sm text-theme-danger" />
    </div>
</template>
