// What each way of using Waschplaner includes. The rule behind the split:
// Free is everything that happens when someone opens the plan; Plus is what the
// server does on its own (e-mails, calendar feeds, the live screen, reminders)
// or keeps for longer (history). Self-hosted has everything.
//
// A value is true (included), false (not included), 'soon' (planned) or the key
// of a short text in pricing.values.* (e.g. a limit).

export const PLANS = ['free', 'plus', 'self']

export const FEATURE_GROUPS = [
  {
    key: 'plan',
    rows: [
      { key: 'house', free: true, plus: true, self: 'manyHouses' },
      { key: 'wizard', free: true, plus: true, self: true },
      { key: 'booking', free: true, plus: true, self: true },
      { key: 'rules', free: true, plus: true, self: true },
      { key: 'inApp', free: true, plus: true, self: true },
      { key: 'pwa', free: true, plus: true, self: true },
      { key: 'passwordMail', free: true, plus: true, self: 'withSmtp' },
    ],
  },
  {
    key: 'server',
    rows: [
      { key: 'mail', free: false, plus: true, self: 'withSmtp' },
      { key: 'ical', free: false, plus: true, self: true },
      { key: 'kiosk', free: false, plus: true, self: true },
      { key: 'reminders', free: false, plus: 'soon', self: 'soon' },
      { key: 'stats', free: false, plus: 'soon', self: 'soon' },
    ],
  },
  {
    key: 'history',
    rows: [
      { key: 'bookings', free: 'weeks', plus: 'unlimited', self: 'unlimited' },
      { key: 'log', free: 'days', plus: 'unlimited', self: 'unlimited' },
    ],
  },
  {
    key: 'ops',
    rows: [
      { key: 'hosting', free: 'us', plus: 'us', self: 'you' },
      { key: 'updates', free: 'auto', plus: 'auto', self: 'yourself' },
      { key: 'support', free: 'docs', plus: 'email', self: 'docs' },
    ],
  },
]

/** Plus for a house with this many flats, in francs per year. */
export const plusPrice = (flats, pricePerFlat) => Math.max(0, Math.round(flats)) * pricePerFlat
