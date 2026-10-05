<script setup>
// A week shown like a calendar app: one column per weekday, time windows as
// blocks whose height follows their duration. On phones it becomes a list of days.
import { computed } from 'vue'
import { fmtMin, weekdayName } from '../lib/format'
import { useMediaQuery } from '../composables/useMediaQuery'

const props = defineProps({
  // [{ key, weekday, start_min, end_min, class?, style? }]
  blocks: { type: Array, required: true },
  days: { type: Array, default: () => [1, 2, 3, 4, 5, 6, 7] },
  interactive: { type: Boolean, default: false },
  label: { type: String, default: '' },
})
const emit = defineEmits(['select'])

const narrow = useMediaQuery('(max-width: 640px)')

const byDay = computed(() => {
  const out = {}
  for (const d of props.days) out[d] = []
  for (const b of props.blocks) out[b.weekday]?.push(b)
  for (const list of Object.values(out)) list.sort((a, b) => a.start_min - b.start_min)
  return out
})

const range = computed(() => {
  if (!props.blocks.length) return { start: 7 * 60, end: 22 * 60 }
  const start = Math.min(...props.blocks.map((b) => b.start_min))
  const end = Math.max(...props.blocks.map((b) => b.end_min))
  return { start: Math.floor(start / 60) * 60, end: Math.ceil(end / 60) * 60 }
})

// Pixels per hour: fill about 440px, but keep the shortest block tall enough to read.
const hourPx = computed(() => {
  const hours = (range.value.end - range.value.start) / 60
  const shortest = Math.min(...props.blocks.map((b) => b.end_min - b.start_min), 24 * 60)
  return Math.min(96, Math.max(440 / hours, (56 * 60) / shortest))
})
const height = computed(() => ((range.value.end - range.value.start) / 60) * hourPx.value)
const hourStep = computed(() => (hourPx.value >= 30 ? 1 : 2))
const hourMarks = computed(() => {
  const out = []
  for (let m = range.value.start; m <= range.value.end; m += hourStep.value * 60) out.push(m)
  return out
})

// Phones, read-only: consecutive days with the same times share one row ("Mo–Sa").
const dayGroups = computed(() => {
  const groups = []
  for (const d of props.days) {
    const key = byDay.value[d].map((b) => `${b.start_min}-${b.end_min}`).join()
    const last = groups.at(-1)
    if (last && last.key === key && last.days.at(-1) === d - 1) last.days.push(d)
    else groups.push({ key, days: [d], blocks: byDay.value[d] })
  }
  return groups.map((g) => ({
    ...g,
    label:
      g.days.length > 2
        ? `${weekdayName(g.days[0], 'short')}–${weekdayName(g.days.at(-1), 'short')}`
        : g.days.map((d) => weekdayName(d, 'short')).join(', '),
  }))
})

const top = (m) => ((m - range.value.start) / 60) * hourPx.value
const blockStyle = (b) => ({ top: `${top(b.start_min)}px`, height: `${top(b.end_min) - top(b.start_min) - 3}px` })
// The zero-width space lets narrow blocks wrap the time after the dash.
const timeLabel = (b) => `${fmtMin(b.start_min)}–\u200b${fmtMin(b.end_min)}`

function select(b) {
  if (props.interactive) emit('select', b)
}
</script>

<template>
  <div class="week-template" :aria-label="label || undefined">
    <!-- phones, read-only: compact summary -->
    <div v-if="narrow && !interactive" class="wt-compact">
      <div v-for="g in dayGroups" :key="g.days.join()" class="wt-compact-row">
        <span class="wt-compact-days">{{ g.label }}</span>
        <span v-if="!g.blocks.length" class="muted small">{{ $t('slots.closed') }}</span>
        <span v-else class="wt-compact-times">
          <span v-for="b in g.blocks" :key="b.key" class="wt-chip">{{ timeLabel(b) }}</span>
        </span>
      </div>
    </div>

    <!-- phones, editable: one row per time slot -->
    <div v-else-if="narrow" class="wt-list">
      <section v-for="d in days" :key="d" class="wt-list-day">
        <h4>{{ weekdayName(d) }}</h4>
        <p v-if="!byDay[d].length" class="muted small">{{ $t('slots.closed') }}</p>
        <component
          :is="interactive ? 'button' : 'div'"
          v-for="b in byDay[d]"
          :key="b.key"
          :type="interactive ? 'button' : undefined"
          class="wt-block wt-block-row"
          :class="b.class"
          :data-drag-key="interactive ? b.key : undefined"
          :style="b.style"
          @click="select(b)"
        >
          <span class="wt-time">{{ timeLabel(b) }}</span>
          <span class="wt-content"><slot name="block" :block="b" /></span>
        </component>
      </section>
    </div>

    <!-- larger screens: calendar week -->
    <div v-else class="wt-grid" :style="{ '--wt-days': days.length }">
      <div class="wt-head">
        <span />
        <span v-for="d in days" :key="d" class="wt-dayname">{{ weekdayName(d, 'short') }}</span>
      </div>
      <div class="wt-body" :style="{ height: `${height}px` }">
        <div class="wt-hours">
          <span v-for="m in hourMarks" :key="m" :style="{ top: `${top(m)}px` }">{{ fmtMin(m) }}</span>
        </div>
        <div
          v-for="d in days"
          :key="d"
          class="wt-col"
          :class="{ closed: !byDay[d].length }"
          :style="{ backgroundSize: `100% ${hourPx * hourStep}px` }"
        >
          <span v-if="!byDay[d].length" class="wt-closed">{{ $t('slots.closed') }}</span>
          <component
            :is="interactive ? 'button' : 'div'"
            v-for="b in byDay[d]"
            :key="b.key"
            :type="interactive ? 'button' : undefined"
            class="wt-block"
            :class="b.class"
            :data-drag-key="interactive ? b.key : undefined"
            :style="[blockStyle(b), b.style]"
            @click="select(b)"
          >
            <span class="sr-only">{{ weekdayName(d) }}</span>
            <span class="wt-time">{{ timeLabel(b) }}</span>
            <span class="wt-content"><slot name="block" :block="b" /></span>
          </component>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wt-grid { --wt-gutter: 46px; }
.wt-head, .wt-body { display: grid; grid-template-columns: var(--wt-gutter) repeat(var(--wt-days), minmax(0, 1fr)); gap: 6px; }
.wt-dayname { text-align: center; font-size: 0.82rem; font-weight: 700; color: var(--text-2); padding-bottom: 0.4rem; text-transform: capitalize; }
.wt-body { position: relative; }
.wt-hours { position: relative; }
.wt-hours span {
  position: absolute; right: 6px; transform: translateY(-50%); font-size: 0.72rem; color: var(--muted);
  font-variant-numeric: tabular-nums;
}
.wt-hours span:first-child { transform: none; }
.wt-col {
  position: relative; border-radius: var(--radius-sm); background-color: var(--surface);
  background-image: linear-gradient(var(--border) 1px, transparent 1px); background-position: 0 0;
  border: 1px solid var(--border);
}
.wt-col.closed { background: repeating-linear-gradient(135deg, var(--surface-2) 0 6px, var(--surface) 6px 12px); }
.wt-closed {
  position: absolute; inset: 0; display: grid; place-items: center; font-size: 0.78rem; color: var(--muted);
  writing-mode: vertical-rl; text-orientation: mixed; letter-spacing: 0.08em;
}
.wt-block {
  position: absolute; left: 3px; right: 3px; margin-top: 1px; display: flex; flex-direction: column; gap: 0.15rem;
  padding: 0.35rem 0.45rem; border-radius: var(--radius-xs); border: 1px solid var(--primary-border);
  background: var(--primary-soft); color: var(--text); font: inherit; text-align: left; overflow: hidden;
}
button.wt-block { cursor: pointer; transition: box-shadow 0.12s, transform 0.12s; }
button.wt-block:hover { box-shadow: var(--shadow); transform: translateY(-1px); z-index: 2; }
.wt-time { font-size: 0.72rem; font-weight: 700; font-variant-numeric: tabular-nums; opacity: 0.85; }
.wt-content { display: flex; flex-direction: column; gap: 0.15rem; min-width: 0; font-size: 0.82rem; }

.wt-compact { display: flex; flex-direction: column; }
.wt-compact-row { display: flex; gap: 0.75rem; align-items: baseline; padding: 0.55rem 0; border-bottom: 1px solid var(--border); }
.wt-compact-row:last-child { border-bottom: 0; }
.wt-compact-days { flex: none; width: 4.5rem; font-weight: 700; text-transform: capitalize; }
.wt-compact-times { display: flex; flex-wrap: wrap; gap: 0.3rem; }
.wt-chip {
  font-size: 0.82rem; font-variant-numeric: tabular-nums; padding: 0.1rem 0.5rem; border-radius: 999px;
  background: var(--primary-soft); border: 1px solid var(--primary-border);
}

.wt-list { display: flex; flex-direction: column; gap: 0.9rem; }
.wt-list-day h4 { margin: 0 0 0.35rem; text-transform: capitalize; }
.wt-list-day p { margin: 0; }
.wt-block-row {
  position: static; flex-direction: row; align-items: center; gap: 0.75rem; width: 100%; min-height: 52px;
  margin-bottom: 0.4rem; padding: 0.5rem 0.75rem;
}
.wt-block-row .wt-time { min-width: 92px; font-size: 0.86rem; }
.wt-block-row .wt-content { font-size: 0.92rem; flex: 1; }
</style>
