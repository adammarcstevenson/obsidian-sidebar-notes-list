import { getNormalizedString } from './get-normalized-string'
import type { TitleFragment } from '../types'

type IndexRange = {
  start: number,
  end: number
}

export function getFileTitleNodes(
  searchString: string,
  text: string,
): TitleFragment[] {
  const searchWords = getNormalizedString(searchString).split(/\s+/)
  const normalizedText = getNormalizedString(text)
  const matchIndices: IndexRange[] = []

  // Get start/end indices for matches of the search word in the text
  searchWords.forEach(searchWord => {
    let start = normalizedText.indexOf(searchWord)
    while (start > -1) {
      matchIndices.push({ start, end: start + searchWord.length })
      start = text.indexOf(searchWord, start + 1)
    }
  })

  // Return if no matches are found
  if (matchIndices.length === 0) {
    return [{
      text,
      highlight: false
    }]
  }

  // Order match ranges
  matchIndices.sort((a, b) => a.start - b.start)

  // Merge overlapping ranges
  const mergedRanges = [matchIndices[0]]
  for (let i = 1; i < matchIndices.length; i++) {
    const lastRange = mergedRanges[mergedRanges.length - 1]
    const currentRange = matchIndices[i]

    // Check if the current range overlaps with the last merged range
    if (currentRange.start <= lastRange.end) {
      // Merge the ranges
      lastRange.end = Math.max(lastRange.end, currentRange.end)
    } else {
      mergedRanges.push(currentRange)
    }
  }

  // Divide original text into fragments
  const fileTitleFragments: TitleFragment[] = []
  let currentIndex = 0
  mergedRanges.forEach(range => {

    // Add the fragment before the current range if there is any
    if (range.start > currentIndex) {
      fileTitleFragments.push({
        text: text.substring(currentIndex, range.start),
        highlight: false
      })
    }

    // Add the fragment within the current range
    fileTitleFragments.push({
      text: text.substring(range.start, range.end),
      highlight: true
    })

    currentIndex = range.end
  })

  // Add any remaining text after the last range
  if (currentIndex < text.length) {
    fileTitleFragments.push({
      text: text.substring(currentIndex),
      highlight: false
    })
}

  return fileTitleFragments
}