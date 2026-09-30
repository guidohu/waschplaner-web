// The help pages and legal texts in the current language.
import { computed } from 'vue'
import { i18n } from '../i18n'
import docsDe from './docs.de'
import docsEn from './docs.en'
import docsFr from './docs.fr'
import docsIt from './docs.it'
import legal from './legal'

const DOCS = { de: docsDe, en: docsEn, fr: docsFr, it: docsIt }
export const docPages = computed(() => DOCS[i18n.locale] || docsDe)
export const findDoc = (slug) => docPages.value.find((p) => p.slug === slug) || null
export const legalPage = (key) => (legal[i18n.locale] || legal.de)[key]
/** The order of the sections in the help navigation. */
export const DOC_SECTIONS = ['use', 'run', 'more']
