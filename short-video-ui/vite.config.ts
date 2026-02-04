import { defineConfig } from 'vite'

export default defineConfig({
  // Keep config minimal to avoid loading ESM-only plugins in test environment
  server: {
    port: 5173
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.ts'
  }
})