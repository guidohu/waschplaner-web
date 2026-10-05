<script setup>
// A collapsible "How does this work?" box with plain-language explanations.
import BaseIcon from '../../components/BaseIcon.vue'

defineProps({
  title: { type: String, default: '' },
  open: { type: Boolean, default: false },
})
</script>

<template>
  <details class="help" :open="open">
    <summary class="help-summary">
      <BaseIcon name="help" :size="18" />
      <span>{{ title || $t('common.howItWorks') }}</span>
      <BaseIcon class="help-chevron" name="chevron-down" :size="16" />
    </summary>
    <div class="help-body"><slot /></div>
  </details>
</template>

<style scoped>
.help { border: 1px solid var(--primary-border); background: var(--primary-soft); border-radius: var(--radius); }
.help-summary {
  display: flex; align-items: center; gap: 0.5rem; padding: 0.7rem 1rem; cursor: pointer; font-weight: 650;
  color: var(--primary); list-style: none;
}
.help-summary::-webkit-details-marker { display: none; }
.help-chevron { margin-left: auto; transition: transform 0.15s; }
.help[open] .help-chevron { transform: rotate(180deg); }
.help-body { padding: 0 1rem 0.9rem 2.6rem; color: var(--text-2); }
.help-body :deep(p) { margin: 0 0 0.5rem; }
.help-body :deep(p:last-child) { margin: 0; }
</style>
