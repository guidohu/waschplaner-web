<script setup>
import { computed } from 'vue'
import BaseChoice from '../components/BaseChoice.vue'
import BaseHelp from '../components/BaseHelp.vue'
import BaseIcon from '../../components/BaseIcon.vue'
import BaseStepper from '../../components/BaseStepper.vue'
import ResourceLabel from '../components/ResourceLabel.vue'
import {
  bookingMode,
  draft,
  groupName,
  itemName,
  machineCount,
  setItemName,
  setMachineCount,
  units,
  usedGroups,
} from '../draft'
import { MACHINE_KINDS, kindIcon } from '../lib/resources'
import { t } from '../../i18n'

const modeOptions = computed(() => [
  { value: 'together', icon: 'basket', title: t('setup.machines.together'), text: t('setup.machines.togetherHint') },
  { value: 'separate', icon: 'grid', title: t('setup.machines.separate'), text: t('setup.machines.separateHint') },
  { value: 'mixed', icon: 'layers', title: t('setup.machines.mixed'), text: t('setup.machines.mixedHint') },
])
const groupChoices = computed(() => draft.items.map((_, i) => i + 1))
const setGroupName = (g, name) => (draft.groupNames = { ...draft.groupNames, [g]: name })
</script>

<template>
  <section class="setup-step">
    <header class="step-head">
      <h1 tabindex="-1">{{ $t('setup.machines.title') }}</h1>
      <p class="lead">{{ $t('setup.machines.lead') }}</p>
    </header>

    <div class="card stack">
      <div class="machine-counts">
        <div v-for="k in MACHINE_KINDS" :key="k" class="machine-count">
          <span class="machine-icon"><BaseIcon :name="kindIcon(k)" :size="26" /></span>
          <span class="machine-label">
            <b>{{ $t('kind.plural.' + k) }}</b>
            <span class="muted small">{{ $t('setup.machines.example.' + k) }}</span>
          </span>
          <BaseStepper
            :model-value="machineCount(k)"
            :label="$t('kind.plural.' + k)"
            :min="0"
            :max="10"
            @update:model-value="setMachineCount(k, $event)"
          />
        </div>
      </div>
    </div>

    <div v-if="draft.items.length > 1" class="card stack">
      <h2>{{ $t('setup.machines.howTitle') }}</h2>
      <BaseChoice v-model="draft.bookingMode" name="booking-mode" :options="modeOptions" />
      <BaseHelp>
        <p>{{ $t('setup.machines.help1') }}</p>
        <p>{{ $t('setup.machines.help2') }}</p>
      </BaseHelp>
    </div>

    <div v-if="draft.items.length" class="card stack">
      <h2>{{ $t('setup.machines.namesTitle') }}</h2>

      <label v-if="bookingMode === 'together'" class="field">
        <span>{{ $t('setup.machines.togetherName') }}</span>
        <input v-model="draft.togetherName" :placeholder="$t('kind.laundry_room')" maxlength="60">
      </label>

      <div v-else-if="bookingMode === 'separate'" class="name-grid">
        <label v-for="it in draft.items" :key="it.id" class="name-input">
          <BaseIcon :name="kindIcon(it.kind)" :size="20" />
          <span class="sr-only">{{ $t('kind.' + it.kind) }}</span>
          <input :value="itemName(it)" maxlength="60" @input="setItemName(it, $event.target.value)">
        </label>
      </div>

      <template v-else>
        <p class="muted small">{{ $t('setup.machines.mixedIntro') }}</p>
        <div class="group-table">
          <label v-for="it in draft.items" :key="it.id" class="group-row">
            <span class="row-label"><BaseIcon :name="kindIcon(it.kind)" :size="20" /> {{ itemName(it) }}</span>
            <select v-model.number="it.group" class="auto-width" :aria-label="$t('setup.machines.groupOf', { name: itemName(it) })">
              <option v-for="g in groupChoices" :key="g" :value="g">{{ $t('setup.machines.groupN', { n: g }) }}</option>
            </select>
          </label>
        </div>
        <div class="name-grid">
          <label v-for="g in usedGroups" :key="g" class="field">
            <span>{{ $t('setup.machines.groupNameLabel', { n: g }) }}</span>
            <input :value="groupName(g)" maxlength="60" @input="setGroupName(g, $event.target.value)">
          </label>
        </div>
      </template>

      <div class="preview-card">
        <div class="preview-head">
          <b>{{ $t('setup.machines.previewTitle') }}</b>
          <span class="muted small">{{ $t('setup.machines.previewCount', { n: units.length }) }}</span>
        </div>
        <div class="unit-list">
          <ResourceLabel v-for="u in units" :key="u.id" :resource="u" card />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.machine-counts { display: flex; flex-direction: column; gap: 0.6rem; }
.machine-count {
  display: flex; align-items: center; gap: 0.8rem; padding: 0.7rem 0.8rem; border: 1px solid var(--border);
  border-radius: var(--radius); background: var(--surface-2);
}
.machine-icon {
  flex: none; display: grid; place-items: center; width: 46px; height: 46px; border-radius: var(--radius-sm);
  background: var(--surface); color: var(--primary); border: 1px solid var(--border);
}
.machine-label { flex: 1; display: flex; flex-direction: column; min-width: 0; line-height: 1.3; hyphens: auto; overflow-wrap: anywhere; }
@media (max-width: 480px) {
  .machine-count { gap: 0.6rem; padding: 0.6rem; }
  .machine-icon { width: 36px; height: 36px; }
}
.group-table { display: flex; flex-direction: column; gap: 0.4rem; }
.group-row { display: flex; align-items: center; justify-content: space-between; gap: 1rem; padding: 0.35rem 0; border-bottom: 1px solid var(--border); }
.row-label { display: inline-flex; align-items: center; gap: 0.5rem; font-weight: 600; }
.unit-list { display: flex; flex-wrap: wrap; gap: 0.6rem; }
</style>
