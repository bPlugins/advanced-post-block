import { __ } from '@wordpress/i18n';

// Mirrors the `frontendFilter` default in block.json. WordPress does not fill in missing nested
// keys once the attribute is saved, so every read goes through getFilter().
export const filterStyleDefaults = {
	gap: '10px',
	marginBottom: '20px',
	typo: { fontSize: { desktop: '14px' }, fontWeight: 500 },
	labelColor: '',
	item: {
		colors: { color: '#070127', bg: '#fff' },
		hoverColors: { color: '#146EF5', bg: '#fff' },
		activeColors: { color: '#fff', bg: '#146EF5' },
		padding: { vertical: '6px', horizontal: '14px' },
		border: { width: '1px', color: '#0c0d3c1a', radius: '50px' },
		activeBorderColor: '#146EF5'
	},
	resultCountColor: '',
	resetColor: '#146EF5'
};

export const taxonomyFacetDefaults = {
	taxonomy: 'category',
	label: '',
	allLabel: __('All', 'advanced-post-block'),
	terms: [],
	hideEmpty: true
};

// The filter can be built on these taxonomies. The server holds the same list in APB\Filter::taxonomies().
export const filterTaxonomies = ['category', 'post_tag'];

// The two tickers scroll a fixed run of posts, so they take no filter.
export const supportsFilter = layout => !['ticker', 'newsTicker'].includes(layout);

const isObject = val => val && 'object' === typeof val && !Array.isArray(val);

const merge = (defaults, value) => {
	if (!isObject(defaults)) return undefined === value || null === value ? defaults : value;

	const result = { ...defaults };
	Object.keys(isObject(value) ? value : {}).forEach(key => {
		result[key] = key in defaults ? merge(defaults[key], value[key]) : value[key];
	});
	return result;
};

/**
 * Fills in every missing key of the saved `frontendFilter` attribute. Keys this version does not
 * use are kept as they are, so editing a block never drops settings saved elsewhere.
 */
export const fillFilter = frontendFilter => {
	const raw = isObject(frontendFilter) ? frontendFilter : {};

	return {
		...raw,
		enabled: Boolean(raw.enabled),
		alignment: ['left', 'center', 'right'].includes(raw.alignment) ? raw.alignment : 'left',
		taxonomies: (Array.isArray(raw.taxonomies) ? raw.taxonomies : []).filter(isObject).map(facet => merge(taxonomyFacetDefaults, facet)),
		resultCount: merge({ enabled: true }, raw.resultCount),
		reset: merge({ enabled: true, label: __('Clear all', 'advanced-post-block') }, raw.reset),
		noResults: merge({ text: __('No posts found', 'advanced-post-block') }, raw.noResults),
		styles: merge(filterStyleDefaults, raw.styles)
	};
};

/**
 * The filter settings as they take effect: defaults filled in and one single-choice filter on
 * categories or tags. The server applies the same rules in APB\Filter::normalize().
 */
export const getFilter = attributes => {
	const { frontendFilter, layout } = attributes || {};
	const filter = fillFilter(frontendFilter);

	const taxonomies = filter.taxonomies
		.filter(facet => filterTaxonomies.includes(facet.taxonomy))
		.slice(0, 1);

	return {
		enabled: filter.enabled && supportsFilter(layout),
		alignment: filter.alignment,
		taxonomies,
		resultCount: filter.resultCount,
		reset: filter.reset,
		noResults: filter.noResults,
		styles: filter.styles
	};
};

// The part of the settings the server needs to accept or reject a visitor's pick.
// Labels and styles are left out so editing them in the editor does not refetch posts.
export const filterForRequest = filter => ({
	enabled: filter.enabled,
	taxonomies: filter.taxonomies.map(({ taxonomy, terms, hideEmpty }) => ({ taxonomy, terms, hideEmpty }))
});

export const emptySelection = () => ({ tax: {} });

export const isSelectionEmpty = selection => !Object.values(selection?.tax || {}).some(slugs => slugs?.length);

// Drops anything the current settings do not offer, so a changed setting cannot leave a pick
// the visitor has no control to remove.
export const cleanSelection = (selection, filter) => {
	const { tax = {} } = selection || {};
	const clean = emptySelection();

	if (!filter.enabled) return clean;

	filter.taxonomies.forEach(facet => {
		const slugs = (Array.isArray(tax[facet.taxonomy]) ? tax[facet.taxonomy] : []).filter(Boolean);
		if (slugs.length) {
			clean.tax[facet.taxonomy] = [slugs[0]];
		}
	});

	return clean;
};

// The attributes that shape the query and the post data. The server holds the same list in
// APB\Posts::queryAttr().
export const getQueryAttr = attributes => {
	const { postType, taxonomyRelation = 'AND', selectedCategories = [], selectedTags = [], postsAuthors = [], isPostsPerPageAll, postsPerPage, postsOrderBy, postsOrder, postsOffset = 0, postsInclude = [], postsExclude = [], isExcludeSticky, dateQuery = {}, currentPostId, fImgSize = 'full', isExcerptFromContent = false, excerptLength = 25, excerpt = {} } = attributes;
	const { from = 'excerpt' } = excerpt || {};

	const excerptFrom = (isExcerptFromContent || 'content' === from) ? 'content' : 'excerpt';

	return { postType, taxonomyRelation, selectedCategories, selectedTags, postsAuthors, isPostsPerPageAll, postsPerPage, postsOrderBy, postsOrder, postsOffset, postsInclude, postsExclude, isExcludeSticky, dateQuery, currentPostId, fImgSize, excerptFrom, excerptLength };
};
