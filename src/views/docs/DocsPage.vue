<script setup>
// One help page, with links to the previous and next page.
import { computed } from 'vue'
import BaseIcon from '../../components/BaseIcon.vue'
import DocBlocks from '../../components/DocBlocks.vue'
import RichText from '../../components/RichText.vue'
import { usePageTitle } from '../../composables/usePageTitle'
import { docPages } from '../../content'
import { t } from '../../i18n'

const props = defineProps({ slug: { type: String, required: true } })

const index = computed(() => docPages.value.findIndex((p) => p.slug === props.slug))
const page = computed(() => docPages.value[index.value] || null)
const prev = computed(() => docPages.value[index.value - 1] || null)
const next = computed(() => (index.value >= 0 ? docPages.value[index.value + 1] : null) || null)

usePageTitle(() => page.value?.title || t('docs.notFound'))
</script>

<template>
  <article v-if="page">
    <header class="page-head">
      <span class="eyebrow">{{ $t(`docs.sections.${page.section}`) }}</span>
      <h1>{{ page.title }}</h1>
      <p class="lead">{{ page.summary }}</p>
    </header>
    <DocBlocks :blocks="page.blocks" />
    <p class="ask small muted"><BaseIcon name="mail" :size="16" /> <span><RichText :text="$t('docs.edit')" /></span></p>
    <nav class="pager" :aria-label="$t('docs.nav')">
      <RouterLink v-if="prev" :to="`/docs/${prev.slug}`" class="pager-link">
        <span class="muted small"><BaseIcon name="arrow-left" :size="14" /> {{ $t('docs.prev') }}</span>
        <b>{{ prev.title }}</b>
      </RouterLink>
      <RouterLink v-if="next" :to="`/docs/${next.slug}`" class="pager-link next">
        <span class="muted small">{{ $t('docs.next') }} <BaseIcon name="arrow-right" :size="14" /></span>
        <b>{{ next.title }}</b>
      </RouterLink>
    </nav>
  </article>
  <div v-else class="empty">
    <p>{{ $t('docs.notFound') }}</p>
    <RouterLink to="/docs" class="btn ghost">{{ $t('notFound.docs') }}</RouterLink>
  </div>
</template>

<style scoped>
.page-head { margin-bottom: 1.75rem; }
.page-head h1 { font-size: 2rem; font-weight: 800; }
.page-head .lead { margin: 0; }
.ask { display: flex; align-items: center; gap: 0.45rem; margin: 2.5rem 0 0; }
.pager { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; margin-top: 1.25rem; padding-top: 1.25rem; border-top: 1px solid var(--border); }
.pager-link {
  display: flex; flex-direction: column; gap: 0.15rem; padding: 0.9rem 1rem; border: 1px solid var(--border); border-radius: var(--radius);
  background: var(--surface); color: var(--text); text-decoration: none;
}
.pager-link:hover { border-color: var(--primary-border); text-decoration: none; }
.pager-link span { display: inline-flex; align-items: center; gap: 0.3rem; }
.pager-link.next { grid-column: 2; text-align: right; align-items: flex-end; }
@media (max-width: 560px) {
  .pager { grid-template-columns: 1fr; }
  .pager-link.next { grid-column: 1; }
}
</style>
