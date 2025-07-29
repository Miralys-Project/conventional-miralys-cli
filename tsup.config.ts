import { defineConfig } from 'tsup';

export default defineConfig({
	entry: ['src/index.ts'],
	format: ['esm'],
	target: 'node18',
	outDir: 'dist',
	clean: true,
	dts: true,
	splitting: false,
	shims: false,
	minify: false,
	sourcemap: true,
	platform: 'node',
	banner: {
		js: '#!/usr/bin/env node'
	}
});
