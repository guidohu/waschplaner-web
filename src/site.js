// Settings of the website. The URLs are set at build time (see .env.example).
const trim = (url) => url.replace(/\/+$/, '')

/** The hosted Waschplaner app ("Haus einrichten", "Anmelden"). */
export const APP_URL = trim(import.meta.env.VITE_APP_URL || 'https://app.waschplaner.com')
/** The public source code repository. */
export const REPO_URL = trim(import.meta.env.VITE_REPO_URL || 'https://github.com/waschplaner/waschplaner')
export const CONTACT_EMAIL = import.meta.env.VITE_CONTACT_EMAIL || 'hallo@waschplaner.com'

/** Plus costs this much per flat and year, in Swiss francs. */
export const PRICE_PER_FLAT = 1
/** What the free plan keeps. */
export const FREE_HISTORY_WEEKS = 4
export const FREE_LOG_DAYS = 30

export const appLink = (path = '/') => APP_URL + path

/** Values for {placeholders} in texts: links to the app, the repository and the contact address. */
export const LINKS = { app: APP_URL, repo: REPO_URL, email: CONTACT_EMAIL }
