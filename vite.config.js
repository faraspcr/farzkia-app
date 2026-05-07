import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// HAPUS import tailwindcss dari @tailwindcss/vite
// karena Tailwind CSS v3 tidak membutuhkan plugin Vite

export default defineConfig({
  plugins: [react()],
})