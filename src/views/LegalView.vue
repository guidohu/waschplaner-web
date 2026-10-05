<script setup>
// Privacy policy or imprint (texts in content/legal.js). Both name the operator,
// so search engines are asked not to index or archive them: here with a robots
// tag, and in nginx.conf with an X-Robots-Tag header.
import { computed, onBeforeUnmount, onMounted } from 'vue'
import DocBlocks from '../components/DocBlocks.vue'
import { usePageTitle } from '../composables/usePageTitle'
import { legalPage } from '../content'

const props = defineProps({ page: { type: String, required: true } })
const content = computed(() => legalPage(props.page))
usePageTitle(() => content.value.title)

let robots
onMounted(() => {
  robots = document.createElement('meta')
  robots.name = 'robots'
  robots.content = 'noindex, noarchive'
  document.head.appendChild(robots)
})
onBeforeUnmount(() => robots?.remove())
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
