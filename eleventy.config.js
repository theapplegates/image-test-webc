import pluginWebc from "@11ty/eleventy-plugin-webc";
import { InputPathToUrlTransformPlugin } from "@11ty/eleventy";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";

/** @param {import('@11ty/eleventy').UserConfig} eleventyConfig */
export default function(eleventyConfig) {
	eleventyConfig.ignores.add("README.md");

	eleventyConfig.addPlugin(pluginWebc, {
		components: [
			"./_components/**/*.webc",
			"npm:@11ty/is-land/*.webc"
		]
	});

	eleventyConfig.addPlugin(InputPathToUrlTransformPlugin);

	// Image Transformation Plugin
	eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
		// which file extensions to process
		extensions: "html",

		// Add any other Image utility options here:

		// optional, output image formats
		formats: ["avif", "webp", "jpeg"],
		// formats: ["auto"],
        widths: [320, 570, 880, 1024, 1248], // I moved the explicit widths over from my old shortcode
		defaultAttributes: {
			loading: 'lazy',
			decoding: 'async',
			sizes: '90vw', // I set a default `sizes` attribute here — the plugin errored out without it and I didn't want to set it per image

		// optional, output image widths
		// widths: ["auto"],

		// optional, attributes assigned on <img> override these values.
		// defaultAttributes: {
			// loading: "lazy",
			// decoding: "async"
		}
	});

	eleventyConfig.setServerOptions({
		domDiff: false
	});

	return {
		dir: {
			input: "content",         // default: "."
			includes: "../_includes", // default: "_includes"
			data: "../_data",         // default: "_data"
		},
	}
};
