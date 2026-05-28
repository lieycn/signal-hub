import { defineConfig } from "oxfmt"

export default defineConfig({
	tabWidth: 4,
	useTabs: true,
	trailingComma: "all",
	semi: false,
	bracketSameLine: false,
	sortImports: true,
	sortTailwindcss: {
		preserveWhitespace: true,
		functions: ["clsx", "cn"],
		attributes: ["class"],
		stylesheet: "./src/assets/style/style.css",
	},
	experimentalSortPackageJson: {
		sortScripts: true,
	},
})
