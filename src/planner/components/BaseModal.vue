<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import BaseIcon from '../../components/BaseIcon.vue'

defineProps({
  title: { type: String, default: '' },
  wide: { type: Boolean, default: false },
})
const emit = defineEmits(['close'])

const dialog = ref(null)
let previousFocus = null
const onKey = (e) => e.key === 'Escape' && emit('close')

onMounted(async () => {
  previousFocus = document.activeElement
  document.addEventListener('keydown', onKey)
  await nextTick()
  dialog.value?.focus()
})
onBeforeUnmount(() => {
  document.removeEventListener('keydown', onKey)
  previousFocus?.focus?.()
})
</script>

<template>
  <Teleport to="body">
    <div class="modal-backdrop" @click.self="emit('close')">
      <div
        ref="dialog"
        class="modal"
        :class="{ wide }"
        role="dialog"
        aria-modal="true"
        :aria-label="title"
        tabindex="-1"
      >
        <header class="modal-header">
          <div class="modal-title">
            <slot name="title"><h2>{{ title }}</h2></slot>
          </div>
          <button type="button" class="icon-btn" :aria-label="$t('common.close')" @click="emit('close')">
            <BaseIcon name="x" />
          </button>
        </header>
        <div class="modal-body"><slot /></div>
        <footer v-if="$slots.footer" class="modal-footer"><slot name="footer" /></footer>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.modal-backdrop {
  position: fixed; inset: 0; background: rgba(10, 14, 24, 0.5); z-index: 50; display: grid; place-items: center;
  padding: 1rem; animation: fade 0.12s ease-out;
}
.modal {
  background: var(--surface); border-radius: 18px; width: min(540px, 100%); max-height: calc(100vh - 2rem);
  overflow: auto; box-shadow: var(--shadow-lg); animation: pop 0.14s ease-out; outline: none;
}
.modal.wide { width: min(680px, 100%); }
.modal-header { display: flex; align-items: flex-start; gap: 0.75rem; padding: 1.2rem 1.35rem 0.5rem; }
.modal-title { flex: 1; min-width: 0; }
.modal-title :deep(h2) { margin: 0; }
.modal-body { padding: 0.5rem 1.35rem 1.35rem; }
.modal-footer {
  display: flex; gap: 0.5rem; justify-content: flex-end; align-items: center; flex-wrap: wrap;
  padding: 0.9rem 1.35rem; border-top: 1px solid var(--border); background: var(--surface-2);
  position: sticky; bottom: 0;
}
@media (max-width: 560px) {
  .modal-backdrop { place-items: end center; padding: 0; }
  .modal, .modal.wide { border-radius: 18px 18px 0 0; max-height: 92vh; }
  .modal-footer { padding-bottom: calc(0.9rem + env(safe-area-inset-bottom)); }
}
</style>
