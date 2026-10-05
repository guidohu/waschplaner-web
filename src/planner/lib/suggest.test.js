import { describe, expect, it } from 'vitest'
import { minCycle, suggestPlan } from './suggest'
import { autoDistribute } from './plan'
import { baseOwner } from './recurrence'
import { layoutFor, splitEvenly } from './slotLayout'
import { addDays } from './dates'

const FROM = '2026-09-28' // a Monday
const MON_SAT = [1, 2, 3, 4, 5, 6]

function week(resources, weekdays, windows) {
  const slots = []
  for (const r of resources) {
    for (const w of layoutFor(weekdays, windows)) {
      slots.push({ id: `${r}:${w.weekday}:${w.start_min}`, resource_id: r, ...w })
    }
  }
  return slots
}

/** Who owns each turn (per day or time window) over `weeks` weeks, '' if free. */
function owners(slots, entries, weeks, mode = 'days') {
  const out = []
  for (let w = 0; w < weeks; w++) {
    const seen = new Set()
    for (const s of [...slots].sort((a, b) => a.weekday - b.weekday || a.start_min - b.start_min)) {
      const key = mode === 'days' ? s.weekday : `${s.weekday}-${s.start_min}`
      if (seen.has(key)) continue
      seen.add(key)
      const date = addDays(FROM, w * 7 + s.weekday - 1)
      out.push(baseOwner(entries.filter((e) => e.slot_id === s.id), date) || '')
    }
  }
  return out
}

const count = (list, id) => list.filter((x) => x === id).length

describe('suggestPlan', () => {
  const slots = week(['wash', 'dry'], MON_SAT, splitEvenly(420, 1320, 1))
  const flats = ['a', 'b', 'c', 'd']

  it('needs a longer rotation when there are more flats than days', () => {
    expect(minCycle(6, 4)).toBe(1)
    expect(minCycle(6, 7)).toBe(2)
    expect(suggestPlan(slots, ['a', 'b', 'c', 'd', 'e', 'f', 'g'], { cycle: 1, from: FROM }).cycle).toBe(2)
    expect(suggestPlan(slots, Array.from({ length: 49 }, (_, i) => `p${i}`), { from: FROM })).toBeNull()
  })

  it('repeats after the chosen number of weeks and gives every flat the same', () => {
    const res = suggestPlan(slots, flats, { cycle: 2, turns: 2, from: FROM })
    expect(res).toMatchObject({ cycle: 2, turns: 2, maxTurns: 3, freeTurns: 4 })
    expect(res.entries.every((e) => e.cycle_weeks === 2)).toBe(true)
    const days = owners(slots, res.entries, 4)
    expect(days.slice(0, 12)).toEqual(days.slice(12))
    for (const f of flats) expect(count(days.slice(0, 12), f)).toBe(2)
    // Both machines go together on a whole day.
    expect(res.entries).toHaveLength(2 * 4 * 2)
  })

  it('spreads the free days instead of leaving the end of the week free', () => {
    const days = owners(slots, suggestPlan(slots, flats, { cycle: 1, turns: 1, from: FROM }).entries, 1)
    expect(days).toEqual(['a', 'b', '', 'c', 'd', ''])
  })

  it('limits the turns to what fits and counts free time once per time window', () => {
    const res = suggestPlan(slots, flats, { cycle: 1, turns: 5, from: FROM })
    expect(res.turns).toBe(1)
    expect(res.totalMinutes).toBe(6 * 900)
    expect(res.freeMinutes).toBe(2 * 900)
  })

  it('hands out single time windows', () => {
    const three = week(['wash'], MON_SAT, splitEvenly(420, 1320, 3))
    const res = suggestPlan(three, flats, { mode: 'slots', cycle: 1, turns: 4, from: FROM })
    expect(res).toMatchObject({ perWeek: 18, turns: 4, freeTurns: 2 })
    const windows = owners(three, res.entries, 1, 'slots')
    for (const f of flats) expect(count(windows, f)).toBe(4)
  })

  it('matches autoDistribute when flats take turns', () => {
    const auto = autoDistribute(slots, flats.slice(0, 3), { fill: 'all', from: FROM })
    const res = suggestPlan(slots, flats.slice(0, 3), { cycle: 1, turns: 2, together: false, from: FROM })
    expect(owners(slots, res.entries, 1)).toEqual(owners(slots, auto.entries, 1))
    expect(owners(slots, res.entries, 1)).toEqual(['a', 'b', 'c', 'a', 'b', 'c'])
  })

  it('keeps the days of a flat together and the free days apart', () => {
    const days = owners(slots, suggestPlan(slots, flats, { cycle: 2, turns: 2, from: FROM }).entries, 2)
    expect(days).toEqual(['a', 'a', '', 'b', 'b', '', 'c', 'c', '', 'd', 'd', ''])
  })

  it('keeps the time windows of a flat on one day and spreads the free days', () => {
    const three = week(['wash', 'dry'], MON_SAT, splitEvenly(420, 1320, 3))
    const res = suggestPlan(three, flats, { mode: 'slots', cycle: 1, turns: 3, from: FROM })
    const windows = owners(three, res.entries, 1, 'slots')
    const byDay = Array.from({ length: 6 }, (_, d) => windows.slice(d * 3, d * 3 + 3))
    // Every day belongs to one flat or is free.
    for (const day of byDay) expect(new Set(day).size).toBe(1)
    const free = byDay.map((day, d) => (day[0] === '' ? d : -1)).filter((d) => d >= 0)
    expect(free).toHaveLength(2)
    expect(free[1] - free[0]).toBeGreaterThan(1)
  })

  it('keeps two time windows of a flat on the same day', () => {
    const three = week(['wash'], MON_SAT, splitEvenly(420, 1320, 3))
    const res = suggestPlan(three, ['a', 'b'], { mode: 'slots', cycle: 1, turns: 2, from: FROM })
    const windows = owners(three, res.entries, 1, 'slots')
    for (const f of ['a', 'b']) {
      const at = windows.flatMap((x, i) => (x === f ? [i] : []))
      expect(at[1] - at[0]).toBe(1)
      expect(Math.floor(at[0] / 3)).toBe(Math.floor(at[1] / 3))
    }
  })
})
