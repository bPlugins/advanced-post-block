import { __ } from '@wordpress/i18n';

import { gridIcon, masonryIcon, sliderIcon, tickerIcon } from '../../utils/icons';
import { gutenbergTabIcon, templateTabIcon, shortcodeTabIcon, pageBuilderTabIcon, postSectionDemoIcon, allPostsDemoIcon } from './icons';

const slug = 'advanced-post-block';

export const dashboardInfo = (info) => {
	const { version, isPremium, adminUrl = '', licenseActiveNonce, deleteDataOnUninstall = false, uninstallNonce = '' } = info;

	const proSuffix = isPremium ? ' Pro' : '';

	return {
		name: `Advanced Post Block${proSuffix}`,
		displayName: `Advanced Post Block${proSuffix} - ${__('Showcase Posts with Grid, List, Card Layouts and Filters', 'advanced-post-block')}`,
		description: __('Advanced Post Block is a powerful and flexible block plugin that allows you to display posts, display blog posts, and embed custom posts in a fully customizable and responsive layout.', 'advanced-post-block'),
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
			pricing: `https://bplugins.com/products/${slug}/pricing/`,
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
			label: __('Start Now', 'advanced-post-block'),
			url: `${adminUrl}/post-new.php?post_type=apb`
		}
	}
}

export const welcomeInfo = (adminUrl) => ({
	keywords: [__('Grid', 'advanced-post-block'), __('Masonry', 'advanced-post-block'), __('Slider', 'advanced-post-block'), __('Ticker', 'advanced-post-block'), __('News Ticker', 'advanced-post-block'), __('Accordion', 'advanced-post-block'), __('Magazine 1', 'advanced-post-block'), __('Magazine 2', 'advanced-post-block')],
	keywordsLabel: __('Layouts', 'advanced-post-block'),
	gettingStarted: {
		tabs: [
			{
				key: 'gutenberg',
				label: 'Gutenberg',
				icon: gutenbergTabIcon,
				steps: [
					{
						num: 1,
						title: __('Add the APB Block', 'advanced-post-block'),
						body: __('Open the block editor on any post or page. Click the <strong>+</strong> icon in the top-left corner or type <strong>/Advanced Posts</strong> to find and insert the Advanced Posts block.', 'advanced-post-block'),
						link: { url: `${adminUrl}/post-new.php`, label: __('Open Editor', 'advanced-post-block') }
					},
					{
						num: 2,
						title: __('Choose a Layout', 'advanced-post-block'),
						body: __('Select the layout from - <strong>Grid</strong>, <strong>Grid 1</strong>, <strong>Masonry</strong>, <strong>Slider</strong>, <strong>Ticker</strong>, <strong>News Ticker</strong>, <strong>Accordion</strong>, <strong>Magazine 1</strong>, <strong>Magazine 2</strong>, or <strong>Timeline</strong>. Switching layouts is non-destructive; your query settings are preserved.', 'advanced-post-block')
					},
					{
						num: 3,
						title: __('Configure the Posts Query', 'advanced-post-block'),
						body: __('In the <strong>Posts Query</strong> panel, filter by categories, tags, or authors, skip posts with <strong>Post Offset</strong>, target exact posts with <strong>Include/Exclude Posts</strong>, and control the number and order of posts. Then pick a <strong>Load More / Pagination</strong> type to split long lists across pages.', 'advanced-post-block')
					},
					{
						num: 4,
						title: __('Style Elements & Publish', 'advanced-post-block'),
						body: __('Use the <strong>Elements</strong> tab to toggle and reorder post content (image, title, meta, excerpt, read more), then the <strong>Style</strong> tab to set colors, typography, borders, and hover effects. Publish when ready.', 'advanced-post-block')
					}
				]
			},
			{
				key: 'template',
				label: __('Template Library', 'advanced-post-block'),
				icon: templateTabIcon,
				steps: [
					{
						num: 1,
						title: __('Open the Template Library', 'advanced-post-block'),
						body: __('In the block editor, click the <strong>Template Library</strong> button in the top toolbar (next to the block inserter) to open the templates modal.', 'advanced-post-block'),
						link: { url: `${adminUrl}/post-new.php`, label: __('Open Editor', 'advanced-post-block') }
					},
					{
						num: 2,
						title: __('Browse & Filter Templates', 'advanced-post-block'),
						body: __('Switch between the <strong>Patterns</strong> and <strong>Favorites</strong> tabs, then narrow the gallery by access (<strong>All</strong>, <strong>Free</strong>, <strong>Pro</strong>), by category (Grid, List, Magazine, Masonry, Overlay), or search templates by name.', 'advanced-post-block')
					},
					{
						num: 3,
						title: __('Preview & Save Favorites', 'advanced-post-block'),
						body: __('Click the <strong>eye</strong> icon on a template to open its live demo in a new tab, or the <strong>heart</strong> icon to save it - favorites stay one click away under the <strong>Favorites</strong> tab.', 'advanced-post-block')
					},
					{
						num: 4,
						title: __('Import & Customize', 'advanced-post-block'),
						body: __('Hit <strong>+ Import</strong> and the template is inserted right into your content as editable blocks - then tweak the query, elements, and styles as usual. Pro templates show <strong>Get Pro</strong> until your license is active.', 'advanced-post-block')
					}
				]
			},
			{
				key: 'shortcode',
				label: __('ShortCode', 'advanced-post-block'),
				icon: shortcodeTabIcon,
				steps: [
					{
						num: 1,
						title: __('Open ShortCode Generator', 'advanced-post-block'),
						body: __('Go to <strong>Advanced Posts &rsaquo; ShortCode Generator</strong> in your WordPress admin and click <strong>Add New ShortCode</strong>.', 'advanced-post-block'),
						link: { url: `${adminUrl}/edit.php?post_type=apb`, label: __('ShortCode Generator', 'advanced-post-block') }
					},
					{
						num: 2,
						title: __('Configure the Block', 'advanced-post-block'),
						body: __('In the block editor, use the sidebar to choose your layout, set the Posts Query filters (post type, categories, tags, order), and adjust Elements and Style settings.', 'advanced-post-block')
					},
					{
						num: 3,
						title: __('Publish & Copy the Shortcode', 'advanced-post-block'),
						body: __('Publish the post. Return to the ShortCode Generator list - the shortcode <code>[apb id=POST_ID]</code> is shown in the list table. Click it to copy to clipboard.', 'advanced-post-block')
					},
					{
						num: 4,
						title: __('Paste Anywhere', 'advanced-post-block'),
						body: __('Paste the copied shortcode (e.g. <code>[apb id=123]</code>) into any post, page, widget area, or block using the <strong>Shortcode</strong> block.', 'advanced-post-block')
					}
				]
			},
			{
				key: 'pageBuilder',
				label: __('Page Builder', 'advanced-post-block'),
				icon: pageBuilderTabIcon,
				steps: [
					{
						num: 1,
						title: __('Create a ShortCode', 'advanced-post-block'),
						body: __('Go to <strong>Advanced Posts &rsaquo; ShortCode Generator</strong>, click <strong>Add New ShortCode</strong>, configure your layout and query, then publish. Note the shortcode from the list table.', 'advanced-post-block'),
						link: { url: `${adminUrl}/edit.php?post_type=apb`, label: __('ShortCode Generator', 'advanced-post-block') }
					},
					{
						num: 2,
						title: __('Add a Shortcode Widget', 'advanced-post-block'),
						body: __('Add the Page Builder <strong>Shortcode</strong> widget to your page and insert to the page.', 'advanced-post-block')
					},
					{
						num: 3,
						title: __('Enter & Preview', 'advanced-post-block'),
						body: __('Type <code>[apb id=YOUR_ID]</code> into the widget\'s Shortcode field (replace <em>YOUR_ID</em> with your actual post ID) and click <strong>Preview</strong> to see the posts rendered live.', 'advanced-post-block')
					}
				]
			}
		]
	},
	changelogs: [
		{
			version: '2.5.1 - 4 Oct 2026',
			type: 'new',
			list: [
				'<strong>New:</strong> Template Library: Imports and favorites now help rank the most popular templates - only reported when you allow usage tracking.',
				'<strong>Update:</strong> Translations: The admin dashboard, block settings, and front-end labels (view counts, comment links, ticker navigation) are now fully translatable.',
				'<strong>Fix:</strong> Slider: The Autoplay Delay labels used the wrong text domain and could not be translated.'
			]
		},
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
				'<strong>New:</strong> Meta Separator Color: Give the separator character between meta items its own color.',
				'<strong>New:</strong> Image Grayscale: Apply a grayscale filter to the feature image, on normal state and on hover.'
			]
		},
		{
			version: '2.4.0 - 18 Aug 2026',
			type: 'new',
			list: [
				'<strong>New:</strong> Magazine 1 Layout: The hero-plus-sidebar magazine layout is now free - pair a large featured post with a scrollable list of secondary posts, with its own sidebar list layout and responsive hero min-height.',
				'<strong>New:</strong> Overlay Half Content Sub Layout: Text sits over the bottom half of the image behind a soft gradient.',
				'<strong>New:</strong> Load More / Pagination: Numbered <strong>Pagination</strong> and prev/next <strong>Navigation</strong> - with custom labels, alignment, colors, active/hover colors, padding, spacing, and back-to-top on page change.',
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
				'<strong>New:</strong> Accordion Layout: Added a new collapsible Accordion layout to display posts as expandable panels - great for FAQs, docs, and long-form lists. Includes <strong>Classic</strong> and <strong>Card Stack</strong> themes, single open mode, expand-icon controls, and full styling.'
			]
		},
		{
			version: '2.2.2 - 22 Jul 2026',
			type: 'new',
			list: [
				'<strong>New:</strong> Template Library: Browse and import professionally designed post layouts with one click using the new <strong>Template Library</strong> button in the editor toolbar - complete with search, filters, and live preview.'
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
	changelogsReadMoreLabel: __('View More Changelogs', 'advanced-post-block'),
	proFeatures: [
		__('More Layouts: Grid 1 and Timeline layouts.', 'advanced-post-block'),
		__('Accordion Pro Themes: Thumbnail, Numbered FAQ, Split Panel, and Minimal Lines.', 'advanced-post-block'),
		__('Ticker and News Ticker options.', 'advanced-post-block'),
		__('Advanced Query: Presets, Custom Taxonomies, and Search.', 'advanced-post-block'),
		__('Tags and Custom Taxonomies in the meta row, each with its own icon.', 'advanced-post-block'),
		__('Infinity Scroll with a trigger offset, spinner, and loading label.', 'advanced-post-block'),
		__('Meta sorting and gaps, custom meta icons, date formats, and reading time seconds.', 'advanced-post-block'),
		__('Image Lazy Loading, the Scale Up hover animation, and title ellipsis.', 'advanced-post-block')
	],
})

export const demoInfo = {
	allInOneLabel: __('See All Demos', 'advanced-post-block'),
	allInOneLink: 'https://apb.bplugins.com/all-demos-in-one-place/',
	demos: [
		{
			icon: gridIcon,
			title: __('Grid', 'advanced-post-block'),
			children: [
				{
					title: __('Retro Print Teal', 'advanced-post-block'),
					type: 'iframe',
					url: 'https://apb.bplugins.com/demo/retro-print-teal/'
				},
				{
					title: __('Strata Daily', 'advanced-post-block'),
					type: 'iframe',
					url: 'https://apb.bplugins.com/demo/strata-daily/'
				},
				{
					title: __('Willow Journal', 'advanced-post-block'),
					type: 'iframe',
					url: 'https://apb.bplugins.com/demo/willow-journal/'
				},
				{
					title: __('Sable Folio', 'advanced-post-block'),
					type: 'iframe',
					url: 'https://apb.bplugins.com/demo/sable-folio/'
				},
				{
					title: __('Solstice Review', 'advanced-post-block'),
					type: 'iframe',
					url: 'https://apb.bplugins.com/demo/solstice-review/'
				},
				{
					title: __('Slate Ledger', 'advanced-post-block'),
					type: 'iframe',
					url: 'https://apb.bplugins.com/demo/slate-ledger/'
				},
				{
					title: __('Lumen Review', 'advanced-post-block'),
					type: 'iframe',
					url: 'https://apb.bplugins.com/demo/lumen-review/'
				},
				{
					title: __('Vellum Folio', 'advanced-post-block'),
					type: 'iframe',
					url: 'https://apb.bplugins.com/demo/vellum-folio/'
				},
				{
					title: __('Meridian Ledger', 'advanced-post-block'),
					type: 'iframe',
					url: 'https://apb.bplugins.com/demo/meridian-ledger/'
				},
				{
					title: __('Meridian Journal Gallery', 'advanced-post-block'),
					type: 'iframe',
					url: 'https://apb.bplugins.com/demo/meridian-journal-gallery/'
				},
				{
					title: __('Slate Stand Gallery', 'advanced-post-block'),
					type: 'iframe',
					url: 'https://apb.bplugins.com/demo/slate-stand-gallery/'
				},
				{
					title: __('Slate Edition', 'advanced-post-block'),
					type: 'iframe',
					url: 'https://apb.bplugins.com/demo/slate-edition/'
				},
				{
					title: __('Meridian Edition', 'advanced-post-block'),
					type: 'iframe',
					url: 'https://apb.bplugins.com/demo/meridian-edition/'
				},
				{
					title: __('Vellum Ledger', 'advanced-post-block'),
					type: 'iframe',
					url: 'https://apb.bplugins.com/demo/vellum-ledger/'
				},
				{
					title: __('Obsidian Review', 'advanced-post-block'),
					type: 'iframe',
					url: 'https://apb.bplugins.com/demo/obsidian-review/'
				},
				{
					title: __('Obsidian Journal', 'advanced-post-block'),
					type: 'iframe',
					url: 'https://apb.bplugins.com/demo/obsidian-journal/'
				},
				{
					title: __('Obsidian Press', 'advanced-post-block'),
					type: 'iframe',
					url: 'https://apb.bplugins.com/demo/obsidian-press/'
				},
				{
					title: __('Meridian Daily', 'advanced-post-block'),
					type: 'iframe',
					url: 'https://apb.bplugins.com/demo/meridian-daily/'
				},
				{
					title: __('Aurora Daily', 'advanced-post-block'),
					type: 'iframe',
					url: 'https://apb.bplugins.com/demo/aurora-daily/'
				},
				{
					title: __('Vista Daily', 'advanced-post-block'),
					type: 'iframe',
					url: 'https://apb.bplugins.com/demo/vista-daily/'
				},
				{
					title: __('Compact Cyber Neon', 'advanced-post-block'),
					type: 'iframe',
					url: 'https://apb.bplugins.com/demo/compact-cyber-neon/'
				},
				{
					title: __('Compact Neo Brutal', 'advanced-post-block'),
					type: 'iframe',
					url: 'https://apb.bplugins.com/demo/compact-neo-brutal/'
				},
				{
					title: __('Compact Elite Clean', 'advanced-post-block'),
					type: 'iframe',
					url: 'https://apb.bplugins.com/demo/compact-elite-clean/'
				},
				{
					title: __('Minimal Cyber Neon', 'advanced-post-block'),
					type: 'iframe',
					url: 'https://apb.bplugins.com/demo/minimal-cyber-neon/'
				},
				{
					title: __('Minimal Neo Brutal', 'advanced-post-block'),
					type: 'iframe',
					url: 'https://apb.bplugins.com/demo/minimal-neo-brutal/'
				},
				{
					title: __('Minimal Elite Clean', 'advanced-post-block'),
					type: 'iframe',
					url: 'https://apb.bplugins.com/demo/minimal-elite-clean/'
				},
				{
					title: __('Default', 'advanced-post-block'),
					type: 'iframe',
					url: 'https://apb.bplugins.com/demo/grid-default-layout/',
				},
				{
					title: __('Title Meta', 'advanced-post-block'),
					type: 'iframe',
					url: 'https://apb.bplugins.com/demo/grid-title-meta-layout/'
				},
				{
					title: __('Side Image', 'advanced-post-block'),
					type: 'iframe',
					url: 'https://apb.bplugins.com/demo/grid-side-image-layout/'
				},
				{
					title: __('Overlay', 'advanced-post-block'),
					type: 'iframe',
					url: 'https://apb.bplugins.com/demo/grid-overlay-layout/'
				}
			]
		},
		{
			title: __('Grid 1', 'advanced-post-block'),
			children: [
				{
					title: __('Basalt Press', 'advanced-post-block'),
					type: 'iframe',
					url: 'https://apb.bplugins.com/demo/basalt-press/'
				},
				{
					title: __('Lumen Folio', 'advanced-post-block'),
					type: 'iframe',
					url: 'https://apb.bplugins.com/demo/lumen-folio/'
				}
			]
		},
		{
			icon: masonryIcon,
			title: __('Masonry', 'advanced-post-block'),
			children: [
				{
					title: __('Vista Dispatch', 'advanced-post-block'),
					type: 'iframe',
					url: 'https://apb.bplugins.com/demo/vista-dispatch/'
				},
				{
					title: __('Default', 'advanced-post-block'),
					type: 'iframe',
					url: 'https://apb.bplugins.com/demo/masonry-default-layout/'
				},
				{
					title: __('Title Meta', 'advanced-post-block'),
					type: 'iframe',
					url: 'https://apb.bplugins.com/demo/masonry-title-meta-layout/'
				},
				{
					title: __('Side Image', 'advanced-post-block'),
					type: 'iframe',
					url: 'https://apb.bplugins.com/demo/masonry-side-image-layout/'
				},
				{
					title: __('Overlay', 'advanced-post-block'),
					type: 'iframe',
					url: 'https://apb.bplugins.com/demo/masonry-overlay-layout/'
				}
			]
		},
		{
			icon: sliderIcon,
			title: __('Slider', 'advanced-post-block'),
			children: [
				{
					title: __('Side Image', 'advanced-post-block'),
					type: 'iframe',
					url: 'https://apb.bplugins.com/demo/slider-side-image-layout/'
				},
				{
					title: __('Overlay', 'advanced-post-block'),
					type: 'iframe',
					url: 'https://apb.bplugins.com/demo/slider-overlay-layout/'
				}
			]
		},
		{
			title: __('Magazine 1', 'advanced-post-block'),
			children: [
				{
					title: __('Mica Gazette', 'advanced-post-block'),
					type: 'iframe',
					url: 'https://apb.bplugins.com/demo/mica-gazette/'
				},
				{
					title: __('Quartz Stand', 'advanced-post-block'),
					type: 'iframe',
					url: 'https://apb.bplugins.com/demo/quartz-stand/'
				}
			]
		},
		{
			icon: tickerIcon,
			title: __('Ticker', 'advanced-post-block'),
			children: [
				{
					title: __('Side Image', 'advanced-post-block'),
					type: 'iframe',
					url: 'https://apb.bplugins.com/demo/ticker-side-image-layout/'
				},
				{
					title: __('Overlay', 'advanced-post-block'),
					type: 'iframe',
					url: 'https://apb.bplugins.com/demo/ticker-overlay-layout/'
				}
			]
		},
		{
			icon: postSectionDemoIcon,
			title: __('Post Section', 'advanced-post-block'),
			children: [
				{
					title: __('Post Section (Design 1)', 'advanced-post-block'),
					type: 'iframe',
					url: 'https://apb.bplugins.com/demo/design-1/'
				},
				{
					title: __('Post Section (Design 2)', 'advanced-post-block'),
					type: 'iframe',
					url: 'https://apb.bplugins.com/demo/post-section-design-2/'
				},
				{
					title: __('Post Section (Design 3)', 'advanced-post-block'),
					type: 'iframe',
					url: 'https://apb.bplugins.com/demo/post-section-design-3/'
				},
				{
					title: __('Post Section (Design 4)', 'advanced-post-block'),
					type: 'iframe',
					url: 'https://apb.bplugins.com/demo/post-section-design-4/'
				},
				{
					title: __('Post Section (Design 5)', 'advanced-post-block'),
					type: 'iframe',
					url: 'https://apb.bplugins.com/demo/post-section-design-5/'
				}
			]
		},
		{
			icon: allPostsDemoIcon,
			title: __('All Posts', 'advanced-post-block'),
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
		label: __('Buy Now ➜', 'advanced-post-block')
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