<script setup>
import BaseHelp from '../components/BaseHelp.vue'
import SlotLayoutEditor from '../components/SlotLayoutEditor.vue'
import { draft, units } from '../draft'
</script>

<template>
  <section class="setup-step">
    <header class="step-head">
      <h1 tabindex="-1">{{ $t('setup.times.title') }}</h1>
      <p class="lead">{{ $t('setup.times.lead') }}</p>
    </header>
    <BaseHelp>
      <p>{{ $t('setup.times.help1') }}</p>
      <p>{{ $t('setup.times.help2') }}</p>
      <p v-if="units.length > 1">{{ $t('setup.times.helpUnits') }}</p>
    </BaseHelp>
    <div class="card">
      <SlotLayoutEditor v-model="draft.layout" />
    </div>
  </section>
</template>
