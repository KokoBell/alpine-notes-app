module.exports = {
	globDirectory: 'src/',
	globPatterns: [
		'**/*.{png,jpg,html}'
	],
	swDest: 'src/sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};