<script setup>
// Every feature in Free, Plus and self-hosted (data in lib/plans.js).
import BaseIcon from './BaseIcon.vue'
import { t } from '../i18n'
import { FEATURE_GROUPS, PLANS } from '../lib/plans'
import { ONLINE_AVAILABLE } from '../site'

const later = (p) => !ONLINE_AVAILABLE && p !== 'free'
const text = (v) => t(`pricing.values.${v}`)
</script>

<template>
  <div class="table-wrap compare-wrap">
    <table class="table compare">
      <caption class="sr-only">{{ $t('pricing.table.title') }}</caption>
      <thead>
        <tr>
          <th scope="col">{{ $t('pricing.table.feature') }}</th>
          <th v-for="p in PLANS" :key="p" scope="col" :class="{ plus: p === 'plus', later: later(p) }">
            {{ $t(`pricing.plans.${p}.name`) }}
            <span v-if="later(p)" class="later-tag">{{ $t('common.later') }}</span>
          </th>
        </tr>
      </thead>
      <tbody v-for="g in FEATURE_GROUPS" :key="g.key">
        <tr class="group">
          <th colspan="4" scope="colgroup">{{ $t(`pricing.table.groups.${g.key}`) }}</th>
        </tr>
        <tr v-for="row in g.rows" :key="row.key">
          <th scope="row">{{ $t(`pricing.table.rows.${row.key}`) }}</th>
          <td v-for="p in PLANS" :key="p" :class="{ plus: p === 'plus', later: later(p) }">
            <span v-if="row[p] === true" class="yes">
              <BaseIcon name="check" :size="20" /><span class="sr-only">{{ $t('common.included') }}</span>
            </span>
            <span v-else-if="row[p] === false" class="no">
              <BaseIcon name="minus" :size="18" /><span class="sr-only">{{ $t('common.notIncluded') }}</span>
            </span>
            <span v-else-if="row[p] === 'soon'" class="badge warn">{{ $t('common.soon') }}</span>
            <span v-else class="value">{{ text(row[p]) }}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.compare-wrap { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); box-shadow: var(--shadow-sm); }
.compare { table-layout: fixed; }
.compare th, .compare td { padding: 0.75rem 1rem; }
.compare thead th { font-size: 0.9rem; text-transform: none; letter-spacing: 0; color: var(--text); font-weight: 750; width: 18%; text-align: center; }
.compare thead th:first-child { width: auto; text-align: left; }
.compare td { text-align: center; }
.compare tbody th { font-weight: 500; color: var(--text); text-transform: none; letter-spacing: 0; font-size: 0.95rem; }
.compare .plus { background: color-mix(in srgb, var(--primary-soft) 55%, transparent); }
.compare thead .plus { color: var(--primary); }
.compare .later { opacity: 0.5; }
.later-tag { display: block; font-size: 0.7rem; font-weight: 600; color: var(--muted); text-transform: none; }
.compare tr.group th {
  background: var(--surface-2); color: var(--muted); font-size: 0.78rem; font-weight: 700; text-transform: uppercase;
  letter-spacing: 0.04em; padding-block: 0.5rem;
}
.compare tbody:first-of-type tr.group th { border-top: 0; }
.compare tbody tr:last-child td, .compare tbody tr:last-child th { border-bottom: 1px solid var(--border); }
.compare tbody:last-of-type tr:last-child td, .compare tbody:last-of-type tr:last-child th { border-bottom: 0; }
.yes { color: var(--ok); display: inline-grid; }
.no { color: var(--border-strong); display: inline-grid; }
.value { font-size: 0.88rem; font-weight: 600; color: var(--text-2); hyphens: auto; overflow-wrap: anywhere; }
@media (max-width: 720px) {
  .compare th, .compare td { padding: 0.6rem 0.25rem; }
  .compare tbody th { font-size: 0.87rem; padding-left: 0.75rem; }
  .compare thead th { width: 22%; font-size: 0.8rem; }
  .compare thead th:first-child { padding-left: 0.75rem; }
  .value { font-size: 0.78rem; }
}
</style>
