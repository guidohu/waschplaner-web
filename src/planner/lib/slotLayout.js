// Weekly time slot layouts: which time windows can be booked on which weekday.
// A layout is a list of windows { weekday, start_min, end_min }.

export const MIN_SLOT_MINUTES = 30
export const DAY_MINUTES = 24 * 60
const ROUND = 30

/** Splits [start, end) into `blocks` windows of about equal length, on half hours. */
export function splitEvenly(start, end, blocks) {
  const out = []
  const len = end - start
  if (len < MIN_SLOT_MINUTES || blocks < 1) return out
  let prev = start
  for (let i = 1; i <= blocks; i++) {
    const cut = i === blocks ? end : start + Math.round((len * i) / blocks / ROUND) * ROUND
    if (cut - prev >= MIN_SLOT_MINUTES) {
      out.push([prev, cut])
      prev = cut
    } else if (i === blocks && out.length) {
      out[out.length - 1][1] = end
    }
  }
  return out
}

/** Splits [start, end) into windows of `minutes`; a short remainder joins the last one. */
export function splitBySize(start, end, minutes) {
  const out = []
  if (end - start < MIN_SLOT_MINUTES || minutes < MIN_SLOT_MINUTES) return out
  for (let t = start; t < end; t += minutes) {
    const e = Math.min(t + minutes, end)
    if (e - t < MIN_SLOT_MINUTES && out.length) {
      out[out.length - 1][1] = end
      break
    }
    out.push([t, e])
  }
  return out
}

/** Applies the same windows ([[start, end], …]) to each weekday. */
export function layoutFor(weekdays, windows) {
  const out = []
  for (const weekday of [...weekdays].sort()) {
    for (const [start_min, end_min] of windows) out.push({ weekday, start_min, end_min })
  }
  return out
}

/** Windows of one weekday as [[start, end], …], sorted. */
export function windowsOn(layout, weekday) {
  return layout
    .filter((w) => w.weekday === weekday)
    .map((w) => [w.start_min, w.end_min])
    .sort((a, b) => a[0] - b[0])
}

export const layoutDays = (layout) => [...new Set(layout.map((w) => w.weekday))].sort()

/** True if every day of the layout has exactly the same windows. */
export function isUniform(layout) {
  const days = layoutDays(layout)
  const first = JSON.stringify(windowsOn(layout, days[0]))
  return days.every((d) => JSON.stringify(windowsOn(layout, d)) === first)
}

/**
 * Returns an i18n error key for a list of windows of one day, or null if they
 * are valid: each at least MIN_SLOT_MINUTES long, within the day, no overlaps.
 */
export function windowsError(windows) {
  const sorted = [...windows].sort((a, b) => a[0] - b[0])
  for (let i = 0; i < sorted.length; i++) {
    const [s, e] = sorted[i]
    if (!(s >= 0 && e <= DAY_MINUTES && e > s)) return 'slots.errorOrder'
    if (e - s < MIN_SLOT_MINUTES) return 'slots.errorShort'
    if (i > 0 && sorted[i - 1][1] > s) return 'slots.errorOverlap'
  }
  return null
}

/** Minutes of a window. */
export const windowMinutes = (w) => w.end_min - w.start_min

const sameWindow = (a, b) => a.weekday === b.weekday && a.start_min === b.start_min && a.end_min === b.end_min
const overlap = (a, b) =>
  a.weekday === b.weekday ? Math.max(0, Math.min(a.end_min, b.end_min) - Math.max(a.start_min, b.start_min)) : 0

/**
 * What saving a new layout will do, mirroring planner.DiffLayout in the
 * backend: a changed window keeps the slot it overlaps most (and with it its
 * plan and bookings); other old slots are removed, other new windows added.
 * Returns { changed, added, removed } counts.
 */
export function diffLayout(old, want) {
  const used = old.map(() => false)
  const rest = []
  for (const w of want) {
    const i = old.findIndex((o, k) => !used[k] && sameWindow(o, w))
    if (i >= 0) used[i] = true
    else rest.push(w)
  }
  rest.sort((a, b) => a.weekday - b.weekday || a.start_min - b.start_min)
  let changed = 0
  let added = 0
  for (const w of rest) {
    let best = -1
    let bestOverlap = 0
    old.forEach((o, k) => {
      const ov = overlap(o, w)
      if (!used[k] && ov > bestOverlap) [best, bestOverlap] = [k, ov]
    })
    if (best < 0) added++
    else {
      used[best] = true
      changed++
    }
  }
  return { changed, added, removed: used.filter((u) => !u).length }
}
