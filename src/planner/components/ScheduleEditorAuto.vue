<script setup>
// Fills the regular schedule automatically, so every flat gets its fair turn.
// The planner asks the same questions as before its first suggestion (SuggestForm).
import { computed } from 'vue'
import BaseModal from './BaseModal.vue'
import SuggestForm from './SuggestForm.vue'
import { draft } from '../draft'
import { suggestPlan } from '../lib/suggest'

const props = defineProps({
  slots: { type: Array, required: true },
  parties: { type: Array, required: true },
  from: { type: String, required: true },
})
const emit = defineEmits(['apply', 'close'])

// Inactive flats (admin area) do not get new turns.
const activeIds = computed(() => props.parties.filter((p) => p.active !== false).map((p) => p.id))
const result = computed(() => suggestPlan(props.slots, activeIds.value, { ...draft.suggest, from: props.from }))
</script>

<template>
  <BaseModal :title="$t('plan.auto.title')" @close="emit('close')">
    <div class="stack">
      <p class="muted">{{ $t('plan.auto.intro') }}</p>
      <SuggestForm v-model="draft.suggest" :slots="slots" :party-ids="activeIds" :from="from" :result="result" />
      <p class="muted small">{{ $t('plan.auto.replaces') }}</p>
    </div>
    <template #footer>
      <button type="button" class="btn ghost" @click="emit('close')">{{ $t('common.cancel') }}</button>
      <button type="button" class="btn" :disabled="!result" @click="emit('apply', result.entries)">
        {{ $t('plan.auto.apply') }}
      </button>
    </template>
  </BaseModal>
</template>
