<script setup>
// Edits a weekly slot layout ([{ weekday, start_min, end_min }]): on which
// days laundry is possible and how each day is split into time slots.
import { computed, reactive, watch } from 'vue'
import BaseChoice from './BaseChoice.vue'
import BaseIcon from '../../components/BaseIcon.vue'
import SlotLayoutEditorList from './SlotLayoutEditorList.vue'
import WeekTemplate from './WeekTemplate.vue'
import { fmtMin, fmtNumber, parseHHMM, weekdayName } from '../lib/format'
import { DAY_MINUTES, isUniform, layoutDays, splitBySize, splitEvenly, windowsError, windowsOn } from '../lib/slotLayout'
import { t } from '../../i18n'

const model = defineModel({ type: Array, required: true })

const DIVISIONS = {
  day: (from, to) => splitEvenly(from, to, 1),
  two: (from, to) => splitEvenly(from, to, 2),
  three: (from, to) => splitEvenly(from, to, 3),
  twoHours: (from, to) => splitBySize(from, to, 120),
}

function detectDivision(windows) {
  if (!windows.length) return 'three'
  const from = windows[0][0]
  const to = windows.at(-1)[1]
  const same = (a) => JSON.stringify(a) === JSON.stringify(windows)
  return Object.keys(DIVISIONS).find((k) => same(DIVISIONS[k](from, to))) || 'custom'
}

// Editing state, taken from the layout once; changes are written back to the model.
const initialDays = layoutDays(model.value)
const initialWindows = initialDays.length ? windowsOn(model.value, initialDays[0]) : splitEvenly(420, 1320, 3)
const state = reactive({
  days: initialDays.length ? initialDays : [1, 2, 3, 4, 5, 6],
  sameEveryDay: !model.value.length || isUniform(model.value),
  common: initialWindows,
  perDay: Object.fromEntries([1, 2, 3, 4, 5, 6, 7].map((d) => [d, windowsOn(model.value, d)])),
  division: detectDivision(initialWindows),
  from: initialWindows[0]?.[0] ?? 420,
  to: initialWindows.at(-1)?.[1] ?? 1320,
  editDay: initialDays[0] || 1,
})

const windowsFor = (d) => (state.sameEveryDay ? state.common : state.perDay[d] || [])

watch(
  state,
  () => {
    const out = []
    for (const weekday of [...state.days].sort((a, b) => a - b)) {
      for (const [start_min, end_min] of windowsFor(weekday)) out.push({ weekday, start_min, end_min })
    }
    model.value = out
  },
  { deep: true },
)

function toggleDay(d) {
  if (state.days.includes(d)) {
    state.days = state.days.filter((x) => x !== d)
  } else {
    if (!state.perDay[d]?.length) state.perDay[d] = state.common.map((w) => [...w])
    state.days = [...state.days, d].sort((a, b) => a - b)
  }
  if (!state.days.includes(state.editDay)) state.editDay = state.days[0]
}

function regenerate() {
  if (state.division !== 'custom' && state.to > state.from) state.common = DIVISIONS[state.division](state.from, state.to)
}
watch(() => [state.division, state.from, state.to], regenerate)

function setRange(which, value) {
  if (!value) return
  let m = parseHHMM(value)
  if (which === 'to' && m === 0) m = DAY_MINUTES
  state[which] = m
}

function setCommon(windows) {
  state.common = windows
  state.division = detectDivision(windows)
}

function setSameEveryDay(on) {
  if (on) {
    state.common = (state.perDay[state.days[0]] || state.common).map((w) => [...w])
    state.division = detectDivision(state.common)
  } else {
    for (const d of [1, 2, 3, 4, 5, 6, 7]) state.perDay[d] = state.common.map((w) => [...w])
    state.editDay = state.days[0]
  }
  state.sameEveryDay = on
}

function copyToAllDays() {
  const src = state.perDay[state.editDay]
  for (const d of state.days) state.perDay[d] = src.map((w) => [...w])
}

const divisionOptions = computed(() => [
  { value: 'day', title: t('slots.division.day'), text: t('slots.divisionHint.day') },
  { value: 'two', title: t('slots.division.two'), text: t('slots.divisionHint.two') },
  { value: 'three', title: t('slots.division.three'), text: t('slots.divisionHint.three') },
  { value: 'twoHours', title: t('slots.division.twoHours'), text: t('slots.divisionHint.twoHours') },
  { value: 'custom', title: t('slots.division.custom'), text: t('slots.divisionHint.custom') },
])

const differs = (d) => !state.sameEveryDay && JSON.stringify(state.perDay[d]) !== JSON.stringify(state.perDay[state.days[0]])
const blocks = computed(() =>
  model.value.map((w) => ({ ...w, key: `${w.weekday}-${w.start_min}` })),
)
const hasError = computed(() => state.days.some((d) => windowsError(windowsFor(d))))
const summary = computed(() => {
  const n = model.value.length
  const hours = model.value.reduce((s, w) => s + w.end_min - w.start_min, 0) / 60
  return t('slots.summary', { n, hours: fmtNumber(hours) })
})
</script>

<template>
  <div class="slot-editor">
    <div class="field">
      <span>{{ $t('slots.days') }}</span>
      <div class="chips" role="group" :aria-label="$t('slots.days')">
        <button
          v-for="d in 7"
          :key="d"
          type="button"
          class="chip"
          :class="{ active: state.days.includes(d) }"
          :aria-pressed="state.days.includes(d)"
          @click="toggleDay(d)"
        >
          {{ weekdayName(d, 'short') }}
        </button>
      </div>
    </div>

    <template v-if="state.sameEveryDay">
      <div v-if="state.division !== 'custom'" class="field">
        <span>{{ $t('slots.openingHours') }}</span>
        <div class="row time-range">
          <label class="inline-field">
            {{ $t('slots.from') }}
            <input type="time" step="1800" :value="fmtMin(state.from)" @change="setRange('from', $event.target.value)">
          </label>
          <label class="inline-field">
            {{ $t('slots.to') }}
            <input
              type="time"
              step="1800"
              :value="fmtMin(state.to % DAY_MINUTES)"
              @change="setRange('to', $event.target.value)"
            >
          </label>
        </div>
        <span class="hint">{{ $t('slots.openingHint') }}</span>
      </div>

      <div class="field">
        <span>{{ $t('slots.divisionTitle') }}</span>
        <BaseChoice v-model="state.division" name="division" :options="divisionOptions" :columns="3" />
      </div>

      <div v-if="state.division === 'custom'" class="field">
        <span>{{ $t('slots.customTitle') }}</span>
        <SlotLayoutEditorList :model-value="state.common" @update:model-value="setCommon" />
      </div>
    </template>

    <template v-else>
      <div class="field">
        <span>{{ $t('slots.perDayTitle') }}</span>
        <div class="seg" role="tablist">
          <button
            v-for="d in state.days"
            :key="d"
            type="button"
            role="tab"
            :aria-selected="state.editDay === d"
            :class="{ active: state.editDay === d }"
            @click="state.editDay = d"
          >
            {{ weekdayName(d, 'short') }}<i v-if="differs(d)" class="seg-dot" :title="$t('slots.differs')" />
          </button>
        </div>
      </div>
      <SlotLayoutEditorList v-model="state.perDay[state.editDay]" />
      <div>
        <button type="button" class="btn ghost sm" @click="copyToAllDays">
          <BaseIcon name="copy" :size="16" /> {{ $t('slots.copyToAll', { day: weekdayName(state.editDay) }) }}
        </button>
      </div>
    </template>

    <label class="switch">
      <input
        type="checkbox"
        :checked="!state.sameEveryDay"
        @change="setSameEveryDay(!$event.target.checked)"
      >
      <span class="switch-track" aria-hidden="true" />
      <span>{{ $t('slots.perDaySwitch') }}</span>
    </label>

    <div class="preview-card">
      <div class="preview-head">
        <b>{{ $t('slots.previewTitle') }}</b>
        <span class="muted small">{{ hasError ? $t('slots.fixErrors') : summary }}</span>
      </div>
      <WeekTemplate :blocks="blocks" :label="$t('slots.previewTitle')" />
    </div>
  </div>
</template>

<style scoped>
.slot-editor { display: flex; flex-direction: column; gap: 1.25rem; }
.time-range { gap: 1rem; }
.inline-field { display: inline-flex; align-items: center; gap: 0.5rem; color: var(--text-2); }
</style>
