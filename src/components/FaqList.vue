<script setup>
// Questions that open to their answer, one after another.
import BaseIcon from './BaseIcon.vue'
import RichText from './RichText.vue'

// [{ q, a }]
defineProps({ items: { type: Array, required: true } })
</script>

<template>
  <div class="faq">
    <details v-for="item in items" :key="item.q" class="faq-item">
      <summary>
        <span>{{ item.q }}</span>
        <BaseIcon class="faq-chevron" name="chevron-down" :size="18" />
      </summary>
      <p><RichText :text="item.a" /></p>
    </details>
  </div>
</template>

<style scoped>
.faq { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); box-shadow: var(--shadow-sm); }
.faq-item + .faq-item { border-top: 1px solid var(--border); }
summary {
  display: flex; align-items: center; justify-content: space-between; gap: 1rem; min-height: 56px;
  padding: 0.85rem 1.2rem; font-weight: 650; cursor: pointer; list-style: none;
}
summary::-webkit-details-marker { display: none; }
summary:hover { color: var(--primary); }
.faq-chevron { color: var(--muted); transition: transform 0.15s; }
.faq-item[open] .faq-chevron { transform: rotate(180deg); }
.faq-item p { margin: 0; padding: 0 1.2rem 1.1rem; color: var(--text-2); max-width: 70ch; }
</style>
