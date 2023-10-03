import path from "path";
import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import checker from 'vite-plugin-checker';


export default defineConfig(() => {
    const baseUrl = path.resolve(__dirname, "src")

    return {
        esbuild: {jsxInject: `import React from 'react'`},
        build: {outDir: 'build'},
        plugins: [
            react({jsxRuntime: 'classic'}),
            viteTsconfigPaths(),
            checker({typescript: true})
        ],
        resolve: {
            alias: [
                {find: '@src', replacement: baseUrl},
                {find: '@components', replacement: path.resolve(baseUrl, "components")},
                {find: '@hooks', replacement: path.resolve(baseUrl, "hooks")},
                {find: '@pages', replacement: path.resolve(baseUrl, "pages")},
                {find: '@services', replacement: path.resolve(baseUrl, "services")},
                {find: '@store', replacement: path.resolve(baseUrl, "store")},
                {find: '@utils', replacement: path.resolve(baseUrl, "utils")},
                {find: '@types', replacement: path.resolve(baseUrl, "types")},
            ]
        },
        server: {
            hmr: {
                overlay: true
            },
        },
        clearScreen: false
    };
});
