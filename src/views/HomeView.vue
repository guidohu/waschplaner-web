<script setup>
// The landing page: what Waschplaner is, how it works, what it costs.
import BaseIcon from '../components/BaseIcon.vue'
import DemoWeek from '../components/DemoWeek.vue'
import FaqList from '../components/FaqList.vue'
import PlanCards from '../components/PlanCards.vue'
import { usePageTitle } from '../composables/usePageTitle'
import { t, tm } from '../i18n'
import { ONLINE_AVAILABLE } from '../site'

usePageTitle(() => t('home.title'))

// What is on Free (the planner in the browser) and what comes with Plus, as in the app.
// Until the online version exists, the Plus features are greyed out as "coming later".
const FEATURES = [
  { key: 'plan', icon: 'repeat' },
  { key: 'rooms', icon: 'layers' },
  { key: 'print', icon: 'print' },
  { key: 'book', icon: 'plus-circle', plus: true },
  { key: 'finish', icon: 'check-circle', plus: true },
  { key: 'takeover', icon: 'bolt', plus: true },
  { key: 'mail', icon: 'calendar', plus: true },
  { key: 'screen', icon: 'screen', plus: true },
]
</script>

<template>
  <!-- hero -->
  <section class="hero">
    <div class="container hero-grid">
      <div class="hero-text">
        <span class="eyebrow">{{ $t('home.hero.eyebrow') }}</span>
        <h1>{{ $t('home.hero.title') }}</h1>
        <p class="lead">{{ $t('home.hero.text') }}</p>
        <div class="row hero-actions">
          <RouterLink class="btn lg" to="/planner">
            {{ $t('home.hero.start') }} <BaseIcon name="arrow-right" :size="18" />
          </RouterLink>
          <RouterLink class="btn ghost lg" :to="{ path: '/', hash: '#features' }">
            <BaseIcon name="list" :size="18" /> {{ $t('home.hero.more') }}
          </RouterLink>
        </div>
        <ul class="hero-facts">
          <li v-for="fact in tm('home.hero.facts')" :key="fact">
            <BaseIcon name="check-circle" :size="18" /> {{ fact }}
          </li>
        </ul>
      </div>
      <DemoWeek class="hero-demo" />
    </div>
  </section>

  <!-- how it works -->
  <section class="section tinted">
    <div class="container">
      <div class="section-head center">
        <span class="eyebrow">{{ $t('home.steps.eyebrow') }}</span>
        <h2>{{ $t('home.steps.title') }}</h2>
        <p>{{ $t('home.steps.text') }}</p>
      </div>
      <ol class="steps">
        <li v-for="(step, i) in tm('home.steps.items')" :key="step.title" class="step" :class="{ later: step.later && !ONLINE_AVAILABLE }">
          <span class="step-num" aria-hidden="true">{{ i + 1 }}</span>
          <span v-if="step.later && !ONLINE_AVAILABLE" class="badge later-badge"><BaseIcon name="clock" :size="12" /> {{ $t('common.later') }}</span>
          <span class="icon-tile"><BaseIcon :name="step.icon" :size="22" /></span>
          <h3>{{ step.title }}</h3>
          <p>{{ step.text }}</p>
        </li>
      </ol>
    </div>
  </section>

  <!-- features -->
  <section id="features" class="section">
    <div class="container">
      <div class="section-head">
        <span class="eyebrow">{{ $t('home.features.eyebrow') }}</span>
        <h2>{{ $t('home.features.title') }}</h2>
        <p>{{ $t('home.features.text') }}</p>
      </div>
      <div class="features">
        <article v-for="f in FEATURES" :key="f.key" class="feature" :class="{ later: f.plus && !ONLINE_AVAILABLE }">
          <div class="feature-head">
            <span class="icon-tile" :class="{ ok: !f.plus }"><BaseIcon :name="f.icon" :size="22" /></span>
            <span v-if="f.plus && !ONLINE_AVAILABLE" class="badge later-badge"><BaseIcon name="clock" :size="12" /> {{ $t('common.laterPlus') }}</span>
            <span v-else class="badge" :class="f.plus ? 'primary' : 'ok'">{{ $t(f.plus ? 'common.plus' : 'common.free') }}</span>
          </div>
          <h3>{{ $t(`home.features.items.${f.key}.title`) }}</h3>
          <p>{{ $t(`home.features.items.${f.key}.text`) }}</p>
        </article>
      </div>
    </div>
  </section>

  <!-- for everyone -->
  <section class="section tinted">
    <div class="container everyone">
      <div class="section-head">
        <span class="eyebrow">{{ $t('home.everyone.eyebrow') }}</span>
        <h2>{{ $t('home.everyone.title') }}</h2>
        <p>{{ $t('home.everyone.text') }}</p>
      </div>
      <div class="everyone-list">
        <div v-for="item in tm('home.everyone.items')" :key="item.title" class="everyone-item">
          <span class="icon-tile ok"><BaseIcon :name="item.icon" :size="22" /></span>
          <div>
            <h3>{{ item.title }}</h3>
            <p>{{ item.text }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- three ways -->
  <section class="section">
    <div class="container">
      <div class="section-head center">
        <span class="eyebrow">{{ $t('home.ways.eyebrow') }}</span>
        <h2>{{ $t('home.ways.title') }}</h2>
        <p>{{ $t('home.ways.text') }}</p>
      </div>
      <PlanCards />
      <p class="center-link">
        <RouterLink to="/pricing" class="btn subtle">
          {{ $t('home.ways.compare') }} <BaseIcon name="arrow-right" :size="18" />
        </RouterLink>
      </p>
    </div>
  </section>

  <!-- FAQ -->
  <section class="section tinted">
    <div class="container narrow">
      <div class="section-head center">
        <h2>{{ $t('home.faq.title') }}</h2>
      </div>
      <FaqList :items="tm('home.faq.items')" />
    </div>
  </section>

  <!-- call to action -->
  <section class="section">
    <div class="container">
      <div class="cta">
        <div>
          <h2>{{ $t('home.cta.title') }}</h2>
          <p>{{ $t('home.cta.text') }}</p>
        </div>
        <RouterLink class="btn lg cta-btn" to="/planner">
          {{ $t('home.hero.start') }} <BaseIcon name="arrow-right" :size="18" />
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  padding: 4rem 0 4.5rem; overflow: hidden;
  background: radial-gradient(1200px 520px at 5% -10%, var(--primary-soft), transparent), var(--bg);
}
.hero-grid { display: grid; grid-template-columns: minmax(0, 5fr) minmax(0, 7fr); gap: 3rem; align-items: center; }
.hero h1 { font-size: clamp(2.1rem, 1.4rem + 2.6vw, 3.3rem); font-weight: 800; letter-spacing: -0.025em; line-height: 1.08; margin-bottom: 1rem; }
.hero .lead { max-width: 34rem; margin-bottom: 1.75rem; }
.hero-actions { gap: 0.75rem; }
.hero-facts { list-style: none; padding: 0; margin: 1.5rem 0 0; display: flex; flex-wrap: wrap; gap: 0.5rem 1.25rem; color: var(--text-2); font-size: 0.93rem; }
.hero-facts li { display: inline-flex; align-items: center; gap: 0.4rem; }
.hero-facts .icon { color: var(--ok); }

.steps { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; counter-reset: none; }
.step { position: relative; padding: 1.5rem; border-radius: var(--radius); background: var(--bg); border: 1px solid var(--border); }
.step h3 { margin: 1rem 0 0.35rem; font-size: 1.1rem; }
.step p { margin: 0; color: var(--text-2); }
.step-num {
  position: absolute; top: 1.25rem; right: 1.25rem; font-size: 2.6rem; font-weight: 800; line-height: 1;
  color: var(--surface-3);
}

.features { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; }
.feature { padding: 1.25rem; border-radius: var(--radius); background: var(--surface); border: 1px solid var(--border); box-shadow: var(--shadow-sm); }
.feature-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 0.5rem; }
/* Coming later (the online version): readable, but clearly not on offer yet. */
.later-badge { background: var(--surface-3); color: var(--text-2); }
.feature.later, .step.later { background: var(--surface-2); box-shadow: none; }
.feature.later .icon-tile, .feature.later h3, .feature.later p,
.step.later .icon-tile, .step.later h3, .step.later p { opacity: 0.6; filter: grayscale(1); }
.step .later-badge { position: absolute; top: 1.25rem; left: 4.25rem; }
.feature h3 { margin: 0.9rem 0 0.3rem; }
.feature p { margin: 0; color: var(--text-2); font-size: 0.95rem; }

.everyone { display: grid; grid-template-columns: minmax(0, 2fr) minmax(0, 3fr); gap: 3rem; align-items: start; }
.everyone .section-head { margin: 0; position: sticky; top: 6rem; }
.everyone-list { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem 2rem; }
.everyone-item { display: flex; gap: 0.9rem; align-items: flex-start; }
.everyone-item h3 { margin: 0.35rem 0 0.25rem; }
.everyone-item p { margin: 0; color: var(--text-2); font-size: 0.95rem; }

.center-link { text-align: center; margin: 2rem 0 0; }

.cta {
  display: flex; align-items: center; justify-content: space-between; gap: 1.5rem 2.5rem; flex-wrap: wrap;
  padding: 2.5rem; border-radius: calc(var(--radius) + 6px); background: var(--primary); color: var(--primary-ink);
}
.cta h2 { font-size: clamp(1.4rem, 1.1rem + 1vw, 1.9rem); font-weight: 800; margin-bottom: 0.35rem; }
.cta p { margin: 0; opacity: 0.92; font-size: 1.05rem; }
.cta-btn { background: var(--primary-ink); color: var(--primary); }
.cta-btn:hover { background: var(--primary-soft); }

@media (max-width: 1080px) {
  .hero-grid { grid-template-columns: 1fr; gap: 2.5rem; }
  .hero-text { max-width: 640px; }
  .features { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 860px) {
  .steps { grid-template-columns: 1fr; }
  .everyone { grid-template-columns: 1fr; gap: 1.5rem; }
  .everyone .section-head { position: static; }
}
@media (max-width: 560px) {
  .hero { padding: 2.5rem 0 3rem; }
  .hero-actions .btn { width: 100%; }
  .features, .everyone-list { grid-template-columns: 1fr; }
  .cta { padding: 1.75rem 1.25rem; }
  .cta-btn { width: 100%; }
}
</style>
