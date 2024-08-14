import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';  // Ensure this plugin is installed

export default defineConfig({
  plugins: [react()]
});
