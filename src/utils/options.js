import { __ } from '@wordpress/i18n';

export const subLayouts = [
	{ label: __('Default', 'advanced-post-block'), value: 'default' },
	{ label: __('Title Meta', 'advanced-post-block'), value: 'title-meta' },
	{ label: __('Left Image', 'advanced-post-block'), value: 'left-image' },
	{ label: __('Right Image', 'advanced-post-block'), value: 'right-image' },
	{ label: __('Overlay Content', 'advanced-post-block'), value: 'overlay-content' },
	{ label: __('Overlay Content Hover', 'advanced-post-block'), value: 'overlay-content-hover' },
	{ label: __('Overlay Box', 'advanced-post-block'), value: 'overlay-box' }
];

export const categoriesPosition = [
	{ label: __('Content', 'advanced-post-block'), value: 'content' },
	{ label: __('Image', 'advanced-post-block'), value: 'image' }
];

export const effects = [
	{ label: __('Slide', 'advanced-post-block'), value: 'slide' },
	{ label: __('Fade', 'advanced-post-block'), value: 'fade' },
	{ label: __('Creative', 'advanced-post-block'), value: 'creative' }
];

export const postsOrdersBy = [
	{ label: __('Author', 'advanced-post-block'), value: 'author' },
	{ label: __('Title', 'advanced-post-block'), value: 'title' },
	{ label: __('Date', 'advanced-post-block'), value: 'date' },
	{ label: __('Last Modified', 'advanced-post-block'), value: 'modified' },
];

export const postsOrders = [
	{ label: __('Ascending', 'advanced-post-block'), value: 'asc' },
	{ label: __('Descending', 'advanced-post-block'), value: 'desc' }
];

export const imageFittings = [
	{ label: __('Cover', 'advanced-post-block'), value: 'cover' },
	{ label: __('Contain', 'advanced-post-block'), value: 'contain' }
];

export const aligns = [
	{ label: __('Left', 'advanced-post-block'), value: 'left', icon: 'editor-alignleft' },
	{ label: __('Center', 'advanced-post-block'), value: 'center', icon: 'editor-aligncenter' },
	{ label: __('Right', 'advanced-post-block'), value: 'right', icon: 'editor-alignright' },
	{ label: __('Justify', 'advanced-post-block'), value: 'justify', icon: 'editor-justify' }
];

export const generalStyleTabs = [
	{ name: 'general', title: __('General', 'advanced-post-block') },
	{ name: 'elements', title: __('Elements', 'advanced-post-block') },
	{ name: 'style', title: __('Style', 'advanced-post-block') }
];