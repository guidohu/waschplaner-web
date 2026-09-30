// What each way of using Waschplaner includes, as in the app: Free is the plan
// on paper (the administrators set it up, change it and print it); Plus puts it
// online for every resident, with everything the server then does for them.
// Self-hosted has everything; there Plus is a free switch unless payments are set up.
//
// A value is true (included), false (not included), 'soon' (planned) or the key
// of a short text in pricing.values.*.

export const PLANS = ['free', 'plus', 'self']

export const FEATURE_GROUPS = [
  {
    key: 'plan',
    rows: [
      { key: 'house', free: true, plus: true, self: 'manyHouses' },
      { key: 'wizard', free: true, plus: true, self: true },
      { key: 'edit', free: true, plus: true, self: true },
      { key: 'print', free: 'printFree', plus: 'printYear', self: 'printYear' },
    ],
  },
  {
    key: 'online',
    rows: [
      { key: 'join', free: false, plus: true, self: true },
      { key: 'booking', free: false, plus: true, self: true },
      { key: 'rules', free: false, plus: true, self: true },
      { key: 'mine', free: false, plus: true, self: true },
      { key: 'activity', free: false, plus: true, self: true },
    ],
  },
  {
    key: 'server',
    rows: [
      { key: 'mail', free: false, plus: true, self: 'withSmtp' },
      { key: 'ical', free: false, plus: true, self: true },
      { key: 'screen', free: false, plus: true, self: true },
      { key: 'reminders', free: false, plus: 'soon', self: 'soon' },
      { key: 'stats', free: false, plus: 'soon', self: 'soon' },
    ],
  },
  {
    key: 'ops',
    rows: [
      { key: 'payment', free: 'nothing', plus: 'yearly', self: 'switch' },
      { key: 'hosting', free: 'us', plus: 'us', self: 'you' },
      { key: 'updates', free: 'auto', plus: 'auto', self: 'yourself' },
      { key: 'support', free: 'docs', plus: 'email', self: 'docs' },
    ],
  },
]

/** Plus for a house with this many flats, in francs per year. */
export const plusPrice = (flats, pricePerFlat) => Math.max(0, Math.round(flats)) * pricePerFlat
