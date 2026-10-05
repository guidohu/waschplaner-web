// Settings of the website. The URLs are set at build time (see .env.example).
const trim = (url) => url.replace(/\/+$/, '')

/** The hosted Waschplaner app ("Haus einrichten", "Anmelden"). */
export const APP_URL = trim(import.meta.env.VITE_APP_URL || 'https://app.waschplaner.com')
/** The public source code repository. */
export const REPO_URL = trim(import.meta.env.VITE_REPO_URL || 'https://github.com/waschplaner/waschplaner')

/** Who runs the site: { name, address: [lines], uid, email }, from VITE_OPERATOR_* at build time (vite.config.js). */
export const OPERATOR = JSON.parse(
  new TextDecoder().decode(Uint8Array.from(atob(__OPERATOR__), (c) => c.charCodeAt(0))),
)
export const CONTACT_EMAIL = OPERATOR.email

/**
 * The rest of what the privacy policy and Impressum need. Fill in before going live;
 * the release check (src/content/legal.release.test.js) fails while anything is empty.
 */
export const LEGAL = {
  hosting: '', // hosting provider and server location, e.g. 'Infomaniak Network SA, Genf'
  mailProvider: '', // who sends the e-mails, e.g. 'Infomaniak Network SA'
  stripe: 'Stripe Payments Europe, Ltd., Dublin', // check the contracting entity in your Stripe account
  logDays: 14, // the web server deletes its logs after … days (configure the server to match)
  deleteDays: 30, // a deleted house is gone from all backups after … days (configure backups to match)
  updated: '', // date of the current privacy policy, e.g. '30.09.2026'
}

/** Plus costs this much per flat and year, in Swiss francs (the hosted app's PLUS_PRICE). */
export const PRICE_PER_FLAT = 2
/** Numbers from the app (backend/internal/api/plus.go), used in the texts as {trial}, {view} … */
export const PLUS_TERMS = {
  trial: 30, // days of Plus for free, once per house
  view: 30, // days residents can still look at the plan after Plus ends
  renew: 60, // Plus can be renewed in its last … days
  remind: 30, // the administrators get a reminder … days before Plus ends
  trialRemind: 7, // … and this many days before the trial ends
  min: '0.50', // Stripe's smallest payment, in francs
  printFree: 12, // weeks the free plan prints at a time; Plus prints a whole year
}

export const appLink = (path = '/') => APP_URL + path

/**
 * Whether the online version (accounts, Plus) and self-hosting are available yet.
 * While false, the site offers the browser planner (/planner) and shows the
 * online version and self-hosting greyed out as "coming later".
 */
export const ONLINE_AVAILABLE = false

/** Values for {placeholders} in texts: links, the contact address and the numbers around Plus. */
export const LINKS = { app: APP_URL, repo: REPO_URL, email: CONTACT_EMAIL, price: PRICE_PER_FLAT, ...PLUS_TERMS }
