<script setup>
import BaseIcon from '../components/BaseIcon.vue'
import { usePageTitle } from '../composables/usePageTitle'
import { t } from '../i18n'

usePageTitle(() => t('notFound.title'))
</script>

<template>
  <div class="container narrow not-found">
    <span class="icon-tile warn"><BaseIcon name="basket" :size="26" /></span>
    <h1>{{ $t('notFound.title') }}</h1>
    <p class="lead">{{ $t('notFound.text') }}</p>
    <div class="row">
      <RouterLink to="/" class="btn">{{ $t('notFound.home') }}</RouterLink>
      <RouterLink to="/docs" class="btn ghost">{{ $t('notFound.docs') }}</RouterLink>
    </div>
  </div>
</template>

<style scoped>
.not-found { padding-block: 5rem; display: flex; flex-direction: column; align-items: center; text-align: center; gap: 0.5rem; }
.not-found .icon-tile { width: 56px; height: 56px; margin-bottom: 0.75rem; }
.not-found .row { justify-content: center; margin-top: 0.75rem; }
</style>
