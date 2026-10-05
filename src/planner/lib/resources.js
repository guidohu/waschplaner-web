// Machines and rooms. A bookable unit (resource) is either one machine/room
// or a "laundry_room" that bundles the machines listed in its `equipment`.

export const MACHINE_KINDS = ['washer', 'dryer', 'drying_room', 'other']

const ICONS = { washer: 'washer', dryer: 'dryer', drying_room: 'drying', other: 'box', laundry_room: 'basket' }
export const kindIcon = (kind) => ICONS[kind] || 'box'

/** [{ kind, count }] for the machines in a unit, in a fixed order. */
export function equipmentCounts(equipment = []) {
  return MACHINE_KINDS.map((kind) => ({ kind, count: equipment.filter((k) => k === kind).length })).filter(
    (x) => x.count > 0,
  )
}
