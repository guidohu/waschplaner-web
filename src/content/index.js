// The help pages and legal texts in the current language.
import { computed } from 'vue'
import { i18n } from '../i18n'
import docsDe from './docs.de'
import docsEn from './docs.en'
import legal from './legal'

export const docPages = computed(() => (i18n.locale === 'en' ? docsEn : docsDe))
export const findDoc = (slug) => docPages.value.find((p) => p.slug === slug) || null
export const legalPage = (key) => (legal[i18n.locale] || legal.de)[key]
/** The order of the sections in the help navigation. */
export const DOC_SECTIONS = ['use', 'run', 'more']
