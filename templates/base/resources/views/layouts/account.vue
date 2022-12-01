<script setup lang="ts">
import Navbar from "@/views/components/navbar.vue";
import { computed } from "vue";
import { UserCircleIcon } from "@heroicons/vue/24/outline";

const nav = computed(() => {
  return [
    {
      name: "Profile",
      href: route("account.profile"),
      icon: UserCircleIcon,
      current: true,
    },
  ];
});
</script>

<template>
  <Navbar />
  <div
    class="relative mx-auto w-full max-w-6xl py-5 px-5 sm:px-8 md:px-12 lg:px-0"
  >
    <h1 class="pt-5 text-2xl font-medium 2xl:pt-5">Account Settings</h1>

    <main class="mx-auto pb-10 lg:py-12">
      <div class="lg:grid lg:grid-cols-12 lg:gap-x-5">
        <aside class="py-6 lg:col-span-3 lg:py-0">
          <nav class="space-y-1">
            <RouterLink
              v-for="item in nav"
              :key="item.name"
              :href="item.href"
              class="group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-theme-card"
              :class="{
                'bg-theme-card text-theme-accent': item.current,
              }"
              :aria-current="item.current ? 'page' : undefined"
            >
              <component
                :is="item.icon"
                :class="[
                  item.current
                    ? 'text-theme-accent'
                    : 'text-theme-muted group-hover:text-theme-muted',
                  '-ml-1 mr-3 h-6 w-6 flex-shrink-0',
                ]"
                aria-hidden="true"
              />
              <span class="truncate">{{ item.name }}</span>
            </RouterLink>
          </nav>
        </aside>

        <div class="space-y-6 lg:col-span-9">
          <slot />
        </div>
      </div>
    </main>
  </div>
</template>
