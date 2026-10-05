// Base-schedule helpers for the plan editor: upcoming dates, statistics and
// fair automatic distribution. Slots are { id, resource_id, weekday,
// start_min, end_min }; entries are recurrence rules (see recurrence.js).
import { addDays, nextWeekday, weekIndex, weekStart } from './dates'
import { MAX_CYCLE_WEEKS, baseOwner, entryMatches, matchingEntry } from './recurrence'

const DAYS_PER_MONTH = 365.25 / 12

export function entriesBySlot(entries) {
  const out = new Map()
  for (const e of entries) {
    if (!out.has(e.slot_id)) out.set(e.slot_id, [])
    out.get(e.slot_id).push(e)
  }
  return out
}

/** The next `count` dates of a slot from `from` on, with the rule that applies on each. */
export function slotOccurrences(slot, entries, from, count) {
  const out = []
  let date = nextWeekday(from, slot.weekday)
  for (let i = 0; i < count; i++, date = addDays(date, 7)) {
    out.push({ date, entry: matchingEntry(entries, date) })
  }
  return out
}

function unionMinutes(intervals) {
  const sorted = [...intervals].sort((a, b) => a[0] - b[0])
  let total = 0
  let [cs, ce] = [null, null]
  for (const [s, e] of sorted) {
    if (ce === null || s > ce) {
      if (ce !== null) total += ce - cs
      ;[cs, ce] = [s, e]
    } else {
      ce = Math.max(ce, e)
    }
  }
  return ce === null ? total : total + ce - cs
}

/**
 * Laundry time per flat, averaged per month over `weeks` weeks from `from`.
 * Time on several machines at once counts once. Returns
 * { parties: { [id]: { days, hours, slots } }, free: { slots, hours }, total: { slots, hours } }.
 */
export function planStats(slots, entries, { from, weeks = 52 }) {
  const bySlot = entriesBySlot(entries)
  const perParty = new Map()
  const free = { slots: 0, minutes: 0 }
  const total = { slots: 0, minutes: 0 }
  const start = weekStart(from)
  for (const slot of slots) {
    const rules = bySlot.get(slot.id) || []
    const len = slot.end_min - slot.start_min
    let date = addDays(start, slot.weekday - 1)
    for (let w = 0; w < weeks; w++, date = addDays(date, 7)) {
      total.slots++
      total.minutes += len
      const owner = rules.length ? baseOwner(rules, date) : null
      if (!owner) {
        free.slots++
        free.minutes += len
        continue
      }
      if (!perParty.has(owner)) perParty.set(owner, { slots: 0, dates: new Map() })
      const p = perParty.get(owner)
      p.slots++
      if (!p.dates.has(date)) p.dates.set(date, [])
      p.dates.get(date).push([slot.start_min, slot.end_min])
    }
  }
  const months = (weeks * 7) / DAYS_PER_MONTH
  const parties = {}
  for (const [id, p] of perParty) {
    let minutes = 0
    for (const list of p.dates.values()) minutes += unionMinutes(list)
    parties[id] = { days: p.dates.size / months, hours: minutes / 60 / months, slots: p.slots / months }
  }
  return {
    parties,
    free: { slots: free.slots / months, hours: free.minutes / 60 / months },
    total: { slots: total.slots / months, hours: total.minutes / 60 / months },
  }
}

/**
 * Hands out slots to flats in turn, starting in the week of `from`.
 *
 * mode "days": a turn is a whole weekday (all given slots on that day);
 * mode "slots": a turn is one time window (on all given machines).
 * fill "once": every flat gets one turn per rotation, the rest stays free;
 * fill "all": every flat gets as many turns as fit evenly.
 *
 * If there are more flats than turns in a week, the rotation spans several
 * weeks. Returns { entries, cycle, turns, perWeek } or null if it would need
 * more than MAX_CYCLE_WEEKS weeks.
 */
export function autoDistribute(slots, partyIds, { mode = 'days', fill = 'once', from }) {
  const sorted = [...slots].sort((a, b) => a.weekday - b.weekday || a.start_min - b.start_min)
  const key = mode === 'days' ? (s) => s.weekday : (s) => `${s.weekday}-${s.start_min}`
  const units = []
  const index = new Map()
  for (const s of sorted) {
    const k = key(s)
    if (!index.has(k)) {
      index.set(k, units.length)
      units.push([])
    }
    units[index.get(k)].push(s)
  }
  const p = partyIds.length
  if (!units.length || !p) return { entries: [], cycle: 1, turns: 0, perWeek: units.length }
  const cycle = Math.ceil(p / units.length)
  if (cycle > MAX_CYCLE_WEEKS) return null
  const turns = fill === 'all' ? Math.floor((cycle * units.length) / p) : 1
  const firstWeek = weekIndex(weekStart(from))
  const entries = []
  for (let i = 0; i < turns * p; i++) {
    const week = Math.floor(i / units.length)
    for (const s of units[i % units.length]) {
      entries.push({
        slot_id: s.id,
        party_id: partyIds[i % p],
        cycle_weeks: cycle,
        week_offset: cycle > 1 ? (firstWeek + week) % cycle : 0,
        month_week: 0,
      })
    }
  }
  return { entries, cycle, turns, perWeek: units.length }
}

/** How many turns each flat could get with fill "all" (to decide whether to offer it). */
export function maxTurns(unitsPerWeek, parties) {
  if (!unitsPerWeek || !parties) return 0
  const cycle = Math.ceil(parties / unitsPerWeek)
  return Math.floor((cycle * unitsPerWeek) / parties)
}

/** Two rules with the same key recur on exactly the same dates. */
export const ruleKey = (r) => `${r.cycle_weeks || 1}:${r.week_offset || 0}:${r.month_week || 0}`

/**
 * A flat's regular times as calendar-like entries: back-to-back time slots on
 * the same day with the same rule become one entry ("Every Tuesday,
 * 07:00–22:00"). Items are { weekday, start_min, end_min, rule, ref }; the
 * result is [{ weekday, rule, start, end, refs }] sorted by day and time.
 */
export function mergeRegularTimes(items) {
  const sorted = [...items].sort(
    (a, b) => a.weekday - b.weekday || ruleKey(a.rule).localeCompare(ruleKey(b.rule)) || a.start_min - b.start_min,
  )
  const out = []
  for (const it of sorted) {
    const last = out.at(-1)
    if (last && last.weekday === it.weekday && ruleKey(last.rule) === ruleKey(it.rule) && last.end === it.start_min) {
      last.end = it.end_min
      last.refs.push(it.ref)
    } else {
      out.push({ weekday: it.weekday, rule: it.rule, start: it.start_min, end: it.end_min, refs: [it.ref] })
    }
  }
  return out.sort((a, b) => a.weekday - b.weekday || a.start - b.start)
}

/**
 * The regular times of one flat across machines and rooms, from rows of
 * GET /me/schedule ({ id, resource_id, weekday, start_min, end_min, cycle_weeks,
 * week_offset, month_week }). Times are merged per unit; the same time on
 * several units becomes one entry with all their IDs in `resourceIds`.
 */
export function regularTimesByUnit(rows) {
  const byUnit = new Map()
  for (const r of rows) {
    if (!byUnit.has(r.resource_id)) byUnit.set(r.resource_id, [])
    const rule = { cycle_weeks: r.cycle_weeks, week_offset: r.week_offset, month_week: r.month_week }
    byUnit.get(r.resource_id).push({ weekday: r.weekday, start_min: r.start_min, end_min: r.end_min, rule, ref: r.id })
  }
  const out = new Map()
  for (const [resourceId, items] of byUnit) {
    for (const e of mergeRegularTimes(items)) {
      const key = `${e.weekday}|${ruleKey(e.rule)}|${e.start}|${e.end}`
      if (!out.has(key)) out.set(key, { weekday: e.weekday, rule: e.rule, start: e.start, end: e.end, resourceIds: [] })
      out.get(key).resourceIds.push(resourceId)
    }
  }
  return [...out.values()].sort((a, b) => a.weekday - b.weekday || a.start - b.start)
}

/** The first date on or after `from` on which a rule for `weekday` applies, or null within a year. */
export function nextOccurrence(rule, weekday, from) {
  let date = nextWeekday(from, weekday)
  for (let i = 0; i < 53; i++, date = addDays(date, 7)) {
    if (entryMatches(rule, date)) return date
  }
  return null
}
