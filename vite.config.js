import { defineConfig } from 'vite';

// Dev: index.html imports '/node_modules/npm-asset-distribution/...', which is this package itself.
// Strip that prefix so the request is served from the project root (as the old browser-sync setup did).
const selfModuleRewrite = {
  name: 'self-module-rewrite',
  configureServer(server) {
    server.middlewares.use((req, _res, next) => {
      req.url = req.url.replace(/node_modules\/npm-asset-distribution\//g, '');
      next();
    });
  },
};

export default defineConfig({
  plugins: [selfModuleRewrite],
  publicDir: false,
  build: {
    // Library build: src/npm-asset-distribution.js -> ./npm-asset-distribution.js (the package "main")
    outDir: '.',
    emptyOutDir: false,
    copyPublicDir: false,
    minify: true,
    rolldownOptions: { output: { minify: true } },
    lib: {
      entry: 'src/npm-asset-distribution.js',
      formats: ['es'],
      fileName: () => 'npm-asset-distribution.js',
    },
  },
});
