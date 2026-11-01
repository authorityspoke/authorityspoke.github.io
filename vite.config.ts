import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// GitHub Pages base path.
// This is a user site (authorityspoke.github.io), so the base is '/'.
// For a project site (username.github.io/repo-name), build with:
//   VITE_BASE=/repo-name/ npm run build
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE || '/',
})
