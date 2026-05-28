import { fileURLToPath } from "node:url"

import tailwindcss from "@tailwindcss/vite"
import { tanstackRouter } from "@tanstack/router-plugin/vite"
import AutoImport from "unplugin-auto-import/vite"
import { FileSystemIconLoader } from "unplugin-icons/loaders"
import IconsResolver from "unplugin-icons/resolver"
import Icons from "unplugin-icons/vite"
import { defineConfig } from "vite"
import solid from "vite-plugin-solid"

export default defineConfig({
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("./src", import.meta.url)),
		},
	},
	server: {
		port: 8888,
		proxy: {
			"/api": {
				changeOrigin: true,
				target: "http://localhost:8080",
			},
		},
	},
	plugins: [
		tanstackRouter({
			target: "solid",
			autoCodeSplitting: true,
			routesDirectory: "src/views",
			generatedRouteTree: "src/router/routes.gen.ts",
			routeFileIgnorePattern: "components",
		}),
		solid(),
		tailwindcss(),
		AutoImport({
			dts: "src/types/auto-imports.d.ts",
			resolvers: [
				IconsResolver({
					customCollections: ["local"],
					extension: "jsx",
					prefix: "Icon",
				}),
			],
			include: [/\.[tj]sx?(?:\?.*)?$/],
		}),
		Icons({
			compiler: "solid",
			customCollections: {
				local: FileSystemIconLoader("src/assets/svg", (svg) =>
					svg.replace(/^<svg\s/, '<svg width="1em" height="1em" '),
				),
			},
			defaultClass: "inline-block",
			scale: 1,
		}),
	],
})
