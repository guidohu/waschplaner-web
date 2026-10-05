<script setup>
// The questions behind the plan suggestion: whole days or time windows, after
// how many weeks the plan repeats, how much time stays free for spontaneous
// washing and whether a flat's turns are back to back. `result` is suggestPlan() for the current answers.
import { computed } from 'vue'
import BaseChoice from './BaseChoice.vue'
import BaseCallout from '../../components/BaseCallout.vue'
import { MAX_CYCLE_WEEKS } from '../lib/recurrence'
import { minCycle, suggestPlan } from '../lib/suggest'
import { fmtNumber } from '../lib/format'
import { intlLocale, t } from '../../i18n'

const answers = defineModel({ type: Object, required: true })
const props = defineProps({
  slots: { type: Array, required: true },
  partyIds: { type: Array, required: true },
  from: { type: String, required: true },
  result: { type: Object, default: null },
})

const windowsPerDay = computed(() => {
  const days = new Set(props.slots.map((s) => s.weekday)).size
  const windows = new Set(props.slots.map((s) => `${s.weekday}-${s.start_min}`)).size
  return days ? windows / days : 0
})
const modeOptions = computed(() => [
  { value: 'days', icon: 'calendar', title: t('plan.auto.days'), text: t('plan.auto.daysHint') },
  { value: 'slots', icon: 'clock', title: t('plan.auto.slots'), text: t('plan.auto.slotsHint') },
])

const togetherOptions = computed(() => [
  { value: true, title: t('planner.suggest.together'), text: t(`planner.suggest.togetherHint.${answers.value.mode}`) },
  { value: false, title: t('planner.suggest.spread'), text: t('planner.suggest.spreadHint') },
])
const together = computed({
  get: () => answers.value.together !== false,
  set: (v) => (answers.value = { ...answers.value, together: v }),
})

const shortest = computed(() => (props.result ? minCycle(props.result.perWeek, props.partyIds.length) : 1))
const cycles = computed(() => Array.from({ length: MAX_CYCLE_WEEKS - shortest.value + 1 }, (_, i) => shortest.value + i))

// Changing the rotation or what a turn is keeps about the same share of free time.
function turnsFor(mode, cycle) {
  const r = props.result
  const next = suggestPlan(props.slots, props.partyIds, { mode, cycle, turns: 1, from: props.from })
  if (!r || !next || !r.perWeek) return 1
  const share = (r.turns * props.partyIds.length) / (r.perWeek * r.cycle)
  return Math.max(1, Math.round((share * next.perWeek * next.cycle) / props.partyIds.length))
}
const mode = computed({
  get: () => answers.value.mode,
  set: (mode) => (answers.value = { ...answers.value, mode, turns: turnsFor(mode, answers.value.cycle) }),
})
const setCycle = (cycle) => (answers.value = { ...answers.value, cycle, turns: turnsFor(answers.value.mode, cycle) })

// The slider goes from little to much free time, i.e. from many turns per flat to one.
const freeLevel = computed({
  get: () => (props.result ? props.result.maxTurns + 1 - props.result.turns : 1),
  set: (v) => (answers.value = { ...answers.value, turns: props.result.maxTurns + 1 - Number(v) }),
})

const freeText = computed(() => {
  const r = props.result
  if (!r?.freeMinutes) return t('plan.auto.noneFree')
  const pct = new Intl.NumberFormat(intlLocale(), { style: 'percent' }).format(r.freeMinutes / r.totalMinutes)
  return t('planner.suggest.freeValue', { hours: fmtNumber(r.freeMinutes / r.cycle / 60), pct })
})

const sentence = computed(() => {
  const r = props.result
  if (!r) return ''
  const unit = t(`plan.auto.unit.${r.mode}`, { n: r.turns })
  const each = r.cycle === 1
    ? t('plan.auto.eachWeekly', { n: r.turns, unit })
    : t('plan.auto.eachEveryN', { n: r.turns, unit, weeks: r.cycle })
  const freeUnit = t(`plan.auto.unit.${r.mode}`, { n: r.freeTurns })
  const free = !r.freeTurns
    ? t('plan.auto.noneFree')
    : r.cycle === 1
      ? t('plan.auto.freeWeekly', { n: r.freeTurns, unit: freeUnit })
      : t('plan.auto.freeCycle', { n: r.freeTurns, unit: freeUnit, weeks: r.cycle })
  return `${each} ${free}`
})
</script>

<template>
  <div class="suggest">
    <BaseCallout v-if="!result" tone="warn">{{ $t('plan.auto.tooMany') }}</BaseCallout>
    <template v-else>
      <fieldset v-if="windowsPerDay > 1">
        <legend>{{ $t('planner.suggest.modeLabel') }}</legend>
        <BaseChoice v-model="mode" name="suggest-mode" :options="modeOptions" :columns="2" />
      </fieldset>

      <fieldset>
        <legend>{{ $t('planner.suggest.repeatLabel') }}</legend>
        <div class="chips" role="radiogroup" :aria-label="$t('planner.suggest.repeatLabel')">
          <button
            v-for="c in cycles"
            :key="c"
            type="button"
            role="radio"
            class="chip"
            :class="{ active: result.cycle === c }"
            :aria-checked="result.cycle === c"
            @click="setCycle(c)"
          >
            {{ c === 1 ? $t('planner.suggest.weekly') : $t('planner.suggest.weeks', { n: c }) }}
          </button>
        </div>
        <p class="muted small">
          {{ shortest > 1 ? $t('planner.suggest.repeatMin', { n: partyIds.length, weeks: shortest }) : $t('planner.suggest.repeatHint') }}
        </p>
      </fieldset>

      <fieldset>
        <legend>{{ $t('planner.suggest.freeLabel') }}</legend>
        <p class="muted small">{{ $t('planner.suggest.freeHint') }}</p>
        <p class="free-value">{{ freeText }}</p>
        <div v-if="result.maxTurns > 1" class="free-range">
          <span class="muted small">{{ $t('planner.suggest.less') }}</span>
          <input
            v-model="freeLevel"
            type="range"
            min="1"
            :max="result.maxTurns"
            step="1"
            :aria-label="$t('planner.suggest.freeLabel')"
            :aria-valuetext="freeText"
          >
          <span class="muted small">{{ $t('planner.suggest.more') }}</span>
        </div>
        <p v-else-if="result.cycle < MAX_CYCLE_WEEKS && result.freeTurns" class="muted small">{{ $t('planner.suggest.onlyOne') }}</p>
      </fieldset>

      <fieldset v-if="result.turns > 1">
        <legend>{{ $t('planner.suggest.togetherLabel') }}</legend>
        <BaseChoice v-model="together" name="suggest-together" :options="togetherOptions" :columns="2" />
      </fieldset>

      <BaseCallout tone="ok" icon="wand">{{ sentence }}</BaseCallout>
    </template>
  </div>
</template>

<style scoped>
.suggest { display: flex; flex-direction: column; gap: 1.25rem; }
fieldset { border: 0; margin: 0; padding: 0; min-width: 0; display: flex; flex-direction: column; gap: 0.5rem; }
legend { font-weight: 700; padding: 0; margin-bottom: 0.5rem; }
fieldset p { margin: 0; }
.free-value { font-size: 1.15rem; font-weight: 700; color: var(--primary); }
.free-range { display: flex; align-items: center; gap: 0.75rem; }
.free-range input { flex: 1; width: auto; min-height: 44px; padding: 0; border: 0; background: none; accent-color: var(--primary); }
@media (max-width: 520px) {
  .free-range { flex-wrap: wrap; justify-content: space-between; }
  .free-range input { order: -1; flex-basis: 100%; }
}
</style>
