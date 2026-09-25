<script setup>
// A small, playable copy of the plan for the home page. Five flats, three time
// slots a day, "today" is Wednesday. You are "1. OG links": book free time
// slots, free up your own, or book the rest of a slot someone finished early.
import { computed, reactive, ref } from 'vue'
import BaseIcon from './BaseIcon.vue'
import DemoSlot from './DemoSlot.vue'
import { t, tm } from '../i18n'
import { PARTY_PALETTE } from '../lib/palette'

const TODAY = 2
const MINE = 2
const DATES = [21, 22, 23, 24, 25]
const TIMES = ['07:00–12:00', '12:00–17:00', '17:00–22:00']
// Flat index per day and time slot; null is free.
const INITIAL = [[0, 1, null], [2, 3, 4], [4, 1, null], [0, 2, null], [3, null, 4]]
// Wednesday 12:00–17:00: "EG rechts" finished early, the rest is free from 15:40.
const FINISHED = { day: 2, slot: 1, from: '15:40' }

const cells = reactive(INITIAL.map((r) => [...r]))
const restFlat = ref(null)
const day = ref(TODAY) // the day shown on narrow screens
const status = ref('')

const flats = computed(() => tm('home.demo.flats').map((name, i) => ({ name, color: PARTY_PALETTE[i] })))
const days = computed(() =>
  tm('home.demo.days').map((name, i) => {
    const date = t('home.demo.date', { d: DATES[i] })
    return { name, date, label: `${name} ${date}` }
  }),
)

const isPast = (d, s) => d < TODAY || (d === TODAY && s === 0)
const isFinished = (d, s) => d === FINISHED.day && s === FINISHED.slot

function slot(d, s) {
  const flat = cells[d][s]
  const past = isPast(d, s)
  const finished = isFinished(d, s)
  return {
    key: `${d}-${s}`,
    day: days.value[d].label,
    time: TIMES[s],
    party: flat == null ? null : flats.value[flat],
    mine: flat === MINE,
    past,
    now: d === TODAY && s === 1,
    actionable: !past && !finished && (flat == null || flat === MINE),
    rest: finished
      ? { from: FINISHED.from, party: restFlat.value == null ? null : flats.value[restFlat.value], mine: restFlat.value === MINE }
      : null,
  }
}
const grid = computed(() => days.value.map((_, d) => TIMES.map((_, s) => slot(d, s))))

function toggle(d, s) {
  const when = `${days.value[d].label} ${TIMES[s]}`
  cells[d][s] = cells[d][s] === MINE ? null : MINE
  status.value = t(cells[d][s] === MINE ? 'home.demo.booked' : 'home.demo.freed', { when })
}
function toggleRest() {
  const when = `${days.value[FINISHED.day].label} ${FINISHED.from}–17:00`
  restFlat.value = restFlat.value === MINE ? null : MINE
  status.value = t(restFlat.value === MINE ? 'home.demo.booked' : 'home.demo.freed', { when })
}
</script>

<template>
  <section class="demo" :aria-label="$t('home.demo.label')">
    <div class="demo-window">
      <div class="demo-bar">
        <img src="/favicon.svg" alt="" width="24" height="24">
        <span class="demo-brand"><b>Waschplaner</b><small>{{ $t('home.demo.house') }}</small></span>
        <span class="demo-nav" aria-hidden="true">
          <span class="active">{{ $t('home.demo.navPlan') }}</span>
          <span>{{ $t('home.demo.navMine') }}</span>
        </span>
      </div>

      <div class="demo-week">
        <span class="demo-arrow" aria-hidden="true"><BaseIcon name="chevron-left" :size="18" /></span>
        <span class="demo-title">
          <b>{{ $t('home.demo.week') }}</b>
          <span class="muted">{{ $t('home.demo.range') }}</span>
        </span>
        <span class="demo-arrow" aria-hidden="true"><BaseIcon name="chevron-right" :size="18" /></span>
      </div>

      <!-- wide: the week grid -->
      <div class="demo-grid">
        <div v-for="(d, i) in days" :key="d.name" class="demo-col" :class="{ today: i === TODAY }">
          <div class="demo-day-head">
            <span>{{ d.name }}</span>
            <b>{{ d.date }}</b>
          </div>
          <DemoSlot
            v-for="(c, s) in grid[i]"
            :key="c.key"
            v-bind="c"
            @toggle="toggle(i, s)"
            @toggle-rest="toggleRest"
          />
        </div>
      </div>

      <!-- narrow: day tabs and a list, as on phones -->
      <div class="demo-list">
        <div class="seg demo-tabs">
          <button
            v-for="(d, i) in days"
            :key="d.name"
            type="button"
            :class="{ active: day === i }"
            :aria-pressed="day === i"
            @click="day = i"
          >
            {{ d.name }} {{ d.date }}
          </button>
        </div>
        <div class="stack demo-rows">
          <DemoSlot
            v-for="(c, s) in grid[day]"
            :key="c.key"
            v-bind="c"
            row
            @toggle="toggle(day, s)"
            @toggle-rest="toggleRest"
          />
        </div>
      </div>

      <div class="demo-legend small">
        <span class="demo-swatch" :style="{ background: flats[MINE].color }" aria-hidden="true" />
        {{ $t('home.demo.mine', { name: flats[MINE].name }) }}
      </div>
    </div>
    <p class="demo-hint small">
      <BaseIcon name="hand" :size="16" />
      <span>{{ $t('home.demo.hint') }}</span>
    </p>
    <p class="sr-only" aria-live="polite">{{ status }}</p>
  </section>
</template>

<style scoped>
.demo { container-type: inline-size; }
.demo-window {
  background: var(--surface); border: 1px solid var(--border); border-radius: calc(var(--radius) + 4px);
  box-shadow: var(--shadow-lg); overflow: hidden;
}
.demo-bar {
  display: flex; align-items: center; gap: 0.55rem; padding: 0.55rem 0.9rem; border-bottom: 1px solid var(--border);
  background: var(--surface);
}
.demo-brand { display: flex; flex-direction: column; line-height: 1.15; min-width: 0; }
.demo-brand b { font-size: 0.92rem; font-weight: 800; }
.demo-brand small { color: var(--muted); font-size: 0.74rem; }
.demo-nav { display: flex; gap: 0.2rem; margin-left: auto; font-size: 0.8rem; font-weight: 600; color: var(--text-2); }
.demo-nav span { padding: 0.3rem 0.6rem; border-radius: var(--radius-xs); white-space: nowrap; }
.demo-nav .active { color: var(--primary); background: var(--primary-soft); }

.demo-week { display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; padding: 0.7rem 0.9rem 0.4rem; background: var(--bg); }
.demo-title { display: flex; gap: 0.5rem; align-items: baseline; font-size: 0.95rem; }
.demo-arrow {
  display: grid; place-items: center; width: 30px; height: 30px; border-radius: var(--radius-xs);
  border: 1px solid var(--border); background: var(--surface); color: var(--muted);
}

.demo-grid { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 0.45rem; padding: 0.4rem 0.9rem 0.9rem; background: var(--bg); }
.demo-col { display: flex; flex-direction: column; gap: 0.45rem; padding: 0.35rem; border-radius: var(--radius-sm); }
.demo-col.today { background: var(--primary-soft); }
.demo-day-head { display: flex; align-items: baseline; gap: 0.3rem; padding: 0.1rem 0.2rem 0.15rem; font-size: 0.8rem; color: var(--muted); }
.demo-day-head b { color: var(--text); }
.demo-col.today .demo-day-head, .demo-col.today .demo-day-head b { color: var(--primary); }

.demo-list { display: none; padding: 0.4rem 0.75rem 0.9rem; background: var(--bg); }
.demo-tabs { display: flex; flex-wrap: nowrap; overflow-x: auto; width: 100%; margin-bottom: 0.75rem; }
.demo-tabs button { flex: 1 0 auto; justify-content: center; min-height: 40px; }
.demo-rows { gap: 0.55rem; }

.demo-legend {
  display: flex; align-items: center; gap: 0.5rem; padding: 0.6rem 0.9rem; border-top: 1px solid var(--border); color: var(--text-2);
}
.demo-swatch { width: 16px; height: 16px; border-radius: 5px; box-shadow: inset 0 0 0 2.5px var(--text); flex: none; }
.demo-hint { display: flex; align-items: center; justify-content: center; gap: 0.4rem; margin: 0.9rem 0 0; color: var(--muted); text-align: center; }

@container (max-width: 540px) {
  .demo-grid { display: none; }
  .demo-list { display: block; }
  .demo-nav { display: none; }
}
</style>
