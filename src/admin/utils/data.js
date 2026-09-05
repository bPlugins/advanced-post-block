import { __ } from '@wordpress/i18n';

import { gridIcon, masonryIcon, sliderIcon, tickerIcon } from '../../utils/icons';
import { gutenbergTabIcon, templateTabIcon, shortcodeTabIcon, pageBuilderTabIcon, postSectionDemoIcon, allPostsDemoIcon } from './icons';

const slug = 'advanced-post-block';

export const dashboardInfo = (info) => {
	const { version, isPremium, adminUrl = '', licenseActiveNonce, deleteDataOnUninstall = false, uninstallNonce = '' } = info;

	const proSuffix = isPremium ? ' Pro' : '';

	return {
		name: `Advanced Post Block${proSuffix}`,
		displayName: `Advanced Post Block${proSuffix} - Showcase Posts with Grid, List, Card Layouts and Filters`,
		description: 'Advanced Post Block is a powerful and flexible block plugin that allows you to display posts, display blog posts, and embed custom posts in a fully customizable and responsive layout.',
		slug,
		version,
		isPremium,
		adminUrl,
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
		startButton: {
			label: 'Start Now',
			url: `${adminUrl}/post-new.php?post_type=apb`
		}
	}
}

export const welcomeInfo = (adminUrl) => ({
	keywords: ['Grid', 'Masonry', 'Slider', 'Ticker', 'Accordion', 'Magazine 1', 'Post Section'],
	keywordsLabel: 'Layouts',
	gettingStarted: {
		tabs: [
			{
				key: 'gutenberg',
				label: 'Gutenberg',
				icon: gutenbergTabIcon,
				steps: [
					{
						num: 1,
						title: 'Add the APB Block',
						body: 'Open the block editor on any post or page. Click the <strong>+</strong> icon in the top-left corner or type <strong>/Advanced Posts</strong> to find and insert the Advanced Posts block.',
						link: { url: `${adminUrl}/post-new.php`, label: 'Open Editor' }
					},
					{
						num: 2,
						title: 'Choose a Layout',
						body: 'Select the layout from — <strong>Grid</strong>, <strong>Grid 1</strong>, <strong>Masonry</strong>, <strong>Slider</strong>, <strong>Ticker</strong>, <strong>News Ticker</strong>, <strong>Accordion</strong>, <strong>Magazine 1</strong>, <strong>Magazine 2</strong>, or <strong>Timeline</strong>. Switching layouts is non-destructive; your query settings are preserved.'
					},
					{
						num: 3,
						title: 'Configure the Posts Query',
						body: 'In the <strong>Posts Query</strong> panel, filter by categories, tags, or authors, skip posts with <strong>Post Offset</strong>, target exact posts with <strong>Include/Exclude Posts</strong>, and control the number and order of posts. Then pick a <strong>Load More / Pagination</strong> type to split long lists across pages.'
					},
					{
						num: 4,
						title: 'Style Elements & Publish',
						body: 'Use the <strong>Elements</strong> tab to toggle and reorder post content (image, title, meta, excerpt, read more), then the <strong>Style</strong> tab to set colors, typography, borders, and hover effects. Publish when ready.'
					}
				]
			},
			{
				key: 'template',
				label: 'Template Library',
				icon: templateTabIcon,
				steps: [
					{
						num: 1,
						title: 'Open the Template Library',
						body: 'In the block editor, click the <strong>Template Library</strong> button in the top toolbar (next to the block inserter) to open the templates modal.',
						link: { url: `${adminUrl}/post-new.php`, label: 'Open Editor' }
					},
					{
						num: 2,
						title: 'Browse & Filter Templates',
						body: 'Switch between the <strong>Patterns</strong> and <strong>Favorites</strong> tabs, then narrow the gallery by access (<strong>All</strong>, <strong>Free</strong>, <strong>Pro</strong>), by category (Grid, List, Magazine, Masonry, Overlay), or search templates by name.'
					},
					{
						num: 3,
						title: 'Preview & Save Favorites',
						body: 'Click the <strong>eye</strong> icon on a template to open its live demo in a new tab, or the <strong>heart</strong> icon to save it — favorites stay one click away under the <strong>Favorites</strong> tab.'
					},
					{
						num: 4,
						title: 'Import & Customize',
						body: 'Hit <strong>+ Import</strong> and the template is inserted right into your content as editable blocks — then tweak the query, elements, and styles as usual. Pro templates show <strong>Get Pro</strong> until your license is active.'
					}
				]
			},
			{
				key: 'shortcode',
				label: 'ShortCode',
				icon: shortcodeTabIcon,
				steps: [
					{
						num: 1,
						title: 'Open ShortCode Generator',
						body: 'Go to <strong>Advanced Posts &rsaquo; ShortCode Generator</strong> in your WordPress admin and click <strong>Add New ShortCode</strong>.',
						link: { url: `${adminUrl}/edit.php?post_type=apb`, label: 'ShortCode Generator' }
					},
					{
						num: 2,
						title: 'Configure the Block',
						body: 'In the block editor, use the sidebar to choose your layout, set the Posts Query filters (post type, categories, tags, order), and adjust Elements and Style settings.'
					},
					{
						num: 3,
						title: 'Publish & Copy the Shortcode',
						body: 'Publish the post. Return to the ShortCode Generator list — the shortcode <code>[apb id=POST_ID]</code> is shown in the list table. Click it to copy to clipboard.'
					},
					{
						num: 4,
						title: 'Paste Anywhere',
						body: 'Paste the copied shortcode (e.g. <code>[apb id=123]</code>) into any post, page, widget area, or block using the <strong>Shortcode</strong> block.'
					}
				]
			},
			{
				key: 'pageBuilder',
				label: 'Page Builder',
				icon: pageBuilderTabIcon,
				steps: [
					{
						num: 1,
						title: 'Create a ShortCode',
						body: 'Go to <strong>Advanced Posts &rsaquo; ShortCode Generator</strong>, click <strong>Add New ShortCode</strong>, configure your layout and query, then publish. Note the shortcode from the list table.',
						link: { url: `${adminUrl}/edit.php?post_type=apb`, label: 'ShortCode Generator' }
					},
					{
						num: 2,
						title: 'Add a Shortcode Widget',
						body: 'Add the Page Builder <strong>Shortcode</strong> widget to your page and insert to the page.'
					},
					{
						num: 3,
						title: 'Enter & Preview',
						body: 'Type <code>[apb id=YOUR_ID]</code> into the widget\'s Shortcode field (replace <em>YOUR_ID</em> with your actual post ID) and click <strong>Preview</strong> to see the posts rendered live.'
					}
				]
			}
		]
	},
	changelogs: [
		{
			version: '2.5.0 - 6 Sep 2026',
			type: 'new',
			list: [
				'<strong>New:</strong> Magazine 2 Layout: A full-width hero post above a responsive grid of the remaining posts, with its own <strong>Magazine Grid Layout</strong> selector, column and gap controls, and a responsive hero min-height.',
				'<strong>New:</strong> Load More Button: A third Load More type that appends the next posts in place, with a custom button label and a loading state.',
				'<strong>New:</strong> Exclude Sticky Posts: Completely remove sticky posts from any query.',
				'<strong>New:</strong> Meta Author Link: Link the author name to their author archive.',
				'<strong>New:</strong> Meta Date as Time Ago: Show the post date as "3 days ago" instead of a fixed date.',
				'<strong>New:</strong> Meta Reading Time: Show the estimated reading time in the meta row, with a custom label.',
				'<strong>New:</strong> Post View Count: Display tracked post views in the meta row.',
				'<strong>New:</strong> Category Badge Spacing: Padding and border radius controls for the on-image category badge.',
				'<strong>New:</strong> Image Grayscale: Apply a grayscale filter to the feature image, on normal state and on hover.'
			]
		},
		{
			version: '2.4.0 - 18 Aug 2026',
			type: 'new',
			list: [
				'<strong>New:</strong> Magazine 1 Layout: The hero-plus-sidebar magazine layout is now free — pair a large featured post with a scrollable list of secondary posts, with its own sidebar list layout and responsive hero min-height.',
				'<strong>New:</strong> Overlay Half Content Sub Layout: Text sits over the bottom half of the image behind a soft gradient.',
				'<strong>New:</strong> Load More / Pagination: Numbered <strong>Pagination</strong> and prev/next <strong>Navigation</strong> — with custom labels, alignment, colors, active/hover colors, padding, spacing, and back-to-top on page change.',
				'<strong>New:</strong> Query Controls: Select <strong>Pages</strong> as a post source, filter posts by <strong>Tags</strong>, skip posts with <strong>Post Offset</strong>, and target exact posts with <strong>Include Posts</strong> and <strong>Exclude Posts</strong>.',
				'<strong>New:</strong> Element Sorting: Drag and drop to reorder the title, meta data, and excerpt inside each post.',
				'<strong>New:</strong> Feature Image: Pick any registered <strong>image size</strong>, set a <strong>fallback image</strong> for posts without a thumbnail, and animate the corner radius on hover.',
				'<strong>New:</strong> Title Limit: Trim titles by word or character count.',
				'<strong>New:</strong> Meta Separator: Add a custom character between meta data items.'
			]
		},
		{
			version: '2.3.0 - 30 Jul 2026',
			type: 'new',
			list: [
				'<strong>New:</strong> Accordion Layout: Added a new collapsible Accordion layout to display posts as expandable panels — great for FAQs, docs, and long-form lists. Includes <strong>Classic</strong> and <strong>Card Stack</strong> themes, single open mode, expand-icon controls, and full styling.'
			]
		},
		{
			version: '2.2.2 - 22 Jul 2026',
			type: 'new',
			list: [
				'<strong>New:</strong> Template Library: Browse and import professionally designed post layouts with one click using the new <strong>Template Library</strong> button in the editor toolbar — complete with search, filters, and live preview.'
			]
		},
		{
			version: '2.2.1 - 25 Jun 2026',
			type: 'update',
			list: [
				'<strong>Update:</strong> Admin Dashboard: Improved UI with better feature organization.'
			]
		},
		{
			version: '2.2.0 - 06 May 2026',
			type: 'new',
			list: [
				'<strong>New:</strong> Advanced Image Controls: Added custom width, height, lazy loading, and default placeholders. Plus, new grayscale effects, precision border/radius controls, and smooth zoom/scale hover animations.',
				'<strong>New:</strong> Post Title Customization: Choose SEO title tags, set word or character limits with ellipsis, and customize text alignment and hover colors for a professional look.',
				'<strong>New:</strong> Refined Metadata & Badges: Advanced controls for gaps, separators (including colors), and alignment. Added "Time Ago" formats, View Count tracking with icon selection, hover colors for meta elements, and premium styling for category badges.',
				'<strong>New:</strong> Interactive Container Design: Elevate your blocks with shadow effects, hover borders, and interactive hover shadows for containers, plus hover background support for content areas.',
				'<strong>New:</strong> SEO-Ready Content: Pull excerpts directly from Yoast SEO, Rank Math, or AIOSEO meta descriptions. Added custom hover color support for excerpts to match your design.',
				'<strong>New:</strong> Engaging "Read More" Buttons: Complete control over arrow icons, including gap adjustment, placement, and professional hover animations.'
			]
		},
		{
			version: '2.1.0 - 07 Apr 2026',
			type: 'new',
			list: [
				'<strong>New:</strong> News Ticker Layout: Added a new professional news ticker layout (Free).',
				'<strong>New:</strong> News Ticker Options: Enhanced News Ticker with direction, speed, and animation controls (Pro).',
				'<strong>New:</strong> Magazine Layouts: Introduced Magazine 1 and Magazine 2 layouts for editorial-style post displays (Pro).',
				'<strong>New:</strong> Magazine Min Height: Added a responsive minimum height setting for the magazine hero post (Pro).'
			]
		},
		{
			version: '2.0.8 - 14 Mar 2026',
			type: 'new',
			list: [
				'<strong>New:</strong> List - Left Even Odd Sub-Layout: Added a new alternating left-aligned list layout for visually distinct even/odd post rows.',
				'<strong>New:</strong> List - Right Even Odd Sub-Layout: Added a new alternating right-aligned list layout for visually distinct even/odd post rows.',
				'<strong>Fix:</strong> Fixed the issue of posts not loading in the frontend.'
			]
		},
		{
			version: '2.0.7 - 12 Mar 2026',
			type: 'new',
			list: [
				'<strong>New:</strong> Query Preset: Introduced a query preset option to select from predefined query configurations, making it easier to set up common post queries.',
				'<strong>New:</strong> Taxonomy Relation: Added a new setting to select the relation (AND/OR) between different taxonomy filters, providing more advanced control over the post query.',
				'<strong>New:</strong> Search Query: Introduced a search field in the block settings to filter posts by a specific search term, allowing for more precise content display.',
				'<strong>New:</strong> Author Filter: Added the ability to filter posts by specific authors, allowing for more personalized content curation.',
				'<strong>New:</strong> Exclude Sticky Posts: Introduced an option to exclude sticky posts from the query, providing better control over post visibility.',
				'<strong>New:</strong> Post View Tracking: Introduced post view tracking to display posts by popularity.',
				'<strong>Update:</strong> AJAX Post Fetching: Implemented AJAX-based post fetching in the editor/backend for a more reliable and faster loading experience.',
				'<strong>Fix:</strong> Security Hardening: Enhanced security by restricting license access, improving XSS protection, and enforcing strict type casting for query parameters.'
			]
		},
		{
			version: '2.0.6 - 28 Feb 2026',
			type: 'new',
			list: [
				'<strong>New:</strong> Added a Layout Selector for new blocks to improve the initial setup experience.',
				'<strong>New:</strong> Added helpful descriptions and tooltips to various complex settings in the block sidebar.',
				'<strong>Fix:</strong> Critical performance issue resolved in the editor by refactoring data-fetching logic to significantly reduce store calls and prevent infinite loops.',
				'<strong>Update:</strong> Optimized data retrieval for authors, taxonomies, and comments to improve overall editor responsiveness.',
				'<strong>Fix:</strong> Improved fallback Grid layout display to ensure blocks render correctly even if initial configuration is missing.'
			]
		},
		{
			version: '2.0.5 - 22 Feb 2026',
			type: 'update',
			list: [
				'<strong>New:</strong> ShortCode feature for free users - Easy shortcode support for displaying posts anywhere on your site.',
				'<strong>Update:</strong> Admin Dashboard - Improved UI with better navigation and clearer feature organization.',
				'<strong>Fix:</strong> Critical performance improvements and bug fixes.'
			]
		},
		{
			version: '2.0.4 - 22 Jan 2026',
			type: 'new',
			list: [
				'<strong>New:</strong> Infinite Scroll - Auto-load posts as users scroll down.',
				'<strong>New:</strong> Navigation Pagination - Add next/previous buttons for manual browsing.',
				'<strong>New:</strong> Load More Button - On-demand post loading with a clickable button.'
			]
		},
		{
			version: '2.0.3 - 11 Dec 2025',
			type: 'update',
			list: [
				'<strong>Fix:</strong> Remove unwanted data from posts query'
			]
		},
		{
			version: '2.0.2 - 03 Dec 2025',
			type: 'new',
			list: [
				'<strong>Fix:</strong> Offset query issue',
				'<strong>New:</strong> More options in Order by Query.'
			]
		},
		{
			version: '2.0.1 - 01 Sep 2025',
			type: 'update',
			list: [
				'<strong>Update:</strong> Custom Post type label',
				'<strong>New:</strong> Additional class for pagination page numbers'
			]
		},
		{
			version: '2.0.0 - 20 Aug 2025',
			type: 'fix',
			list: [
				'<strong>Fix:</strong> Post Type Issues',
				'<strong>Update:</strong> SDK',
				'<strong>Update:</strong> UI redesign',
				'<strong>New:</strong> Admin Dashboard'
			]
		},
		{
			version: '1.16.1 - 3 Jul 2025',
			type: 'fix',
			list: [
				'<strong>Fix:</strong> Pagination issue'
			]
		},
		{
			version: '1.16.0 - 18 Jun 2025',
			type: 'fix',
			list: [
				'<strong>Update:</strong> Upgrade Page',
				'<strong>Fix:</strong> Other users premium unlock issue',
				'<strong>Update:</strong> SDK'
			]
		}
	],
	changelogsLimit: 6,
	changelogsReadMoreLabel: 'View More Changelogs',
	proFeatures: [
		'More Layouts: Grid 1, Magazine 2, and Timeline layouts.',
		'Accordion Pro Themes: Thumbnail, Numbered FAQ, Split Panel, and Minimal Lines.',
		'Ticker and News Ticker options.',
		'Advanced Query: Presets, Custom Taxonomies, and Search.',
		'Display Post View and Reading Time and Custom Taxonomies.',
		'Infinity Scroll and Load More button with a loading spinner.',
		'Meta sorting, gaps, custom icons, date formats, and time ago.',
		'Image Grayscale and Lazy Loading, and title ellipsis.'
	],
})

export const demoInfo = {
	allInOneLabel: 'See All Demos',
	allInOneLink: 'https://apb.bplugins.com/all-demos-in-one-place/',
	demos: [
		{
			icon: gridIcon,
			title: 'Grid',
			children: [
				{
					title: 'Retro Print Teal',
					type: 'iframe',
					url: 'https://apb.bplugins.com/demo/retro-print-teal/'
				},
				{
					title: 'Strata Daily',
					type: 'iframe',
					url: 'https://apb.bplugins.com/demo/strata-daily/'
				},
				{
					title: 'Willow Journal',
					type: 'iframe',
					url: 'https://apb.bplugins.com/demo/willow-journal/'
				},
				{
					title: 'Sable Folio',
					type: 'iframe',
					url: 'https://apb.bplugins.com/demo/sable-folio/'
				},
				{
					title: 'Solstice Review',
					type: 'iframe',
					url: 'https://apb.bplugins.com/demo/solstice-review/'
				},
				{
					title: 'Slate Ledger',
					type: 'iframe',
					url: 'https://apb.bplugins.com/demo/slate-ledger/'
				},
				{
					title: 'Lumen Review',
					type: 'iframe',
					url: 'https://apb.bplugins.com/demo/lumen-review/'
				},
				{
					title: 'Vellum Folio',
					type: 'iframe',
					url: 'https://apb.bplugins.com/demo/vellum-folio/'
				},
				{
					title: 'Meridian Ledger',
					type: 'iframe',
					url: 'https://apb.bplugins.com/demo/meridian-ledger/'
				},
				{
					title: 'Meridian Journal Gallery',
					type: 'iframe',
					url: 'https://apb.bplugins.com/demo/meridian-journal-gallery/'
				},
				{
					title: 'Slate Stand Gallery',
					type: 'iframe',
					url: 'https://apb.bplugins.com/demo/slate-stand-gallery/'
				},
				{
					title: 'Slate Edition',
					type: 'iframe',
					url: 'https://apb.bplugins.com/demo/slate-edition/'
				},
				{
					title: 'Meridian Edition',
					type: 'iframe',
					url: 'https://apb.bplugins.com/demo/meridian-edition/'
				},
				{
					title: 'Vellum Ledger',
					type: 'iframe',
					url: 'https://apb.bplugins.com/demo/vellum-ledger/'
				},
				{
					title: 'Obsidian Review',
					type: 'iframe',
					url: 'https://apb.bplugins.com/demo/obsidian-review/'
				},
				{
					title: 'Obsidian Journal',
					type: 'iframe',
					url: 'https://apb.bplugins.com/demo/obsidian-journal/'
				},
				{
					title: 'Obsidian Press',
					type: 'iframe',
					url: 'https://apb.bplugins.com/demo/obsidian-press/'
				},
				{
					title: 'Meridian Daily',
					type: 'iframe',
					url: 'https://apb.bplugins.com/demo/meridian-daily/'
				},
				{
					title: 'Aurora Daily',
					type: 'iframe',
					url: 'https://apb.bplugins.com/demo/aurora-daily/'
				},
				{
					title: 'Vista Daily',
					type: 'iframe',
					url: 'https://apb.bplugins.com/demo/vista-daily/'
				},
				{
					title: 'Compact Cyber Neon',
					type: 'iframe',
					url: 'https://apb.bplugins.com/demo/compact-cyber-neon/'
				},
				{
					title: 'Compact Neo Brutal',
					type: 'iframe',
					url: 'https://apb.bplugins.com/demo/compact-neo-brutal/'
				},
				{
					title: 'Compact Elite Clean',
					type: 'iframe',
					url: 'https://apb.bplugins.com/demo/compact-elite-clean/'
				},
				{
					title: 'Minimal Cyber Neon',
					type: 'iframe',
					url: 'https://apb.bplugins.com/demo/minimal-cyber-neon/'
				},
				{
					title: 'Minimal Neo Brutal',
					type: 'iframe',
					url: 'https://apb.bplugins.com/demo/minimal-neo-brutal/'
				},
				{
					title: 'Minimal Elite Clean',
					type: 'iframe',
					url: 'https://apb.bplugins.com/demo/minimal-elite-clean/'
				},
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
			title: 'Grid 1',
			children: [
				{
					title: 'Basalt Press',
					type: 'iframe',
					url: 'https://apb.bplugins.com/demo/basalt-press/'
				},
				{
					title: 'Lumen Folio',
					type: 'iframe',
					url: 'https://apb.bplugins.com/demo/lumen-folio/'
				}
			]
		},
		{
			icon: masonryIcon,
			title: 'Masonry',
			children: [
				{
					title: 'Vista Dispatch',
					type: 'iframe',
					url: 'https://apb.bplugins.com/demo/vista-dispatch/'
				},
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
			title: 'Slider',
			children: [
				{
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
			title: 'Magazine 1',
			children: [
				{
					title: 'Mica Gazette',
					type: 'iframe',
					url: 'https://apb.bplugins.com/demo/mica-gazette/'
				},
				{
					title: 'Quartz Stand',
					type: 'iframe',
					url: 'https://apb.bplugins.com/demo/quartz-stand/'
				}
			]
		},
		{
			icon: tickerIcon,
			title: 'Ticker',
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
			icon: postSectionDemoIcon,
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
			icon: allPostsDemoIcon,
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

export const settingsInfo = {
	ajaxAction: 'apbSaveUninstallOption',
	cleanupItems: [
		__('All shortcode posts (apb post type)', 'advanced-post-block'),
		__('Post view tracking data', 'advanced-post-block')
	]
}