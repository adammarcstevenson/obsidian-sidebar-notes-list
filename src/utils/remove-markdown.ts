/**
 * Strips markdown formatting from text
 * @param {string} markdown - The markdown text to strip
 * @return {string} - Plain text without markdown formatting
 */
export function removeMarkdown(markdown: string): string {
  if (!markdown) return ''
  
  let text = markdown
  
  // Remove headers (# Header)
  text = text.replace(/^#{1,6}\s+/gm, '')
  
  // Remove emphasis (bold, italic)
  text = text.replace(/(\*\*|__)(.*?)\1/g, '$2') // Bold
  text = text.replace(/(\*|_)(.*?)\1/g, '$2')    // Italic
  
  // Remove links [text](url)
  text = text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
  
  // Remove images ![alt](src)
  text = text.replace(/!\[([^\]]+)\]\([^)]+\)/g, '')
  
  // Remove code blocks
  text = text.replace(/```[\s\S]*?```/g, '')
  
  // Remove inline code
  text = text.replace(/`([^`]+)`/g, '$1')
  
  // Remove blockquotes
  text = text.replace(/^\s*>\s+/gm, '')
  
  // Remove horizontal rules
  text = text.replace(/^\s*([*-_])\s*\1\s*\1(\1|\s)*$/gm, '')
  
  // Remove list markers
  text = text.replace(/^\s*[-*+]\s+/gm, '')
  text = text.replace(/^\s*\d+\.\s+/gm, '')
  
  // Remove HTML tags
  text = text.replace(/<[^>]*>/g, '')
  
  // Normalize whitespace
  text = text.replace(/\n\s*\n/g, '\n\n')
  text = text.trim()
  
  return text
}