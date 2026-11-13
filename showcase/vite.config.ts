import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'

// Dev: a normal Vite app (index.html). Build: one IIFE plus one CSS file,
// with React left out and read from the UMD globals that the published page
// loads from cdnjs. scripts/inline.mjs then folds both into dist/habita.html.
export default defineConfig(({ command }) => ({
  plugins: [react()],
  define: command === 'build' ? { 'process.env.NODE_ENV': '"production"' } : {},
  resolve:
    command === 'build'
      ? { alias: { 'react/jsx-runtime': fileURLToPath(new URL('./src/jsx-shim.ts', import.meta.url)) } }
      : {},
  build: {
    lib: { entry: 'src/main.tsx', name: 'Habita', formats: ['iife'], fileName: () => 'habita.js' },
    cssCodeSplit: false,
    rollupOptions: {
      external: ['react', 'react-dom', 'react-dom/client'],
      output: {
        globals: { react: 'React', 'react-dom': 'ReactDOM', 'react-dom/client': 'ReactDOM' },
        assetFileNames: 'habita[extname]',
      },
    },
  },
}))
