// The planner's plan suggestion: like autoDistribute (plan.js), but the user
// chooses after how many weeks the plan repeats and how much time stays free
// for spontaneous washing. A flat's turns stay together (back-to-back days,
// or time windows on one day) unless asked otherwise; the free turns are
// spread as evenly as possible over the rotation.
import { weekIndex, weekStart } from './dates'
import { MAX_CYCLE_WEEKS } from './recurrence'

/** What one flat gets per turn: a whole weekday ("days") or one time window ("slots"). */
function turnUnits(slots, mode) {
  const sorted = [...slots].sort((a, b) => a.weekday - b.weekday || a.start_min - b.start_min)
  const key = mode === 'days' ? (s) => s.weekday : (s) => `${s.weekday}-${s.start_min}`
  const units = new Map()
  for (const s of sorted) {
    const k = key(s)
    if (!units.has(k)) units.set(k, [])
    units.get(k).push(s)
  }
  return [...units.values()].map((list) => ({ slots: list, weekday: list[0].weekday, minutes: windowMinutes(list) }))
}

/** Minutes of a turn; the same time window on several machines counts once. */
function windowMinutes(slots) {
  const windows = new Map(slots.map((s) => [`${s.weekday}-${s.start_min}`, s.end_min - s.start_min]))
  return [...windows.values()].reduce((a, b) => a + b, 0)
}

/** The shortest rotation in which every flat gets a turn. */
export const minCycle = (turnsPerWeek, parties) => Math.max(1, Math.ceil(parties / Math.max(1, turnsPerWeek)))

/**
 * Where each flat's block of `k` back-to-back turns starts, for `p` flats in
 * `total` turns. Blocks should not cross a day (time windows) or a week
 * (whole days) where avoidable; after that, they start as close as possible
 * to evenly spaced positions, which spreads the free turns between them.
 * Dynamic programming over (flat, start), O(p · total).
 */
function blockStarts(units, mode, total, p, k) {
  const perWeek = units.length
  const area = (pos) => {
    const week = Math.floor(pos / perWeek)
    return mode === 'days' ? week : week * 7 + units[pos % perWeek].weekday
  }
  // edges[q]: how many day (or week) changes there are up to position q.
  const edges = [0]
  for (let q = 1; q < total; q++) edges.push(edges[q - 1] + (area(q) !== area(q - 1) ? 1 : 0))
  const spans = (s) => edges[s + k - 1] - edges[s]
  const SPLIT = p * total * total + 1 // splitting a block weighs more than any spacing
  const back = []
  let prev = null
  for (let i = 0; i < p; i++) {
    const cost = new Array(total).fill(Infinity)
    const from = new Array(total).fill(-1)
    const ideal = (i * total) / p
    let best = Infinity
    let bestAt = -1
    for (let s = 0; s + k <= total; s++) {
      if (i > 0) {
        const q = s - k
        if (q >= 0 && prev[q] < best) [best, bestAt] = [prev[q], q]
        if (best === Infinity) continue
      }
      cost[s] = (i > 0 ? best : 0) + (s - ideal) ** 2 + SPLIT * spans(s)
      from[s] = bestAt
    }
    back.push(from)
    prev = cost
  }
  const starts = new Array(p)
  starts[p - 1] = prev.indexOf(Math.min(...prev))
  for (let i = p - 1; i > 0; i--) starts[i - 1] = back[i][starts[i]]
  return starts
}

/**
 * A fair plan for `partyIds`, starting in the week of `from`.
 *
 * cycle: the plan repeats after this many weeks (raised to the shortest
 * possible rotation); turns: how many turns each flat gets per rotation
 * (limited to what fits); together: a flat's turns back to back, or spread
 * over the rotation. Every turn not handed out stays free.
 *
 * Returns { entries, mode, cycle, turns, maxTurns, perWeek, freeTurns,
 * freeMinutes, totalMinutes } (minutes per rotation), or null if there are
 * too many flats for MAX_CYCLE_WEEKS weeks.
 */
export function suggestPlan(slots, partyIds, { mode = 'days', cycle = 1, turns = 1, together = true, from }) {
  const units = turnUnits(slots, mode)
  const p = partyIds.length
  const perWeek = units.length
  const weekMinutes = units.reduce((a, u) => a + u.minutes, 0)
  if (!perWeek || !p) {
    return { entries: [], mode, cycle: 1, turns: 0, maxTurns: 0, perWeek, freeTurns: perWeek, freeMinutes: weekMinutes, totalMinutes: weekMinutes }
  }
  const c = Math.max(cycle, minCycle(perWeek, p))
  if (c > MAX_CYCLE_WEEKS) return null
  const total = perWeek * c
  const maxTurns = Math.floor(total / p)
  const k = Math.min(Math.max(1, turns), maxTurns)
  const given = k * p
  const firstWeek = weekIndex(weekStart(from))
  // Turn j of `given`: [position, flat index].
  const turnsAt = []
  if (together && k > 1) {
    blockStarts(units, mode, total, p, k).forEach((start, i) => {
      for (let n = 0; n < k; n++) turnsAt.push([start + n, i])
    })
  } else {
    // Flats take turns, spread evenly so the free ones fall between them.
    for (let j = 0; j < given; j++) turnsAt.push([Math.floor((j * total) / given), j % p])
  }
  const entries = []
  const taken = new Set()
  for (const [pos, i] of turnsAt) {
    const week = Math.floor(pos / perWeek)
    taken.add(pos)
    for (const s of units[pos % perWeek].slots) {
      entries.push({
        slot_id: s.id,
        party_id: partyIds[i],
        cycle_weeks: c,
        week_offset: c > 1 ? (firstWeek + week) % c : 0,
        month_week: 0,
      })
    }
  }
  let freeMinutes = 0
  for (let pos = 0; pos < total; pos++) if (!taken.has(pos)) freeMinutes += units[pos % perWeek].minutes
  return {
    entries,
    mode,
    together,
    cycle: c,
    turns: k,
    maxTurns,
    perWeek,
    freeTurns: total - given,
    freeMinutes,
    totalMinutes: weekMinutes * c,
  }
}
