// Settings of the website. The URLs are set at build time (see .env.example).
const trim = (url) => url.replace(/\/+$/, '')

/** The hosted Waschplaner app ("Haus einrichten", "Anmelden"). */
export const APP_URL = trim(import.meta.env.VITE_APP_URL || 'https://app.waschplaner.com')
/** The public source code repository. */
export const REPO_URL = trim(import.meta.env.VITE_REPO_URL || 'https://github.com/waschplaner/waschplaner')
export const CONTACT_EMAIL = import.meta.env.VITE_CONTACT_EMAIL || 'hallo@waschplaner.com'

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

/** Values for {placeholders} in texts: links, the contact address and the numbers around Plus. */
export const LINKS = { app: APP_URL, repo: REPO_URL, email: CONTACT_EMAIL, price: PRICE_PER_FLAT, ...PLUS_TERMS }
