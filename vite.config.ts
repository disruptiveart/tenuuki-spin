import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

const isGithubDeploy = process.env.GITHUB_PAGES === 'true'
const isLibBuild = process.env.BUILD_LIB === 'true'

export default defineConfig({
  plugins: [svelte()],
  base: isGithubDeploy ? '/tenuuki-spin/' : '/',
  build: isLibBuild
    ? {
        target: 'es2017',
        lib: {
          entry: 'src/lib/tenuuki-spin-viewer.ts',
          name: 'TenuukiSpinViewer',
          formats: ['es', 'cjs', 'umd'],
          fileName: (format) => {
            if (format === 'es') return 'tenuuki-spin-viewer.js'
            if (format === 'cjs') return 'tenuuki-spin-viewer.cjs'
            return 'tenuuki-spin-viewer.umd.js'
          }
        },
        rollupOptions: {
          output: {
            assetFileNames: (assetInfo) => {
              if (assetInfo.name?.endsWith('.css')) return 'tenuuki-spin-viewer.css'
              return 'assets/[name]-[hash][extname]'
            }
          }
        }
      }
    : undefined
})
