<script setup>
// A highlighted note, e.g. a privacy tip or a warning.
import BaseIcon from './BaseIcon.vue'

const ICONS = { info: 'info', tip: 'info', privacy: 'shield', warn: 'alert', ok: 'check-circle' }

defineProps({
  tone: {
    type: String,
    default: 'info',
    validator: (v) => ['info', 'tip', 'privacy', 'warn', 'ok'].includes(v),
  },
  icon: { type: String, default: '' },
})
</script>

<template>
  <div class="callout" :class="tone">
    <BaseIcon :name="icon || ICONS[tone]" :size="18" />
    <div><slot /></div>
  </div>
</template>

<style scoped>
.callout {
  display: flex; gap: 0.6rem; align-items: flex-start; padding: 0.75rem 0.9rem; border-radius: var(--radius-sm);
  border: 1px solid var(--primary-border); background: var(--primary-soft); color: var(--text);
}
.callout > .icon { margin-top: 1px; color: var(--primary); }
.callout > div { min-width: 0; overflow-wrap: anywhere; } /* long e-mail addresses */
.callout.privacy { background: var(--surface-2); border-color: var(--border); }
.callout.privacy > .icon { color: var(--ok); }
.callout.warn { background: var(--warn-soft); border-color: var(--warn-border); }
.callout.warn > .icon { color: var(--warn); }
.callout.ok { background: var(--ok-soft); border-color: var(--ok-border); }
.callout.ok > .icon { color: var(--ok); }
</style>
