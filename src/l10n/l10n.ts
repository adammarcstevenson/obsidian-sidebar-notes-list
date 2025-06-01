import { translations } from './translations'

const locale = navigator.language || 'en-US'

export const l10n = (key: keyof typeof translations['en-US']) => {
  return typeof translations[locale]?.[key] === 'function'
    ? translations[locale][key]()
    : translations[locale]?.[key]
}