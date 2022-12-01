<script setup lang="ts">
import { useDark, useToggle } from "@vueuse/core";
import Logo from "@/views/components/icons/logo.vue";
import { SunIcon, MoonIcon } from "@heroicons/vue/24/outline";

const isDark = useDark();
const toggleDark = useToggle(isDark);
</script>

<template>
  <div
    class="flex min-h-screen flex-col items-center bg-theme-card pt-40 sm:justify-center md:bg-theme-page md:pt-6"
  >
    <Logo class="h-20 w-20" />
    <main
      class="w-full overflow-hidden bg-theme-card px-6 py-4 shadow-none sm:max-w-md sm:rounded-lg md:mt-6 md:shadow-md"
    >
      <slot />
    </main>
  </div>

  <div class="fixed top-10 right-10">
    <button
      @click="toggleDark()"
      class="button-ghost rounded-full p-2 text-theme-muted"
    >
      <SunIcon v-if="isDark" class="h-6 w-6" />
      <MoonIcon v-else class="h-6 w-6" />
    </button>
  </div>
</template>
