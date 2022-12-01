<script setup lang="ts">
import UpdatePassword from "@/views/pages/account/security/update-password.vue";
import Manage2FA from "@/views/pages/account/security/manage-2fa.vue";

const $props = defineProps<{
  twofa_enabled: boolean;
  twofa_confirmed: boolean;
}>();
</script>

<template layout="account">
  <UpdatePassword />
  <Manage2FA
    :twofa_enabled="twofa_enabled"
    :twofa_confirmed="twofa_confirmed"
  />
</template>
