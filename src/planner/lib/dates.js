// Calendar dates are handled as "YYYY-MM-DD" strings. They are interpreted at
// UTC noon, so adding days never trips over daylight-saving switches.

export const pad = (n) => String(n).padStart(2, '0')

export const toDate = (s) => new Date(s + 'T12:00:00Z')
export const isoDate = (d) => d.toISOString().slice(0, 10)

export function addDays(s, n) {
  const d = toDate(s)
  d.setUTCDate(d.getUTCDate() + n)
  return isoDate(d)
}

/** 1 = Monday … 7 = Sunday. */
export function isoWeekday(s) {
  const wd = toDate(s).getUTCDay()
  return wd === 0 ? 7 : wd
}

export const weekStart = (s) => addDays(s, 1 - isoWeekday(s))

/** Today in the browser's time zone. */
export function todayISO() {
  const d = new Date()
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

export function isoWeekNumber(s) {
  const d = toDate(s)
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7))
  const y0 = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
  return Math.ceil(((d - y0) / 86400000 + 1) / 7)
}

/** Week number used for rotations; Monday 1970-01-05 is week 0, like the backend. */
export function weekIndex(s) {
  const days = Math.round((toDate(s) - toDate('1970-01-05')) / 86400000)
  return Math.floor(days / 7)
}

/** Which occurrence of its weekday the date is in its month, and whether it is the last. */
export function monthWeek(s) {
  const day = Number(s.slice(8, 10))
  const nth = Math.floor((day - 1) / 7) + 1
  const last = addDays(s, 7).slice(5, 7) !== s.slice(5, 7)
  return { nth, last }
}

/** The first date on or after `from` that falls on `weekday`. */
export function nextWeekday(from, weekday) {
  return addDays(from, (weekday - isoWeekday(from) + 7) % 7)
}

// Minutes since midnight <-> "HH:MM".
export const fmtMin = (m) => `${pad(Math.floor(m / 60))}:${pad(m % 60)}`
export function parseHHMM(s) {
  const [h, m] = String(s).split(':').map(Number)
  return h * 60 + (m || 0)
}

/** Current wall-clock date and minute of the day in a time zone. */
export function nowInZone(timeZone) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat('en-CA', {
      timeZone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h23',
    })
      .formatToParts(new Date())
      .map((p) => [p.type, p.value]),
  )
  return { date: `${parts.year}-${parts.month}-${parts.day}`, min: Number(parts.hour) * 60 + Number(parts.minute) }
}

/** "YYYY-MM" of a date. */
export const monthOf = (s) => s.slice(0, 7)

/** The month `n` months after "YYYY-MM". */
export function addMonths(ym, n) {
  const [y, m] = ym.split('-').map(Number)
  const total = y * 12 + (m - 1) + n
  return `${Math.floor(total / 12)}-${pad((total % 12) + 1)}`
}

/**
 * The weeks of a month for a calendar, Monday first: [[date|null × 7], …],
 * with null for the days of the neighbouring months.
 */
export function monthGrid(ym) {
  const last = addDays(`${addMonths(ym, 1)}-01`, -1)
  const weeks = []
  for (let start = weekStart(`${ym}-01`); start <= last; start = addDays(start, 7)) {
    weeks.push(Array.from({ length: 7 }, (_, i) => {
      const d = addDays(start, i)
      return monthOf(d) === ym ? d : null
    }))
  }
  return weeks
}
