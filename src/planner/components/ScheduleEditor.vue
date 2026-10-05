<script setup>
// Editor for the regular schedule: which flat has which time slot, and how
// often. Works on a local list of rules (v-model); nothing is saved here.
import { computed, ref, watch } from 'vue'
import BaseDragGhost from './BaseDragGhost.vue'
import BaseIcon from '../../components/BaseIcon.vue'
import WeekTemplate from './WeekTemplate.vue'
import ScheduleEditorAuto from './ScheduleEditorAuto.vue'
import ScheduleEditorCalendar from './ScheduleEditorCalendar.vue'
import ScheduleEditorSlotDialog from './ScheduleEditorSlotDialog.vue'
import ScheduleEditorPartyPanel from './ScheduleEditorPartyPanel.vue'
import ScheduleEditorStats from './ScheduleEditorStats.vue'
import { textOn } from '../lib/format'
import { entriesBySlot, planStats } from '../lib/plan'
import { kindIcon } from '../lib/resources'
import { everyNWeeks, sameRule } from '../lib/recurrence'
import { addDays } from '../lib/dates'
import { usePointerDrag } from '../composables/usePointerDrag'
import { usePointerPaint } from '../composables/usePointerPaint'
import { toast } from '../toast'
import { ruleShort } from '../lib/ruleText'
import { validOverrides } from '../draft'
import { t } from '../../i18n'

const model = defineModel({ type: Array, required: true })
const props = defineProps({
  // Bookable units: [{ id, name, kind }]
  resources: { type: Array, required: true },
  // [{ id, resource_id, weekday, start_min, end_min }]
  slots: { type: Array, required: true },
  // [{ id, name, color }]
  parties: { type: Array, required: true },
  // Today (YYYY-MM-DD); rotations and previews start here.
  from: { type: String, required: true },
})

const ALL = 'all'
const scope = ref(ALL)
const view = ref('week')
const selectedParty = ref(null)
const editing = ref(null)
const autoOpen = ref(false)
const history = ref([])

const partyById = computed(() => Object.fromEntries(props.parties.map((p) => [p.id, p])))
const scopeSlots = computed(() =>
  scope.value === ALL ? props.slots : props.slots.filter((s) => s.resource_id === scope.value),
)
const scopeLabel = computed(() =>
  scope.value === ALL
    ? props.resources.map((r) => r.name).join(', ')
    : props.resources.find((r) => r.id === scope.value)?.name || '',
)

// Only keep rules for slots and flats that (still) exist.
const validEntries = computed(() => {
  const slotIds = new Set(props.slots.map((s) => s.id))
  return model.value.filter((e) => slotIds.has(e.slot_id) && partyById.value[e.party_id])
})
const bySlot = computed(() => entriesBySlot(validEntries.value))
const ruleKey = (r) => `${r.party_id}:${r.cycle_weeks || 1}:${r.week_offset || 0}:${r.month_week || 0}`
const rulesOf = (slotId) =>
  (bySlot.value.get(slotId) || [])
    .map(({ party_id, cycle_weeks, week_offset, month_week }) => ({ party_id, cycle_weeks, week_offset, month_week }))
    .sort((a, b) => ruleKey(a).localeCompare(ruleKey(b)))

// A cell is one time window; with several machines it covers the same window on each.
const cells = computed(() => {
  const map = new Map()
  for (const s of scopeSlots.value) {
    const key = `${s.weekday}-${s.start_min}-${s.end_min}`
    if (!map.has(key)) map.set(key, { key, weekday: s.weekday, start_min: s.start_min, end_min: s.end_min, slots: [] })
    map.get(key).slots.push(s)
  }
  return [...map.values()].map((c) => {
    const lists = c.slots.map((s) => rulesOf(s.id))
    const first = JSON.stringify(lists[0])
    const mixed = lists.some((l) => JSON.stringify(l) !== first)
    const rules = mixed ? [] : lists[0]
    const solo = rules.length === 1 && rules[0].cycle_weeks === 1 && !rules[0].month_week && partyById.value[rules[0].party_id]
    return {
      ...c,
      rules,
      mixed,
      solo,
      class: {
        'plan-cell': true,
        free: !mixed && !rules.length,
        solo: !!solo,
        dim: selectedParty.value && !rules.some((r) => r.party_id === selectedParty.value),
        movable: mode.value === 'edit' && rules.length > 0,
        'drag-source': drag.source === c.key,
        'drop-target': drag.over === c.key,
      },
      style: solo ? { background: solo.color, borderColor: solo.color, color: textOn(solo.color) } : null,
    }
  })
})
const days = computed(() => {
  const set = new Set(props.slots.map((s) => s.weekday))
  return [1, 2, 3, 4, 5, 6, 7].filter((d) => set.has(d))
})

const stats = computed(() => planStats(props.slots, validEntries.value, { from: props.from }))

function commit(next) {
  history.value = [...history.value.slice(-19), model.value]
  model.value = next
}
function undo() {
  model.value = history.value.at(-1)
  history.value = history.value.slice(0, -1)
}
function replaceRules(slotIds, rules) {
  const ids = new Set(slotIds)
  const kept = validEntries.value.filter((e) => !ids.has(e.slot_id))
  commit([...kept, ...slotIds.flatMap((slot_id) => rules.map((r) => ({ ...r, slot_id })))])
}

function saveCell(rules) {
  replaceRules(editing.value.slots.map((s) => s.id), rules)
  editing.value = null
}
function applyAuto(entries) {
  const ids = new Set(scopeSlots.value.map((s) => s.id))
  commit([...validEntries.value.filter((e) => !ids.has(e.slot_id)), ...entries])
  autoOpen.value = false
}
function clearAll() {
  const ids = new Set(scopeSlots.value.map((s) => s.id))
  commit(validEntries.value.filter((e) => !ids.has(e.slot_id)))
}

// From the flat's panel: add or remove one repeating time on the given cells (all their machines).
function addRule(targetCells, rule) {
  const slots = targetCells.flatMap((c) => c.slots)
  commit([...validEntries.value, ...slots.map((s) => ({ ...rule, slot_id: s.id }))])
}
function removeRule(targetCells, rule) {
  const ids = new Set(targetCells.flatMap((c) => c.slots.map((s) => s.id)))
  commit(validEntries.value.filter((e) => !(ids.has(e.slot_id) && e.party_id === rule.party_id && sameRule(e, rule))))
}

// --- drag and drop: move a time slot's flats to another time slot (swap if taken) ---
const weekArea = ref(null)
const cellByKey = (key) => cells.value.find((c) => c.key === key)
const drag = usePointerDrag(weekArea, {
  canDrag: (key) => mode.value === 'edit' && !!cellByKey(key)?.rules.length,
  canDrop: (from, to) => !cellByKey(to)?.mixed,
  onDrop: moveCell,
})
const dropHint = computed(() => (drag.over && cellByKey(drag.over)?.rules.length ? t('plan.drop.swap') : t('plan.drop.move')))
function moveCell(fromKey, toKey) {
  const from = cellByKey(fromKey)
  const to = cellByKey(toKey)
  const ids = new Set([...from.slots, ...to.slots].map((s) => s.id))
  const strip = ({ party_id, cycle_weeks, week_offset, month_week }) => ({ party_id, cycle_weeks, week_offset, month_week })
  commit([
    ...validEntries.value.filter((e) => !ids.has(e.slot_id)),
    ...to.slots.flatMap((s) => from.rules.map((r) => ({ ...strip(r), slot_id: s.id }))),
    ...from.slots.flatMap((s) => to.rules.map((r) => ({ ...strip(r), slot_id: s.id }))),
  ])
  toast(t(to.rules.length ? 'plan.drop.swapped' : 'plan.drop.moved'))
}

// --- paint: pick a flat, tap or swipe over time slots ---
const mode = ref('edit') // edit | paint
const FREE = 'free'
const brush = ref(null) // a flat's id or FREE
const brushRepeat = ref('w1') // w1 = every week; w2a / w2b = every other week, from this or next week
watch(
  () => props.parties,
  (list) => (brush.value = list.some((p) => p.id === brush.value) || brush.value === FREE ? brush.value : list[0]?.id ?? FREE),
  { immediate: true },
)
watch(mode, (m) => m === 'paint' && (view.value = 'week'))
function brushRule() {
  if (brushRepeat.value === 'w1') return { cycle_weeks: 1, week_offset: 0, month_week: 0 }
  return everyNWeeks(2, brushRepeat.value === 'w2a' ? props.from : addDays(props.from, 7))
}
usePointerPaint(weekArea, {
  enabled: () => mode.value === 'paint' && view.value === 'week',
  // One stroke is one step for "Undo".
  onStart: () => (history.value = [...history.value.slice(-19), model.value]),
  onPaint: paintCell,
  onEnd: () => {},
})
function paintCell(key) {
  const cell = cellByKey(key)
  if (!cell) return
  const rule = brushRule()
  let rules
  if (brush.value === FREE) rules = []
  else if (brushRepeat.value === 'w1') rules = [{ party_id: brush.value, ...rule }]
  // Every other week: the flat of the other week stays, so two flats can take turns.
  else rules = [...cell.rules.filter((r) => !sameRule(r, rule)), { party_id: brush.value, ...rule }]
  const ids = new Set(cell.slots.map((s) => s.id))
  model.value = [
    ...validEntries.value.filter((e) => !ids.has(e.slot_id)),
    ...cell.slots.flatMap((s) => rules.map((r) => ({ ...r, slot_id: s.id }))),
  ]
}
const brushName = computed(() => (brush.value === FREE ? t('plan.paint.free') : partyById.value[brush.value]?.name || ''))

const scopeOptions = computed(() => [
  { value: ALL, label: t('plan.scopeAll'), icon: 'basket' },
  ...props.resources.map((r) => ({ value: r.id, label: r.name, icon: kindIcon(r.kind) })),
])
</script>

<template>
  <div class="schedule-editor">
    <div v-if="resources.length > 1" class="plan-scope">
      <span class="plan-scope-label">{{ $t('plan.scope') }}</span>
      <div class="seg" role="tablist" :aria-label="$t('plan.scope')">
        <button
          v-for="o in scopeOptions"
          :key="o.value"
          type="button"
          role="tab"
          :aria-selected="scope === o.value"
          :class="{ active: scope === o.value }"
          @click="scope = o.value"
        >
          <BaseIcon :name="o.icon" :size="16" /> {{ o.label }}
        </button>
      </div>
    </div>

    <div class="plan-toolbar">
      <div class="seg" role="tablist" :aria-label="$t('plan.view')">
        <button type="button" role="tab" :aria-selected="view === 'week'" :class="{ active: view === 'week' }" @click="view = 'week'">
          <BaseIcon name="repeat" :size="16" /> {{ $t('plan.viewWeek') }}
        </button>
        <button
          type="button"
          role="tab"
          :aria-selected="view === 'calendar'"
          :class="{ active: view === 'calendar' }"
          @click="view = 'calendar'"
        >
          <BaseIcon name="calendar" :size="16" /> {{ $t('plan.viewCalendar') }}
        </button>
      </div>
      <div class="seg" role="tablist" :aria-label="$t('plan.mode')">
        <button type="button" role="tab" :aria-selected="mode === 'edit'" :class="{ active: mode === 'edit' }" @click="mode = 'edit'">
          <BaseIcon name="edit" :size="16" /> {{ $t('plan.modeEdit') }}
        </button>
        <button type="button" role="tab" :aria-selected="mode === 'paint'" :class="{ active: mode === 'paint' }" @click="mode = 'paint'">
          <BaseIcon name="brush" :size="16" /> {{ $t('plan.modePaint') }}
        </button>
      </div>
      <span class="spacer" />
      <button type="button" class="btn subtle sm" @click="autoOpen = true">
        <BaseIcon name="wand" :size="16" /> {{ $t('plan.autoBtn') }}
      </button>
      <button
        type="button"
        class="btn ghost sm"
        :disabled="!scopeSlots.length"
        :title="$t('plan.clearBtn')"
        :aria-label="$t('plan.clearBtn')"
        @click="clearAll"
      >
        <BaseIcon name="x" :size="16" /> <span class="btn-label">{{ $t('plan.clearBtn') }}</span>
      </button>
      <button
        type="button"
        class="btn ghost sm"
        :disabled="!history.length"
        :title="$t('common.undo')"
        :aria-label="$t('common.undo')"
        @click="undo"
      >
        <BaseIcon name="undo" :size="16" /> <span class="btn-label">{{ $t('common.undo') }}</span>
      </button>
    </div>

    <div class="plan-layout">
      <div class="plan-main">
        <template v-if="view === 'week'">
          <div v-if="mode === 'paint'" class="paint-bar">
            <span class="paint-label">{{ $t('plan.paint.brush') }}</span>
            <div class="chips paint-brushes" role="radiogroup" :aria-label="$t('plan.paint.brush')">
              <button
                v-for="p in parties"
                :key="p.id"
                type="button"
                role="radio"
                class="chip"
                :class="{ active: brush === p.id }"
                :aria-checked="brush === p.id"
                @click="brush = p.id"
              >
                <i class="dot" :style="{ background: p.color }" /> {{ p.name }}
              </button>
              <button type="button" role="radio" class="chip" :class="{ active: brush === FREE }" :aria-checked="brush === FREE" @click="brush = FREE">
                <i class="dot free-dot" /> {{ $t('plan.paint.free') }}
              </button>
            </div>
            <label v-if="brush !== FREE" class="paint-repeat">
              <span class="sr-only">{{ $t('plan.dialog.repeat') }}</span>
              <select v-model="brushRepeat" class="auto-width">
                <option value="w1">{{ $t('rule.freq.weekly') }}</option>
                <option value="w2a">{{ $t('plan.paint.everyOtherThis') }}</option>
                <option value="w2b">{{ $t('plan.paint.everyOtherNext') }}</option>
              </select>
            </label>
          </div>
          <p class="muted small plan-hint">
            {{ mode === 'paint' ? $t('plan.paint.hint', { name: brushName }) : $t('plan.clickHint') }}
          </p>
          <div ref="weekArea" :class="{ painting: mode === 'paint' }">
            <WeekTemplate :blocks="cells" :days="days" interactive :label="$t('plan.viewWeek')" @select="editing = $event">
              <template #block="{ block }">
                <span v-if="block.mixed" class="plan-mixed">{{ $t('plan.mixed') }}</span>
                <span v-else-if="!block.rules.length" class="plan-free">{{ $t('plan.free') }}</span>
                <span v-else-if="block.solo" class="plan-solo">{{ block.solo.name }}</span>
                <template v-else>
                  <span v-for="(r, i) in block.rules" :key="i" class="plan-rule" :style="{ '--party': partyById[r.party_id]?.color }">
                    <span class="plan-rule-name">{{ partyById[r.party_id]?.name }}</span>
                    <small v-if="ruleShort(r)">{{ ruleShort(r) }}</small>
                  </span>
                </template>
              </template>
            </WeekTemplate>
          </div>
          <BaseDragGhost :drag="drag" :hint="dropHint" />
        </template>
        <ScheduleEditorCalendar
          v-else
          :cells="cells"
          :entries="validEntries"
          :parties="parties"
          :from="from"
          :selected="selectedParty"
          :overrides="validOverrides"
        />
      </div>

      <div class="plan-side">
        <ScheduleEditorStats
          :parties="parties"
          :stats="stats"
          :selected="selectedParty"
          @select="selectedParty = $event"
        />
        <ScheduleEditorPartyPanel
          v-if="partyById[selectedParty]"
          :party="partyById[selectedParty]"
          :cells="cells"
          :parties="parties"
          :from="from"
          @add="addRule"
          @remove="removeRule"
          @close="selectedParty = null"
        />
      </div>
    </div>

    <ScheduleEditorSlotDialog
      v-if="editing"
      :cell="editing"
      :rules="editing.rules"
      :parties="parties"
      :unit-label="scopeLabel"
      :mixed="editing.mixed"
      :from="from"
      @save="saveCell"
      @close="editing = null"
    />
    <ScheduleEditorAuto
      v-if="autoOpen"
      :slots="scopeSlots"
      :parties="parties"
      :from="from"
      @apply="applyAuto"
      @close="autoOpen = false"
    />
  </div>
</template>

<style scoped>
.schedule-editor { display: flex; flex-direction: column; gap: 1rem; container-type: inline-size; }
.plan-scope { display: flex; flex-wrap: wrap; align-items: center; gap: 0.5rem 0.75rem; }
.plan-scope-label { font-weight: 650; color: var(--text-2); }
.plan-toolbar { display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: center; }
.plan-layout { display: grid; grid-template-columns: minmax(0, 1fr) 290px; gap: 1.25rem; align-items: start; }
.plan-main { display: flex; flex-direction: column; gap: 0.6rem; min-width: 0; }
.plan-side { display: flex; flex-direction: column; gap: 0.75rem; min-width: 0; }
.plan-hint { margin: 0; }
/* The editor sits in the wide setup page and in the narrower admin page: react to its own width. */
@container (max-width: 980px) {
  .plan-layout { grid-template-columns: 1fr; }
}
@media (max-width: 640px) {
  .btn-label { display: none; }
  .plan-toolbar > .seg { flex-basis: 100%; }
}

/* Blocks rendered by WeekTemplate. */
.schedule-editor :deep(.wt-block.plan-cell.free) {
  background: var(--surface); border: 1.5px dashed var(--border-strong); color: var(--muted);
}
.schedule-editor :deep(.wt-block.plan-cell.free:hover) { border-color: var(--primary); color: var(--primary); }
.schedule-editor :deep(.wt-block.plan-cell:not(.free):not(.solo)) { background: var(--surface); border-color: var(--border-strong); }
.schedule-editor :deep(.wt-block.plan-cell.dim) { opacity: 0.3; }
.plan-free, .plan-mixed { font-weight: 600; }

/* moving and painting */
.schedule-editor :deep(.wt-block.movable) { cursor: grab; }
.schedule-editor :deep(.wt-block.drag-source) { opacity: 0.4; }
.schedule-editor :deep(.wt-block.drop-target) { outline: 3px solid var(--primary); outline-offset: 1px; z-index: 3; }
.painting :deep(.wt-block) { cursor: crosshair; touch-action: none; }
.paint-bar {
  display: flex; flex-wrap: wrap; align-items: center; gap: 0.5rem 0.75rem; padding: 0.6rem 0.75rem;
  border: 1px solid var(--primary-border); background: var(--primary-soft); border-radius: var(--radius-sm);
}
.paint-label { font-weight: 650; }
.paint-brushes .chip.active { box-shadow: 0 0 0 2px var(--primary-border); }
.free-dot { border: 2px dashed var(--border-strong); background: var(--surface); }
.plan-mixed { color: var(--warn); }
.plan-solo {
  font-weight: 700; overflow-wrap: anywhere; overflow: hidden;
  display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 3; line-clamp: 3;
}
/* One line per flat, with a colour bar; the repeat rule goes below the name. */
.plan-rule {
  display: flex; flex-direction: column; min-width: 0; line-height: 1.2; padding-left: 0.4rem;
  border-left: 3px solid var(--party);
}
.plan-rule-name { font-weight: 650; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.plan-rule small { color: var(--muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-size: 0.72rem; }
</style>
