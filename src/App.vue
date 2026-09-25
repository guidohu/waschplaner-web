<script setup>
import TheSiteFooter from './components/TheSiteFooter.vue'
import TheSiteHeader from './components/TheSiteHeader.vue'
</script>

<template>
  <TheSiteHeader />
  <main id="main" tabindex="-1">
    <RouterView />
  </main>
  <TheSiteFooter />
</template>

<style>
#app { min-height: 100vh; display: flex; flex-direction: column; }
#main { flex: 1; outline: none; }
</style>
