<script setup>
// What Plus costs for a house of a given size.
import { computed, ref } from 'vue'
import BaseStepper from './BaseStepper.vue'
import { i18n } from '../i18n'
import { fmtCHF } from '../lib/format'
import { plusPrice } from '../lib/plans'
import { PRICE_PER_FLAT } from '../site'

const QUICK = [4, 8, 12, 24]
const flats = ref(8)
const perYear = computed(() => plusPrice(flats.value, PRICE_PER_FLAT))
const fmt = (amount) => fmtCHF(amount, i18n.locale)
</script>

<template>
  <div class="calc card">
    <h3>{{ $t('pricing.calc.title') }}</h3>
    <div class="calc-body">
      <div class="field">
        <span>{{ $t('pricing.calc.label') }}</span>
        <BaseStepper v-model="flats" :label="$t('pricing.calc.label')" :min="1" :max="500" />
        <div class="chips">
          <button v-for="n in QUICK" :key="n" type="button" class="chip" :class="{ active: flats === n }" @click="flats = n">{{ n }}</button>
        </div>
      </div>
      <div class="calc-result" aria-live="polite">
        <b>{{ fmt(perYear) }}</b>
        <span>{{ $t('pricing.calc.perYear') }}</span>
        <span class="muted small">{{ $t('pricing.calc.perMonth', { amount: fmt(perYear / 12) }) }}</span>
      </div>
    </div>
    <p class="muted small calc-note">{{ $t('pricing.calc.note') }}</p>
  </div>
</template>

<style scoped>
.calc h3 { font-size: 1.15rem; margin-bottom: 1rem; }
.calc-body { display: flex; align-items: center; justify-content: space-between; gap: 1.5rem; flex-wrap: wrap; }
.calc-result {
  display: flex; flex-direction: column; align-items: flex-end; text-align: right; padding: 1rem 1.25rem; border-radius: var(--radius);
  background: var(--primary-soft); border: 1px solid var(--primary-border); min-width: 220px;
}
.calc-result b { font-size: 2.1rem; font-weight: 800; color: var(--primary); letter-spacing: -0.02em; font-variant-numeric: tabular-nums; line-height: 1.15; }
.chips { margin-top: 0.25rem; }
.chip { min-width: 52px; justify-content: center; }
.calc-note { margin: 1rem 0 0; }
@media (max-width: 560px) {
  .calc-result { align-items: flex-start; text-align: left; width: 100%; }
}
</style>
