// A tiny inline markup for the texts in the i18n and content files, so they can
// be rendered without v-html: **bold**, `code` and [label](url). {placeholders}
// are filled from `params` first (e.g. {repo} → the repository URL).
const TOKEN = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)\s]+\))/g

/** Splits a text into [{ type: 'text'|'bold'|'code'|'link', text, href? }]. */
export function parseInline(source, params = {}) {
  const filled = String(source).replace(/\{(\w+)\}/g, (m, k) => params[k] ?? m)
  const parts = []
  for (const piece of filled.split(TOKEN)) {
    if (!piece) continue
    if (piece.startsWith('**') && piece.endsWith('**') && piece.length > 4) {
      parts.push({ type: 'bold', text: piece.slice(2, -2) })
    } else if (piece.startsWith('`') && piece.endsWith('`') && piece.length > 2) {
      parts.push({ type: 'code', text: piece.slice(1, -1) })
    } else if (piece.startsWith('[')) {
      const m = /^\[([^\]]+)\]\(([^)\s]+)\)$/.exec(piece)
      parts.push(m ? { type: 'link', text: m[1], href: m[2] } : { type: 'text', text: piece })
    } else {
      parts.push({ type: 'text', text: piece })
    }
  }
  return parts
}

/** True for links inside this website (rendered as RouterLink). */
export const isInternal = (href) => href.startsWith('/') && !href.startsWith('//')
