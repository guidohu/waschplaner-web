import { onBeforeUnmount, onMounted, ref } from 'vue'

/** A ref that tracks whether the CSS media query matches. */
export function useMediaQuery(query) {
  const matches = ref(false)
  let mql
  const update = () => (matches.value = mql.matches)
  onMounted(() => {
    mql = window.matchMedia(query)
    update()
    mql.addEventListener('change', update)
  })
  onBeforeUnmount(() => mql?.removeEventListener('change', update))
  return matches
}
