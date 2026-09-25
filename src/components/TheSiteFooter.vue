<script setup>
// The footer on every page: what Waschplaner is, links and the language.
import LanguagePicker from './LanguagePicker.vue'
import { CONTACT_EMAIL, REPO_URL } from '../site'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="site-footer">
    <div class="container footer-grid">
      <div class="footer-brand">
        <RouterLink to="/" class="brand">
          <img src="/favicon.svg" alt="" width="28" height="28">
          <span>Waschplaner</span>
        </RouterLink>
        <p class="muted small">{{ $t('footer.tagline') }}</p>
        <LanguagePicker />
      </div>
      <nav :aria-label="$t('footer.product')">
        <h2>{{ $t('footer.product') }}</h2>
        <RouterLink :to="{ path: '/', hash: '#features' }">{{ $t('nav.features') }}</RouterLink>
        <RouterLink to="/pricing">{{ $t('nav.pricing') }}</RouterLink>
        <RouterLink to="/docs">{{ $t('nav.docs') }}</RouterLink>
      </nav>
      <nav :aria-label="$t('footer.selfHost')">
        <h2>{{ $t('footer.selfHost') }}</h2>
        <RouterLink to="/docs/self-hosting">{{ $t('footer.guide') }}</RouterLink>
        <RouterLink to="/docs/configuration">{{ $t('footer.config') }}</RouterLink>
        <a :href="REPO_URL" rel="noopener">{{ $t('footer.source') }}</a>
      </nav>
      <nav :aria-label="$t('footer.legal')">
        <h2>{{ $t('footer.legal') }}</h2>
        <RouterLink to="/privacy">{{ $t('footer.privacy') }}</RouterLink>
        <RouterLink to="/imprint">{{ $t('footer.imprint') }}</RouterLink>
        <a :href="`mailto:${CONTACT_EMAIL}`">{{ $t('footer.contact') }}</a>
      </nav>
    </div>
    <div class="container footer-base small muted">{{ $t('footer.copyright', { year }) }}</div>
  </footer>
</template>

<style scoped>
.site-footer { background: var(--surface); border-top: 1px solid var(--border); padding-top: 3rem; }
.footer-grid { display: grid; grid-template-columns: 2fr repeat(3, 1fr); gap: 2rem; }
.footer-brand { display: flex; flex-direction: column; align-items: flex-start; gap: 0.75rem; max-width: 320px; }
.footer-brand p { margin: 0; }
.brand { display: flex; align-items: center; gap: 0.55rem; font-weight: 800; font-size: 1.1rem; color: var(--text); }
.brand:hover { text-decoration: none; }
nav { display: flex; flex-direction: column; gap: 0.15rem; }
nav h2 { font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--muted); margin-bottom: 0.4rem; }
nav a { color: var(--text-2); padding: 0.3rem 0; }
nav a:hover { color: var(--primary); }
.footer-base { border-top: 1px solid var(--border); margin-top: 2.5rem; padding-block: 1.25rem; }
@media (max-width: 800px) {
  .footer-grid { grid-template-columns: repeat(2, 1fr); }
  .footer-brand { grid-column: 1 / -1; }
}
@media (max-width: 420px) {
  .footer-grid { grid-template-columns: 1fr; }
  nav a { padding: 0.55rem 0; }
}
</style>
