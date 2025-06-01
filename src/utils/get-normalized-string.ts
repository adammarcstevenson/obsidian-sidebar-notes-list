export function getNormalizedString(str: string) {
  return str.toLowerCase()
            .normalize('NFKD')
            .replace(/[\u0300-\u036f]/g, '') // See [Remove accents/diacritics in a string in JavaScript](https://stackoverflow.com/a/37511463/8245557)
            .trim()
}