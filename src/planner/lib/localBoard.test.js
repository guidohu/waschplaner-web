import { describe, expect, it } from 'vitest'
import { localBoards } from './localBoard'
import { everyNWeeks } from './recurrence'
import { sheetsFor } from './printPlan'

// Two time slots on Mondays (2026-10-05 is a Monday).
const slots = [
  { id: 'u|1|420', resource_id: 'u', weekday: 1, start_min: 420, end_min: 720 },
  { id: 'u|1|720', resource_id: 'u', weekday: 1, start_min: 720, end_min: 1020 },
]
const entries = [
  { slot_id: 'u|1|420', party_id: 'a', ...everyNWeeks(1, '2026-10-05') },
  { slot_id: 'u|1|720', party_id: 'b', ...everyNWeeks(2, '2026-10-05') },
]

describe('localBoards', () => {
  it('fills two-week boards from the regular schedule', () => {
    const [first, second] = localBoards({ slots, entries }, '2026-10-05', 2)
    expect(first.from).toBe('2026-10-05')
    expect(second.from).toBe('2026-10-19')
    const mondays = first.cells.map((c) => [c.date, c.start_min, c.party_id])
    expect(mondays).toEqual([
      ['2026-10-05', 420, 'a'],
      ['2026-10-05', 720, 'b'],
      ['2026-10-12', 420, 'a'],
      ['2026-10-12', 720, null], // every 2 weeks: free in between
    ])
  })

  it('applies single-day changes, including "free"', () => {
    const overrides = { 'u|1|420|2026-10-12': 'b', 'u|1|720|2026-10-05': '' }
    const [board] = localBoards({ slots, entries, overrides }, '2026-10-05', 1)
    const cell = (date, start) => board.cells.find((c) => c.date === date && c.start_min === start)
    expect(cell('2026-10-12', 420)).toMatchObject({ party_id: 'b', regular_party_id: 'a', changed: true })
    expect(cell('2026-10-05', 720)).toMatchObject({ party_id: null, regular_party_id: 'b', changed: true })
    expect(cell('2026-10-05', 420).changed).toBe(false)
  })

  it('prints a whole year as 26 two-week sheets', () => {
    const boards = localBoards({ slots, entries }, '2026-10-05', 26)
    const sheets = sheetsFor('u', boards)
    expect(sheets).toHaveLength(26)
    expect(sheets.at(-1).to).toBe('2027-10-03')
    expect(sheets[0].cell('2026-10-05', { start: 420, end: 720 }).party_id).toBe('a')
  })
})
