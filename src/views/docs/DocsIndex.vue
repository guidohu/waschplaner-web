<script setup>
// The start of the help: every page with its summary, grouped.
import { computed } from 'vue'
import BaseIcon from '../../components/BaseIcon.vue'
import { usePageTitle } from '../../composables/usePageTitle'
import { DOC_SECTIONS, docPages } from '../../content'
import { t } from '../../i18n'
import { ONLINE_AVAILABLE } from '../../site'

usePageTitle(() => t('docs.title'))
const groups = computed(() =>
  DOC_SECTIONS.map((key) => ({ key, pages: docPages.value.filter((p) => p.section === key) })),
)
</script>

<template>
  <div>
    <header class="page-head">
      <h1>{{ $t('docs.title') }}</h1>
      <p class="lead">{{ $t('docs.intro') }}</p>
    </header>
    <section v-for="g in groups" :key="g.key" class="group">
      <h2>{{ $t(`docs.sections.${g.key}`) }}</h2>
      <div class="cards">
        <RouterLink v-for="p in g.pages" :key="p.slug" :to="`/docs/${p.slug}`" class="doc-card">
          <span class="icon-tile"><BaseIcon :name="p.icon" :size="22" /></span>
          <span class="doc-card-text">
            <b>{{ p.title }} <span v-if="p.later && !ONLINE_AVAILABLE" class="badge">{{ $t('common.later') }}</span></b>
            <span class="muted small">{{ p.summary }}</span>
          </span>
          <BaseIcon name="chevron-right" :size="18" class="doc-card-arrow" />
        </RouterLink>
      </div>
    </section>
  </div>
</template>

<style scoped>
.page-head h1 { font-size: 2rem; font-weight: 800; }
.page-head { margin-bottom: 2rem; }
.group + .group { margin-top: 2rem; }
.group h2 { font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--muted); }
.cards { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 0.75rem; }
.doc-card {
  display: flex; align-items: center; gap: 0.85rem; padding: 1rem; border-radius: var(--radius); text-decoration: none;
  background: var(--surface); border: 1px solid var(--border); box-shadow: var(--shadow-sm); color: var(--text);
  transition: border-color 0.15s, box-shadow 0.15s;
}
.doc-card:hover { border-color: var(--primary-border); box-shadow: var(--shadow); text-decoration: none; }
.doc-card-text { display: flex; flex-direction: column; gap: 0.1rem; flex: 1; min-width: 0; }
.doc-card-arrow { color: var(--muted); }
</style>
