/**
 * Cleans the babel-makepot JS POT (generated during `npm run build`) before the
 * i18n-pot script merges it into the main POT:
 *
 * 1. Drops entries that only come from ../bpl-tools — those use their own text
 *    domain and are excluded from the PHP-side extraction for the same reason.
 * 2. Rewrites every reference to `build/index.js:1` so `wp i18n make-json`
 *    files the strings under the editor bundle's script handle. Strings shared
 *    with the other bundles keep their build/* references from wp-cli's own
 *    scan, so they land in every JSON that needs them.
 *
 * Runs in place on languages/advanced-post-block-js.pot.
 */
const fs = require('fs');
const path = require('path');

const potPath = path.join(__dirname, '..', 'languages', 'advanced-post-block-js.pot');

if (!fs.existsSync(potPath)) {
	console.error('languages/advanced-post-block-js.pot not found — run `npm run build` first.');
	process.exit(1);
}

const chunks = fs.readFileSync(potPath, 'utf8').split('\n\n');
const header = chunks.shift();

const entries = chunks
	.map(entry => entry.trim())
	.filter(Boolean)
	// Keep entries with at least one reference inside this plugin's src/.
	.filter(entry => entry.split('\n').some(line => line.startsWith('#: src/')))
	// Collapse the reference lines into the built editor bundle.
	.map(entry => {
		const lines = entry.split('\n').filter(line => !line.startsWith('#: '));
		return ['#: build/index.js:1', ...lines].join('\n');
	});

fs.writeFileSync(potPath, [header, ...entries].join('\n\n') + '\n');
console.log(`Normalized JS POT: kept ${entries.length} own strings, references point to build/index.js.`);
