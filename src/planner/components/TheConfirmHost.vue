<script setup>
// The app's confirmation dialog (see useConfirm). It replaces the browser's
// confirm() so that every question looks the same and names its consequence.
import BaseCallout from '../../components/BaseCallout.vue'
import BaseModal from './BaseModal.vue'
import { pendingConfirm } from '../composables/useConfirm'
</script>

<template>
  <BaseModal v-if="pendingConfirm" :title="pendingConfirm.title" role="alertdialog" @close="pendingConfirm.resolve(false)">
    <div class="stack">
      <p>{{ pendingConfirm.text }}</p>
      <BaseCallout v-if="pendingConfirm.details?.length" :tone="pendingConfirm.danger ? 'warn' : 'info'">
        <ul class="confirm-details">
          <li v-for="d in pendingConfirm.details" :key="d">{{ d }}</li>
        </ul>
      </BaseCallout>
    </div>
    <template #footer>
      <button type="button" class="btn ghost" @click="pendingConfirm.resolve(false)">
        {{ pendingConfirm.cancelLabel || $t('common.cancel') }}
      </button>
      <button type="button" class="btn" :class="{ danger: pendingConfirm.danger }" @click="pendingConfirm.resolve(true)">
        {{ pendingConfirm.confirmLabel }}
      </button>
    </template>
  </BaseModal>
</template>

<style scoped>
.confirm-details { margin: 0; padding-left: 1.1rem; }
</style>
