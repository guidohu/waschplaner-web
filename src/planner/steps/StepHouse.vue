<script setup>
import BaseCallout from '../../components/BaseCallout.vue'
import BaseColorDot from '../components/BaseColorDot.vue'
import BaseStepper from '../../components/BaseStepper.vue'
import { draft, fillByFloor, fillNumbered, parties, setPartyColor, setPartyCount, setPartyName } from '../draft'
</script>

<template>
  <section class="setup-step">
    <header class="step-head">
      <h1 tabindex="-1">{{ $t('setup.house.title') }}</h1>
      <p class="lead">{{ $t('setup.house.lead') }}</p>
    </header>

    <div class="card stack">
      <label class="field">
        <span>{{ $t('setup.house.name') }}</span>
        <input
          v-model="draft.houseName"
          :placeholder="$t('setup.house.namePh')"
          maxlength="120"
          autocomplete="off"
        >
        <span class="hint">{{ $t('setup.house.nameHint') }}</span>
      </label>
    </div>

    <div class="card stack">
      <h2>{{ $t('setup.house.flatsTitle') }}</h2>
      <div class="field">
        <span id="flat-count">{{ $t('setup.house.count') }}</span>
        <BaseStepper
          :model-value="draft.parties.length"
          :label="$t('setup.house.count')"
          :min="1"
          :max="60"
          @update:model-value="setPartyCount"
        />
      </div>

      <div class="field">
        <span>{{ $t('setup.house.names') }}</span>
        <div class="quickfill">
          <span class="muted small">{{ $t('setup.house.quickFill') }}</span>
          <button type="button" class="chip" @click="fillNumbered">{{ $t('setup.house.fillNumbers') }}</button>
          <button type="button" class="chip" @click="fillByFloor(2)">{{ $t('setup.house.fillFloors2') }}</button>
          <button type="button" class="chip" @click="fillByFloor(1)">{{ $t('setup.house.fillFloors1') }}</button>
        </div>
        <div class="name-grid">
          <div v-for="(p, i) in parties" :key="p.id" class="name-input">
            <BaseColorDot
              :model-value="p.color"
              :label="$t('setup.house.colorLabel', { name: p.name })"
              :size="18"
              @update:model-value="setPartyColor(i, $event)"
            />
            <input
              :value="p.name"
              maxlength="60"
              :aria-label="$t('setup.house.flatLabel', { n: i + 1 })"
              :aria-invalid="!p.name"
              @input="setPartyName(i, $event.target.value)"
            >
          </div>
        </div>
        <span class="hint">{{ $t('setup.house.colorHint') }}</span>
      </div>

      <BaseCallout tone="privacy">{{ $t('setup.house.privacyTip') }}</BaseCallout>
    </div>
  </section>
</template>

<style scoped>
.quickfill { display: flex; flex-wrap: wrap; align-items: center; gap: 0.4rem; margin-bottom: 0.25rem; }
.quickfill .chip { font-size: 0.84rem; min-height: 32px; padding: 0.2rem 0.7rem; }
</style>
