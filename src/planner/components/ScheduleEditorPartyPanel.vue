<script setup>
// One flat's regular times as a list of repeating entries, like the events of
// one person in a calendar, with a form to add another time. In the planner a
// time can also be for one date only ("1 August"), kept as a single-day change.
import { computed, ref, watch } from 'vue'
import BaseIcon from '../../components/BaseIcon.vue'
import { addDays, isoWeekday, nextWeekday } from '../lib/dates'
import { fmtDay, fmtDayLong, fmtMin, weekdayName } from '../lib/format'
import { LAST_WEEK, everyNWeeks, monthly, sameRule } from '../lib/recurrence'
import { entriesBySlot, mergeRegularTimes } from '../lib/plan'
import { baseOwner } from '../lib/recurrence'
import { draft, overrideKey, setOverride, validOverrides } from '../draft'
import { ruleLong } from '../lib/ruleText'
import { t } from '../../i18n'

const props = defineProps({
  // { id, name, color }
  party: { type: Object, required: true },
  // Cells of the editor: [{ key, weekday, start_min, end_min, rules, mixed }]
  cells: { type: Array, required: true },
  parties: { type: Array, required: true },
  from: { type: String, required: true },
})
const emit = defineEmits(['add', 'remove', 'close'])

const cellTime = (c) => `${fmtMin(c.start_min)}–${fmtMin(c.end_min)}`
// The flat's rules; back-to-back time slots with the same rule become one entry
// ("Every Tuesday, 07:00–22:00").
const entries = computed(() =>
  mergeRegularTimes(
    props.cells
      .filter((c) => !c.mixed)
      .flatMap((c) =>
        c.rules
          .filter((r) => r.party_id === props.party.id)
          .map((r) => ({ weekday: c.weekday, start_min: c.start_min, end_min: c.end_min, rule: r, ref: c })),
      ),
  ),
)

// --- adding a time ---
const days = computed(() => [...new Set(props.cells.map((c) => c.weekday))].sort((a, b) => a - b))
const day = ref(null)
const cellKey = ref('')
const freq = ref('w1')
const ONCE = 'once'
const onceDate = ref(props.from)
const startDate = ref('')
const monthWeek = ref(1)
// For one date, its weekday decides which time slots there are.
const pickedDay = computed(() => (freq.value === ONCE ? (onceDate.value ? isoWeekday(onceDate.value) : null) : day.value))
const dayCells = computed(() => props.cells.filter((c) => c.weekday === pickedDay.value).sort((a, b) => a.start_min - b.start_min))
const WHOLE_DAY = '*'
// The time slots a new rule goes to: one, or all of the day.
const targets = computed(() =>
  cellKey.value === WHOLE_DAY ? dayCells.value : dayCells.value.filter((c) => c.key === cellKey.value),
)
const firstDate = computed(() => (day.value ? nextWeekday(props.from, day.value) : ''))
const cycle = computed(() => (freq.value === 'm' || freq.value === ONCE ? 1 : Number(freq.value.slice(1))))
const startOptions = computed(() => Array.from({ length: cycle.value }, (_, k) => addDays(firstDate.value, 7 * k)))

watch(days, (d) => (day.value = d.includes(day.value) ? day.value : d[0] ?? null), { immediate: true })
watch(
  dayCells,
  (list) => {
    if (cellKey.value === WHOLE_DAY && list.length > 1) return
    if (!list.some((c) => c.key === cellKey.value)) cellKey.value = list.length > 1 ? WHOLE_DAY : (list[0]?.key ?? '')
  },
  { immediate: true },
)
watch([firstDate, cycle], () => (startDate.value = firstDate.value), { immediate: true })

const newRule = computed(() =>
  freq.value === 'm'
    ? { party_id: props.party.id, ...monthly(monthWeek.value) }
    : { party_id: props.party.id, ...everyNWeeks(cycle.value, startDate.value || firstDate.value) },
)
// Who has the chosen time on the chosen date now: the single-day change, or the regular schedule.
const bySlot = computed(() => entriesBySlot(draft.entries))
const ownerOn = (slotId, date) => {
  const key = overrideKey(slotId, date)
  return key in validOverrides.value ? validOverrides.value[key] || null : baseOwner(bySlot.value.get(slotId) || [], date)
}
const onceSlots = computed(() => targets.value.flatMap((c) => c.slots))
const onceReplaces = computed(() => {
  const ids = new Set(onceSlots.value.map((s) => ownerOn(s.id, onceDate.value)).filter((id) => id && id !== props.party.id))
  return props.parties.filter((p) => ids.has(p.id)).map((p) => p.name).join(', ')
})
// A time slot cannot have the same repeat rule twice (one for each flat).
const conflict = computed(() => {
  if (freq.value === ONCE) {
    if (!onceDate.value || onceDate.value < props.from) return t('planner.once.past')
    if (!dayCells.value.length) return t('planner.once.noSlots')
    return onceSlots.value.every((s) => ownerOn(s.id, onceDate.value) === props.party.id) ? t('plan.party.already') : ''
  }
  const other = targets.value.flatMap((c) => c.rules).find((r) => sameRule(r, newRule.value))
  if (!other) return ''
  const name = props.parties.find((p) => p.id === other.party_id)?.name || ''
  return other.party_id === props.party.id ? t('plan.party.already') : t('plan.party.taken', { name })
})
const nthOptions = [1, 2, 3, 4, LAST_WEEK].map((n) => ({ value: n, label: t('rule.nth.' + (n === LAST_WEEK ? 'last' : n)) }))

// Right after adding, confirm instead of warning that the time now exists.
const added = ref(false)
watch([day, cellKey, freq, startDate, monthWeek, onceDate], () => (added.value = false))

function add() {
  if (!targets.value.length || conflict.value) return
  if (freq.value === ONCE) {
    for (const s of onceSlots.value) setOverride(s.id, onceDate.value, props.party.id)
  } else {
    emit('add', targets.value, newRule.value)
  }
  added.value = true
}

// The flat's single dates in this view, back-to-back times on one date merged.
const cellOf = computed(() => new Map(props.cells.flatMap((c) => c.slots.map((s) => [s.id, c]))))
const onceEntries = computed(() => {
  const byDate = new Map()
  for (const [key, partyId] of Object.entries(validOverrides.value)) {
    if (partyId !== props.party.id) continue
    const at = key.lastIndexOf('|')
    const [slotId, date] = [key.slice(0, at), key.slice(at + 1)]
    const cell = cellOf.value.get(slotId)
    if (!cell || date < props.from) continue
    if (!byDate.has(date)) byDate.set(date, new Map())
    const cells = byDate.get(date)
    if (!cells.has(cell.key)) cells.set(cell.key, { cell, slotIds: [] })
    cells.get(cell.key).slotIds.push(slotId)
  }
  const out = []
  for (const date of [...byDate.keys()].sort()) {
    for (const { cell, slotIds } of [...byDate.get(date).values()].sort((a, b) => a.cell.start_min - b.cell.start_min)) {
      const last = out.at(-1)
      if (last && last.date === date && last.end === cell.start_min) {
        last.end = cell.end_min
        last.slotIds.push(...slotIds)
      } else {
        out.push({ date, start: cell.start_min, end: cell.end_min, slotIds: [...slotIds] })
      }
    }
  }
  return out
})
// "Monday 2 August", with the year when it is not this year's.
const onceDay = (date) => fmtDayLong(date) + (date.slice(0, 4) === props.from.slice(0, 4) ? '' : ` ${date.slice(0, 4)}`)
const removeOnce = (e) => e.slotIds.forEach((id) => setOverride(id, e.date, null))
</script>

<template>
  <section class="party-panel" :style="{ '--party': party.color }" :aria-label="party.name">
    <div class="panel-head">
      <b class="row-title"><i class="dot" :style="{ background: party.color }" /> {{ party.name }}</b>
      <button type="button" class="icon-btn" :aria-label="$t('common.close')" @click="emit('close')">
        <BaseIcon name="x" :size="18" />
      </button>
    </div>

    <p v-if="!entries.length" class="muted small">{{ $t('plan.party.none') }}</p>
    <ul v-else class="party-entries">
      <li v-for="(e, i) in entries" :key="i" class="party-entry">
        <span>
          <b>{{ ruleLong(e.rule, e.weekday) }}</b><br>
          <span class="muted small">{{ fmtMin(e.start) }}–{{ fmtMin(e.end) }}</span>
        </span>
        <button
          type="button"
          class="icon-btn"
          :title="$t('plan.party.remove')"
          :aria-label="$t('plan.party.remove')"
          @click="emit('remove', e.refs, e.rule)"
        >
          <BaseIcon name="trash" :size="16" />
        </button>
      </li>
    </ul>

    <template v-if="onceEntries.length">
      <b class="small">{{ $t('planner.once.title') }}</b>
      <ul class="party-entries">
        <li v-for="e in onceEntries" :key="e.date + e.start" class="party-entry">
          <span>
            <b>{{ onceDay(e.date) }}</b><br>
            <span class="muted small">{{ fmtMin(e.start) }}–{{ fmtMin(e.end) }}</span>
          </span>
          <button
            type="button"
            class="icon-btn"
            :title="$t('planner.once.remove')"
            :aria-label="$t('planner.once.remove')"
            @click="removeOnce(e)"
          >
            <BaseIcon name="trash" :size="16" />
          </button>
        </li>
      </ul>
    </template>

    <form class="party-add" @submit.prevent="add">
      <b class="small">{{ $t('plan.party.addTitle') }}</b>
      <div class="add-grid">
        <label class="field">
          <span>{{ $t('plan.dialog.repeat') }}</span>
          <select v-model="freq">
            <option value="w1">{{ $t('rule.freq.weekly') }}</option>
            <option v-for="n in [2, 3, 4]" :key="n" :value="`w${n}`">{{ $t('rule.freq.everyN', { n }) }}</option>
            <option value="m">{{ $t('rule.freq.monthly') }}</option>
            <option :value="ONCE">{{ $t('planner.once.freq') }}</option>
          </select>
        </label>
        <label v-if="freq === ONCE" class="field">
          <span>{{ $t('planner.once.date') }}</span>
          <input v-model="onceDate" type="date" :min="from" required>
        </label>
        <label v-else class="field">
          <span>{{ $t('plan.party.day') }}</span>
          <select v-model.number="day">
            <option v-for="d in days" :key="d" :value="d">{{ weekdayName(d) }}</option>
          </select>
        </label>
        <label class="field">
          <span>{{ $t('plan.party.time') }}</span>
          <select v-model="cellKey" :disabled="!dayCells.length">
            <option v-if="dayCells.length > 1" :value="WHOLE_DAY">{{ $t('plan.party.wholeDay') }}</option>
            <option v-for="c in dayCells" :key="c.key" :value="c.key">{{ cellTime(c) }}</option>
          </select>
        </label>
        <label v-if="freq !== 'm' && cycle > 1" class="field">
          <span>{{ $t('plan.dialog.startingOn') }}</span>
          <select v-model="startDate">
            <option v-for="d in startOptions" :key="d" :value="d">{{ fmtDay(d) }}</option>
          </select>
        </label>
        <label v-if="freq === 'm'" class="field">
          <span>{{ $t('plan.dialog.onThe') }}</span>
          <select v-model.number="monthWeek">
            <option v-for="o in nthOptions" :key="o.value" :value="o.value">
              {{ $t('plan.dialog.nthWeekday', { nth: o.label, day: weekdayName(day) }) }}
            </option>
          </select>
        </label>
      </div>
      <p v-if="added" class="added-note small" role="status"><BaseIcon name="check" :size="16" /> {{ $t('plan.party.added') }}</p>
      <p v-else-if="conflict" class="field-error">{{ conflict }}</p>
      <p v-else-if="freq === ONCE && onceReplaces" class="muted small">{{ $t('planner.once.replaces', { name: onceReplaces }) }}</p>
      <button v-if="!added" class="btn sm" :disabled="!targets.length || !!conflict">
        <BaseIcon name="plus" :size="16" /> {{ $t('plan.party.add') }}
      </button>
    </form>
  </section>
</template>

<style scoped>
.party-panel {
  border: 1px solid var(--border); border-top: 4px solid var(--party); border-radius: var(--radius);
  background: var(--surface); padding: 0.85rem 1rem 1rem; display: flex; flex-direction: column; gap: 0.75rem;
}
.panel-head { display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; }
.party-entries { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; }
.party-entry {
  display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; padding: 0.4rem 0;
  border-bottom: 1px solid var(--border); line-height: 1.3;
}
.party-add { display: flex; flex-direction: column; gap: 0.5rem; align-items: flex-start; }
.added-note { display: inline-flex; align-items: center; gap: 0.35rem; margin: 0; color: var(--ok); font-weight: 600; }
.add-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); gap: 0.5rem; width: 100%; }
</style>
