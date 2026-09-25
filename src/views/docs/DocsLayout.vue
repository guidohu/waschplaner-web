<script setup>
// The frame of the help pages: the page list beside the content on wide screens,
// a scrolling row of chips above it on phones.
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import BaseIcon from '../../components/BaseIcon.vue'
import { DOC_SECTIONS, docPages } from '../../content'

const route = useRoute()
const groups = computed(() =>
  DOC_SECTIONS.map((key) => ({ key, pages: docPages.value.filter((p) => p.section === key) })),
)
</script>

<template>
  <div class="docs container">
    <aside class="docs-side">
      <nav :aria-label="$t('docs.nav')">
        <RouterLink to="/docs" class="docs-home" :class="{ active: route.path === '/docs' }">
          <BaseIcon name="book" :size="18" /> {{ $t('docs.title') }}
        </RouterLink>
        <div v-for="g in groups" :key="g.key" class="docs-group">
          <h2>{{ $t(`docs.sections.${g.key}`) }}</h2>
          <RouterLink v-for="p in g.pages" :key="p.slug" :to="`/docs/${p.slug}`">
            <BaseIcon :name="p.icon" :size="18" /> {{ p.title }}
          </RouterLink>
        </div>
      </nav>
    </aside>
    <nav class="docs-chips" :aria-label="$t('docs.nav')">
      <RouterLink to="/docs" class="chip" :class="{ active: route.path === '/docs' }">{{ $t('nav.docs') }}</RouterLink>
      <RouterLink
        v-for="p in docPages"
        :key="p.slug"
        :to="`/docs/${p.slug}`"
        class="chip"
        :class="{ active: route.path === `/docs/${p.slug}` }"
      >
        {{ p.title }}
      </RouterLink>
    </nav>
    <div class="docs-main">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
.docs { display: grid; grid-template-columns: 250px minmax(0, 1fr); gap: 3rem; padding-block: 2.5rem 4.5rem; }
.docs-side nav { position: sticky; top: 5.5rem; display: flex; flex-direction: column; gap: 1.25rem; }
.docs-side a {
  display: flex; align-items: center; gap: 0.55rem; padding: 0.45rem 0.7rem; border-radius: var(--radius-xs);
  color: var(--text-2); font-weight: 550; text-decoration: none;
}
.docs-side a .icon { color: var(--muted); }
.docs-side a:hover { background: var(--surface-2); }
.docs-side a.router-link-exact-active, .docs-side a.active { background: var(--primary-soft); color: var(--primary); }
.docs-side a.router-link-exact-active .icon, .docs-side a.active .icon { color: var(--primary); }
.docs-home { font-weight: 700 !important; }
.docs-group { display: flex; flex-direction: column; gap: 0.1rem; }
.docs-group h2 { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--muted); margin: 0 0 0.35rem 0.7rem; }
.docs-chips { display: none; }
.docs-main { max-width: 780px; min-width: 0; }
@media (max-width: 900px) {
  .docs { grid-template-columns: 1fr; gap: 1.5rem; padding-top: 1rem; }
  .docs-side { display: none; }
  /* Horizontal chip lists scroll instead of wrapping (DESIGN.md). */
  .docs-chips {
    display: flex; gap: 0.4rem; overflow-x: auto; margin-inline: -1rem; padding: 0.25rem 1rem 0.5rem;
    scrollbar-width: none;
  }
  .docs-chips .chip { flex: none; text-decoration: none; }
}
</style>
