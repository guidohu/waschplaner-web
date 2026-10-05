<script setup>
// Decides who has one time slot of the regular schedule and how often –
// like the "Repeat" setting of a calendar entry.
import { computed, ref } from 'vue'
import BaseCallout from '../../components/BaseCallout.vue'
import BaseModal from './BaseModal.vue'
import BaseIcon from '../../components/BaseIcon.vue'
import { addDays, nextWeekday, weekIndex } from '../lib/dates'
import { fmtDay, fmtMin, weekdayName } from '../lib/format'
import { slotOccurrences } from '../lib/plan'
import { LAST_WEEK, MAX_CYCLE_WEEKS, entryMatches, everyNWeeks, monthly, sameRule, specificity } from '../lib/recurrence'
import { ruleLong } from '../lib/ruleText'
import { t } from '../../i18n'

const props = defineProps({
  // { weekday, start_min, end_min }
  cell: { type: Object, required: true },
  // [{ party_id, cycle_weeks, week_offset, month_week }]
  rules: { type: Array, required: true },
  parties: { type: Array, required: true },
  // Names of the machines/rooms this applies to.
  unitLabel: { type: String, default: '' },
  // The machines currently have different rules for this time slot.
  mixed: { type: Boolean, default: false },
  from: { type: String, required: true },
})
const emit = defineEmits(['save', 'close'])

const draft = ref(props.rules.map((r) => ({ ...r })))
const firstDate = computed(() => nextWeekday(props.from, props.cell.weekday))
const partyById = computed(() => Object.fromEntries(props.parties.map((p) => [p.id, p])))
const unusedParties = computed(() => props.parties.filter((p) => !draft.value.some((r) => r.party_id === p.id)))

// --- frequency ("Repeat") ---
const freqOf = (r) => (r.month_week ? 'm' : `w${r.cycle_weeks || 1}`)
const freqOptions = computed(() => {
  const opts = [1, 2, 3, 4].map((n) => ({ value: `w${n}`, label: n === 1 ? t('rule.freq.weekly') : t('rule.freq.everyN', { n }) }))
  // Keep longer rotations (e.g. from the automatic distribution) selectable.
  for (const r of draft.value) {
    if (r.cycle_weeks > 4 && !opts.some((o) => o.value === `w${r.cycle_weeks}`)) {
      opts.push({ value: `w${r.cycle_weeks}`, label: t('rule.freq.everyN', { n: r.cycle_weeks }) })
    }
  }
  opts.push({ value: 'm', label: t('rule.freq.monthly') })
  return opts
})

function setFreq(i, value) {
  const r = draft.value[i]
  draft.value[i] =
    value === 'm'
      ? { party_id: r.party_id, ...monthly(firstFreeMonthWeek()) }
      : { party_id: r.party_id, ...everyNWeeks(Number(value.slice(1)), firstDate.value) }
}

// Every-N-weeks rules start on one of the next N dates.
const startOptions = (r) =>
  Array.from({ length: r.cycle_weeks }, (_, k) => addDays(firstDate.value, 7 * k)).map((date) => ({
    date,
    offset: weekIndex(date) % r.cycle_weeks,
  }))
const startOf = (r) => startOptions(r).find((o) => o.offset === r.week_offset)?.date
function setStart(i, date) {
  const r = draft.value[i]
  draft.value[i] = { ...r, week_offset: weekIndex(date) % r.cycle_weeks }
}

const MONTH_WEEKS = [1, 2, 3, 4, LAST_WEEK]
const monthWeekLabel = (n) => t('rule.nth.' + (n === LAST_WEEK ? 'last' : n))
function firstFreeMonthWeek() {
  return MONTH_WEEKS.find((n) => !draft.value.some((r) => r.month_week === n)) ?? 1
}

// --- adding and removing flats ---
function isRotation(rules) {
  const n = rules.length
  return (
    n > 0 &&
    rules.every((r) => !r.month_week && (r.cycle_weeks || 1) === n) &&
    new Set(rules.map((r) => r.week_offset || 0)).size === n
  )
}

// Adding a flat to a slot that already rotates between flats makes the
// rotation one week longer (weekly → every 2 weeks → every 3 weeks …).
// Otherwise the new flat gets a monthly turn.
function addParty(partyId) {
  const rules = draft.value
  if (!rules.length) {
    draft.value = [{ party_id: partyId, ...everyNWeeks(1) }]
    return
  }
  if (isRotation(rules) && rules.length < MAX_CYCLE_WEEKS) {
    const n = rules.length + 1
    const upcoming = (r) => slotOccurrences(props.cell, [r], props.from, rules.length).find((o) => o.entry)?.date
    const order = [...rules].sort((a, b) => upcoming(a).localeCompare(upcoming(b))).map((r) => r.party_id)
    order.push(partyId)
    draft.value = order.map((pid, k) => ({ party_id: pid, ...everyNWeeks(n, addDays(firstDate.value, 7 * k)) }))
    return
  }
  draft.value = [...rules, { party_id: partyId, ...monthly(firstFreeMonthWeek()) }]
}
const remove = (i) => draft.value.splice(i, 1)
const addChoice = ref('')
function onAdd(e) {
  if (e.target.value) addParty(e.target.value)
  addChoice.value = ''
}

// --- feedback ---
const duplicate = computed(() =>
  draft.value.some((a, i) => draft.value.some((b, j) => j > i && sameRule(a, b))),
)
const upcoming = computed(() =>
  slotOccurrences(props.cell, draft.value, props.from, 8).map(({ date, entry }) => {
    const others = entry
      ? draft.value.filter((r) => r !== entry && entryMatches(r, date) && specificity(r) < specificity(entry))
      : []
    return { date, party: entry ? partyById.value[entry.party_id] : null, others: others.map((r) => partyById.value[r.party_id]?.name) }
  }),
)
const title = computed(
  () => `${weekdayName(props.cell.weekday)}, ${fmtMin(props.cell.start_min)}–${fmtMin(props.cell.end_min)}`,
)
</script>

<template>
  <BaseModal :title="title" wide @close="emit('close')">
    <template #title>
      <h2>{{ title }}</h2>
      <div v-if="unitLabel" class="muted small">{{ unitLabel }}</div>
    </template>

    <div class="stack">
      <p class="muted">{{ $t('plan.dialog.intro') }}</p>
      <BaseCallout v-if="mixed" tone="warn">{{ $t('plan.dialog.mixed') }}</BaseCallout>

      <div v-if="!draft.length" class="stack">
        <div class="empty-inline">{{ $t('plan.dialog.empty') }}</div>
        <div class="flat-pick">
          <button v-for="p in parties" :key="p.id" type="button" class="flat-option" @click="addParty(p.id)">
            <i class="dot" :style="{ background: p.color }" />{{ p.name }}
          </button>
        </div>
      </div>

      <div v-for="(r, i) in draft" :key="i" class="rule-row">
        <label class="field rule-party">
          <span>{{ $t('plan.dialog.who') }}</span>
          <div class="select-with-dot">
            <i class="dot" :style="{ background: partyById[r.party_id]?.color }" />
            <select v-model="r.party_id">
              <option v-for="p in parties" :key="p.id" :value="p.id">{{ p.name }}</option>
            </select>
          </div>
        </label>
        <label class="field">
          <span>{{ $t('plan.dialog.repeat') }}</span>
          <select :value="freqOf(r)" @change="setFreq(i, $event.target.value)">
            <option v-for="o in freqOptions" :key="o.value" :value="o.value">{{ o.label }}</option>
          </select>
        </label>
        <label v-if="!r.month_week && r.cycle_weeks > 1" class="field">
          <span>{{ $t('plan.dialog.startingOn') }}</span>
          <select :value="startOf(r)" @change="setStart(i, $event.target.value)">
            <option v-for="o in startOptions(r)" :key="o.date" :value="o.date">{{ fmtDay(o.date) }}</option>
          </select>
        </label>
        <label v-else-if="r.month_week" class="field">
          <span>{{ $t('plan.dialog.onThe') }}</span>
          <select v-model.number="r.month_week">
            <option v-for="n in MONTH_WEEKS" :key="n" :value="n">
              {{ $t('plan.dialog.nthWeekday', { nth: monthWeekLabel(n), day: weekdayName(cell.weekday) }) }}
            </option>
          </select>
        </label>
        <span v-else />
        <button type="button" class="icon-btn rule-remove" :aria-label="$t('plan.dialog.remove')" @click="remove(i)">
          <BaseIcon name="trash" :size="18" />
        </button>
        <p class="rule-sentence muted small">{{ ruleLong(r, cell.weekday) }}</p>
      </div>

      <button v-if="draft.length" type="button" class="link-btn danger-text clear-btn" @click="draft = []">
        <BaseIcon name="x" :size="16" /> {{ $t('plan.dialog.clear') }}
      </button>

      <label v-if="draft.length && unusedParties.length" class="field add-party">
        <span>{{ $t('plan.dialog.addParty') }}</span>
        <select v-model="addChoice" @change="onAdd">
          <option value="">{{ $t('plan.dialog.addPartyPh') }}</option>
          <option v-for="p in unusedParties" :key="p.id" :value="p.id">{{ p.name }}</option>
        </select>
        <span class="hint">{{ $t('plan.dialog.addHint') }}</span>
      </label>

      <p v-if="duplicate" class="field-error" role="alert">{{ $t('plan.dialog.duplicate') }}</p>

      <div class="upcoming">
        <b class="small">{{ $t('plan.dialog.upcoming') }}</b>
        <ul class="upcoming-list">
          <li v-for="o in upcoming" :key="o.date" class="upcoming-item">
            <span class="upcoming-date">{{ fmtDay(o.date) }}</span>
            <span v-if="o.party" class="party-tag"><i class="dot" :style="{ background: o.party.color }" />{{ o.party.name }}</span>
            <span v-else class="muted">{{ $t('plan.free') }}</span>
            <span v-if="o.others.length" class="muted small">{{ $t('plan.dialog.instead', { names: o.others.join(', ') }) }}</span>
          </li>
        </ul>
      </div>
    </div>

    <template #footer>
      <button type="button" class="btn ghost" @click="emit('close')">{{ $t('common.cancel') }}</button>
      <button type="button" class="btn" :disabled="duplicate" @click="emit('save', draft)">
        {{ $t('common.apply') }}
      </button>
    </template>
  </BaseModal>
</template>

<style scoped>
.rule-row {
  display: grid; grid-template-columns: minmax(150px, 1.2fr) minmax(130px, 1fr) minmax(130px, 1fr) auto;
  gap: 0.5rem 0.6rem; align-items: end; padding: 0.75rem; border: 1px solid var(--border); border-radius: var(--radius-sm);
  background: var(--surface-2);
}
.rule-sentence { grid-column: 1 / -1; margin: 0; }
.rule-remove { align-self: end; margin-bottom: 3px; }
.select-with-dot { position: relative; }
.select-with-dot .dot { position: absolute; left: 0.7rem; top: 50%; transform: translateY(-50%); pointer-events: none; }
.select-with-dot select { padding-left: 1.9rem; }
.empty-inline { color: var(--muted); }
.upcoming { border-top: 1px solid var(--border); padding-top: 0.75rem; }
.upcoming-list { list-style: none; margin: 0.4rem 0 0; padding: 0; display: grid; grid-template-columns: repeat(auto-fill, minmax(230px, 1fr)); gap: 0.3rem 1rem; }
.upcoming-item { display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap; font-size: 0.9rem; }
.upcoming-date { min-width: 6.5rem; color: var(--text-2); font-variant-numeric: tabular-nums; }
.party-tag { display: inline-flex; align-items: center; gap: 0.35rem; font-weight: 650; }
.clear-btn { display: inline-flex; align-items: center; gap: 0.3rem; align-self: flex-start; font-weight: 600; }
/* Phones: flat and remove button on the first line, each setting on its own line. */
@media (max-width: 560px) {
  .rule-row { grid-template-columns: 1fr auto; }
  .rule-row > .field:not(.rule-party) { grid-column: 1 / -1; }
  .rule-row > span:empty { display: none; }
  .rule-remove { grid-row: 1; grid-column: 2; }
}
</style>
