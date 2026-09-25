<script setup>
// The three ways to use Waschplaner side by side: Free, Plus and self-hosted.
import BaseIcon from './BaseIcon.vue'
import { tm } from '../i18n'
import { FREE_HISTORY_WEEKS, appLink } from '../site'

const PLANS = [
  { key: 'free', icon: 'home', href: appLink('/setup') },
  // The app reads ?plan=plus and offers Plus at the end of the wizard.
  { key: 'plus', icon: 'heart', href: appLink('/setup?plan=plus'), featured: true },
  { key: 'self', icon: 'server', to: '/docs/self-hosting' },
]
const fill = (text) => text.replace('{weeks}', FREE_HISTORY_WEEKS)
</script>

<template>
  <div class="plans">
    <article v-for="p in PLANS" :key="p.key" class="plan card" :class="{ featured: p.featured }">
      <span v-if="p.featured" class="badge primary plan-badge">{{ $t(`pricing.plans.${p.key}.badge`) }}</span>
      <div class="plan-head">
        <span class="icon-tile"><BaseIcon :name="p.icon" :size="22" /></span>
        <h3>{{ $t(`pricing.plans.${p.key}.name`) }}</h3>
      </div>
      <p class="plan-price">
        <b>{{ $t(`pricing.plans.${p.key}.price`) }}</b>
        <span class="muted">{{ $t(`pricing.plans.${p.key}.unit`) }}</span>
      </p>
      <p class="plan-text">{{ $t(`pricing.plans.${p.key}.text`) }}</p>
      <ul class="plan-points">
        <li v-for="point in tm(`pricing.plans.${p.key}.points`)" :key="point">
          <BaseIcon name="check" :size="18" />
          <span>{{ fill(point) }}</span>
        </li>
      </ul>
      <RouterLink v-if="p.to" :to="p.to" class="btn ghost block">
        {{ $t(`pricing.plans.${p.key}.cta`) }} <BaseIcon name="arrow-right" :size="18" />
      </RouterLink>
      <a v-else :href="p.href" class="btn block" :class="{ ghost: !p.featured }">
        {{ $t(`pricing.plans.${p.key}.cta`) }} <BaseIcon name="arrow-right" :size="18" />
      </a>
    </article>
  </div>
</template>

<style scoped>
.plans { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; align-items: stretch; }
.plan { position: relative; display: flex; flex-direction: column; gap: 0.9rem; padding: 1.5rem; }
.card + .card { margin-top: 0; }
.plan.featured { border: 2px solid var(--primary); box-shadow: 0 0 0 4px var(--primary-soft), var(--shadow); }
.plan-badge { position: absolute; top: -0.75rem; right: 1.25rem; background: var(--primary); color: var(--primary-ink); }
.plan-head { display: flex; align-items: center; gap: 0.75rem; }
.plan-head h3 { margin: 0; font-size: 1.25rem; }
.plan-price { display: flex; flex-direction: column; margin: 0; }
.plan-price b { font-size: 2rem; font-weight: 800; letter-spacing: -0.02em; line-height: 1.1; }
.plan-text { margin: 0; color: var(--text-2); }
.plan-points { list-style: none; margin: 0 0 0.5rem; padding: 0.9rem 0 0; border-top: 1px solid var(--border); display: flex; flex-direction: column; gap: 0.5rem; flex: 1; }
.plan-points li { display: flex; gap: 0.5rem; align-items: flex-start; }
.plan-points .icon { color: var(--ok); margin-top: 2px; }
@media (max-width: 960px) {
  .plans { grid-template-columns: 1fr; max-width: 520px; margin-inline: auto; }
}
</style>
