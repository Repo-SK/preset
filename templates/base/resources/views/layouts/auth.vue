<script setup lang="ts">
import { useDark, useToggle } from "@vueuse/core";
import Logo from "@/views/components/icons/logo.vue";

const isDark = useDark();
const toggleDark = useToggle(isDark);
</script>

<template>
  <div
    class="flex min-h-screen flex-col items-center bg-theme-card pt-40 sm:justify-center md:bg-theme-page md:pt-6"
  >
    <Logo class="h-20 w-20" />
    <button @click="toggleDark()" class="button-link">
      {{ isDark ? "dark" : "light" }}
    </button>
    <main
      class="w-full overflow-hidden bg-theme-card px-6 py-4 shadow-none sm:max-w-md sm:rounded-lg md:mt-6 md:shadow-md"
    >
      <slot />
    </main>
  </div>
</template>
