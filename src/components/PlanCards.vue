<script setup>
// The three ways to use Waschplaner side by side: Free (the planner in the
// browser), Plus and self-hosted. Until the online version exists (ONLINE_AVAILABLE),
// Plus and self-hosting are shown greyed out as "coming later".
import BaseIcon from './BaseIcon.vue'
import { tm } from '../i18n'
import { ONLINE_AVAILABLE, appLink } from '../site'

const PLANS = [
  { key: 'free', icon: 'print', to: '/planner', featured: !ONLINE_AVAILABLE },
  // The app preselects Plus (its free trial) in the wizard's last step.
  { key: 'plus', icon: 'users', href: appLink('/setup?plan=plus'), featured: ONLINE_AVAILABLE, later: !ONLINE_AVAILABLE },
  { key: 'self', icon: 'server', to: '/docs/self-hosting', later: !ONLINE_AVAILABLE },
]
</script>

<template>
  <div class="plans">
    <article v-for="p in PLANS" :key="p.key" class="plan card" :class="{ featured: p.featured, later: p.later }" :aria-disabled="p.later || undefined">
      <span v-if="p.later" class="badge plan-badge later-badge"><BaseIcon name="clock" :size="14" /> {{ $t('common.later') }}</span>
      <span v-else-if="p.featured" class="badge plan-badge"><BaseIcon :name="p.key === 'plus' ? 'gift' : 'shield'" :size="14" /> {{ $t(`pricing.plans.${p.key}.badge`) }}</span>
      <div class="plan-head">
        <span class="icon-tile"><BaseIcon :name="p.icon" :size="22" /></span>
        <div>
          <h3>{{ $t(`pricing.plans.${p.key}.name`) }}</h3>
          <span class="muted small">{{ $t(`pricing.plans.${p.key}.tag`) }}</span>
        </div>
      </div>
      <p class="plan-price">
        <b>{{ $t(`pricing.plans.${p.key}.price`) }}</b>
        <span class="muted">{{ $t(`pricing.plans.${p.key}.unit`) }}</span>
      </p>
      <p class="plan-text">{{ $t(`pricing.plans.${p.key}.text`) }}</p>
      <ul class="plan-points">
        <li v-for="point in tm(`pricing.plans.${p.key}.points`)" :key="point">
          <BaseIcon name="check" :size="18" />
          <span>{{ point }}</span>
        </li>
      </ul>
      <span v-if="p.later" class="btn ghost block" aria-disabled="true">
        <BaseIcon name="clock" :size="18" /> {{ $t('common.later') }}
      </span>
      <RouterLink v-else-if="p.to" :to="p.to" class="btn block" :class="{ ghost: !p.featured }">
        {{ $t(`pricing.plans.${p.key}.cta`) }} <BaseIcon name="arrow-right" :size="18" />
      </RouterLink>
      <a v-else :href="p.href" class="btn block" :class="p.featured ? 'gift' : 'ghost'">
        <BaseIcon v-if="p.featured" name="gift" :size="18" />
        {{ $t(`pricing.plans.${p.key}.cta`) }}
        <BaseIcon v-if="!p.featured" name="arrow-right" :size="18" />
      </a>
    </article>
  </div>
</template>

<style scoped>
.plans { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; align-items: stretch; }
.plan { position: relative; display: flex; flex-direction: column; gap: 0.9rem; padding: 1.5rem; }
.card + .card { margin-top: 0; }
.plan.featured { border: 2px solid var(--primary); box-shadow: 0 0 0 4px var(--primary-soft), var(--shadow); }
.plan-badge { position: absolute; top: -0.75rem; right: 1.25rem; background: var(--gift); color: var(--on-strong); }
.plan.featured:not(.later) .plan-badge:not(.later-badge) { background: var(--ok); }
/* Not available yet: readable, but clearly not on offer. */
.plan.later { background: var(--surface-2); box-shadow: none; }
.plan.later > :not(.plan-badge) { opacity: 0.55; filter: grayscale(1); }
.plan.later .later-badge { background: var(--surface-3); color: var(--text-2); }
.plan.later .btn { cursor: not-allowed; pointer-events: none; }
.plan-head { display: flex; align-items: center; gap: 0.75rem; }
.plan-head h3 { margin: 0; font-size: 1.25rem; line-height: 1.2; }
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
