<script setup>
// The browser planner: five short steps from "name your house" to a printed
// plan for up to a year. Adapted from the app's setup wizard
// (frontend/src/views/setup/SetupView.vue); nothing here talks to a server.
import { computed, nextTick, watch } from 'vue'
import BaseIcon from '../components/BaseIcon.vue'
import StepHouse from './steps/StepHouse.vue'
import StepMachines from './steps/StepMachines.vue'
import StepTimes from './steps/StepTimes.vue'
import StepPlan from './steps/StepPlan.vue'
import StepPrint from './steps/StepPrint.vue'
import TheConfirmHost from './components/TheConfirmHost.vue'
import TheToastHost from './components/TheToastHost.vue'
import { STEPS, draft, parties, resetDraft, units } from './draft'
import { useConfirm } from './composables/useConfirm'
import { layoutDays, windowsError, windowsOn } from './lib/slotLayout'
import { usePageTitle } from '../composables/usePageTitle'
import { t } from '../i18n'
import './planner.css'

usePageTitle(() => t('planner.title'))
const confirm = useConfirm()
const COMPONENTS = [StepHouse, StepMachines, StepTimes, StepPlan, StepPrint]
const last = STEPS.length - 1

/** Why a step cannot be completed yet, or '' if it can. */
function blockerOf(step) {
  switch (STEPS[step]) {
    case 'house':
      if (!draft.houseName.trim()) return t('setup.block.houseName')
      if (parties.value.some((p) => !p.name)) return t('setup.block.flatNames')
      return ''
    case 'machines':
      if (!units.value.length) return t('setup.block.machines')
      if (units.value.some((u) => !u.name)) return t('setup.block.machineNames')
      return ''
    case 'times':
      if (!draft.layout.length) return t('setup.block.times')
      if (layoutDays(draft.layout).some((d) => windowsError(windowsOn(draft.layout, d)))) return t('setup.block.timeErrors')
      return ''
    case 'plan':
      return draft.planPending ? t('planner.suggest.block') : ''
    default:
      return ''
  }
}
const blocker = computed(() => blockerOf(draft.step))
// Steps can be revisited freely up to the first one that is not complete.
const reachable = computed(() => {
  let i = 0
  while (i < last && !blockerOf(i)) i++
  return i
})
// A plan opened from a file (or kept from last time) may point past what is complete.
watch(reachable, (r) => {
  if (draft.step > r) draft.step = r
}, { immediate: true })

function goTo(step) {
  if (step <= reachable.value) draft.step = step
}
watch(
  () => draft.step,
  async () => {
    await nextTick()
    window.scrollTo({ top: 0, behavior: 'smooth' })
    document.querySelector('.setup-step h1')?.focus()
  },
)

async function startOver() {
  const ok = await confirm({
    title: t('confirm.startOver.title'),
    text: t('confirm.startOver.text'),
    confirmLabel: t('confirm.startOver.ok'),
    danger: true,
  })
  if (ok) resetDraft()
}
</script>

<template>
  <div class="planner">
    <div class="planner-top no-print">
      <div class="planner-top-inner">
        <span class="planner-badge"><BaseIcon name="shield" :size="16" /> {{ $t('planner.badge') }}</span>
      </div>
      <nav class="setup-progress" :aria-label="$t('setup.progress')">
        <ol>
          <li v-for="(s, i) in STEPS" :key="s" :class="{ done: i < draft.step, current: i === draft.step }">
            <button
              type="button"
              :disabled="i > reachable"
              :aria-current="i === draft.step ? 'step' : undefined"
              @click="goTo(i)"
            >
              <span class="step-num">
                <BaseIcon v-if="i < draft.step" name="check" :size="14" />
                <template v-else>{{ i + 1 }}</template>
              </span>
              <span class="step-label">{{ $t('setup.steps.' + s) }}</span>
            </button>
          </li>
        </ol>
      </nav>
    </div>

    <div class="setup-main">
      <p class="setup-count no-print">{{ $t('setup.stepOf', { n: draft.step + 1, total: STEPS.length }) }}</p>
      <component :is="COMPONENTS[draft.step]" />
    </div>

    <footer class="setup-actions no-print">
      <div class="setup-actions-inner">
        <button v-if="draft.step > 0" type="button" class="btn ghost" @click="draft.step--">
          <BaseIcon name="arrow-left" :size="18" /> {{ $t('common.back') }}
        </button>
        <span v-else />
        <span class="setup-blocker" role="status">{{ blocker }}</span>
        <button v-if="draft.step < last" type="button" class="btn" :disabled="!!blocker" @click="draft.step++">
          {{ $t('common.next') }} <BaseIcon name="arrow-right" :size="18" />
        </button>
      </div>
      <div class="setup-actions-meta">
        <span class="muted small"><BaseIcon name="lock" :size="14" /> {{ $t('setup.savedLocally') }}</span>
        <button type="button" class="link-btn small" @click="startOver">{{ $t('setup.startOver') }}</button>
      </div>
    </footer>

    <TheConfirmHost />
    <TheToastHost />
  </div>
</template>

<style scoped>
/* As the app's setup wizard, below the website's header (64 px). */
.planner {
  min-height: calc(100vh - 64px); display: flex; flex-direction: column;
  background: radial-gradient(1100px 420px at 50% -120px, var(--primary-soft), transparent 70%), var(--bg);
}
.planner-top { border-bottom: 1px solid var(--border); background: color-mix(in srgb, var(--bg) 88%, transparent); }
.planner-top-inner { max-width: 1120px; margin: 0 auto; padding: 0.7rem 1rem 0; display: flex; justify-content: center; }
.planner-badge {
  display: inline-flex; align-items: center; gap: 0.4rem; padding: 0.25rem 0.75rem; border-radius: 999px;
  font-size: 0.82rem; font-weight: 650; background: var(--ok-soft); color: var(--ok); border: 1px solid var(--ok-border);
}
.setup-progress { max-width: 1120px; margin: 0 auto; padding: 0.5rem 1rem 0.6rem; overflow-x: auto; scrollbar-width: none; }
.setup-progress ol { list-style: none; margin: 0; padding: 0; display: flex; gap: 0.25rem; }
.setup-progress li { flex: 1; min-width: 0; display: flex; }
.setup-progress button {
  flex: 1; display: flex; align-items: center; gap: 0.45rem; padding: 0.35rem 0.5rem 0.5rem; border: 0;
  border-bottom: 3px solid var(--border); background: none; font: inherit; color: var(--muted); cursor: pointer;
  text-align: left; white-space: nowrap;
}
.setup-progress button:disabled { cursor: default; }
.setup-progress li.done button { border-bottom-color: var(--primary); color: var(--text-2); }
.setup-progress li.current button { border-bottom-color: var(--primary); color: var(--text); font-weight: 700; }
.step-num {
  flex: none; width: 24px; height: 24px; border-radius: 50%; display: grid; place-items: center;
  font-size: 0.78rem; font-weight: 700; background: var(--surface-3); color: var(--text-2);
}
.done .step-num, .current .step-num { background: var(--primary); color: var(--primary-ink); }
.step-label { font-size: 0.88rem; overflow: hidden; text-overflow: ellipsis; }

.setup-main { flex: 1; width: 100%; max-width: 1120px; margin: 0 auto; padding: 1.75rem 1rem 2rem; }
.setup-count { font-size: 0.8rem; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: var(--primary); margin: 0 auto 0.4rem; max-width: 760px; }
.setup-main :deep(.setup-step) { max-width: 760px; margin: 0 auto; display: flex; flex-direction: column; gap: 1rem; }
.setup-main :deep(.setup-step.wide) { max-width: none; }
.setup-main:has(.setup-step.wide) .setup-count { max-width: none; }
.setup-main :deep(.step-head h1) { font-size: 1.85rem; margin-bottom: 0.35rem; }
.setup-main :deep(.lead) { font-size: 1.05rem; color: var(--text-2); margin: 0; max-width: 62ch; }

.setup-actions {
  position: sticky; bottom: 0; z-index: 20; background: color-mix(in srgb, var(--surface) 94%, transparent);
  backdrop-filter: blur(8px); border-top: 1px solid var(--border);
}
.setup-actions-inner { max-width: 1120px; margin: 0 auto; padding: 0.7rem 1rem 0.3rem; display: flex; align-items: center; gap: 1rem; }
.setup-blocker { flex: 1; text-align: right; font-size: 0.88rem; color: var(--warn); }
.setup-actions-meta {
  max-width: 1120px; margin: 0 auto; padding: 0 1rem calc(0.55rem + env(safe-area-inset-bottom));
  display: flex; justify-content: space-between; gap: 1rem;
}
.setup-actions-meta span { display: inline-flex; align-items: center; gap: 0.35rem; }

@media (max-width: 720px) {
  /* Numbers only; the heading below names the step. */
  .step-label { display: none; }
  .setup-progress button { justify-content: center; }
  .setup-main { padding-top: 1.1rem; }
  .setup-main :deep(.step-head h1) { font-size: 1.45rem; }
  .setup-actions-inner { flex-wrap: wrap; gap: 0.4rem 0.6rem; justify-content: space-between; }
  .setup-blocker { order: -1; flex-basis: 100%; text-align: center; font-size: 0.84rem; }
  .setup-blocker:empty { display: none; }
  .setup-actions-meta span { display: none; }
  .setup-actions-meta { justify-content: center; }
}
@media print {
  .planner { background: #fff; min-height: 0; }
  .setup-main { padding: 0; max-width: none; }
}
</style>
