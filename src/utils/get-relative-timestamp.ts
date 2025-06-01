import { l10n } from '../l10n/l10n'

export function getRelativeTimestamp(date: Date, pinned: boolean) {
  if (pinned) return l10n('relativeTimestampPinned') as string

  const now = new Date()
  const msDay = 1000 * 60 * 60 * 24

  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const yesterday = new Date(today.valueOf() - msDay)
  const tomorrow = new Date(today.valueOf() + msDay)
  const sevenDaysAgo = new Date(today.valueOf() - (7 * msDay))
  const thirtyDaysAgo = new Date(today.valueOf() - (30 * msDay))

  if (
    date.valueOf() >= today.valueOf() &&
    date.valueOf() < tomorrow.valueOf()
  ) {
    return l10n('relativeTimestampToday') as string
  }

  if (
    date.valueOf() >= yesterday.valueOf() &&
    date.valueOf() < today.valueOf()
  ) {
    return l10n('relativeTimestampYesterday') as string
  }

  if (
    date.valueOf() >= sevenDaysAgo.valueOf() &&
    date.valueOf() < yesterday.valueOf()
  ) {
    return l10n('relativeTimestampLast7Days') as string
  }

  if (
    date.valueOf() >= thirtyDaysAgo.valueOf() &&
    date.valueOf() < sevenDaysAgo.valueOf()
  ) {
    return l10n('relativeTimestampLast30Days') as string
  }

  if (
    Math.abs(now.getFullYear() - date.getFullYear()) < 2
  ) {
    return date.toLocaleString('default', { month: 'long', year: 'numeric' })
  }

  return date.toLocaleString('default', { year: 'numeric' })

}