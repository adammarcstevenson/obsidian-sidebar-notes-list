import chalk from 'chalk'
import { cpSync } from 'fs'

export default function copyDist() {
  if (process.env.COPY_DIST_ON_BUILD !== '1') return

  const src = 'dist'
  const dest = process.env.PLUGIN_DIR

  return {
    name: 'copy-dist-on-build',
    closeBundle() {
      if (dest) {
        cpSync(src, dest, { recursive: true })
        // eslint-disable-next-line no-console
        console.log(chalk.green('Copied', chalk.bold(src), '➜', chalk.bold(dest)))
      } 
    }
  }
}