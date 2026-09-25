<script setup>
// The header on every page: brand, main links, language and the way into the app.
// Up to 900 px the links move into a menu that opens below the header.
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import BaseIcon from './BaseIcon.vue'
import LanguagePicker from './LanguagePicker.vue'
import { t } from '../i18n'
import { appLink } from '../site'

const route = useRoute()
const open = ref(false)

const links = computed(() => {
  const selfHost = route.path === '/docs/self-hosting' || route.path === '/docs/configuration'
  return [
    { to: { path: '/', hash: '#features' }, label: t('nav.features'), active: false },
    { to: '/pricing', label: t('nav.pricing'), active: route.path === '/pricing' },
    { to: '/docs/self-hosting', label: t('nav.selfHost'), active: selfHost },
    { to: '/docs', label: t('nav.docs'), active: route.path.startsWith('/docs') && !selfHost },
  ]
})

watch(() => route.fullPath, () => (open.value = false))
const onKey = (e) => e.key === 'Escape' && (open.value = false)
onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
</script>

<template>
  <header class="site-header">
    <a class="skip" href="#main">{{ $t('nav.skip') }}</a>
    <div class="inner container">
      <RouterLink to="/" class="brand" :aria-label="$t('nav.home')">
        <img src="/favicon.svg" alt="" width="32" height="32">
        <span>Waschplaner</span>
      </RouterLink>

      <nav class="links" :aria-label="$t('nav.main')">
        <RouterLink
          v-for="l in links"
          :key="l.label"
          :to="l.to"
          :class="{ active: l.active }"
          :aria-current="l.active ? 'page' : undefined"
        >
          {{ l.label }}
        </RouterLink>
      </nav>

      <div class="actions">
        <LanguagePicker class="wide-only" />
        <a class="btn ghost sm wide-only" :href="appLink('/login')">{{ $t('nav.login') }}</a>
        <a class="btn sm" :href="appLink('/setup')">{{ $t('nav.start') }}</a>
        <button
          type="button"
          class="btn ghost sm menu-btn"
          :aria-expanded="open"
          aria-controls="site-menu"
          @click="open = !open"
        >
          <BaseIcon :name="open ? 'x' : 'menu'" :size="18" />
          {{ open ? $t('nav.close') : $t('nav.menu') }}
        </button>
      </div>
    </div>

    <div v-if="open" id="site-menu" class="menu">
      <nav class="container menu-inner" :aria-label="$t('nav.main')">
        <RouterLink v-for="l in links" :key="l.label" :to="l.to" :class="{ active: l.active }">
          {{ l.label }}
          <BaseIcon name="chevron-right" :size="18" />
        </RouterLink>
        <div class="menu-foot">
          <a class="btn ghost block" :href="appLink('/login')">{{ $t('nav.login') }}</a>
          <LanguagePicker />
        </div>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.site-header {
  position: sticky; top: 0; z-index: 20; background: color-mix(in srgb, var(--surface) 92%, transparent);
  backdrop-filter: blur(8px); border-bottom: 1px solid var(--border);
}
.inner { display: flex; align-items: center; gap: 1.25rem; min-height: 64px; }
.brand { display: flex; align-items: center; gap: 0.6rem; font-weight: 800; font-size: 1.15rem; color: var(--text); flex: none; }
.brand:hover { text-decoration: none; }
.links { display: flex; gap: 0.25rem; }
.links a {
  color: var(--text-2); font-weight: 600; padding: 0.45rem 0.8rem; border-radius: var(--radius-xs); text-decoration: none;
}
.links a:hover { background: var(--surface-2); }
.links a.active { color: var(--primary); background: var(--primary-soft); }
.actions { display: flex; align-items: center; gap: 0.5rem; margin-left: auto; }
.menu-btn { display: none; }

.skip:not(:focus) { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0, 0, 0, 0); }
.skip {
  position: absolute; left: 1rem; top: 0.5rem; z-index: 50; padding: 0.5rem 1rem; border-radius: var(--radius-sm);
  background: var(--primary); color: var(--primary-ink); font-weight: 650;
}

.menu { border-top: 1px solid var(--border); background: var(--surface); box-shadow: var(--shadow-lg); }
.menu-inner { display: flex; flex-direction: column; padding-block: 0.5rem 1rem; }
.menu-inner > a {
  display: flex; align-items: center; justify-content: space-between; min-height: 52px; padding: 0 0.5rem;
  color: var(--text); font-weight: 650; font-size: 1.05rem; border-bottom: 1px solid var(--border); text-decoration: none;
}
.menu-inner > a.active { color: var(--primary); }
.menu-inner > a .icon { color: var(--muted); }
.menu-foot { display: flex; align-items: center; gap: 0.75rem; margin-top: 1rem; }
.menu-foot .btn { flex: 1; }

@media (max-width: 900px) {
  .links, .wide-only { display: none; }
  .menu-btn { display: inline-flex; }
}
@media (min-width: 901px) {
  .menu { display: none; }
}
@media (max-width: 420px) {
  .inner { gap: 0.5rem; }
  .brand span { display: none; }
}
</style>
