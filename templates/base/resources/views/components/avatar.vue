<script setup lang="ts">
defineProps<{
    user: App.Data.UserData;
}>();
</script>

<template>
    <span
        class="h-[30px] w-[30px] rounded-full bg-[#EBF4FF] text-[#7F9CF4] ring-2 ring-theme-bg-card flex-center dark:bg-[#7F9CF4] dark:text-[#EBF4FF]"
    >
        {{ user.name[0] }}
    </span>
</template>
