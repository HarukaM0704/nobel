import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        assetsInlineLimit: 0,
    },
    esbuild: {
        jsxFactory: 'h',
        jsxFragment: 'Fragment'
    },

    base: '/nobel/',
});