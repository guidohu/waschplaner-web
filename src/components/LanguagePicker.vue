<script setup>
// Language menu. It shows the language in use; each language is listed in its own language.
import BaseIcon from './BaseIcon.vue'
import { LOCALES, i18n, setLocale } from '../i18n'
</script>

<template>
  <label class="language-picker">
    <BaseIcon class="picker-globe" name="globe" :size="16" />
    <span class="sr-only">{{ $t('common.language') }}</span>
    <select class="picker-select" :value="i18n.locale" @change="setLocale($event.target.value)">
      <option v-for="l in LOCALES" :key="l.code" :value="l.code" :lang="l.code">{{ l.name }}</option>
    </select>
    <BaseIcon class="picker-chevron" name="chevron-down" :size="14" />
  </label>
</template>

<style scoped>
.language-picker { position: relative; display: inline-flex; align-items: center; flex: none; color: var(--text-2); }
.picker-select {
  appearance: none; -webkit-appearance: none; width: auto; min-height: 34px; padding: 0.3rem 1.9rem 0.3rem 2rem;
  font-size: 0.86rem; font-weight: 600; color: var(--text); background: var(--surface); border-color: var(--border);
  cursor: pointer;
}
.picker-select:hover { background: var(--surface-2); border-color: var(--border-strong); }
.picker-globe, .picker-chevron { position: absolute; pointer-events: none; }
.picker-globe { left: 0.65rem; }
.picker-chevron { right: 0.6rem; color: var(--muted); }
</style>
