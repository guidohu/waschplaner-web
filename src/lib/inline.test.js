import { describe, expect, it } from 'vitest'
import { isInternal, parseInline } from './inline'
import { fmtCHF, slugify, textOn } from './format'

describe('parseInline', () => {
  it('splits bold, code and links', () => {
    expect(parseInline('Set **one** `KEY=1` and see [docs](/docs).')).toEqual([
      { type: 'text', text: 'Set ' },
      { type: 'bold', text: 'one' },
      { type: 'text', text: ' ' },
      { type: 'code', text: 'KEY=1' },
      { type: 'text', text: ' and see ' },
      { type: 'link', text: 'docs', href: '/docs' },
      { type: 'text', text: '.' },
    ])
  })

  it('fills placeholders before parsing, and keeps unknown ones', () => {
    expect(parseInline('[README]({repo}#readme) {x}', { repo: 'https://example.org/r' })).toEqual([
      { type: 'link', text: 'README', href: 'https://example.org/r#readme' },
      { type: 'text', text: ' {x}' },
    ])
  })

  it('leaves lone markers as text', () => {
    expect(parseInline('5 * 3 ** and a `')).toEqual([{ type: 'text', text: '5 * 3 ** and a `' }])
  })
})

describe('helpers', () => {
  it('tells internal from external links', () => {
    expect(isInternal('/pricing')).toBe(true)
    expect(isInternal('//evil.example')).toBe(false)
    expect(isInternal('https://caddyserver.com')).toBe(false)
  })

  it('formats francs', () => {
    expect(fmtCHF(8)).toMatch(/CHF.8\.00/)
    expect(fmtCHF(8 / 12, 'en')).toMatch(/CHF.0\.67/)
  })

  it('makes anchors from headings', () => {
    expect(slugify('HTTPS mit Caddy')).toBe('https-mit-caddy')
    expect(slugify('Schutz vor Spam & Bots')).toBe('schutz-vor-spam-bots')
    expect(slugify('Für die Verwaltung')).toBe('fur-die-verwaltung')
  })

  it('picks readable text on flat colours', () => {
    expect(textOn('#2f6fde')).toBe('#ffffff')
    expect(textOn('#d4a019')).toBe('#1b1f2a')
  })
})
