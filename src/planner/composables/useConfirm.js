import { shallowRef } from 'vue'

// The confirmation waiting for an answer; TheConfirmHost shows it.
export const pendingConfirm = shallowRef(null)

/**
 * Asks before an action in a dialog and resolves to true or false.
 *
 * `options`: { title, text, details?: string[], confirmLabel, cancelLabel?,
 * danger?: boolean }. State the consequence in `text`, e.g. "3 bookings will be
 * removed", and name the action in `confirmLabel` ("Delete flat", not "OK").
 */
export function askConfirm(options) {
  pendingConfirm.value?.resolve(false)
  return new Promise((resolve) => {
    pendingConfirm.value = {
      ...options,
      resolve: (answer) => {
        pendingConfirm.value = null
        resolve(answer)
      },
    }
  })
}

/** The confirmation dialog, as a composable for components. */
export const useConfirm = () => askConfirm
