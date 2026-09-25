<script setup>
// One time slot in the demo plan. Looks like WeekBoardSlot in the app: a card in
// the week grid or a row in the phone list.
import { computed } from 'vue'
import BaseIcon from './BaseIcon.vue'
import { textOn } from '../lib/format'
import { t } from '../i18n'

const props = defineProps({
  day: { type: String, required: true }, // "Mi 23." for the label
  time: { type: String, required: true },
  party: { type: Object, default: null }, // { name, color } or null if free
  mine: { type: Boolean, default: false },
  actionable: { type: Boolean, default: false },
  past: { type: Boolean, default: false },
  now: { type: Boolean, default: false },
  // Done early: { from: '15:40', party: { name, color } | null, mine }
  rest: { type: Object, default: null },
  row: { type: Boolean, default: false },
})
defineEmits(['toggle', 'toggle-rest'])

const colors = (p) => (p ? { '--party': p.color, '--on-party': textOn(p.color) } : {})
const who = computed(() => props.party?.name ?? (props.actionable ? t('home.demo.book') : t('home.demo.free')))
const label = computed(() => [props.day, props.time, who.value, props.now ? t('home.demo.now') : ''].filter(Boolean).join(', '))
const restText = computed(() => t('home.demo.freeFrom', { time: props.rest?.from }))
</script>

<template>
  <div class="slot" :class="{ row, free: !party, bookable: actionable && !party, mine, past, now, finished: !!rest }" :style="colors(party)">
    <component
      :is="actionable ? 'button' : 'div'"
      :type="actionable ? 'button' : undefined"
      class="slot-main"
      :aria-label="actionable ? label : undefined"
      @click="actionable && $emit('toggle')"
    >
      <span class="time">{{ time }}</span>
      <span class="who">
        <BaseIcon v-if="mine" name="user" :size="row ? 18 : 15" />
        <BaseIcon v-else-if="actionable && !party" name="plus-circle" :size="row ? 20 : 16" />
        <span class="who-name">{{ who }}</span>
      </span>
      <span v-if="rest" class="meta"><BaseIcon name="check" :size="14" /> {{ $t('home.demo.done') }}</span>
    </component>
    <button
      v-if="rest"
      type="button"
      class="rest"
      :class="{ taken: rest.party, mine: rest.mine }"
      :style="colors(rest.party)"
      @click="$emit('toggle-rest')"
    >
      <template v-if="rest.party">
        <BaseIcon name="user" :size="15" />
        <span>{{ rest.from }} · {{ rest.party.name }}</span>
      </template>
      <template v-else>
        <BaseIcon name="plus-circle" :size="16" />
        <span>{{ restText }} · {{ $t('home.demo.bookRest') }}</span>
      </template>
    </button>
    <span v-if="now" class="now-pill">{{ $t('home.demo.now') }}</span>
  </div>
</template>

<style scoped>
/* Mirrors the app's frontend/src/components/WeekBoardSlot.vue, a little more compact. */
.slot {
  position: relative; display: flex; flex-direction: column; min-height: 76px; overflow: hidden;
  border-radius: var(--radius-sm); border: 1px solid transparent;
  background: var(--party); color: var(--on-party); box-shadow: var(--shadow-sm);
}
.slot-main {
  display: flex; flex-direction: column; gap: 0.2rem; padding: 0.6rem 0.65rem; flex: 1; min-width: 0; width: 100%;
  font: inherit; color: inherit; text-align: left; background: none; border: 0;
}
button.slot-main { cursor: pointer; transition: transform 0.1s; }
.slot:has(button.slot-main:hover) { box-shadow: var(--shadow); }
.time { font-size: 0.78rem; font-weight: 700; font-variant-numeric: tabular-nums; opacity: 0.9; }
.who { display: flex; align-items: flex-start; gap: 0.3rem; font-weight: 750; font-size: 0.9rem; min-width: 0; }
.who .icon, .rest .icon { margin-top: 1px; }
.who-name { min-width: 0; overflow-wrap: anywhere; } /* narrow columns: wrap rather than cut the flat off */
.meta { display: inline-flex; align-items: center; gap: 0.2rem; font-size: 0.74rem; font-weight: 600; }

.slot.free { background: var(--surface-2); color: var(--muted); border: 1.5px dashed var(--border-strong); box-shadow: none; }
.slot.free.bookable { background: var(--surface); color: var(--primary); border: 1.5px solid var(--primary-border); }
.slot.free.bookable:hover { background: var(--primary-soft); border-color: var(--primary); }
.slot.mine { box-shadow: inset 0 0 0 3px var(--text), var(--shadow-sm); }

.rest {
  display: flex; align-items: flex-start; gap: 0.3rem; width: 100%; padding: 0.45rem 0.65rem; font: inherit; font-size: 0.76rem;
  font-weight: 700; text-align: left; cursor: pointer; border: 0; border-top: 1.5px dashed var(--border-strong);
  background: var(--surface); color: var(--primary);
}
.rest:hover { background: var(--primary-soft); }
.rest.taken { background: var(--party); color: var(--on-party); border-top-style: solid; border-top-color: transparent; }
.rest.mine { box-shadow: inset 0 0 0 3px var(--text); }
.rest span { min-width: 0; }

.slot.past { opacity: 0.5; box-shadow: none; }
.now-pill {
  position: absolute; top: 6px; right: 6px; padding: 0.05rem 0.4rem; border-radius: 999px; font-size: 0.64rem;
  font-weight: 800; background: var(--surface); color: var(--text); box-shadow: var(--shadow-sm); text-transform: uppercase;
  letter-spacing: 0.03em;
}

/* phone list: time left, flat right, larger text */
.slot.row { min-height: 68px; }
.row .slot-main { flex-direction: row; flex-wrap: wrap; align-items: center; gap: 0.2rem 0.8rem; padding: 0.8rem 0.9rem; }
.row .time { font-size: 0.95rem; min-width: 6.4rem; }
.row .who { font-size: 1.02rem; flex: 1; align-items: center; }
.row .rest { align-items: center; }
.row .meta { flex-basis: 100%; padding-left: 7.2rem; }
.row .rest { font-size: 0.9rem; padding: 0.65rem 0.9rem; }
.row .now-pill { top: 10px; right: 10px; }
</style>
