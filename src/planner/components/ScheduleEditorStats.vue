<script setup>
// How much laundry time each flat gets from the regular schedule, per month.
import { computed } from 'vue'
import BaseCallout from '../../components/BaseCallout.vue'
import BaseIcon from '../../components/BaseIcon.vue'
import { fmtNumber } from '../lib/format'

const props = defineProps({
  parties: { type: Array, required: true },
  // Result of planStats().
  stats: { type: Object, required: true },
  // Highlighted flat, if any.
  selected: { type: String, default: null },
})
const emit = defineEmits(['select'])

const rows = computed(() => {
  const list = props.parties.map((p) => ({ ...p, ...(props.stats.parties[p.id] || { days: 0, hours: 0, slots: 0 }) }))
  const max = Math.max(1, ...list.map((r) => r.hours))
  return list.map((r) => ({ ...r, width: `${(r.hours / max) * 100}%` }))
})
const missing = computed(() => rows.value.filter((r) => !r.slots))
const uneven = computed(() => {
  const hours = rows.value.filter((r) => r.slots).map((r) => r.hours)
  return hours.length > 1 && Math.max(...hours) > Math.min(...hours) * 1.5
})

const toggle = (id) => emit('select', props.selected === id ? null : id)
</script>

<template>
  <div class="plan-stats">
    <div class="preview-head">
      <b>{{ $t('plan.stats.title') }}</b>
      <span class="muted small">{{ $t('plan.stats.perMonth') }}</span>
    </div>
    <ul class="stats-list">
      <li v-for="r in rows" :key="r.id">
        <button
          type="button"
          class="stat-row"
          :class="{ active: selected === r.id, none: !r.slots }"
          :aria-pressed="selected === r.id"
          :title="$t('plan.stats.highlight')"
          @click="toggle(r.id)"
        >
          <span class="stat-name"><i class="dot" :style="{ background: r.color }" />{{ r.name }}</span>
          <span v-if="r.slots" class="stat-num">
            {{ $t('plan.stats.days', { n: fmtNumber(r.days) }) }} · {{ $t('plan.stats.hours', { n: fmtNumber(r.hours, 0) }) }}
          </span>
          <span v-else class="stat-num warn-text">{{ $t('plan.stats.noTime') }}</span>
          <span class="stat-bar"><span :style="{ width: r.width, background: r.color }" /></span>
        </button>
      </li>
    </ul>
    <p class="muted small stat-free">
      <BaseIcon name="plus-circle" :size="16" />
      {{ $t('plan.stats.free', { n: fmtNumber(stats.free.slots, 0) }) }}
    </p>
    <BaseCallout v-if="missing.length" tone="warn" class="small">
      {{ $t('plan.stats.missing', { n: missing.length, names: missing.map((r) => r.name).join(', ') }) }}
    </BaseCallout>
    <BaseCallout v-else-if="uneven" class="small">{{ $t('plan.stats.uneven') }}</BaseCallout>
  </div>
</template>

<style scoped>
.plan-stats { border: 1px solid var(--border); background: var(--surface-2); border-radius: var(--radius); padding: 1rem; }
/* One column beside the plan; several columns when shown below it. */
.stats-list {
  list-style: none; padding: 0; margin: 0 0 0.75rem; display: grid;
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr)); gap: 0.25rem 0.75rem;
}
.stat-row {
  width: 100%; display: flex; flex-wrap: wrap; align-items: baseline; gap: 0.2rem 0.5rem; padding: 0.45rem 0.55rem;
  border: 1px solid transparent; border-radius: var(--radius-sm); background: transparent; font: inherit; color: inherit;
  text-align: left; cursor: pointer;
}
.stat-row:hover { background: var(--surface); }
.stat-row.active { background: var(--surface); border-color: var(--primary); }
/* Name and numbers share a line if they fit; long names push the numbers below. */
.stat-name { flex: 1 1 auto; display: flex; align-items: center; gap: 0.45rem; font-weight: 650; min-width: 0; overflow-wrap: anywhere; }
.stat-num { margin-left: auto; font-size: 0.82rem; color: var(--text-2); font-variant-numeric: tabular-nums; white-space: nowrap; }
.stat-bar { flex-basis: 100%; height: 6px; border-radius: 3px; background: var(--surface-3); overflow: hidden; }
.stat-bar span { display: block; height: 100%; border-radius: 3px; transition: width 0.25s; }
.stat-free { display: flex; align-items: center; gap: 0.4rem; margin: 0 0 0.6rem; }
</style>
