import copyDist from './build-scripts/copy-dist'
import setManifestValues from './build-scripts/set-manifest-values'
import { defineConfig } from 'vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import { svelte } from '@sveltejs/vite-plugin-svelte'

export default defineConfig({
  build: {
    assetsDir: './',
    lib: {
      entry: 'src/main',
      formats: ['cjs'],
      fileName: 'main',
      cssFileName: 'styles.css'
    },
    minify: false,
    rollupOptions: {
      output: {
        entryFileNames: 'main.js',
        assetFileNames: 'styles.css',
      },
      external: [
        'electron',
        'obsidian'
      ]
    },
    sourcemap: process.env.NODE_ENV === 'production' ? false : 'inline',
    target: 'esnext',
  },
  plugins: [
    copyDist(),
    svelte(),
    viteStaticCopy({
      targets: [
        {
          src: './manifest.json',
          dest: './',
          transform: setManifestValues
        }
      ]
    })
  ],
})
