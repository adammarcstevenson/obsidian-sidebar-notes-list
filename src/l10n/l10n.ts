import { getLanguage } from 'obsidian'
import { translations } from './translations'

const locale = getLanguage() || 'en'

export const l10n = (key: keyof typeof translations['en-US']) => {
  return typeof translations[locale]?.[key] === 'function'
    ? translations[locale][key]()
    : translations[locale]?.[key]
}