import { reactive } from 'vue'
import { t } from '../i18n'

export const toasts = reactive([])
let seq = 0

export function toast(message, kind = 'ok', ms = 3500) {
  const id = ++seq
  toasts.push({ id, message, kind })
  setTimeout(() => {
    const i = toasts.findIndex((x) => x.id === id)
    if (i >= 0) toasts.splice(i, 1)
  }, ms)
}

export function toastError(err) {
  const code = err?.code
  const key = 'errors.' + code
  const msg = code && t(key) !== key ? t(key) : err?.message || t('errors.internal')
  toast(msg, 'error', 5000)
}
