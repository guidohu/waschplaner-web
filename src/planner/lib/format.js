// Locale-aware formatting of dates, times, numbers and colours.
import { i18n, intlLocale, t } from '../../i18n'
import { addDays, toDate } from './dates'
import { equipmentCounts } from './resources'

export { fmtMin, parseHHMM } from './dates'

const locale = intlLocale

const cache = {}
function fmt(opts) {
  const key = i18n.locale + JSON.stringify(opts)
  return (cache[key] ||= new Intl.DateTimeFormat(locale(), { timeZone: 'UTC', ...opts }))
}

export const fmtDay = (s) => fmt({ weekday: 'short', day: 'numeric', month: 'short' }).format(toDate(s))
export const fmtDayLong = (s) => fmt({ weekday: 'long', day: 'numeric', month: 'long' }).format(toDate(s))
export const fmtWeekdayShort = (s) => fmt({ weekday: 'short' }).format(toDate(s))
export const fmtDateNum = (s) => fmt({ day: 'numeric', month: 'numeric' }).format(toDate(s))
export const fmtDayMonth = (s) => fmt({ day: 'numeric', month: 'short' }).format(toDate(s))
export const fmtMonthYear = (s) => fmt({ month: 'long', year: 'numeric' }).format(toDate(s))
export const fmtRange = (a, b) =>
  `${fmt({ day: 'numeric', month: 'short' }).format(toDate(a))} – ${fmt({ day: 'numeric', month: 'short', year: 'numeric' }).format(toDate(b))}`
/** A week like a calendar title: "21.–27. September 2026". */
export const fmtWeekRange = (a, b) =>
  fmt({ day: 'numeric', month: 'long', year: 'numeric' }).formatRange(toDate(a), toDate(b))

/** "Heute", "Morgen", "In 3 Tagen" for a date relative to `today`. */
export function fmtRelativeDay(date, today) {
  const days = Math.round((toDate(date) - toDate(today)) / 86400000)
  const s = new Intl.RelativeTimeFormat(locale(), { numeric: 'auto' }).format(days, 'day')
  return s.charAt(0).toUpperCase() + s.slice(1)
}

/** A moment's date with the year: "24. September 2027". */
export const fmtDateLong = (iso) =>
  new Intl.DateTimeFormat(locale(), { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(iso))

/** A moment's date, short: "24.09.2027" or "24 Sept 2027". */
export const fmtDateShort = (iso) => new Intl.DateTimeFormat(locale(), { dateStyle: 'medium' }).format(new Date(iso))

/** An amount in the currency's smallest unit: 1500, "CHF" → "CHF 15.00". */
export const fmtMoney = (amount, currency) =>
  new Intl.NumberFormat(locale(), { style: 'currency', currency }).format(amount / 100)

export const fmtDateTime = (iso) =>
  new Intl.DateTimeFormat(locale(), { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(iso))

/** Weekday name for 1 (Monday) … 7 (Sunday). */
export const weekdayName = (n, style = 'long') => fmt({ weekday: style }).format(toDate(addDays('2026-01-05', n - 1)))

/** A number with at most `digits` decimals, e.g. 4.3 or 4,3. */
export const fmtNumber = (n, digits = 1) =>
  new Intl.NumberFormat(locale(), { maximumFractionDigits: digits }).format(n)

/** Readable text colour on a background colour. */
export function textOn(hex) {
  const n = parseInt((hex || '#888888').slice(1), 16)
  const r = (n >> 16) & 255
  const g = (n >> 8) & 255
  const b = n & 255
  const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return lum > 0.62 ? '#1b1f2a' : '#ffffff'
}

export function copyText(text) {
  if (navigator.clipboard?.writeText) return navigator.clipboard.writeText(text)
  const ta = document.createElement('textarea')
  ta.value = text
  document.body.appendChild(ta)
  ta.select()
  document.execCommand('copy')
  ta.remove()
  return Promise.resolve()
}

/** What a bookable unit contains, e.g. "2× Washing machine, Tumble dryer". */
export const equipmentText = (equipment) =>
  equipmentCounts(equipment)
    .map(({ kind, count }) => (count > 1 ? `${count}× ${t('kind.' + kind)}` : t('kind.' + kind)))
    .join(', ')

/**
 * Names of the units a laundry room is split into, like the backend does:
 * "Tumbler", or "Waschmaschine 1" and "Waschmaschine 2" if there are several.
 */
export function machineNames(machines) {
  const total = {}
  for (const k of machines) total[k] = (total[k] || 0) + 1
  const seen = {}
  return machines.map((k) => {
    seen[k] = (seen[k] || 0) + 1
    const name = t('kind.' + k)
    return total[k] > 1 ? `${name} ${seen[k]}` : name
  })
}
