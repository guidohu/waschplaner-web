<script setup>
import { computed, ref } from 'vue'
import BaseCallout from '../../components/BaseCallout.vue'
import BaseHelp from '../components/BaseHelp.vue'
import ScheduleEditor from '../components/ScheduleEditor.vue'
import SuggestForm from '../components/SuggestForm.vue'
import { draft, parties, slots, units } from '../draft'
import { suggestPlan } from '../lib/suggest'
import { todayISO } from '../lib/dates'

const today = todayISO()
const suggested = ref(false)

// First ask how the plan should look, then start with a fair suggestion instead of an empty grid.
const result = computed(() => suggestPlan(slots.value, parties.value.map((p) => p.id), { ...draft.suggest, from: today }))

function create() {
  draft.entries = result.value.entries
  draft.planPending = false
  suggested.value = !!result.value.entries.length
}
function manual() {
  draft.entries = []
  draft.planPending = false
}
</script>

<template>
  <section class="setup-step" :class="{ wide: !draft.planPending }">
    <header class="step-head">
      <h1 tabindex="-1">{{ $t('setup.plan.title') }}</h1>
      <p class="lead">{{ draft.planPending ? $t('planner.suggest.lead') : $t('setup.plan.lead') }}</p>
    </header>

    <template v-if="draft.planPending">
      <div class="card">
        <SuggestForm v-model="draft.suggest" :slots="slots" :party-ids="parties.map((p) => p.id)" :from="today" :result="result" />
      </div>
      <div class="suggest-actions">
        <button type="button" class="btn" :disabled="!result" @click="create">{{ $t('planner.suggest.create') }}</button>
        <button type="button" class="link-btn" @click="manual">{{ $t('planner.suggest.manual') }}</button>
      </div>
    </template>

    <template v-else>
      <BaseHelp>
        <p>{{ $t('setup.plan.help1') }}</p>
        <p>{{ $t('setup.plan.help2') }}</p>
        <p>{{ $t('setup.plan.help3') }}</p>
      </BaseHelp>
      <BaseCallout v-if="suggested" tone="ok" icon="wand">{{ $t('setup.plan.suggested') }}</BaseCallout>
      <div class="card">
        <ScheduleEditor v-model="draft.entries" :resources="units" :slots="slots" :parties="parties" :from="today" />
      </div>
    </template>
  </section>
</template>

<style scoped>
.suggest-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 0.75rem 1.25rem; }
</style>
