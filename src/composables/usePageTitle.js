import { watchEffect } from 'vue'

/** Keeps the browser tab title in step with the page (and the language). */
export function usePageTitle(getTitle) {
  watchEffect(() => {
    const title = getTitle()
    document.title = title ? `${title} · Waschplaner` : 'Waschplaner'
  })
}
