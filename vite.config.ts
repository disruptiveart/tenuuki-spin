import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

const isGithubDeploy = process.env.GITHUB_PAGES === 'true'
const isLibBuild = process.env.BUILD_LIB === 'true'

export default defineConfig({
  plugins: [svelte()],
  base: isGithubDeploy ? '/tenuuki-spin/' : '/',
  build: isLibBuild
    ? {
        lib: {
          entry: 'src/lib/tenuuki-spin-viewer.ts',
          name: 'TenuukiSpinViewer',
          formats: ['es'],
          fileName: () => 'tenuuki-spin-viewer.js'
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
