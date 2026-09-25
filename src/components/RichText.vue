<script setup>
// A text with the inline markup from lib/inline.js: **bold**, `code` and [label](url).
import { computed } from 'vue'
import { isInternal, parseInline } from '../lib/inline'
import { LINKS } from '../site'

const props = defineProps({ text: { type: String, required: true } })
const parts = computed(() => parseInline(props.text, LINKS))
</script>

<template>
  <template v-for="(part, i) in parts" :key="i">
    <strong v-if="part.type === 'bold'">{{ part.text }}</strong>
    <code v-else-if="part.type === 'code'">{{ part.text }}</code>
    <RouterLink v-else-if="part.type === 'link' && isInternal(part.href)" :to="part.href">{{ part.text }}</RouterLink>
    <a v-else-if="part.type === 'link'" :href="part.href" rel="noopener">{{ part.text }}</a>
    <template v-else>{{ part.text }}</template>
  </template>
</template>
