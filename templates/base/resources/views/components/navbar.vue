<script setup lang="ts">
import { ChevronDownIcon } from "@heroicons/vue/24/outline";
import { RouterLink } from "@hybridly/vue";
import { useDark, useToggle } from "@vueuse/core";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import Avatar from "@/views/components/avatar.vue";

const isDark = useDark();
const toggleDark = useToggle(isDark);

const user = useProperty("security.user");
</script>

<template>
    <div class="h-16 w-full border-b border-theme-strong bg-theme-card px-5">
        <div
            class="mx-auto flex h-full max-w-screen-2xl items-center justify-between"
        >
            <div class="flex h-full items-center">
                <h1
                    class="text-xl font-medium capitalize tracking-tight text-theme-base"
                >
                    Laravel
                </h1>

                <div class="hidden h-full pl-10 sm:flex">
                    <RouterLink
                        :href="route('dashboard.index')"
                        class="relative flex items-center px-3 text-sm font-semibold hover:text-theme-accent"
                        :class="{
                            'active-nav': true,
                        }"
                    >
                        Dashboard
                    </RouterLink>
                </div>
            </div>

            <div class="flex items-center space-x-5">
                <Menu as="div" class="relative inline-block text-left">
                    <div v-if="user">
                        <MenuButton class="flex items-center space-x-3">
                            <Avatar :user="user" />
                            <div class="flex items-center space-x-2">
                                <span class="text-sm font-medium capitalize">
                                    {{ user?.name }}
                                </span>
                                <ChevronDownIcon
                                    class="h-3 w-3"
                                    aria-hidden="true"
                                />
                            </div>
                        </MenuButton>
                    </div>

                    <transition
                        enter-active-class="transition ease-out duration-100"
                        enter-from-class="transform opacity-0 scale-95"
                        enter-to-class="transform opacity-100 scale-100"
                        leave-active-class="transition ease-in duration-75"
                        leave-from-class="transform opacity-100 scale-100"
                        leave-to-class="transform opacity-0 scale-95"
                    >
                        <MenuItems class="dropdown">
                            <MenuItem v-slot="{ active }">
                                <RouterLink
                                    :href="route('account.profile')"
                                    class="dropdown-item"
                                    :class="{ 'dropdown-item-active': active }"
                                    >Account</RouterLink
                                >
                            </MenuItem>
                            <MenuItem v-slot="{ active }">
                                <button
                                    @click="toggleDark()"
                                    class="dropdown-item"
                                    :class="{ 'dropdown-item-active': active }"
                                >
                                    {{ isDark ? "Light Mode" : "Dark Mode" }}
                                </button>
                            </MenuItem>
                            <MenuItem v-slot="{ active }">
                                <RouterLink
                                    :href="route('logout')"
                                    method="post"
                                    as="button"
                                    type="button"
                                    class="dropdown-item"
                                    :class="{ 'dropdown-item-active': active }"
                                >
                                    Logout
                                </RouterLink>
                            </MenuItem>
                        </MenuItems>
                    </transition>
                </Menu>
            </div>
        </div>
    </div>
</template>

<style scoped>
.dropdown {
    @apply absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-lg bg-theme-card shadow-lg ring-1 ring-neutral-900 ring-opacity-5 focus:outline-none dark:ring-neutral-800;
    padding: 0.5rem 0.25rem 0.375rem;
}
.dropdown-item {
    @apply block flex w-full items-center px-4 py-2 text-left text-sm text-theme-muted;
    padding: 0.25rem 0.75rem;
    border-radius: 0.5rem;
    margin-bottom: 0.125rem;
}
.dropdown-item-active {
    @apply bg-theme-card-feature text-theme-base;
}
.active-nav::after {
    @apply rounded-tl-lg rounded-tr-lg;
    display: block;
    content: "";
    width: 100%;
    height: 3px;
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    background: rgb(var(--accent));
}
</style>
