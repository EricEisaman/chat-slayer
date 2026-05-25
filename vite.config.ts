import { defineConfig, type Plugin } from 'vite';
import { readFileSync } from 'node:fs';

const pkg = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf8')) as { version?: string };

const BUILD_REPLACEMENTS: Record<string, string> = {
    '%{BUILD_VERSION}': process.env.BUILD_VERSION ?? pkg.version ?? '',
    '%{BUILD_NODE_ENV}': process.env.BUILD_NODE_ENV ?? process.env.NODE_ENV ?? 'production',
    '%{BUILD_DATE}': new Date().toISOString(),
    '%{BUILD_COMMAND_NAME}': process.env.BUILD_COMMAND_NAME ?? 'chat-slayer',
    '%{BUILD_LOG_LEVEL}': process.env.BUILD_LOG_LEVEL ?? '',
    '%{BUILD_WITH_FULL_USAGE}': process.env.BUILD_WITH_FULL_USAGE ?? '',
};

function csBuildConstantsPlugin (): Plugin {
    return {
        name: 'cs-build-constants',
        enforce: 'pre',
        transform (code, id) {
            if (!/\.[cm]?tsx?$/.test(id) || id.includes('node_modules')) {
                return null;
            }
            let next = code;
            for (const [token, value] of Object.entries(BUILD_REPLACEMENTS)) {
                if (next.includes(token)) {
                    next = next.split(token).join(value);
                }
            }
            return next === code ? null : { code: next, map: null };
        },
    };
}

export default defineConfig({
    plugins: [csBuildConstantsPlugin()],
    esbuild: {
        target: 'es2022',
    },
    build: {
        ssr: 'src/chat-slayer.ts',
        outDir: 'dist',
        emptyOutDir: true,
        minify: true,
        sourcemap: false,
        rollupOptions: {
            output: {
                format: 'cjs',
                entryFileNames: 'chat-slayer.cjs',
                banner: '#!/usr/bin/env node',
            },
        },
    },
    ssr: {
        noExternal: true,
    },
});
