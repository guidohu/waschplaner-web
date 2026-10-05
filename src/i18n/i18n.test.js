import { describe, expect, it } from 'vitest'
import de from './de'
import en from './en'
import fr from './fr'
import itDict from './it'
import { LOCALES } from './index'
import docsDe from '../content/docs.de'
import docsEn from '../content/docs.en'
import docsFr from '../content/docs.fr'
import docsIt from '../content/docs.it'
import legal from '../content/legal'
import { FEATURE_GROUPS, PLANS } from '../lib/plans'
import { LINKS } from '../site'

const DICTS = { de, en, fr, it: itDict }
const DOCS = { de: docsDe, en: docsEn, fr: docsFr, it: docsIt }

// "a.b.c" for every text; list items count by position.
function keys(node, prefix = '') {
  if (typeof node === 'string') return [prefix]
  return Object.entries(node).flatMap(([k, v]) => keys(v, prefix ? `${prefix}.${k}` : k))
}
const shape = (blocks) => blocks.map((b) => Object.keys(b).sort().join(','))
const everything = (loc) => JSON.stringify([DICTS[loc], DOCS[loc], legal[loc]])

describe('texts', () => {
  it('has a dictionary, help pages and legal texts for every language in the picker', () => {
    for (const { code } of LOCALES) {
      expect(DICTS[code], code).toBeTruthy()
      expect(DOCS[code], code).toBeTruthy()
      expect(legal[code], code).toBeTruthy()
    }
  })

  it('has the same keys in every language', () => {
    for (const loc of ['en', 'fr', 'it']) expect(keys(DICTS[loc]).sort(), loc).toEqual(keys(de).sort())
  })

  it('uses Swiss spelling in German', () => {
    expect(everything('de')).not.toContain('ß')
  })

  it('uses only placeholders the site knows', () => {
    // Filled at runtime by the component that shows the text.
    const runtime = ['n', 'amount', 'year', 'time', 'when', 'name', 'd']
    for (const loc of Object.keys(DICTS)) {
      for (const [, k] of everything(loc).matchAll(/\{(\w+)\}/g)) {
        expect([...Object.keys(LINKS), ...runtime], `${loc}: {${k}}`).toContain(k)
      }
    }
  })

  it('has a text for every row and value in the comparison table', () => {
    for (const [loc, dict] of Object.entries(DICTS)) {
      for (const g of FEATURE_GROUPS) {
        expect(dict.pricing.table.groups[g.key], `${loc} ${g.key}`).toBeTypeOf('string')
        for (const row of g.rows) {
          expect(dict.pricing.table.rows[row.key], `${loc} ${row.key}`).toBeTypeOf('string')
          for (const p of PLANS) {
            const v = row[p]
            if (typeof v === 'string' && v !== 'soon') expect(dict.pricing.values[v], `${loc} ${v}`).toBeTypeOf('string')
          }
        }
      }
    }
  })
})

describe('help pages', () => {
  it('has the same pages and blocks in every language', () => {
    for (const loc of ['en', 'fr', 'it']) {
      expect(DOCS[loc].map((p) => p.slug), loc).toEqual(docsDe.map((p) => p.slug))
      docsDe.forEach((page, i) => {
        expect(shape(DOCS[loc][i].blocks), `${loc} ${page.slug}`).toEqual(shape(page.blocks))
        expect(DOCS[loc][i].section).toBe(page.section)
        expect(DOCS[loc][i].icon).toBe(page.icon)
      })
    }
  })

  it('has the same legal pages in every language', () => {
    for (const loc of ['en', 'fr', 'it']) {
      for (const key of ['privacy', 'imprint']) {
        expect(shape(legal[loc][key].blocks), `${loc} ${key}`).toEqual(shape(legal.de[key].blocks))
      }
    }
  })

  it('links only to pages that exist', () => {
    const pages = new Set(['/', '/pricing', '/planner', '/docs', '/privacy', '/imprint', ...docsDe.map((p) => `/docs/${p.slug}`)])
    for (const loc of Object.keys(DICTS)) {
      for (const [, href] of everything(loc).matchAll(/\]\((\/[^)#]*)/g)) expect(pages, `${loc}: ${href}`).toContain(href)
    }
  })
})
