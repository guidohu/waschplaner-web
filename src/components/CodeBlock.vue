<script setup>
// A command or file to copy, with an optional file name above it.
import { computed, onBeforeUnmount, ref } from 'vue'
import BaseIcon from './BaseIcon.vue'
import { LINKS } from '../site'

const props = defineProps({
  code: { type: String, required: true },
  title: { type: String, default: '' },
})
const text = computed(() => props.code.replace(/\{(\w+)\}/g, (m, k) => LINKS[k] ?? m))

const pre = ref(null)
const copied = ref(false)
let timer
async function copy() {
  try {
    await navigator.clipboard.writeText(text.value)
  } catch {
    // Older browsers or no permission: select the text so it can be copied by hand.
    const range = document.createRange()
    range.selectNodeContents(pre.value)
    window.getSelection()?.removeAllRanges()
    window.getSelection()?.addRange(range)
    return
  }
  copied.value = true
  clearTimeout(timer)
  timer = setTimeout(() => (copied.value = false), 2000)
}
onBeforeUnmount(() => clearTimeout(timer))
</script>

<template>
  <figure class="code">
    <figcaption class="code-head">
      <span class="code-title">
        <BaseIcon :name="title ? 'note' : 'terminal'" :size="16" />
        {{ title }}
      </span>
      <button type="button" class="code-copy" @click="copy">
        <BaseIcon :name="copied ? 'check' : 'copy'" :size="15" />
        <span aria-live="polite">{{ copied ? $t('common.copied') : $t('common.copy') }}</span>
      </button>
    </figcaption>
    <pre ref="pre"><code>{{ text }}</code></pre>
  </figure>
</template>

<style scoped>
.code { margin: 0; border: 1px solid var(--border); border-radius: var(--radius-sm); background: var(--surface-2); overflow: hidden; }
.code-head {
  display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; padding: 0.25rem 0.35rem 0.25rem 0.8rem;
  border-bottom: 1px solid var(--border); font-size: 0.83rem; color: var(--muted);
}
.code-title { display: inline-flex; align-items: center; gap: 0.4rem; font-family: var(--mono); min-width: 0; }
.code-copy {
  display: inline-flex; align-items: center; gap: 0.3rem; min-height: 34px; padding: 0 0.6rem; border: 0; border-radius: var(--radius-xs);
  background: transparent; color: var(--text-2); font: inherit; font-weight: 600; cursor: pointer;
}
.code-copy:hover { background: var(--surface-3); color: var(--text); }
pre { margin: 0; padding: 0.85rem 1rem; overflow-x: auto; font-size: 0.88rem; line-height: 1.6; tab-size: 4; }
pre code { background: none; border: 0; padding: 0; font-size: inherit; overflow-wrap: normal; }
</style>
