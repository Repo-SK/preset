<script setup lang="ts">
const user = useProperty("security.user");
</script>

<template layout>
    <div
        class="m-20 rounded-lg border border-theme-base bg-theme-card p-7 shadow-sm"
    >
        <h1>Welcome {{ user?.name }}</h1>
    </div>
</template>
