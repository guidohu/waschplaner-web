<script setup>
// A flat's colour dot; tapping it opens the system colour picker.
defineProps({
  label: { type: String, required: true },
  size: { type: Number, default: 22 },
})
const color = defineModel({ type: String, required: true })
</script>

<template>
  <label class="color-dot" :title="label" :style="{ '--size': size + 'px', background: color }">
    <span class="sr-only">{{ label }}</span>
    <input v-model="color" type="color">
  </label>
</template>

<style scoped>
.color-dot {
  position: relative; flex: none; width: var(--size); height: var(--size); border-radius: 50%; cursor: pointer;
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.15);
}
.color-dot:hover { box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.15), 0 0 0 3px var(--primary-soft); }
.color-dot:focus-within { outline: 3px solid var(--primary-border); outline-offset: 2px; }
.color-dot input { position: absolute; inset: 0; width: 100%; height: 100%; opacity: 0; cursor: pointer; padding: 0; border: 0; }
</style>
