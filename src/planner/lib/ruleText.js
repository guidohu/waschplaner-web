// Human-readable descriptions of recurrence rules, like a calendar app's
// "Repeat" setting.
import { t } from '../../i18n'
import { weekdayName } from './format'
import { LAST_WEEK } from './recurrence'

const nthKey = (n) => (n === LAST_WEEK ? 'last' : String(n))

/** Short label for a chip; empty for "every week". */
export function ruleShort(rule) {
  if (rule.month_week) return t('rule.short.monthly.' + nthKey(rule.month_week))
  if ((rule.cycle_weeks || 1) > 1) return t('rule.short.everyN', { n: rule.cycle_weeks })
  return ''
}

/** Full sentence, e.g. "Every other Monday" or "First Monday of the month". */
export function ruleLong(rule, weekday) {
  const day = weekdayName(weekday)
  if (rule.month_week) return t('rule.long.monthly.' + nthKey(rule.month_week), { day })
  const n = rule.cycle_weeks || 1
  if (n === 1) return t('rule.long.weekly', { day })
  if (n === 2) return t('rule.long.everyOther', { day })
  return t('rule.long.everyN', { n, day })
}

const HORIZON_WEEKS_MAX = 8

/** "4 weeks", "3 months" or "10 days". */
export function horizonLabel(days) {
  if (days % 7 === 0 && days / 7 <= HORIZON_WEEKS_MAX) return t('rules.weeks', { n: days / 7 })
  if (days === 91) return t('rules.threeMonths')
  return t('rules.days', { n: days })
}

/** The booking rules as two or three plain sentences. */
export function rulesSummary(r) {
  const unit = t(`rules.unit.${r.extra_quota_unit}`, { n: r.extra_quota })
  const extra =
    r.extra_quota < 0
      ? t('rules.sum.unlimited')
      : r.extra_quota === 0
        ? t('rules.sum.none')
        : t('rules.sum.quota', { n: r.extra_quota, unit })
  const horizon = t('rules.sum.horizon', { time: horizonLabel(r.booking_horizon_days) })
  const override = t(`rules.sum.override.${r.override_mode}`, { n: r.override_grace_minutes })
  return `${extra} ${horizon} ${override}`
}
