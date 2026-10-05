// The printed plan: A4 sheets with two weeks each, one set per machine or room.
import { addDays, isoWeekday } from './dates'

const rowKey = (start, end) => `${start}-${end}`

/**
 * The sheets for one machine or room, from boards of 14 days each that start
 * on a Monday (GET /board?days=14). Each sheet has two weeks with the same
 * columns and rows: the weekdays that have time slots on it and their times.
 * `cell(date, row)` is the board cell there, or null where there is no time slot.
 */
export function sheetsFor(resourceId, boards) {
  return boards.map((board) => {
    const cells = board.cells.filter((c) => c.resource_id === resourceId)
    const weekdays = [...new Set(cells.map((c) => isoWeekday(c.date)))].sort((a, b) => a - b)
    const rows = new Map()
    for (const c of cells) rows.set(rowKey(c.start_min, c.end_min), { start: c.start_min, end: c.end_min })
    const byKey = new Map(cells.map((c) => [`${c.date}|${rowKey(c.start_min, c.end_min)}`, c]))
    const weeks = [0, 7].map((offset) => {
      const from = addDays(board.from, offset)
      return { from, to: addDays(from, 6), days: weekdays.map((wd) => addDays(from, wd - 1)) }
    })
    return {
      from: board.from,
      to: addDays(board.from, 13),
      rows: [...rows.values()].sort((a, b) => a.start - b.start || a.end - b.end),
      weeks,
      cell: (date, row) => byKey.get(`${date}|${rowKey(row.start, row.end)}`) || null,
    }
  })
}
