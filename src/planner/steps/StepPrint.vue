<script setup>
// The last step: the printed plan, A4 with two weeks per sheet, one set of
// sheets per machine or room – up to a whole year. Adapted from the app's
// admin/PrintTab.vue, but the plan is computed in the browser (lib/localBoard.js)
// instead of loaded from the server. A single day can differ from the regular
// schedule: tap its time slot in the preview.
import { computed, ref } from 'vue'
import BaseIcon from '../../components/BaseIcon.vue'
import BaseModal from '../components/BaseModal.vue'
import { draft, openPlan, overrideKey, parties, planFile, setOverride, slots, units, validEntries, validOverrides } from '../draft'
import { addDays, isoWeekNumber, weekStart } from '../lib/dates'
import { fmtDateNum, fmtDateShort, fmtMin, fmtWeekRange, fmtWeekdayShort } from '../lib/format'
import { kindIcon } from '../lib/resources'
import { sheetsFor } from '../lib/printPlan'
import { localBoards } from '../lib/localBoard'
import { toast } from '../toast'
import { t } from '../../i18n'

// Two weeks per page, up to a whole year.
const PAGE_CHOICES = [1, 2, 3, 4, 6, 8, 13, 26]

const boards = computed(() =>
  localBoards({ slots: slots.value, entries: validEntries.value, overrides: validOverrides.value }, draft.print.start, draft.print.pages),
)
const partyById = computed(() => new Map(parties.value.map((p) => [p.id, p])))
const chosen = computed(() => units.value.filter((u) => !draft.print.excluded.includes(u.id)))
// Landscape has room for at most a handful of columns, so with 7 weekdays the
// day columns get squeezed. Swapping axes puts days (up to 7) on the rows and
// time slots (usually few) as columns, which stay readable.
const transposed = computed(() => draft.print.orientation === 'landscape')
function weekGrid(sheet) {
  const tr = transposed.value
  return {
    key: (h) => (typeof h === 'string' ? h : `${h.start}-${h.end}`),
    label: (h) => (typeof h === 'string' ? `${fmtWeekdayShort(h)} ${fmtDateNum(h)}` : `${fmtMin(h.start)}–${fmtMin(h.end)}`),
    cell: (rowHeader, colHeader) => (tr ? sheet.cell(rowHeader, colHeader) : sheet.cell(colHeader, rowHeader)),
  }
}
const sheets = computed(() =>
  chosen.value.flatMap((u) =>
    sheetsFor(u.id, boards.value).map((sheet) => ({
      ...sheet,
      resource: u,
      grid: weekGrid(sheet),
      weeks: sheet.weeks.map((w) => ({
        ...w,
        colHeaders: transposed.value ? sheet.rows : w.days,
        rowHeaders: transposed.value ? w.days : sheet.rows,
      })),
    })),
  ),
)

function toggle(id) {
  const ex = draft.print.excluded
  draft.print.excluded = ex.includes(id) ? ex.filter((x) => x !== id) : [...ex, id]
}
function pickWeek(e) {
  if (e.target.value) draft.print.start = weekStart(e.target.value)
}

const party = (c) => (c?.party_id ? partyById.value.get(c.party_id) : null)
const printedOn = fmtDateShort(new Date().toISOString())
const print = () => window.print()

// --- a single day ---
const changeCount = computed(() => Object.keys(validOverrides.value).length)
const editing = ref(null) // the cell being changed
const editTitle = computed(() => {
  const c = editing.value
  return c ? `${fmtWeekdayShort(c.date)} ${fmtDateNum(c.date)} · ${fmtMin(c.start_min)}–${fmtMin(c.end_min)}` : ''
})
const regularName = computed(() => party({ party_id: editing.value?.regular_party_id })?.name || t('planner.day.free'))
// What the cell shows now: a flat id, '' for free, or null for "as in the regular schedule".
const current = computed(() => {
  const c = editing.value
  if (!c) return null
  const key = overrideKey(c.slot_id, c.date)
  return key in validOverrides.value ? validOverrides.value[key] : null
})
function choose(value) {
  const c = editing.value
  setOverride(c.slot_id, c.date, value)
  editing.value = null
}
function resetChanges() {
  draft.overrides = {}
}

// --- saving to and opening from a file ---
const fileInput = ref(null)
function saveFile() {
  const { blob, name } = planFile()
  const url = URL.createObjectURL(blob)
  const a = Object.assign(document.createElement('a'), { href: url, download: name })
  a.click()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}
async function openFile(e) {
  const file = e.target.files?.[0]
  e.target.value = ''
  if (!file) return
  if (openPlan(await file.text())) toast(t('planner.file.opened'))
  else toast(t('planner.file.invalid'), 'error', 5000)
}
</script>

<template>
  <section class="setup-step wide">
    <header class="step-head no-print">
      <h1 tabindex="-1">{{ $t('planner.print.title') }}</h1>
      <p class="lead">{{ $t('planner.print.lead') }}</p>
    </header>

    <div class="card stack no-print">
      <div class="controls">
        <label class="field">
          <span>{{ $t('print.from') }}</span>
          <input type="date" :value="draft.print.start" required @change="pickWeek">
          <span class="hint">{{ $t('print.week', { n: isoWeekNumber(draft.print.start) }) }} · {{ fmtWeekRange(draft.print.start, addDays(draft.print.start, 6)) }}</span>
        </label>
        <label class="field">
          <span>{{ $t('print.pages') }}</span>
          <select v-model.number="draft.print.pages">
            <option v-for="n in PAGE_CHOICES" :key="n" :value="n">{{ $t('print.pagesOpt', { n, weeks: 2 * n }) }}</option>
          </select>
        </label>
        <label class="field">
          <span>{{ $t('print.orientation') }}</span>
          <select v-model="draft.print.orientation">
            <option value="portrait">{{ $t('print.portrait') }}</option>
            <option value="landscape">{{ $t('print.landscape') }}</option>
          </select>
        </label>
      </div>
      <div v-if="units.length > 1" class="field">
        <span>{{ $t('print.machines') }}</span>
        <div class="chips" role="group">
          <button
            v-for="u in units"
            :key="u.id"
            type="button"
            class="chip"
            :class="{ active: !draft.print.excluded.includes(u.id) }"
            :aria-pressed="!draft.print.excluded.includes(u.id)"
            @click="toggle(u.id)"
          >
            <BaseIcon :name="kindIcon(u.kind)" :size="16" /> {{ u.name }}
          </button>
        </div>
      </div>
      <p class="muted small change-hint">
        <BaseIcon name="edit" :size="16" /> {{ $t('planner.print.changeHint') }}
        <template v-if="changeCount">
          {{ $t('planner.print.changes', { n: changeCount }) }}
          <button type="button" class="link-btn" @click="resetChanges">{{ $t('planner.print.resetChanges') }}</button>
        </template>
      </p>
      <div class="print-row">
        <button type="button" class="btn" :disabled="!sheets.length" @click="print">
          <BaseIcon name="print" :size="18" /> {{ $t('print.print') }}
        </button>
        <span class="muted small">{{ $t('print.pdfHint') }}</span>
      </div>
    </div>

    <div class="card stack no-print file-card">
      <div>
        <h2>{{ $t('planner.file.title') }}</h2>
        <p class="muted small">{{ $t('planner.file.text') }}</p>
      </div>
      <div class="row">
        <button type="button" class="btn ghost" @click="saveFile">
          <BaseIcon name="note" :size="18" /> {{ $t('planner.file.save') }}
        </button>
        <button type="button" class="btn ghost" @click="fileInput.click()">
          <BaseIcon name="copy" :size="18" /> {{ $t('planner.file.open') }}
        </button>
        <input ref="fileInput" type="file" accept=".json,application/json" class="sr-only" tabindex="-1" @change="openFile">
      </div>
    </div>

    <p v-if="!chosen.length && units.length" class="empty no-print">{{ $t('print.none') }}</p>

    <!-- The sheets: a preview on screen, the pages on paper. -->
    <div class="sheets">
      <article v-for="sh in sheets" :key="sh.resource.id + sh.from" class="sheet" :class="draft.print.orientation">
        <div class="sheet-body">
          <header class="sheet-head">
            <div>
              <p class="sheet-house">{{ draft.houseName }}</p>
              <h1 class="sheet-title">{{ sh.resource.name }}</h1>
            </div>
            <p class="sheet-range">{{ fmtWeekRange(sh.from, sh.to) }}</p>
          </header>
          <div class="sheet-weeks">
            <section v-for="w in sh.weeks" :key="w.from" class="sheet-week">
              <h2 class="week-title">
                <span>{{ $t('print.week', { n: isoWeekNumber(w.from) }) }}</span> {{ fmtWeekRange(w.from, w.to) }}
              </h2>
              <table class="week-table">
                <thead>
                  <tr>
                    <th class="time-col">{{ transposed ? '' : $t('print.time') }}</th>
                    <th v-for="h in w.colHeaders" :key="sh.grid.key(h)">{{ sh.grid.label(h) }}</th>
                  </tr>
                </thead>
                <tbody>
                  <!-- Equal rows, so they line up like a printed timetable. -->
                  <tr v-for="rh in w.rowHeaders" :key="sh.grid.key(rh)" :style="{ height: 100 / w.rowHeaders.length + '%' }">
                    <th class="time-col">{{ sh.grid.label(rh) }}</th>
                    <template v-for="ch in w.colHeaders" :key="sh.grid.key(ch)">
                      <td v-if="!sh.grid.cell(rh, ch)" class="none" />
                      <td
                        v-else
                        class="editable"
                        :class="{ free: !party(sh.grid.cell(rh, ch)), changed: sh.grid.cell(rh, ch).changed }"
                        :style="party(sh.grid.cell(rh, ch)) ? { '--flat': party(sh.grid.cell(rh, ch)).color } : null"
                        tabindex="0"
                        role="button"
                        @click="editing = sh.grid.cell(rh, ch)"
                        @keydown.enter.prevent="editing = sh.grid.cell(rh, ch)"
                      >
                        <b v-if="party(sh.grid.cell(rh, ch))">{{ party(sh.grid.cell(rh, ch)).name }}</b>
                        <template v-else>{{ $t('print.free') }}</template>
                      </td>
                    </template>
                  </tr>
                </tbody>
              </table>
            </section>
          </div>
          <footer class="sheet-foot">
            <span>{{ $t('print.printed', { date: printedOn }) }}</span>
            <span><img src="/favicon.svg" alt="" width="12" height="12"> {{ $t('print.footer') }}</span>
          </footer>
        </div>
      </article>
    </div>

    <BaseModal v-if="editing" :title="editTitle" @close="editing = null">
      <div class="stack">
        <p class="muted">{{ $t('planner.day.intro') }}</p>
        <div class="flat-pick day-pick">
          <button type="button" class="flat-option" :class="{ active: current === null }" @click="choose(null)">
            <BaseIcon name="repeat" :size="18" />
            <span>{{ $t('planner.day.asPlan') }}<br><span class="muted small">{{ $t('planner.day.regular', { name: regularName }) }}</span></span>
          </button>
          <button
            v-for="p in parties"
            :key="p.id"
            type="button"
            class="flat-option"
            :class="{ active: current === p.id }"
            @click="choose(p.id)"
          >
            <span class="dot" :style="{ background: p.color }" /> {{ p.name }}
          </button>
          <button type="button" class="flat-option" :class="{ active: current === '' }" @click="choose('')">
            <BaseIcon name="minus" :size="18" /> {{ $t('planner.day.free') }}
          </button>
        </div>
      </div>
    </BaseModal>
  </section>
</template>

<style scoped>
.controls { display: flex; flex-wrap: wrap; gap: 1rem 1.5rem; }
.controls .field { min-width: 200px; }
.chips { display: flex; flex-wrap: wrap; gap: 0.4rem; }
.chip { min-height: 44px; }
.print-row { display: flex; flex-wrap: wrap; align-items: center; gap: 0.5rem 1rem; }
.change-hint { display: flex; flex-wrap: wrap; align-items: center; gap: 0.35rem; margin: 0; }
.file-card h2 { margin-bottom: 0.2rem; }
.file-card p { margin: 0; }
.day-pick { grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); }
.day-pick .flat-option:first-child { grid-column: 1 / -1; }

/*
 * A sheet is paper: white with black text in both themes. Sizes are in cqw
 * (1% of the sheet's width), so the preview is the printed page scaled down.
 * They are set inside the sheet: on the container itself cqw would refer to
 * the page around it. (As in the app's admin/PrintTab.vue.)
 */
.sheets { display: flex; flex-direction: column; align-items: center; gap: 1.5rem; }
.sheet {
  container-type: inline-size; width: min(100%, 820px); aspect-ratio: 210 / 297; background: #fff; color: #111;
  box-shadow: var(--shadow-lg); page: plan; print-color-adjust: exact; -webkit-print-color-adjust: exact;
}
.sheet-body {
  height: 100%; padding: 4.5cqw 4.5cqw 3.5cqw; display: flex; flex-direction: column; gap: 2cqw;
  font-size: 1.55cqw; line-height: 1.25;
}
.sheet-head { display: flex; justify-content: space-between; align-items: flex-end; gap: 2cqw; border-bottom: 0.3cqw solid #111; padding-bottom: 1.2cqw; }
.sheet-house { margin: 0; font-size: 1.8cqw; color: #444; }
.sheet-title { margin: 0; font-size: 3.6cqw; letter-spacing: -0.02em; }
.sheet-range { margin: 0; font-size: 1.9cqw; font-weight: 700; text-align: right; }
.sheet-weeks { flex: 1; min-height: 0; display: flex; flex-direction: column; gap: 2cqw; }
.sheet-week { flex: 1; min-height: 0; display: flex; flex-direction: column; gap: 0.8cqw; }
/* Side by side, each week is its own container so its cqw units scale to its own (halved) width. */
.sheet.landscape { aspect-ratio: 297 / 210; }
.sheet.landscape .sheet-weeks { flex-direction: row; }
.sheet.landscape .sheet-week { container-type: inline-size; }
.week-title { margin: 0; font-size: 2cqw; }
.week-title span { display: inline-block; padding: 0.1cqw 1cqw; margin-right: 0.6cqw; border-radius: 1cqw; background: #111; color: #fff; }
.week-table { flex: 1; width: 100%; border-collapse: collapse; table-layout: fixed; }
.week-table th, .week-table td { border: 0.15cqw solid #9aa3ad; padding: 0.4cqw 0.7cqw; vertical-align: middle; }
.week-table thead th { background: #eef1f4; font-size: 1.45cqw; text-align: center; height: 3.4cqw; }
.time-col { width: 17cqw; white-space: nowrap; font-size: 1.45cqw; font-variant-numeric: tabular-nums; text-align: left !important; background: #f6f7f9; }
tbody .time-col { font-weight: 700; }
.week-table td {
  background: color-mix(in srgb, var(--flat) 16%, #fff); border-left: 0.9cqw solid var(--flat);
  overflow: hidden;
}
.week-table td b {
  display: -webkit-box; -webkit-line-clamp: 3; line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;
  overflow-wrap: break-word; hyphens: auto; font-weight: 700; font-size: 1.75cqw;
}
.week-table td.free { background: #fff; border-left: 0.15cqw solid #9aa3ad; color: #777; font-style: italic; }
.week-table td.none { background: repeating-linear-gradient(135deg, #f1f2f4 0 0.8cqw, #fff 0.8cqw 1.6cqw); border-left: 0.15cqw solid #9aa3ad; }
.sheet-foot { display: flex; justify-content: space-between; gap: 2cqw; font-size: 1.2cqw; color: #555; }
.sheet-foot span { display: inline-flex; align-items: center; gap: 0.6cqw; }
.sheet-foot img { width: 1.6cqw; height: 1.6cqw; }

/* On screen only: time slots can be changed for a single day. */
@media screen {
  .week-table td.editable { cursor: pointer; }
  .week-table td.editable:hover { outline: 0.4cqw solid var(--primary); outline-offset: -0.4cqw; }
  .week-table td.editable:focus-visible { outline: 0.5cqw solid var(--primary); outline-offset: -0.5cqw; }
  .week-table td.changed { box-shadow: inset 0 0 0 0.3cqw #111; }
}

@page plan {
  size: A4 portrait;
  margin: 10mm;
}
@page plan-landscape {
  size: A4 landscape;
  margin: 10mm;
}
@media print {
  .sheets { display: block; }
  .sheet { width: 100%; height: 276mm; aspect-ratio: auto; box-shadow: none; break-after: page; }
  .sheet.landscape { page: plan-landscape; height: 189mm; }
  .sheet-body { padding: 0; }
  .sheet:last-child { break-after: auto; }
}
</style>
