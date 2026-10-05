<script setup>
// Icon and name of a bookable unit, plus what it contains if it bundles several machines.
import { computed } from 'vue'
import BaseIcon from '../../components/BaseIcon.vue'
import { equipmentText } from '../lib/format'
import { kindIcon } from '../lib/resources'

const props = defineProps({
  // { name, kind, equipment?, description? }
  resource: { type: Object, required: true },
  card: { type: Boolean, default: false },
})

const contents = computed(() => equipmentText(props.resource.equipment))
</script>

<template>
  <span class="resource-label" :class="{ card }">
    <span class="resource-icon"><BaseIcon :name="kindIcon(resource.kind)" :size="card ? 24 : 18" /></span>
    <span class="resource-text">
      <b>{{ resource.name }}</b>
      <span v-if="contents" class="muted small">{{ contents }}</span>
      <span v-else-if="resource.description" class="muted small">{{ resource.description }}</span>
    </span>
  </span>
</template>

<style scoped>
.resource-label { display: inline-flex; align-items: center; gap: 0.5rem; min-width: 0; }
.resource-label.card {
  padding: 0.6rem 0.9rem 0.6rem 0.6rem; border: 1px solid var(--border); border-radius: var(--radius-sm); background: var(--surface);
  box-shadow: var(--shadow-sm);
}
.resource-icon {
  display: grid; place-items: center; width: 32px; height: 32px; border-radius: var(--radius-xs);
  background: var(--primary-soft); color: var(--primary); flex: none;
}
.card .resource-icon { width: 42px; height: 42px; border-radius: var(--radius-sm); }
.resource-text { display: flex; flex-direction: column; min-width: 0; line-height: 1.3; }
</style>
