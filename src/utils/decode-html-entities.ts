export function decodeHTMLEntities(str: string) {
  return str.replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(dec))
}