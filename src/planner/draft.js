// State of the browser planner: the house, its machines, time slots, regular
// schedule and single-day changes. It never leaves the browser: it is kept in
// localStorage on this device and can be saved to and opened from a file.
// Adapted from the app's setup wizard (frontend/src/views/setup/setupDraft.js).
import { computed, reactive, watch } from 'vue'
import { t } from '../i18n'
import { MACHINE_KINDS } from './lib/resources'
import { paletteColor } from '../lib/palette'
import { layoutFor, splitEvenly } from './lib/slotLayout'
import { todayISO, weekStart } from './lib/dates'

const STORAGE_KEY = 'wp_planner'
const VERSION = 1
/** What a saved plan file says it is. */
export const FILE_KIND = 'waschplaner-plan'

export const STEPS = ['house', 'machines', 'times', 'plan', 'print']

function freshDraft() {
  return {
    version: VERSION,
    step: 0,
    houseName: '',
    parties: [1, 2, 3, 4].map((n) => ({ id: `p${n}`, name: '', edited: false })),
    nextPartyId: 5,
    // Machines and rooms: one item each, in MACHINE_KINDS order.
    items: [
      { id: 'm1', kind: 'washer', name: '', edited: false, group: 1 },
      { id: 'm2', kind: 'dryer', name: '', edited: false, group: 1 },
      { id: 'm3', kind: 'drying_room', name: '', edited: false, group: 1 },
    ],
    nextItemId: 4,
    bookingMode: 'together', // together | separate | mixed
    togetherName: '',
    groupNames: {}, // mixed mode: group number -> name
    layout: layoutFor([1, 2, 3, 4, 5, 6], splitEvenly(7 * 60, 22 * 60, 3)),
    entries: [],
    planPending: true, // ask how the plan should look when the plan step opens
    // The answers for the plan suggestion (lib/suggest.js): whole days or time
    // windows, repeat after `cycle` weeks, `turns` per flat (the rest stays free),
    // a flat's turns back to back (`together`) or spread over the rotation.
    suggest: { mode: 'days', cycle: 1, turns: 1, together: true },
    // Single days that differ from the regular schedule: "slotId|date" -> flat id, or '' for free.
    overrides: {},
    print: { start: weekStart(todayISO()), pages: 26, orientation: 'portrait', excluded: [] },
  }
}

function upgrade(saved) {
  const fresh = freshDraft()
  return { ...fresh, ...saved, print: { ...fresh.print, ...saved.print }, suggest: { ...fresh.suggest, ...saved.suggest } }
}

function restore() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null')
    if (saved?.version === VERSION) return upgrade(saved)
  } catch {
    /* ignore unreadable drafts */
  }
  return freshDraft()
}

export const draft = reactive(restore())

watch(
  draft,
  () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(draft))
    } catch {
      /* storage unavailable: the planner still works, it just forgets on reload */
    }
  },
  { deep: true },
)

export function resetDraft() {
  Object.assign(draft, freshDraft())
}

// --- saving to and opening from a file (stays on the user's device) ---

/** The plan as a file the user downloads; nothing is sent anywhere. */
export function planFile() {
  const { step, ...plan } = draft // eslint-disable-line no-unused-vars
  const json = JSON.stringify({ kind: FILE_KIND, ...plan }, null, 2)
  const name = (draft.houseName.trim() || 'waschplan').replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-|-$/g, '')
  return { blob: new Blob([json], { type: 'application/json' }), name: `${name || 'waschplan'}.waschplan.json` }
}

/** Opens a saved plan; returns false if the text is not one. */
export function openPlan(text) {
  let data
  try {
    data = JSON.parse(text)
  } catch {
    return false
  }
  if (data?.kind !== FILE_KIND || data.version !== VERSION || !Array.isArray(data.parties) || !Array.isArray(data.items)) return false
  delete data.kind
  Object.assign(draft, upgrade({ ...data, step: STEPS.indexOf('print'), planPending: false }))
  return true
}

// --- flats ---

const defaultPartyName = (i) => t('setup.house.flatN', { n: i + 1 })

export const parties = computed(() =>
  draft.parties.map((p, i) => ({
    id: p.id,
    name: (p.edited ? p.name : defaultPartyName(i)).trim(),
    color: p.color || paletteColor(i),
  })),
)

export function setPartyColor(i, color) {
  draft.parties[i] = { ...draft.parties[i], color }
}

export function setPartyCount(n) {
  while (draft.parties.length < n) draft.parties.push({ id: `p${draft.nextPartyId++}`, name: '', edited: false })
  draft.parties.splice(n)
}

export function setPartyName(i, name) {
  draft.parties[i] = { ...draft.parties[i], name, edited: true }
}

/** Fills in flat names by floor: "EG links", "EG rechts", "1. OG links", … */
export function fillByFloor(perFloor) {
  const sides = t(`setup.house.sides${perFloor}`).split(',')
  draft.parties.forEach((p, i) => {
    const floor = Math.floor(i / perFloor)
    const floorName = floor === 0 ? t('setup.house.groundFloor') : t('setup.house.floorN', { n: floor })
    const side = perFloor > 1 ? ` ${sides[i % perFloor]}` : ''
    draft.parties[i] = { ...p, name: floorName + side, edited: true }
  })
}

export function fillNumbered() {
  draft.parties.forEach((p, i) => (draft.parties[i] = { ...p, name: '', edited: false }))
}

// --- machines and bookable units ---

export const machineCount = (kind) => draft.items.filter((i) => i.kind === kind).length

export function setMachineCount(kind, n) {
  const current = draft.items.filter((i) => i.kind === kind)
  if (n > current.length) {
    for (let k = current.length; k < n; k++) {
      draft.items.push({ id: `m${draft.nextItemId++}`, kind, name: '', edited: false, group: 1 })
    }
  } else {
    const drop = new Set(current.slice(n).map((i) => i.id))
    draft.items = draft.items.filter((i) => !drop.has(i.id))
  }
  draft.items.sort((a, b) => MACHINE_KINDS.indexOf(a.kind) - MACHINE_KINDS.indexOf(b.kind))
}

export function itemName(item) {
  if (item.edited) return item.name
  const same = draft.items.filter((i) => i.kind === item.kind)
  return t('kind.' + item.kind) + (same.length > 1 ? ` ${same.indexOf(item) + 1}` : '')
}

export function setItemName(item, name) {
  Object.assign(item, { name, edited: true })
}

/** How people book: several machines can only be booked together or separately if there are several. */
export const bookingMode = computed(() => (draft.items.length > 1 ? draft.bookingMode : 'separate'))

export const usedGroups = computed(() => [...new Set(draft.items.map((i) => i.group))].sort((a, b) => a - b))

export function groupName(group) {
  const custom = draft.groupNames[group]
  if (custom) return custom
  const items = draft.items.filter((i) => i.group === group)
  if (items.length === 1) return itemName(items[0])
  return usedGroups.value.length > 1 ? t('setup.machines.roomN', { n: usedGroups.value.indexOf(group) + 1 }) : t('kind.laundry_room')
}

function bundle(id, name, items) {
  if (items.length === 1) return { id, name, kind: items[0].kind, equipment: [] }
  return { id, name, kind: 'laundry_room', equipment: items.map((i) => i.kind) }
}

/** The bookable units ("resources") on the plan. IDs stay stable while editing. */
export const units = computed(() => {
  if (!draft.items.length) return []
  switch (bookingMode.value) {
    case 'together':
      return [bundle('u-all', draft.togetherName.trim() || t('kind.laundry_room'), draft.items)]
    case 'mixed':
      return usedGroups.value.map((g) =>
        bundle(`u-g${g}`, groupName(g).trim(), draft.items.filter((i) => i.group === g)),
      )
    default:
      return draft.items.map((i) => ({ id: `u-${i.id}`, name: itemName(i).trim(), kind: i.kind, equipment: [] }))
  }
})

// --- time slots, plan and single days ---

const slotId = (unitId, w) => `${unitId}|${w.weekday}|${w.start_min}`

export const slots = computed(() =>
  units.value.flatMap((u) => draft.layout.map((w) => ({ id: slotId(u.id, w), resource_id: u.id, ...w }))),
)

/** Plan rules whose slot and flat still exist. */
export const validEntries = computed(() => {
  const slotIds = new Set(slots.value.map((s) => s.id))
  const partyIds = new Set(draft.parties.map((p) => p.id))
  return draft.entries.filter((e) => slotIds.has(e.slot_id) && partyIds.has(e.party_id))
})

/** Single-day changes whose slot and flat still exist. */
export const validOverrides = computed(() => {
  const slotIds = new Set(slots.value.map((s) => s.id))
  const partyIds = new Set(draft.parties.map((p) => p.id))
  return Object.fromEntries(
    Object.entries(draft.overrides).filter(([key, party]) => slotIds.has(key.slice(0, key.lastIndexOf('|'))) && (party === '' || partyIds.has(party))),
  )
})

export const overrideKey = (slotIdValue, date) => `${slotIdValue}|${date}`

/** Changes one day: a flat id, '' for free, or null to follow the regular schedule again. */
export function setOverride(slotIdValue, date, party) {
  const next = { ...draft.overrides }
  if (party === null) delete next[overrideKey(slotIdValue, date)]
  else next[overrideKey(slotIdValue, date)] = party
  draft.overrides = next
}

// Ask for a new suggestion if the machines changed completely.
watch(
  () => units.value.map((u) => u.id).join(),
  () => {
    if (!validEntries.value.length) draft.planPending = true
  },
)
