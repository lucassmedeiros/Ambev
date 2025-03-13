import basicSsl from '@vitejs/plugin-basic-ssl'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

// https://vitejs.dev/config/

const buildOptions = opts => {
  const modePlugins = []
  if (opts.mode === 'ssl') modePlugins.push(basicSsl())
  return defineConfig({
    plugins: [react(), ...modePlugins],
    resolve: {
      alias: {
        '@': '/src'
      }
    },
    test: {
      globals: true,
      silent: true,
      environment: 'jsdom',
      setupFiles: './vitest.setup.ts',
      includeSource: ['src/**/*.{js,ts}'],
      coverage: {
        enabled: true,
        provider: 'v8',
        include: ['src/**/*'],
        reporter: ['lcov', 'html'],
        exclude: ['src/test/**/*', 'src/main.tsx']
      }
    },
    build: {
      target: 'es2022',
      manifest: true,
      outDir: 'build',
      emptyOutDir: true,
      cssCodeSplit: true,
      rollupOptions: {
        input: {
          models: 'src/components/models/spa.tsx'
        },
        preserveEntrySignatures: 'allow-extension',
        output: {
          format: 'systemjs',
          exports: 'auto',
          assetFileNames: 'assets/[name][extname]',
          entryFileNames: '[name].js'
        }
      }
    }
  })
}

export default buildOptions
