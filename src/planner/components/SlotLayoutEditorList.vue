<script setup>
// Editable list of the time windows of one day: [[start, end], …] in minutes.
import { computed } from 'vue'
import BaseIcon from '../../components/BaseIcon.vue'
import { fmtMin, parseHHMM } from '../lib/format'
import { DAY_MINUTES, MIN_SLOT_MINUTES, windowsError } from '../lib/slotLayout'

const model = defineModel({ type: Array, required: true })

const error = computed(() => windowsError(model.value))

// <input type="time"> cannot show 24:00, so midnight as an end time is shown as 00:00.
const endValue = (m) => fmtMin(m % DAY_MINUTES)
function setTime(i, which, value) {
  if (!value) return
  let m = parseHHMM(value)
  if (which === 1 && m === 0) m = DAY_MINUTES
  const next = model.value.map((w) => [...w])
  next[i][which] = m
  model.value = next
}
function remove(i) {
  model.value = model.value.filter((_, j) => j !== i)
}
function add() {
  const last = model.value.at(-1)
  const start = last ? Math.min(last[1], DAY_MINUTES - MIN_SLOT_MINUTES) : 8 * 60
  model.value = [...model.value, [start, Math.min(start + 120, DAY_MINUTES)]]
}
</script>

<template>
  <div class="slot-list">
    <div v-for="(w, i) in model" :key="i" class="slot-row">
      <span class="slot-row-nr">{{ i + 1 }}</span>
      <input
        type="time"
        step="1800"
        :value="fmtMin(w[0])"
        :aria-label="$t('slots.from')"
        @change="setTime(i, 0, $event.target.value)"
      >
      <span aria-hidden="true">–</span>
      <input
        type="time"
        step="1800"
        :value="endValue(w[1])"
        :aria-label="$t('slots.to')"
        @change="setTime(i, 1, $event.target.value)"
      >
      <button
        type="button"
        class="icon-btn"
        :disabled="model.length <= 1"
        :aria-label="$t('slots.remove')"
        :title="$t('slots.remove')"
        @click="remove(i)"
      >
        <BaseIcon name="trash" :size="18" />
      </button>
    </div>
    <p v-if="error" class="field-error" role="alert">{{ $t(error) }}</p>
    <button type="button" class="btn ghost sm" @click="add">
      <BaseIcon name="plus" :size="16" /> {{ $t('slots.add') }}
    </button>
  </div>
</template>

<style scoped>
.slot-list { display: flex; flex-direction: column; gap: 0.5rem; align-items: flex-start; }
.slot-row { display: flex; align-items: center; gap: 0.5rem; }
.slot-row-nr {
  width: 26px; height: 26px; border-radius: 50%; background: var(--surface-2); color: var(--muted);
  display: grid; place-items: center; font-size: 0.8rem; font-weight: 700;
}
</style>
