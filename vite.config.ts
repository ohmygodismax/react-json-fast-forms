import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import {resolve} from "path"
import dts from 'vite-plugin-dts'

// https://vite.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		}
	},
	plugins: [
		react(),
		dts({
			// outDir: ['dist/types'],
			//include: ['src/models/FormMeta.ts'],
			//exclude: ['src/ignore'],
			staticImport: true,
			insertTypesEntry: true,
			rollupTypes: true,
			// beforeWriteFile: (filePath, content) => ({
			// 	filePath: filePath.replace('path/to/file.d.ts', 'index.d.ts'),
			// 	content,
			// }),
			tsconfigPath: "./tsconfig.app.json"
		})
	],
	build: {
		lib: {
			name: 'dynamic-forms',
			formats: ['es', 'umd', 'cjs'],
			entry: resolve(__dirname, './src/main.ts'),
			fileName: (format) => `dynamic-forms.${format}.js`
		},
		rollupOptions: {
			external: ['react', 'react-dom'],
			output: {
				globals: {
					react: 'React',
					'react-dom': 'ReactDOM',
				},
			},
		},
		sourcemap: true
	}
})