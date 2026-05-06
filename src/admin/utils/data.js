import { gridIcon, masonryIcon, sliderIcon, tickerIcon } from '../../utils/icons';

const slug = 'advanced-post-block';

export const dashboardInfo = (info) => {
	const { version, licenseActiveNonce, deleteDataOnUninstall = false, uninstallNonce = '' } = info;

	return {
		name: `Advanced Post Block`,
		displayName: `Advanced Post Block - Showcase Posts with Grid, List, Card Layouts and Filters`,
		description: 'Advanced Post Block is a powerful and flexible block plugin that allows you to display posts, display blog posts, and embed custom posts in a fully customizable and responsive layout.',
		slug,
		version,
		displayOurPlugins: true,
		media: {
			logo: `https://ps.w.org/${slug}/assets/icon-256x256.png`,
			banner: `https://ps.w.org/${slug}/assets/banner-772x250.png`,
			thumbnail: `https://bplugins.com/wp-content/themes/b-technologies/assets/images/products/${slug}.png`,
			proThumbnail: `https://bplugins.com/wp-content/themes/b-technologies/assets/images/products/${slug}-pro.png`,
			video: 'https://www.youtube.com/watch?v=milYZrqLJsE',
			isYoutube: true
		},
		pages: {
			org: `https://wordpress.org/plugins/${slug}/`,
			// landing: `https://bplugins.com/products/${slug}/`,
			docs: `https://bplugins.com/docs/${slug}/`,
			pricing: `https://bplugins.com/products/${slug}/pricing`,
		},
		freemius: {
			product_id: 14262,
			plan_id: 23856,
			public_key: 'pk_87f141adce326dfb96ba4e12d8a36'
		},
		licenseActiveNonce,
		deleteDataOnUninstall,
		uninstallNonce,
		changelogs: [
			{
				version: '2.2.0 - 06 May 2026',
				type: 'new',
				list: [
					'New: Advanced Title Customization: Choose specific SEO title tags, align text perfectly, and set custom hover colors for a professional look.',
					'New: Enhanced Image Controls: Set custom dimensions, adjust borders, radius, and shadows, and add smooth hover animations for better image presentation.',
					'New: Refined Metadata & Badges: Position categories above content, set custom hover colors, and adjust category badge margins.',
					'New: Interactive Container Design: Shadow effects, hover borders, and background hover support for article blocks and content areas.',
					'New: Engaging "Read More" Buttons: Sleek arrow icons and smooth hover animations to guide your visitors.',
					'New: Dynamic Excerpts: Custom hover color support for post excerpts to match your brand\'s style.'
				]
			},
			{
				version: '2.1.0 - 07 Apr 2026',
				type: 'new',
				list: [
					'New: News Ticker Layout: Added a new professional news ticker layout (Free).',
					'New: News Ticker Options: Enhanced News Ticker with direction, speed, and animation controls (Pro).',
					'New: Magazine Layouts: Introduced Magazine 1 and Magazine 2 layouts for editorial-style post displays (Pro).',
					'New: Magazine Min Height: Added a responsive minimum height setting for the magazine hero post (Pro).'
				]
			},
			{
				version: '2.0.8 - 14 Mar 2026',
				type: 'new',
				list: [
					'New: List - Left Even Odd Sub-Layout: Added a new alternating left-aligned list layout for visually distinct even/odd post rows.',
					'New: List - Right Even Odd Sub-Layout: Added a new alternating right-aligned list layout for visually distinct even/odd post rows.',
					'Fix: Fixed the issue of posts not loading in the frontend.'
				]
			},
			{
				version: '2.0.7 - 12 Mar 2026',
				type: 'new',
				list: [
					'New: Query Preset: Introduced a query preset option to select from predefined query configurations, making it easier to set up common post queries.',
					'New: Taxonomy Relation: Added a new setting to select the relation (AND/OR) between different taxonomy filters, providing more advanced control over the post query.',
					'New: Search Query: Introduced a search field in the block settings to filter posts by a specific search term, allowing for more precise content display.',
					'New: Author Filter: Added the ability to filter posts by specific authors, allowing for more personalized content curation.',
					'New: Exclude Sticky Posts: Introduced an option to exclude sticky posts from the query, providing better control over post visibility.',
					'New: Post View Tracking: Introduced post view tracking to display posts by popularity.',
					'Update: AJAX Post Fetching: Implemented AJAX-based post fetching in the editor/backend for a more reliable and faster loading experience.',
					'Fix: Security Hardening: Enhanced security by restricting license access, improving XSS protection, and enforcing strict type casting for query parameters.'
				]
			},
			{
				version: '2.0.6 - 28 Feb 2026',
				type: 'new',
				list: [
					'New: Added a Layout Selector for new blocks to improve the initial setup experience.',
					'New: Added helpful descriptions and tooltips to various complex settings in the block sidebar.',
					'Fix: Critical performance issue resolved in the editor by refactoring data-fetching logic to significantly reduce store calls and prevent infinite loops.',
					'Update: Optimized data retrieval for authors, taxonomies, and comments to improve overall editor responsiveness.',
					'Fix: Improved fallback Grid layout display to ensure blocks render correctly even if initial configuration is missing.'
				]
			}
		],
		proFeatures: [
			'More Layouts: Grid 1, Magazine 1, and Magazine 2 layouts.',
			'Display from posts, pages, or custom posts.',
			'Advanced Query: Presets, Tags, and Filters.',
			'Display Post View and Reading Time and Custom Taxonomies.',
			'Flexible pagination and infinity loading.',
			'Image Grayscale, Lazy Loading, and Default Image.'
		],
		startButton: {
			label: 'Start Now',
			url: `wp-admin/post-new.php?post_type=apb`
		}
	}
}

export const demoInfo = {
	allInOneLabel: 'See All Demos',
	allInOneLink: 'https://apb.bplugins.com/all-demos-in-one-place/',
	demos: [
		{
			icon: gridIcon,
			title: 'Grid Layout',
			children: [
				{
					title: 'Default',
					type: 'iframe',
					url: 'https://apb.bplugins.com/demo/grid-default-layout/',
				},
				{
					title: 'Title Meta',
					type: 'iframe',
					url: 'https://apb.bplugins.com/demo/grid-title-meta-layout/'
				},
				{
					title: 'Side Image',
					type: 'iframe',
					url: 'https://apb.bplugins.com/demo/grid-side-image-layout/'
				},
				{
					title: 'Overlay',
					type: 'iframe',
					url: 'https://apb.bplugins.com/demo/grid-overlay-layout/'
				}
			]
		},
		{
			icon: masonryIcon,
			title: 'Masonry Layout',
			children: [
				{
					title: 'Default',
					type: 'iframe',
					url: 'https://apb.bplugins.com/demo/masonry-default-layout/'
				},
				{
					title: 'Title Meta',
					type: 'iframe',
					url: 'https://apb.bplugins.com/demo/masonry-title-meta-layout/'
				},
				{
					title: 'Side Image',
					type: 'iframe',
					url: 'https://apb.bplugins.com/demo/masonry-side-image-layout/'
				},
				{
					title: 'Overlay',
					type: 'iframe',
					url: 'https://apb.bplugins.com/demo/masonry-overlay-layout/'
				}
			]
		},
		{
			icon: sliderIcon,
			title: 'Slider Layout',
			children: [{
				title: 'Side Image',
				type: 'iframe',
				url: 'https://apb.bplugins.com/demo/slider-side-image-layout/'
			},
			{
				title: 'Overlay',
				type: 'iframe',
				url: 'https://apb.bplugins.com/demo/slider-overlay-layout/'
			}
			]
		},
		{
			icon: tickerIcon,
			title: 'Ticker Layout',
			children: [
				{
					title: 'Side Image',
					type: 'iframe',
					url: 'https://apb.bplugins.com/demo/ticker-side-image-layout/'
				},
				{
					title: 'Overlay',
					type: 'iframe',
					url: 'https://apb.bplugins.com/demo/ticker-overlay-layout/'
				}
			]
		},
		{
			icon: '',
			title: 'Post Section',
			children: [
				{
					title: 'Post Section (Design 1)',
					type: 'iframe',
					url: 'https://apb.bplugins.com/demo/design-1/'
				},
				{
					title: 'Post Section (Design 2)',
					type: 'iframe',
					url: 'https://apb.bplugins.com/demo/post-section-design-2/'
				},
				{
					title: 'Post Section (Design 3)',
					type: 'iframe',
					url: 'https://apb.bplugins.com/demo/post-section-design-3/'
				},
				{
					title: 'Post Section (Design 4)',
					type: 'iframe',
					url: 'https://apb.bplugins.com/demo/post-section-design-4/'
				},
				{
					title: 'Post Section (Design 5)',
					type: 'iframe',
					url: 'https://apb.bplugins.com/demo/post-section-design-5/'
				}
			]
		},
		{
			icon: '',
			title: 'All Posts',
			type: 'iframe',
			url: 'https://apb.bplugins.com/demo/all-posts/'
		}
	]
}

export const pricingInfo = {
	logo: `https://ps.w.org/${slug}/assets/icon-256x256.png`, // Optional
	pluginId: 14262,
	planId: 23856,
	licenses: [
		1,
		3,
		null
	],
	button: {
		label: 'Buy Now ➜'
	},
	featured: {
		selected: 3, // choose from licenses item
	}
}