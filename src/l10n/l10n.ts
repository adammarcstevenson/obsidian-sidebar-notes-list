import { getLanguage } from 'obsidian'
import { translations } from './translations'

const locale = getLanguage() || 'en'

export const l10n = (key: keyof typeof translations['en']) => {
  const value = (translations[locale] ?? translations['en'])[key]
  return typeof value === 'function' ? value() : value
}