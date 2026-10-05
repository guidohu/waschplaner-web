import { describe, expect, it } from 'vitest'
import { sheetsFor } from './printPlan'

const cell = (resource, date, start, end, party = null) => ({
  resource_id: resource, date, start_min: start, end_min: end, party_id: party,
})

describe('sheetsFor', () => {
  // Monday 21 September 2026, two weeks.
  const board = {
    from: '2026-09-21',
    cells: [
      cell('w', '2026-09-21', 420, 720, 'eg'),
      cell('w', '2026-09-21', 720, 1020),
      cell('w', '2026-09-23', 420, 720, 'og'),
      cell('w', '2026-10-02', 480, 600, 'eg'), // a Friday with its own times
      cell('d', '2026-09-22', 420, 1320, 'og'), // another machine
    ],
  }
  const [sheet] = sheetsFor('w', [board])

  it('has two weeks with the weekdays that have time slots', () => {
    expect(sheet.from).toBe('2026-09-21')
    expect(sheet.to).toBe('2026-10-04')
    expect(sheet.weeks.map((w) => w.days)).toEqual([
      ['2026-09-21', '2026-09-23', '2026-09-25'],
      ['2026-09-28', '2026-09-30', '2026-10-02'],
    ])
  })

  it('has one row per time, in order', () => {
    expect(sheet.rows).toEqual([{ start: 420, end: 720 }, { start: 480, end: 600 }, { start: 720, end: 1020 }])
  })

  it('finds the cell of a day and time, or null', () => {
    expect(sheet.cell('2026-09-23', { start: 420, end: 720 }).party_id).toBe('og')
    expect(sheet.cell('2026-09-22', { start: 420, end: 1320 })).toBeNull() // the other machine
    expect(sheet.cell('2026-09-25', { start: 420, end: 720 })).toBeNull()
  })
})
