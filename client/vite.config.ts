import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'
import globalImport from 'postcss-global-import';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

export default defineConfig({
    base: process.env.BASE_PATH || "/App",
    mode: 'hash',

    plugins: [react(), sentryVitePlugin({
        org: "blaze-1",
        project: "javascript-react"
    })],

    css: {
        postcss: {
            plugins: [globalImport()]
        }
    },

    esbuild: {
        tsconfigRaw: {}
    },

    assetsInclude: ['**/*.png', '**/*.webp', '**/*.webm', '**/*.jpg', '**/*.jpeg'],

    define: {
        'process.env': process.env,
    },

    build: {
        sourcemap: true
    }
});