import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const repository = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? '';
const isUserOrOrgPagesRepo = repository.endsWith('.github.io');
const base = process.env.GITHUB_ACTIONS
  ? isUserOrOrgPagesRepo
    ? '/'
    : `/${repository}/`
  : '/';

// https://vitejs.dev/config/
export default defineConfig({
  base,
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
