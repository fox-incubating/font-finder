import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'

export default defineConfig({
	plugins: [preact()],
	server: {
		proxy: {
			'/api': {
				target: 'http://localhost:3001',
			},
			'/fonts': {
				target: 'http://localhost:3001',
			},
			'/static': {
				target: 'http://localhost:3001',
			},
		},
		watch: {
			ignored: ['**/node_modules/**', '**/.git/**', '**/fonts/**'],
		},
	},
})
