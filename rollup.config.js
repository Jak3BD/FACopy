import terser from "@rollup/plugin-terser";
import copy from "rollup-plugin-copy";
import html from "rollup-plugin-html";

export default {
	input: "src/content.js",

	output: {
		file: "build/content.js",
		format: "esm"
	},

	plugins: [
		html({
			include: "src/content.html",
		}),
		terser(),
		copy({
			targets: [
				{ src: "src/manifest.json", dest: "build" },
			],
		}),
	],
};