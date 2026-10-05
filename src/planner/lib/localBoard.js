// The plan for a range of days, computed in the browser. It replaces the app's
// GET /board for printing: same cell shape, from the time slots, the regular
// schedule (recurrence rules) and single-day changes – nothing leaves the browser.
import { addDays, isoWeekday } from './dates'
import { entriesBySlot } from './plan'
import { baseOwner } from './recurrence'

/**
 * Boards of `days` days each, starting at `from` (a Monday for printing), like
 * the app's /board: [{ from, cells: [{ slot_id, resource_id, date, start_min,
 * end_min, party_id, changed }] }]. `overrides` maps "slotId|date" to a flat id,
 * or '' for free; `changed` marks cells that differ from the regular schedule.
 */
export function localBoards({ slots, entries, overrides = {} }, from, count, days = 14) {
  const bySlot = entriesBySlot(entries)
  const byWeekday = new Map()
  for (const s of slots) {
    if (!byWeekday.has(s.weekday)) byWeekday.set(s.weekday, [])
    byWeekday.get(s.weekday).push(s)
  }
  return Array.from({ length: count }, (_, b) => {
    const start = addDays(from, b * days)
    const cells = []
    for (let d = 0; d < days; d++) {
      const date = addDays(start, d)
      for (const s of byWeekday.get(isoWeekday(date)) || []) {
        const regular = baseOwner(bySlot.get(s.id) || [], date)
        const key = `${s.id}|${date}`
        const changed = key in overrides
        cells.push({
          slot_id: s.id,
          resource_id: s.resource_id,
          date,
          start_min: s.start_min,
          end_min: s.end_min,
          party_id: changed ? overrides[key] || null : regular,
          regular_party_id: regular,
          changed,
        })
      }
    }
    return { from: start, cells }
  })
}
