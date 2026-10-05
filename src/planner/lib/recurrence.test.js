import { describe, expect, it } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import { addMonths, monthGrid, monthWeek, weekIndex, nextWeekday, fmtMin, parseHHMM, isoWeekday } from './dates'
import { baseOwner, entryMatches, everyNWeeks, sameRule } from './recurrence'

describe('dates', () => {
  it('numbers weeks like the backend', () => {
    expect(weekIndex('1970-01-05')).toBe(0)
    expect(weekIndex('1970-01-04')).toBe(-1)
    expect(weekIndex('2026-09-28')).toBe(weekIndex('2026-09-27') + 1)
  })

  it.each([
    ['2026-10-05', 1, false],
    ['2026-10-26', 4, true],
    ['2026-09-29', 5, true],
    ['2026-02-23', 4, true],
  ])('monthWeek(%s) = %i, last %s', (date, nth, last) => {
    expect(monthWeek(date)).toEqual({ nth, last })
  })

  it('finds the next weekday', () => {
    expect(nextWeekday('2026-09-23', 3)).toBe('2026-09-23')
    expect(nextWeekday('2026-09-23', 1)).toBe('2026-09-28')
    expect(isoWeekday('2026-09-27')).toBe(7)
  })

  it('converts times', () => {
    expect(fmtMin(1440)).toBe('24:00')
    expect(parseHHMM('07:30')).toBe(450)
  })
})

describe('recurrence', () => {
  it('anchors every-N-weeks rules at the given date', () => {
    const rule = everyNWeeks(2, '2026-10-05')
    expect(entryMatches(rule, '2026-10-05')).toBe(true)
    expect(entryMatches(rule, '2026-10-12')).toBe(false)
    expect(entryMatches(rule, '2026-10-19')).toBe(true)
  })

  it('compares rules', () => {
    expect(sameRule(everyNWeeks(1), { cycle_weeks: 1, week_offset: 0 })).toBe(true)
    expect(sameRule(everyNWeeks(2, '2026-10-05'), everyNWeeks(2, '2026-10-12'))).toBe(false)
  })
})

// The same cases as the Go planner (backend/internal/planner/testdata).
const fixtures = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, 'testdata/recurrence.json'), 'utf8'),
)

describe('shared recurrence fixtures', () => {
  it.each(fixtures.matches.map((m) => [m.name, m]))('%s', (_, m) => {
    expect(entryMatches(m.rule, m.date)).toBe(m.want)
  })

  it.each(fixtures.owners.map((o) => [o.name, o]))('owner: %s', (_, o) => {
    for (const c of o.cases) expect(baseOwner(o.entries, c.date) ?? '').toBe(c.want)
  })
})

describe('month calendar', () => {
  it('adds months across years', () => {
    expect(addMonths('2026-11', 2)).toBe('2027-01')
    expect(addMonths('2026-01', -1)).toBe('2025-12')
  })

  it('lays out a month in Monday-first weeks', () => {
    const weeks = monthGrid('2026-09') // 1 September 2026 is a Tuesday
    expect(weeks).toHaveLength(5)
    expect(weeks[0]).toEqual([null, '2026-09-01', '2026-09-02', '2026-09-03', '2026-09-04', '2026-09-05', '2026-09-06'])
    expect(weeks[4]).toEqual(['2026-09-28', '2026-09-29', '2026-09-30', null, null, null, null])
    expect(monthGrid('2027-02')).toHaveLength(4) // 1 February 2027 is a Monday
    expect(monthGrid('2026-03')).toHaveLength(6)
  })
})
