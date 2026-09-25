// Readable text colour on a flat's colour (the same rule as in the app).
export function textOn(hex) {
  const n = parseInt((hex || '#888888').slice(1), 16)
  const r = (n >> 16) & 255
  const g = (n >> 8) & 255
  const b = n & 255
  const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return lum > 0.62 ? '#1b1f2a' : '#ffffff'
}

/** An amount in Swiss francs, e.g. "CHF 8.00" or "CHF 0.67". */
export function fmtCHF(amount, locale = 'de') {
  return new Intl.NumberFormat(`${locale}-CH`, { style: 'currency', currency: 'CHF' }).format(amount)
}

/** A heading as an anchor: "E-Mail & Kalender" → "e-mail-kalender". */
export function slugify(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
