import { describe, expect, it } from 'vitest'
import { autoDistribute, maxTurns, mergeRegularTimes, nextOccurrence, planStats, regularTimesByUnit, slotOccurrences } from './plan'
import { everyNWeeks, monthly, baseOwner } from './recurrence'
import { diffLayout, isUniform, layoutFor, splitBySize, splitEvenly, windowsError } from './slotLayout'
import { addDays } from './dates'

const FROM = '2026-09-28' // a Monday

function week(resources, weekdays, windows) {
  const slots = []
  for (const r of resources) {
    for (const w of layoutFor(weekdays, windows)) {
      slots.push({ id: `${r}:${w.weekday}:${w.start_min}`, resource_id: r, ...w })
    }
  }
  return slots
}

describe('slot layouts', () => {
  it('splits a day evenly on half hours', () => {
    expect(splitEvenly(420, 1320, 3)).toEqual([[420, 720], [720, 1020], [1020, 1320]])
    expect(splitEvenly(420, 1320, 2)).toEqual([[420, 870], [870, 1320]])
    expect(splitEvenly(420, 1320, 1)).toEqual([[420, 1320]])
  })

  it('splits by size and merges a short remainder', () => {
    expect(splitBySize(420, 1320, 120).at(-1)).toEqual([1260, 1320])
    expect(splitBySize(420, 1330, 120).at(-1)).toEqual([1260, 1330])
  })

  it('validates windows', () => {
    expect(windowsError([[420, 720], [720, 1020]])).toBe(null)
    expect(windowsError([[420, 730], [720, 1020]])).toBe('slots.errorOverlap')
    expect(windowsError([[420, 440]])).toBe('slots.errorShort')
    expect(windowsError([[720, 420]])).toBe('slots.errorOrder')
  })

  it('diffs layouts like the backend', () => {
    // Same case as TestDiffLayout in the Go planner.
    const old = [
      { weekday: 1, start_min: 420, end_min: 720 },
      { weekday: 1, start_min: 720, end_min: 1020 },
      { weekday: 1, start_min: 1020, end_min: 1320 },
      { weekday: 2, start_min: 420, end_min: 1320 },
    ]
    const want = [
      { weekday: 1, start_min: 420, end_min: 720 },
      { weekday: 1, start_min: 720, end_min: 960 },
      { weekday: 1, start_min: 960, end_min: 1320 },
      { weekday: 3, start_min: 420, end_min: 1320 },
    ]
    expect(diffLayout(old, want)).toEqual({ changed: 2, added: 1, removed: 1 })
    expect(diffLayout(old, old)).toEqual({ changed: 0, added: 0, removed: 0 })
  })

  it('detects uniform layouts', () => {
    const layout = layoutFor([1, 2], [[420, 720]])
    expect(isUniform(layout)).toBe(true)
    expect(isUniform([...layout, { weekday: 3, start_min: 0, end_min: 600 }])).toBe(false)
  })
})

describe('autoDistribute', () => {
  it('gives each flat a fixed weekday when there are enough days', () => {
    const slots = week(['room'], [1, 2, 3, 4, 5, 6], [[420, 1320]])
    const { entries, cycle } = autoDistribute(slots, ['a', 'b', 'c', 'd'], { mode: 'days', fill: 'once', from: FROM })
    expect(cycle).toBe(1)
    expect(entries.map((e) => `${e.slot_id}=${e.party_id}`)).toEqual([
      'room:1:420=a', 'room:2:420=b', 'room:3:420=c', 'room:4:420=d',
    ])
  })

  it('rotates over several weeks when there are more flats than days', () => {
    const slots = week(['room'], [1, 2, 3], [[420, 1320]])
    const parties = ['a', 'b', 'c', 'd', 'e']
    const { entries, cycle } = autoDistribute(slots, parties, { mode: 'days', fill: 'once', from: FROM })
    expect(cycle).toBe(2)
    // This week: a, b, c on Mon-Wed; next week: d and e on Mon and Tue.
    const owner = (date, slot) => baseOwner(entries.filter((e) => e.slot_id === slot), date)
    expect(owner(FROM, 'room:1:420')).toBe('a')
    expect(owner(addDays(FROM, 7), 'room:1:420')).toBe('d')
    expect(owner(addDays(FROM, 9), 'room:3:420')).toBe(null)
  })

  it('assigns whole days on all machines', () => {
    const slots = week(['washer', 'dryer'], [1, 2], [[420, 720], [720, 1020]])
    const { entries } = autoDistribute(slots, ['a', 'b'], { mode: 'days', fill: 'once', from: FROM })
    expect(entries.filter((e) => e.party_id === 'a').map((e) => e.slot_id).sort()).toEqual([
      'dryer:1:420', 'dryer:1:720', 'washer:1:420', 'washer:1:720',
    ])
  })

  it('fills all turns evenly', () => {
    const slots = week(['room'], [1, 2, 3, 4, 5, 6], [[420, 1320]])
    const res = autoDistribute(slots, ['a', 'b', 'c'], { mode: 'days', fill: 'all', from: FROM })
    expect(res.turns).toBe(2)
    expect(res.entries).toHaveLength(6)
    expect(maxTurns(6, 3)).toBe(2)
    expect(maxTurns(6, 4)).toBe(1)
  })

  it('gives up when a rotation would be too long', () => {
    const slots = week(['room'], [1], [[420, 1320]])
    expect(autoDistribute(slots, 'abcdefghi'.split(''), { from: FROM })).toBe(null)
  })
})

describe('planStats', () => {
  it('averages laundry time per month', () => {
    const slots = week(['room'], [1, 2], [[420, 720], [720, 1020]])
    const entries = [
      { slot_id: 'room:1:420', party_id: 'a', ...everyNWeeks(1) },
      { slot_id: 'room:1:720', party_id: 'a', ...everyNWeeks(1) },
      { slot_id: 'room:2:420', party_id: 'b', ...monthly(1) },
    ]
    const s = planStats(slots, entries, { from: FROM })
    expect(s.parties.a.days).toBeCloseTo(4.35, 1) // one day a week
    expect(s.parties.a.hours).toBeCloseTo(4.35 * 10, 0)
    expect(s.parties.b.days).toBeCloseTo(1, 0) // once a month
    expect(s.free.slots).toBeGreaterThan(s.parties.b.slots)
  })

  it('counts parallel machines once', () => {
    const slots = week(['washer', 'dryer'], [1], [[420, 720]])
    const entries = slots.map((s) => ({ slot_id: s.id, party_id: 'a', ...everyNWeeks(1) }))
    const s = planStats(slots, entries, { from: FROM, weeks: 4 })
    expect(s.parties.a.hours * ((4 * 7) / (365.25 / 12))).toBeCloseTo(4 * 5)
  })
})

describe('slotOccurrences', () => {
  it('lists upcoming dates with the deciding rule', () => {
    const slot = { id: 's', weekday: 1 }
    const rule = { slot_id: 's', party_id: 'a', ...everyNWeeks(2, FROM) }
    const next = slotOccurrences(slot, [rule], '2026-09-24', 3)
    expect(next.map((o) => [o.date, o.entry?.party_id ?? null])).toEqual([
      ['2026-09-28', 'a'], ['2026-10-05', null], ['2026-10-12', 'a'],
    ])
  })
})

describe('regular times', () => {
  const weekly = { cycle_weeks: 1, week_offset: 0, month_week: 0 }
  const monthly1 = { cycle_weeks: 1, week_offset: 0, month_week: 1 }

  it('merges back-to-back time slots with the same rule', () => {
    const items = [
      { weekday: 2, start_min: 720, end_min: 1020, rule: weekly, ref: 'b' },
      { weekday: 2, start_min: 420, end_min: 720, rule: weekly, ref: 'a' },
      { weekday: 2, start_min: 1020, end_min: 1320, rule: monthly1, ref: 'c' },
    ]
    expect(mergeRegularTimes(items)).toEqual([
      { weekday: 2, rule: weekly, start: 420, end: 1020, refs: ['a', 'b'] },
      { weekday: 2, rule: monthly1, start: 1020, end: 1320, refs: ['c'] },
    ])
  })

  it('combines the same time on several units', () => {
    const row = (id, resource_id, weekday, start_min, end_min, rule = weekly) => ({ id, resource_id, weekday, start_min, end_min, ...rule })
    const got = regularTimesByUnit([
      row('1', 'room', 4, 1020, 1320),
      row('2', 'dry', 4, 1020, 1320),
      row('3', 'room', 6, 420, 720, monthly1),
    ])
    expect(got).toEqual([
      { weekday: 4, rule: weekly, start: 1020, end: 1320, resourceIds: ['room', 'dry'] },
      { weekday: 6, rule: monthly1, start: 420, end: 720, resourceIds: ['room'] },
    ])
  })

  it('finds the next date of a rule', () => {
    expect(nextOccurrence(weekly, 4, '2026-09-23')).toBe('2026-09-24')
    expect(nextOccurrence(monthly1, 6, '2026-09-23')).toBe('2026-10-03')
    expect(nextOccurrence({ cycle_weeks: 2, week_offset: 0, month_week: 0 }, 2, '2026-09-23')).toBe('2026-09-29')
  })
})
