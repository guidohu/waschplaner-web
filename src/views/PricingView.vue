<script setup>
// Pricing: the three ways, where the line between Free and Plus is, what Plus
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
            <span class="icon-tile ok"><BaseIcon name="hand" :size="22" /></span>
            <h3>{{ $t('pricing.principle.tap.title') }}</h3>
            <span class="badge ok">{{ $t('pricing.principle.tap.tag') }}</span>
          </div>
          <ul class="tap-list">
            <li v-for="item in tm('pricing.principle.tap.items')" :key="item">
              <BaseIcon name="check" :size="18" /> {{ item }}
            </li>
          </ul>
        </div>
        <div class="side server">
          <div class="side-head">
            <span class="icon-tile"><BaseIcon name="server" :size="22" /></span>
            <h3>{{ $t('pricing.principle.server.title') }}</h3>
            <span class="badge primary">{{ $t('pricing.principle.server.tag') }}</span>
          </div>
          <ul class="server-list">
            <li v-for="item in tm('pricing.principle.server.items')" :key="item.title">
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

  <section class="section">
    <div class="container narrow">
      <PriceCalculator />
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
@media (max-width: 900px) {
  .split { grid-template-columns: 1fr; }
}
@media (max-width: 560px) {
  .server-list { grid-template-columns: 1fr; }
  .head { padding-top: 2.5rem; }
}
</style>
