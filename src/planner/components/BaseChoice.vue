<script setup>
// Radio buttons shown as cards with a title, an explanation and an optional icon.
import BaseIcon from '../../components/BaseIcon.vue'

const model = defineModel({ type: [String, Number, Boolean], default: null })
defineProps({
  // [{ value, title, text?, icon?, badge? }]; a badge highlights an option, e.g. a free trial.
  options: { type: Array, required: true },
  name: { type: String, required: true },
  label: { type: String, default: '' },
  columns: { type: Number, default: 1 },
})
</script>

<template>
  <div
    class="choice"
    :class="`cols-${columns}`"
    role="radiogroup"
    :aria-label="label || undefined"
  >
    <label
      v-for="o in options"
      :key="String(o.value)"
      class="choice-card"
      :class="{ active: model === o.value }"
    >
      <input
        v-model="model"
        class="sr-only"
        type="radio"
        :name="name"
        :value="o.value"
      >
      <span v-if="o.icon" class="choice-icon"><BaseIcon :name="o.icon" :size="22" /></span>
      <span class="choice-text">
        <span v-if="o.badge" class="choice-badge">{{ o.badge }}</span>
        <b>{{ o.title }}</b>
        <span v-if="o.text" class="muted small">{{ o.text }}</span>
        <!-- Extra controls for the selected option, e.g. a waiting time. -->
        <span v-if="model === o.value && $slots[`detail-${o.value}`]" class="choice-detail">
          <slot :name="`detail-${o.value}`" />
        </span>
      </span>
      <span class="choice-check" aria-hidden="true"><BaseIcon name="check" :size="14" /></span>
    </label>
  </div>
</template>

<style scoped>
.choice { display: grid; gap: 0.6rem; }
.choice.cols-2 { grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); }
.choice.cols-3 { grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); }
.choice-card {
  position: relative; display: flex; align-items: flex-start; gap: 0.7rem; padding: 0.85rem 2.4rem 0.85rem 0.9rem;
  border: 1.5px solid var(--border-strong); border-radius: var(--radius); background: var(--surface); cursor: pointer;
  transition: border-color 0.15s, background 0.15s, box-shadow 0.15s;
}
.choice-card:hover { border-color: var(--primary-border); }
.choice-card.active { border-color: var(--primary); background: var(--primary-soft); }
.choice-card:has(input:focus-visible) { box-shadow: 0 0 0 3px var(--primary-border); }
.choice-icon {
  flex: none; display: grid; place-items: center; width: 38px; height: 38px; border-radius: var(--radius-sm);
  background: var(--surface-2); color: var(--text-2);
}
.choice-card.active .choice-icon { background: var(--surface); color: var(--primary); }
.choice-text { display: flex; flex-direction: column; gap: 0.15rem; min-width: 0; }
.choice-text b { font-weight: 650; }
.choice-badge {
  align-self: flex-start; margin-bottom: 0.15rem; padding: 0.05rem 0.5rem; border-radius: 999px; font-size: 0.72rem;
  font-weight: 800; letter-spacing: 0.05em; text-transform: uppercase; background: var(--gift); color: var(--on-strong);
}
.choice-detail { display: flex; flex-wrap: wrap; align-items: center; gap: 0.5rem; margin-top: 0.5rem; cursor: default; }
.choice-check {
  position: absolute; top: 0.75rem; right: 0.75rem; width: 20px; height: 20px; border-radius: 50%;
  border: 1.5px solid var(--border-strong); display: grid; place-items: center; color: transparent;
}
.choice-card.active .choice-check { background: var(--primary); border-color: var(--primary); color: var(--primary-ink); }
</style>
