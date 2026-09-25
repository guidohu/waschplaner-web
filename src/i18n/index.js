import { reactive } from 'vue'
import de from './de'
import en from './en'

// Minimal i18n, the same as in the app: t(key, { name }) fills {placeholders};
// texts of the form "one|other" pick a plural form by the parameter n.
// tm(key) returns lists and objects (e.g. FAQ items) as they are.
const dicts = { de, en }

function initialLocale() {
  try {
    const saved = localStorage.getItem('wp_locale')
    if (saved && dicts[saved]) return saved
  } catch {
    /* storage unavailable */
  }
  return (navigator.language || 'de').toLowerCase().startsWith('de') ? 'de' : 'en'
}

export const i18n = reactive({ locale: initialLocale() })

export function setLocale(locale, persist = true) {
  if (!dicts[locale]) return
  i18n.locale = locale
  document.documentElement.lang = locale
  if (persist) {
    try {
      localStorage.setItem('wp_locale', locale)
    } catch {
      /* ignore */
    }
  }
}

/** Available languages, each named in its own language. */
export const LOCALES = [
  { code: 'de', name: 'Deutsch' },
  { code: 'en', name: 'English' },
]

function lookup(dict, key) {
  // Audit keys contain dots ("audit.house.created"); try the longest known prefix first.
  let node = dict
  const parts = key.split('.')
  for (let i = 0; i < parts.length; i++) {
    if (node == null) return undefined
    const rest = parts.slice(i).join('.')
    if (typeof node === 'object' && rest in node) return node[rest]
    node = node[parts[i]]
  }
  return node
}

export function t(key, params = {}) {
  let s = lookup(dicts[i18n.locale], key) ?? lookup(de, key)
  if (typeof s !== 'string') return key
  if (s.includes('|')) {
    const [one, other] = s.split('|')
    s = Number(params.n) === 1 ? one : other
  }
  return s.replace(/\{(\w+)\}/g, (_, k) => params[k] ?? `{${k}}`)
}

/** A list or object from the texts, e.g. tm('home.faq.items'). */
export const tm = (key) => lookup(dicts[i18n.locale], key) ?? lookup(de, key)

/** True if the key exists (in the current locale or the German fallback). */
export const hasKey = (key) => typeof (lookup(dicts[i18n.locale], key) ?? lookup(de, key)) === 'string'

export const i18nPlugin = {
  install(app) {
    app.config.globalProperties.$t = t
    app.config.globalProperties.$tm = tm
    document.documentElement.lang = i18n.locale
  },
}
