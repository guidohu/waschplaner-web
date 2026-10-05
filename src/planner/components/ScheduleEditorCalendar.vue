<script setup>
// The regular schedule applied to real dates: a month calendar on larger
// screens, an agenda list of the next two weeks on phones.
import { computed } from 'vue'
import { addDays, weekStart } from '../lib/dates'
import { fmtDay, fmtDayMonth, fmtMin, weekdayName } from '../lib/format'
import { useMediaQuery } from '../composables/useMediaQuery'
import { baseOwner } from '../lib/recurrence'
import { entriesBySlot } from '../lib/plan'

const props = defineProps({
  // [{ key, weekday, start_min, end_min, slots: [slot] }]
  cells: { type: Array, required: true },
  entries: { type: Array, required: true },
  parties: { type: Array, required: true },
  from: { type: String, required: true },
  weeks: { type: Number, default: 5 },
  selected: { type: String, default: null },
  // Single-day changes: "slotId|date" -> flat id, or '' for free.
  overrides: { type: Object, default: () => ({}) },
})

const partyById = computed(() => Object.fromEntries(props.parties.map((p) => [p.id, p])))

const grid = computed(() => {
  const bySlot = entriesBySlot(props.entries)
  const byDay = {}
  for (const c of props.cells) (byDay[c.weekday] ||= []).push(c)
  for (const list of Object.values(byDay)) list.sort((a, b) => a.start_min - b.start_min)
  const start = weekStart(props.from)
  return Array.from({ length: props.weeks }, (_, w) =>
    Array.from({ length: 7 }, (_, d) => {
      const date = addDays(start, 7 * w + d)
      const items = (byDay[d + 1] || []).map((c) => {
        // Several machines: show every flat that has one of them.
        const keys = c.slots.map((s) => `${s.id}|${date}`)
        const owners = [...new Set(c.slots.map((s, i) =>
          keys[i] in props.overrides ? props.overrides[keys[i]] || null : baseOwner(bySlot.get(s.id) || [], date),
        ))]
        const changed = keys.some((k) => k in props.overrides)
        return { key: c.key, time: fmtMin(c.start_min), changed, owners: owners.map((id) => (id ? partyById.value[id] : null)) }
      })
      return { date, items, past: date < props.from, today: date === props.from }
    }),
  )
})
const narrow = useMediaQuery('(max-width: 640px)')
const AGENDA_DAYS = 14
const agenda = computed(() =>
  grid.value.flat().filter((day) => day.date >= props.from && day.items.length).slice(0, AGENDA_DAYS),
)
const dimmed = (owners) => props.selected && !owners.some((p) => p?.id === props.selected)
</script>

<template>
  <ul v-if="narrow" class="pc-agenda" :aria-label="$t('plan.calendarTitle')">
    <li v-for="day in agenda" :key="day.date" class="pc-agenda-day" :class="{ today: day.today }">
      <span class="pc-agenda-date">{{ fmtDay(day.date) }}</span>
      <span class="pc-agenda-items">
        <span v-for="it in day.items" :key="it.key" class="pc-item" :class="{ dim: dimmed(it.owners), changed: it.changed }">
          <span class="pc-time">{{ it.time }}</span>
          <template v-for="(p, i) in it.owners" :key="i">
            <span v-if="p" class="pc-party" :style="{ '--party': p.color }">{{ p.name }}</span>
            <span v-else class="pc-free">{{ $t('plan.free') }}</span>
          </template>
        </span>
      </span>
    </li>
  </ul>
  <div v-else class="plan-calendar" role="table" :aria-label="$t('plan.calendarTitle')">
    <div class="pc-row pc-head" role="row">
      <span v-for="d in 7" :key="d" role="columnheader">{{ weekdayName(d, 'short') }}</span>
    </div>
    <div v-for="(week, w) in grid" :key="w" class="pc-row" role="row">
      <div
        v-for="day in week"
        :key="day.date"
        class="pc-day"
        :class="{ past: day.past, today: day.today, closed: !day.items.length }"
        role="cell"
      >
        <span class="pc-date">{{ fmtDayMonth(day.date) }}</span>
        <span
          v-for="it in day.items"
          :key="it.key"
          class="pc-item"
          :class="{ dim: dimmed(it.owners), changed: it.changed }"
        >
          <span class="pc-time">{{ it.time }}</span>
          <template v-for="(p, i) in it.owners" :key="i">
            <span v-if="p" class="pc-party" :style="{ '--party': p.color }">{{ p.name }}</span>
            <span v-else class="pc-free">{{ $t('plan.free') }}</span>
          </template>
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.plan-calendar { display: flex; flex-direction: column; gap: 4px; }
.pc-row { display: grid; grid-template-columns: repeat(7, minmax(0, 1fr)); gap: 4px; }
.pc-head span { text-align: center; font-size: 0.8rem; font-weight: 700; color: var(--text-2); text-transform: capitalize; }
.pc-day {
  min-height: 88px; border: 1px solid var(--border); border-radius: var(--radius-xs); background: var(--surface);
  padding: 0.3rem; display: flex; flex-direction: column; gap: 3px; min-width: 0;
}
.pc-day.closed { background: var(--surface-2); }
.pc-day.past { opacity: 0.5; }
.pc-day.today { border-color: var(--primary); box-shadow: inset 0 0 0 1px var(--primary); }
.pc-date { font-size: 0.74rem; font-weight: 700; color: var(--muted); }
.pc-day.today .pc-date { color: var(--primary); }
.pc-item { display: flex; flex-wrap: wrap; align-items: center; gap: 2px 4px; font-size: 0.72rem; line-height: 1.2; }
.pc-item.dim { opacity: 0.3; }
/* A single date that differs from the regular schedule. */
.pc-item.changed { outline: 1.5px dashed var(--primary); outline-offset: 1px; border-radius: 3px; }
.pc-time { color: var(--muted); font-variant-numeric: tabular-nums; }
.pc-party {
  max-width: 100%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-weight: 650;
  border-left: 3px solid var(--party); padding-left: 3px;
}
.pc-free { color: var(--muted); font-style: italic; }
.pc-agenda { list-style: none; margin: 0; padding: 0; }
.pc-agenda-day { display: flex; gap: 0.75rem; padding: 0.55rem 0; border-bottom: 1px solid var(--border); }
.pc-agenda-day.today .pc-agenda-date { color: var(--primary); }
.pc-agenda-date { flex: none; width: 6.5rem; font-weight: 700; font-size: 0.88rem; }
.pc-agenda-items { display: flex; flex-direction: column; gap: 0.2rem; min-width: 0; }
.pc-agenda .pc-item { font-size: 0.86rem; }
</style>
