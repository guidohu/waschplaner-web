<script setup>
// A number input with − and + buttons, easier to use on phones than a bare number field.
import BaseIcon from './BaseIcon.vue'

const model = defineModel({ type: Number, required: true })
const props = defineProps({
  label: { type: String, required: true },
  min: { type: Number, default: 0 },
  max: { type: Number, default: 99 },
  step: { type: Number, default: 1 },
})

function set(value) {
  model.value = Math.min(props.max, Math.max(props.min, Math.round(Number(value) || 0)))
}
</script>

<template>
  <div class="stepper" role="group" :aria-label="label">
    <button
      type="button"
      class="stepper-btn"
      :disabled="model <= min"
      :aria-label="$t('common.decrease')"
      @click="set(model - step)"
    >
      <BaseIcon name="minus" :size="18" />
    </button>
    <input
      class="stepper-input"
      :value="model"
      type="number"
      inputmode="numeric"
      :min="min"
      :max="max"
      :aria-label="label"
      @change="set($event.target.value)"
    >
    <button
      type="button"
      class="stepper-btn"
      :disabled="model >= max"
      :aria-label="$t('common.increase')"
      @click="set(model + step)"
    >
      <BaseIcon name="plus" :size="18" />
    </button>
  </div>
</template>

<style scoped>
.stepper {
  align-self: flex-start; display: inline-flex; align-items: stretch; border: 1px solid var(--border-strong); border-radius: var(--radius-sm);
  background: var(--surface); overflow: hidden; height: 42px;
}
.stepper:focus-within { border-color: var(--primary); box-shadow: 0 0 0 3px var(--primary-soft); }
.stepper-btn {
  width: 40px; display: grid; place-items: center; border: 0; background: var(--surface-2); color: var(--text); cursor: pointer;
}
.stepper-btn:hover:not(:disabled) { background: var(--surface-3); }
.stepper-btn:disabled { color: var(--border-strong); cursor: not-allowed; }
.stepper-input {
  width: 3.4rem; min-height: 0; border: 0; border-radius: 0; text-align: center; font-weight: 700;
  font-variant-numeric: tabular-nums; box-shadow: none !important; -moz-appearance: textfield; padding: 0;
}
.stepper-input::-webkit-inner-spin-button, .stepper-input::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
</style>
