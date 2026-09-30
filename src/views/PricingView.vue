<script setup>
// Pricing: the three ways, where the line between Free and Plus is, how Plus works, what it
// costs for a house, every feature compared, and questions about paying.
import BaseIcon from '../components/BaseIcon.vue'
import FaqList from '../components/FaqList.vue'
import PlanCards from '../components/PlanCards.vue'
import PlanTable from '../components/PlanTable.vue'
import PriceCalculator from '../components/PriceCalculator.vue'
import { usePageTitle } from '../composables/usePageTitle'
import { t, tm } from '../i18n'

usePageTitle(() => t('pricing.title'))
</script>

<template>
  <section class="head">
    <div class="container">
      <div class="section-head center">
        <span class="eyebrow">{{ $t('pricing.head.eyebrow') }}</span>
        <h1>{{ $t('pricing.head.title') }}</h1>
        <p>{{ $t('pricing.head.text') }}</p>
      </div>
      <PlanCards />
    </div>
  </section>

  <!-- the rule behind Free and Plus -->
  <section class="section tinted">
    <div class="container">
      <div class="section-head">
        <span class="eyebrow">{{ $t('pricing.principle.eyebrow') }}</span>
        <h2>{{ $t('pricing.principle.title') }}</h2>
        <p>{{ $t('pricing.principle.text') }}</p>
      </div>
      <div class="split">
        <div class="side tap">
          <div class="side-head">
            <span class="icon-tile ok"><BaseIcon name="print" :size="22" /></span>
            <h3>{{ $t('pricing.principle.free.title') }}</h3>
            <span class="badge ok">{{ $t('pricing.principle.free.tag') }}</span>
          </div>
          <ul class="tap-list">
            <li v-for="item in tm('pricing.principle.free.items')" :key="item">
              <BaseIcon name="check" :size="18" /> {{ item }}
            </li>
          </ul>
        </div>
        <div class="side server">
          <div class="side-head">
            <span class="icon-tile"><BaseIcon name="users" :size="22" /></span>
            <h3>{{ $t('pricing.principle.plus.title') }}</h3>
            <span class="badge primary">{{ $t('pricing.principle.plus.tag') }}</span>
          </div>
          <ul class="server-list">
            <li v-for="item in tm('pricing.principle.plus.items')" :key="item.title">
              <BaseIcon :name="item.icon" :size="20" />
              <div>
                <b>{{ item.title }}</b>
                <span>{{ item.text }}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <!-- how Plus works: try, buy, renew, and what happens at the end -->
  <section class="section">
    <div class="container">
      <div class="section-head">
        <span class="eyebrow">{{ $t('pricing.journey.eyebrow') }}</span>
        <h2>{{ $t('pricing.journey.title') }}</h2>
        <p>{{ $t('pricing.journey.text') }}</p>
      </div>
      <ol class="journey">
        <li v-for="(step, i) in tm('pricing.journey.steps')" :key="step.title">
          <span class="icon-tile" :class="{ gift: i === 0 }"><BaseIcon :name="step.icon" :size="22" /></span>
          <h3>{{ step.title }}</h3>
          <p>{{ step.text }}</p>
        </li>
      </ol>
      <div class="calc-wrap">
        <PriceCalculator />
      </div>
    </div>
  </section>

  <section class="section tinted">
    <div class="container">
      <div class="section-head">
        <h2>{{ $t('pricing.table.title') }}</h2>
      </div>
      <PlanTable />
    </div>
  </section>

  <section class="section">
    <div class="container narrow">
      <div class="section-head center">
        <h2>{{ $t('pricing.faq.title') }}</h2>
      </div>
      <FaqList :items="tm('pricing.faq.items')" />
    </div>
  </section>
</template>

<style scoped>
.head {
  padding: 3.5rem 0 4.5rem;
  background: radial-gradient(1200px 480px at 50% -20%, var(--primary-soft), transparent), var(--bg);
}
.head h1 { font-size: clamp(1.8rem, 1.3rem + 1.8vw, 2.6rem); font-weight: 800; letter-spacing: -0.02em; line-height: 1.15; margin-bottom: 0.75rem; }
.head .section-head { max-width: 760px; margin-bottom: 3rem; }

.split { display: grid; grid-template-columns: minmax(0, 2fr) minmax(0, 3fr); gap: 1rem; }
.side { border-radius: var(--radius); padding: 1.5rem; border: 1px solid var(--border); }
.side.tap { background: var(--bg); }
.side.server { background: var(--primary-soft); border-color: var(--primary-border); }
.side-head { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.25rem; flex-wrap: wrap; }
.side-head h3 { margin: 0; font-size: 1.15rem; flex: 1; }
.tap-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 0.7rem; }
.tap-list li { display: flex; align-items: center; gap: 0.55rem; }
.tap-list .icon { color: var(--ok); }
.server-list { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.1rem 1.5rem; }
.server-list li { display: flex; gap: 0.7rem; align-items: flex-start; }
.server-list .icon { color: var(--primary); margin-top: 2px; }
.server-list b { display: block; }
.server-list span { color: var(--text-2); font-size: 0.93rem; }

.journey { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; position: relative; }
.journey li { position: relative; padding: 1.25rem; border-radius: var(--radius); background: var(--surface); border: 1px solid var(--border); box-shadow: var(--shadow-sm); }
/* a line from one step to the next */
.journey li + li::before {
  content: ''; position: absolute; top: 2.55rem; left: calc(-1rem - 1px); width: 1rem; border-top: 2px dashed var(--border-strong);
}
.journey h3 { margin: 0.9rem 0 0.3rem; }
.journey p { margin: 0; color: var(--text-2); font-size: 0.95rem; }
.calc-wrap { max-width: 820px; margin: 2.5rem auto 0; }
@media (max-width: 900px) {
  .split { grid-template-columns: 1fr; }
  .journey { grid-template-columns: repeat(2, 1fr); }
  .journey li:nth-child(odd)::before { display: none; }
}
@media (max-width: 560px) {
  .journey { grid-template-columns: 1fr; }
  .journey li::before { display: none; }
}
@media (max-width: 560px) {
  .server-list { grid-template-columns: 1fr; }
  .head { padding-top: 2.5rem; }
}
</style>
