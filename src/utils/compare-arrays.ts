/**
 * Compare two arrays to see if they contain the same elements in any order.
 * @param {Array} a - The first array to compare.
 * @param {Array} b - The second array to compare.
 * @returns {boolean} - Returns true if the arrays contain the same elements, false otherwise.
 */
export function compareArrays(a: unknown[], b: unknown[]): boolean {
  if (a.length !== b.length) return false

  const sortedA = [...a].sort()
  const sortedB = [...b].sort()

  for (let i = 0; i < sortedA.length; i++) {
    if (sortedA[i] !== sortedB[i]) return false
  }

  return true
}
