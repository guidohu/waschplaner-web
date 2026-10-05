import { reactive } from 'vue'
import de from './de'
import en from './en'
import fr from './fr'
import it from './it'
import { LINKS } from '../site'
import planner from '../planner/i18n'

// Minimal i18n, the same as in the app: t(key, { name }) fills {placeholders};
// texts of the form "one|other" pick a plural form by the parameter n.
// tm(key) returns lists and objects (e.g. FAQ items). Both fill the site's values
// ({price}, {trial}, {app} …, see LINKS in site.js) into texts that use them.
// The planner's texts (shared with the app) sit underneath; the site's own win.
const deepMerge = (base, over) =>
  Object.fromEntries(
    [...new Set([...Object.keys(base), ...Object.keys(over)])].map((k) => {
      const [a, b] = [base[k], over[k]]
      const both = a && b && typeof a === 'object' && typeof b === 'object' && !Array.isArray(a)
      return [k, both ? deepMerge(a, b) : b ?? a]
    }),
  )
const dicts = Object.fromEntries(Object.entries({ de, en, fr, it }).map(([l, d]) => [l, deepMerge(planner[l], d)]))

function initialLocale() {
  try {
    const saved = localStorage.getItem('wp_locale')
    if (saved && dicts[saved]) return saved
  } catch {
    /* storage unavailable */
  }
  // The first of the browser's languages that the site has, else English.
  const wanted = navigator.languages?.length ? navigator.languages : [navigator.language || 'de']
  return wanted.map((l) => l.slice(0, 2).toLowerCase()).find((l) => dicts[l]) || 'en'
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
  { code: 'fr', name: 'Français' },
  { code: 'it', name: 'Italiano' },
]
/** The languages of the app itself (the same as the website's). */
export const APP_LOCALES = ['de', 'en', 'fr', 'it']

/** The locale for dates and numbers: Swiss formats, British English. */
export const intlLocale = () => ({ de: 'de-CH', en: 'en-GB', fr: 'fr-CH', it: 'it-CH' })[i18n.locale] || 'de-CH'

// French uses the singular for 0 and 1 ("0 appartement"); the others only for 1.
const isOne = (n) => (i18n.locale === 'fr' ? Math.abs(n) < 2 : n === 1)

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

/** Fills {placeholders} from `params`, then from the site's values; unknown ones stay. */
export const fill = (s, params = {}) => s.replace(/\{(\w+)\}/g, (m, k) => String(params[k] ?? LINKS[k] ?? m))
const fillDeep = (v) =>
  typeof v === 'string' ? fill(v) : Array.isArray(v) ? v.map(fillDeep) : v && typeof v === 'object'
    ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, fillDeep(x)])) : v

export function t(key, params = {}) {
  let s = lookup(dicts[i18n.locale], key) ?? lookup(dicts.de, key)
  if (typeof s !== 'string') return key
  if (s.includes('|')) {
    const [one, other] = s.split('|')
    s = isOne(Number(params.n)) ? one : other
  }
  return fill(s, params)
}

/** A list or object from the texts, e.g. tm('home.faq.items'). */
export const tm = (key) => fillDeep(lookup(dicts[i18n.locale], key) ?? lookup(dicts.de, key))

/** True if the key exists (in the current locale or the German fallback). */
export const hasKey = (key) => typeof (lookup(dicts[i18n.locale], key) ?? lookup(dicts.de, key)) === 'string'

export const i18nPlugin = {
  install(app) {
    app.config.globalProperties.$t = t
    app.config.globalProperties.$tm = tm
    document.documentElement.lang = i18n.locale
  },
}
