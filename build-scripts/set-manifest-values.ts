export default function setManifestValues(contents: string) {
  const manifest = JSON.parse(contents.toString())

  const today = new Date()

  const toLocaleTimeStringOptions: Intl.DateTimeFormatOptions = {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }

  switch (process.env.NODE_ENV) {
    case 'development':
      manifest['id'] = manifest['id'] + '-dev'
      manifest['name'] = manifest['name'] + ' (Dev)'
      manifest['version'] = `${today.getFullYear()}.${today.getMonth() + 1}.${today.getDate()}.${today.toLocaleTimeString('en-US', toLocaleTimeStringOptions)}-dev`
      break
    case 'production':
      break
    default:
      throw new Error('NODE_ENV must be either development or production')
  }
  
  return JSON.stringify(manifest, null, 2)
}