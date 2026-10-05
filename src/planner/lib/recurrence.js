// Recurring base-schedule rules, mirroring planner.ScheduleEntry in the backend.
//
// An entry { slot_id, party_id, cycle_weeks, week_offset, month_week } repeats
// every `cycle_weeks` weeks (in weeks where weekIndex % cycle_weeks equals
// week_offset) or, if `month_week` is set, once a month on the 1st-4th or
// last (-1) weekday of the month.
import { monthWeek, weekIndex } from './dates'

export const MAX_CYCLE_WEEKS = 8
export const LAST_WEEK = -1

export function entryMatches(entry, date) {
  if (entry.month_week) {
    const { nth, last } = monthWeek(date)
    return entry.month_week === LAST_WEEK ? last : nth === entry.month_week
  }
  const c = entry.cycle_weeks || 1
  if (c <= 1) return true
  return ((weekIndex(date) % c) + c) % c === entry.week_offset
}

/** Rules that repeat less often win: "every Monday, but the 1st Monday is B's". */
export function specificity(entry) {
  return entry.month_week ? MAX_CYCLE_WEEKS + 1 : entry.cycle_weeks || 1
}

/** The entry that decides who owns a slot on `date`, or null. */
export function matchingEntry(entries, date) {
  let best = null
  for (const e of entries) {
    if (entryMatches(e, date) && (!best || specificity(e) > specificity(best))) best = e
  }
  return best
}

export const baseOwner = (entries, date) => matchingEntry(entries, date)?.party_id ?? null

/** A weekly rule; `week_offset` is chosen so that the rotation includes `date`. */
export function everyNWeeks(n, date) {
  return { cycle_weeks: n, week_offset: n > 1 ? ((weekIndex(date) % n) + n) % n : 0, month_week: 0 }
}

export const monthly = (nth) => ({ cycle_weeks: 1, week_offset: 0, month_week: nth })

/** Two rules are the same if they recur on exactly the same dates. */
export const sameRule = (a, b) =>
  (a.cycle_weeks || 1) === (b.cycle_weeks || 1) &&
  (a.week_offset || 0) === (b.week_offset || 0) &&
  (a.month_week || 0) === (b.month_week || 0)
