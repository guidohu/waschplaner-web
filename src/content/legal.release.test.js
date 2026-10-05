// Runs only for releases (RELEASE_CHECK=1, set in .github/workflows/release.yml):
// a published site must name its operator completely in every language.
import { describe, expect, it } from 'vitest'
import legal from './legal'
import { LEGAL, OPERATOR } from '../site'

// "[label]" not followed by "(" – a link like [text](url) is fine.
const PLACEHOLDER = /\[[^\]]+\](?!\()/g
/** Every text in a page: titles, paragraphs, table cells … */
const texts = (node) => (typeof node === 'string' ? [node] : Object.values(node).flatMap(texts))

describe.skipIf(!process.env.RELEASE_CHECK)('legal details for a release', () => {
  it('knows the operator', () => {
    expect(OPERATOR.name, 'VITE_OPERATOR_NAME').not.toBe('')
    expect(OPERATOR.address.length, 'VITE_OPERATOR_ADDRESS').toBeGreaterThan(0)
    expect(OPERATOR.email, 'VITE_CONTACT_EMAIL').toMatch(/^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i)
  })

  it('has every value the legal texts use', () => {
    for (const key of ['hosting', 'mailProvider', 'stripe', 'updated']) expect(LEGAL[key], `LEGAL.${key} in site.js`).not.toBe('')
  })

  it('leaves no [placeholder] in the Impressum or the privacy policy', () => {
    for (const [locale, pages] of Object.entries(legal)) {
      for (const [page, content] of Object.entries(pages)) {
        const left = texts(content).flatMap((t) => t.match(PLACEHOLDER) || [])
        expect(left, `${locale} ${page}`).toEqual([])
      }
    }
  })
})
