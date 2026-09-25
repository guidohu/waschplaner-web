<script setup>
// Privacy policy or imprint (texts in content/legal.js).
import { computed } from 'vue'
import DocBlocks from '../components/DocBlocks.vue'
import { usePageTitle } from '../composables/usePageTitle'
import { legalPage } from '../content'

const props = defineProps({ page: { type: String, required: true } })
const content = computed(() => legalPage(props.page))
usePageTitle(() => content.value.title)
</script>

<template>
  <div class="container narrow legal">
    <header class="page-head">
      <h1>{{ content.title }}</h1>
      <p class="lead">{{ content.summary }}</p>
    </header>
    <DocBlocks :blocks="content.blocks" />
  </div>
</template>

<style scoped>
.legal { padding-block: 2.5rem 4.5rem; }
.page-head h1 { font-size: 2rem; font-weight: 800; }
.page-head { margin-bottom: 1.5rem; }
</style>
