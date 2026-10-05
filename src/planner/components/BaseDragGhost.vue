<script setup>
// What is being dragged, following the pointer (see usePointerDrag).
defineProps({
  // The state from usePointerDrag: { active, x, y, label, over }
  drag: { type: Object, required: true },
  // Shown while the pointer is over a place where the item can be dropped, e.g. "Loslassen zum Tauschen".
  hint: { type: String, default: '' },
})
</script>

<template>
  <Teleport to="body">
    <div v-if="drag.active" class="drag-ghost" :class="{ ok: drag.over }" :style="{ transform: `translate(${drag.x + 14}px, ${drag.y + 14}px)` }">
      <span class="drag-label">{{ drag.label }}</span>
      <span v-if="drag.over && hint" class="drag-hint">{{ hint }}</span>
    </div>
  </Teleport>
</template>

<style scoped>
.drag-ghost {
  position: fixed; left: 0; top: 0; z-index: 200; pointer-events: none; max-width: 240px;
  display: flex; flex-direction: column; gap: 0.2rem; padding: 0.5rem 0.7rem; border-radius: var(--radius-sm);
  background: var(--surface); color: var(--text); border: 2px solid var(--border-strong); box-shadow: var(--shadow-lg);
  font-size: 0.85rem; font-weight: 650;
}
.drag-ghost.ok { border-color: var(--primary); }
.drag-label { overflow: hidden; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 3; line-clamp: 3; }
.drag-hint { color: var(--primary); font-size: 0.8rem; }
</style>
