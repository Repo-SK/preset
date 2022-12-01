<script setup lang="ts">
import InputText from "@/views/components/input-text.vue";
import axios from "axios";

const $props = defineProps<{
  twofa_enabled: boolean;
  twofa_confirmed: boolean;
}>();

const qrCode = ref<string | undefined>();
const recoveryCodes = ref<string[] | undefined>();

const loadQrCode = () => {
  axios.get(route("two-factor.qr-code")).then((res) => {
    qrCode.value = res.data?.svg || "";
  });

  axios.get(route("two-factor.recovery-codes")).then((res) => {
    recoveryCodes.value = res.data;
  });
};

onMounted(() => {
  if ($props.twofa_enabled) {
    loadQrCode();
  }
});

watch(
  () => $props.twofa_enabled,
  () => {
    if ($props.twofa_enabled) {
      loadQrCode();
    }
  }
);

const enable = useForm({
  method: "POST",
  url: route("two-factor.enable"),
  fields: {},
});

const disable = useForm({
  method: "DELETE",
  url: route("two-factor.disable"),
  fields: {},
});

const confirm = useForm({
  method: "POST",
  url: route("two-factor.confirm"),
  fields: {
    code: "",
  },
});
</script>

<template>
  <div class="shadow sm:overflow-hidden sm:rounded-md">
    <div class="bg-theme-card py-6 px-4 sm:p-6">
      <div>
        <h2 class="text-lg font-medium leading-6">Two Factor Authentication</h2>
        <span
          v-if="
            useProperty('status').value === 'two-factor-authentication-enabled'
          "
          class="text-sm font-medium text-theme-success"
          >Please finish configuring two factor authentication below.</span
        >

        <span
          v-if="
            useProperty('status').value ===
            'two-factor-authentication-confirmed'
          "
          class="text-sm font-medium text-theme-success"
          >Two factor authentication confirmed and enabled successfully.</span
        >
      </div>

      <div v-if="twofa_enabled" class="space-y-5 pt-7">
        <div v-html="qrCode"></div>

        <!-- recovery codes -->
        <div v-if="twofa_confirmed" class="w-full sm:max-w-2xl">
          <p class="mb-2 text-sm text-theme-muted">
            Store these recovery codes in a secure password manager. They can be
            used to recover access to your account if your two factor
            authentication device is lost
          </p>
          <div
            class="flex flex-col space-y-2 rounded-md bg-theme-card-feature p-4"
          >
            <code
              v-for="code in recoveryCodes"
              :key="code"
              v-text="code"
            ></code>
          </div>
        </div>

        <!-- 2fa confirm -->
        <div v-else class="w-full space-y-2 sm:max-w-2xl">
          <InputText
            v-model="confirm.fields.code"
            :errors="confirm.errors.code"
            id="2fa-confirm"
            label="Confirm 2FA"
            placeholder="Enter the code shown in your authenticator app"
          />
          <button
            @click="confirm.submit"
            class="button"
            :class="{ loading: confirm.processing }"
            :disabled="confirm.processing"
          >
            Confirm
          </button>
        </div>
      </div>

      <div v-else="twofa_enabled" class="max-w-2xl space-y-5 pt-2">
        <p class="text-sm font-medium text-theme-muted">
          When two factor authentication is enabled, you will be prompted for a
          secure, random token during authentication. You may retrieve this
          token from your phone's Google Authenticator application
        </p>
      </div>
    </div>

    <div
      class="flex justify-end bg-gray-50 px-4 py-3 text-right dark:bg-neutral-900 sm:px-6"
    >
      <button
        v-if="twofa_enabled"
        @click="disable.submit"
        class="button"
        :class="{ loading: disable.processing }"
        :disabled="disable.processing"
      >
        Disable 2FA
      </button>

      <button
        v-else
        @click="enable.submit"
        class="button"
        :class="{ loading: enable.processing }"
        :disabled="enable.processing"
      >
        Enable 2FA
      </button>
    </div>
  </div>
</template>
