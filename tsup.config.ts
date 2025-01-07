import { defineConfig } from 'tsup';

export default defineConfig((opts) => ({
    entry: ['bin/cli.ts'],
    format: ['esm'],
    outDir: 'dist',
    target: ['esnext'],
    bundle: true,
    clean: !opts.watch,
    minify: false,
    treeshake: !opts.watch,
    sourcemap: false,
    splitting: false,
    cjsInterop: true,
    legacyOutput: false,
    replaceNodeEnv: true,
    dts: true,
}));
