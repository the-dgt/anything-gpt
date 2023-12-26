import * as path from "path"
import { defineConfig } from "vite"
import dts from "vite-plugin-dts"

export default defineConfig({
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
	build: {
		lib: {
			name: "anything-gpt",
			entry: "./src/index.ts",
			formats: ["umd"],
			fileName: () => "index.js"
		}
	},
	plugins: [dts({
		rollupTypes: true
	})]
})
