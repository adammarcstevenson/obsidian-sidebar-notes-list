/**
 * Matches a string against a glob pattern
 * Supports: * (zero or more characters), ? (single character), [abc] (character class), [a-z] (range)
 * @param pattern - The glob pattern to match against
 * @param str - The string to test
 * @returns true if the string matches the pattern, false otherwise
 */
function matchGlob(pattern: string, str: string): boolean {
  return matchGlobHelper(pattern, 0, str, 0)
}

/**
 * Recursive helper function for glob matching
 */
function matchGlobHelper(
  pattern: string,
  patternIndex: number,
  str: string,
  strIndex: number
): boolean {
  // Base cases
  if (patternIndex === pattern.length && strIndex === str.length) {
    return true // Both exhausted - match
  }
  
  if (patternIndex === pattern.length) {
    return false // Pattern exhausted but string remains
  }
  
  const currentChar = pattern[patternIndex]
  
  // Handle different pattern characters
  switch (currentChar) {
    case '*': {
      // Try matching zero characters (skip the *)
      if (matchGlobHelper(pattern, patternIndex + 1, str, strIndex)) {
        return true
      }
      
      // Try matching one or more characters
      for (let i = strIndex; i < str.length; i++) {
        if (matchGlobHelper(pattern, patternIndex + 1, str, i + 1)) {
          return true
        }
      }
      return false
    }
      
    case '?': {
      // Must match exactly one character
      if (strIndex >= str.length) {
        return false
      }
      return matchGlobHelper(pattern, patternIndex + 1, str, strIndex + 1)
    }
      
    case '[': {
      // Character class - find the closing bracket
      const closingBracket = pattern.indexOf(']', patternIndex + 1)
      if (closingBracket === -1) {
        // Malformed pattern - treat [ as literal
        return matchLiteral(pattern, patternIndex, str, strIndex)
      }
      
      if (strIndex >= str.length) {
        return false
      }
      
      const charClass = pattern.substring(patternIndex + 1, closingBracket)
      const targetChar = str[strIndex]
      
      if (matchCharacterClass(charClass, targetChar)) {
        return matchGlobHelper(pattern, closingBracket + 1, str, strIndex + 1)
      }
      return false
    }
      
    case '\\': {
      // Escape character - treat next character as literal
      if (patternIndex + 1 >= pattern.length) {
        return false
      }
      return matchLiteral(pattern, patternIndex + 1, str, strIndex)
    }
      
    default: {
      // Literal character
      return matchLiteral(pattern, patternIndex, str, strIndex)
    }
  }
}

/**
 * Matches a literal character
 */
function matchLiteral(
  pattern: string,
  patternIndex: number,
  str: string,
  strIndex: number
): boolean {
  if (strIndex >= str.length) {
    return false
  }
  
  if (pattern[patternIndex] !== str[strIndex]) {
    return false
  }
  
  return matchGlobHelper(pattern, patternIndex + 1, str, strIndex + 1)
}

/**
 * Checks if a character matches a character class pattern
 * Supports: abc (literal characters), a-z (ranges), ^abc (negation)
 */
function matchCharacterClass(charClass: string, char: string): boolean {
  if (charClass.length === 0) {
    return false
  }
  
  let negated = false
  let classPattern = charClass
  
  // Check for negation
  if (charClass[0] === '^' || charClass[0] === '!') {
    negated = true
    classPattern = charClass.substring(1)
  }
  
  let matched = false
  
  for (let i = 0; i < classPattern.length; i++) {
    // Check for range pattern (a-z)
    if (i + 2 < classPattern.length && classPattern[i + 1] === '-') {
      const start = classPattern[i]
      const end = classPattern[i + 2]
      
      if (char >= start && char <= end) {
        matched = true
        break
      }
      
      i += 2 // Skip the range
    } else {
      // Literal character
      if (char === classPattern[i]) {
        matched = true
        break
      }
    }
  }
  
  return negated ? !matched : matched
}

// Export the main function
export { matchGlob }
