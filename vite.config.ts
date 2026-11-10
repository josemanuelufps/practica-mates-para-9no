import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages base URL for https://josemanuelufps.github.io/practica-mates-para-9no/
  base: '/practica-mates-para-9no/',
});
