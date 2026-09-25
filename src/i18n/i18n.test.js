import { describe, expect, it } from 'vitest'
import de from './de'
import en from './en'
import docsDe from '../content/docs.de'
import docsEn from '../content/docs.en'
import legal from '../content/legal'
import { FEATURE_GROUPS, PLANS } from '../lib/plans'

// "a.b.c" for every text; list items count by position.
function keys(node, prefix = '') {
  if (typeof node === 'string') return [prefix]
  return Object.entries(node).flatMap(([k, v]) => keys(v, prefix ? `${prefix}.${k}` : k))
}
const shape = (blocks) => blocks.map((b) => Object.keys(b).sort().join(','))

describe('texts', () => {
  it('has the same keys in German and English', () => {
    expect(keys(en).sort()).toEqual(keys(de).sort())
  })

  it('uses Swiss spelling in German', () => {
    const all = JSON.stringify([de, docsDe, legal.de])
    expect(all).not.toContain('ß')
  })

  it('has a text for every row and value in the comparison table', () => {
    for (const dict of [de, en]) {
      for (const g of FEATURE_GROUPS) {
        expect(dict.pricing.table.groups[g.key]).toBeTypeOf('string')
        for (const row of g.rows) {
          expect(dict.pricing.table.rows[row.key], row.key).toBeTypeOf('string')
          for (const p of PLANS) {
            const v = row[p]
            if (typeof v === 'string' && v !== 'soon') expect(dict.pricing.values[v], v).toBeTypeOf('string')
          }
        }
      }
    }
  })
})

describe('help pages', () => {
  it('has the same pages and blocks in both languages', () => {
    expect(docsEn.map((p) => p.slug)).toEqual(docsDe.map((p) => p.slug))
    docsDe.forEach((page, i) => {
      expect(shape(docsEn[i].blocks), page.slug).toEqual(shape(page.blocks))
      expect(docsEn[i].section).toBe(page.section)
    })
  })

  it('has the same legal pages in both languages', () => {
    for (const key of ['privacy', 'imprint']) {
      expect(shape(legal.en[key].blocks)).toEqual(shape(legal.de[key].blocks))
    }
  })

  it('links only to pages that exist', () => {
    const pages = new Set(['/', '/pricing', '/docs', '/privacy', '/imprint', ...docsDe.map((p) => `/docs/${p.slug}`)])
    const text = JSON.stringify([de, en, docsDe, docsEn, legal])
    for (const [, href] of text.matchAll(/\]\((\/[^)#]*)/g)) expect(pages, href).toContain(href)
  })
})
