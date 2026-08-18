import { __ } from '@wordpress/i18n';

import { accordionIcon, arrowDownIcon, arrowUpIcon, gridIcon, longArrowDownIcon, longArrowUpIcon, magazine1Icon, masonryIcon, minusIcon, newsTickerIcon, plusIcon, sliderIcon, tickerIcon } from './icons';

export const layouts = [
	{ label: __('Grid', 'advanced-post-block'), value: 'grid', icon: gridIcon },
	{ label: __('Masonry', 'advanced-post-block'), value: 'masonry', icon: masonryIcon },
	{ label: __('Slider', 'advanced-post-block'), value: 'slider', icon: sliderIcon },
	{ label: __('Ticker', 'advanced-post-block'), value: 'ticker', icon: tickerIcon },
	{ label: __('News Ticker', 'advanced-post-block'), value: 'newsTicker', icon: newsTickerIcon },
	{ label: __('Magazine 1', 'advanced-post-block'), value: 'magazine1', icon: magazine1Icon },
	{ label: __('Accordion', 'advanced-post-block'), value: 'accordion', icon: accordionIcon }
];

export const accordionThemes = [
	{ label: __('Classic', 'advanced-post-block'), value: 'classic' },
	{ label: __('Card Stack', 'advanced-post-block'), value: 'card-stack' }
];

export const accordionIconPositions = [
	{ label: __('Left', 'advanced-post-block'), value: 'left' },
	{ label: __('Right', 'advanced-post-block'), value: 'right' }
];

export const accordionIndicatorIcons = [
	{ label: __('Plus Minus', 'advanced-post-block'), value: [minusIcon, plusIcon] },
	{ label: __('Arrow', 'advanced-post-block'), value: [arrowUpIcon, arrowDownIcon] },
	{ label: __('Long Arrow', 'advanced-post-block'), value: [longArrowUpIcon, longArrowDownIcon] }
];

export const subLayouts = [
	{ label: __('Default', 'advanced-post-block'), value: 'default' },
	{ label: __('Title Meta', 'advanced-post-block'), value: 'title-meta' },
	{ label: __('List - Left Image', 'advanced-post-block'), value: 'left-image' },
	{ label: __('List - Right Image', 'advanced-post-block'), value: 'right-image' },
	{ label: __('Overlay Content', 'advanced-post-block'), value: 'overlay-content' },
	{ label: __('Overlay Content Hover', 'advanced-post-block'), value: 'overlay-content-hover' },
	{ label: __('Overlay Box', 'advanced-post-block'), value: 'overlay-box' },
	{ label: __('Overlay Half Content', 'advanced-post-block'), value: 'overlay-half-content' }
];

export const contentHeights = [
	{ label: __('Auto', 'advanced-post-block'), value: 'auto' },
	{ label: __('Fill Available Space', 'advanced-post-block'), value: 'fill' }
];
export const categoriesPosition = [
	{ label: __('With Meta', 'advanced-post-block'), value: 'content' },
	{ label: __('On Image', 'advanced-post-block'), value: 'image' },
	{ label: __('Above Content', 'advanced-post-block'), value: 'aboveContent' }
];

// Infinity Scroll and the Load More button are premium-only, so they aren't offered here.
export const loadMoreTypes = [
	{ label: __('None', 'advanced-post-block'), value: '' },
	{ label: __('Pagination', 'advanced-post-block'), value: 'pagination' },
	{ label: __('Navigation', 'advanced-post-block'), value: 'navigation' }
];

export const effects = [
	{ label: __('Slide', 'advanced-post-block'), value: 'slide' },
	{ label: __('Fade', 'advanced-post-block'), value: 'fade' },
	{ label: __('Creative', 'advanced-post-block'), value: 'creative' }
];

export const postsOrdersBy = [
	{ label: __('None', 'advanced-post-block'), value: 'none' },
	{ label: __('Author', 'advanced-post-block'), value: 'author' },
	{ label: __('Title', 'advanced-post-block'), value: 'title' },
	{ label: __('Date', 'advanced-post-block'), value: 'date' },
	{ label: __('Last Modified', 'advanced-post-block'), value: 'modified' },
	{ label: __('Random', 'advanced-post-block'), value: 'rand' }
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

export const flexAligns = [
	{ label: __('Start', 'advanced-post-block'), value: 'start', icon: 'editor-alignleft' },
	{ label: __('Center', 'advanced-post-block'), value: 'center', icon: 'editor-aligncenter' },
	{ label: __('End', 'advanced-post-block'), value: 'end', icon: 'editor-alignright' }
];

export const generalStyleTabs = [
	{ name: 'general', title: __('General', 'advanced-post-block') },
	{ name: 'elements', title: __('Elements', 'advanced-post-block') },
	{ name: 'style', title: __('Style', 'advanced-post-block') }
];

export const titleTags = [
	{ label: __('H1', 'advanced-post-block'), value: 'h1' },
	{ label: __('H2', 'advanced-post-block'), value: 'h2' },
	{ label: __('H3', 'advanced-post-block'), value: 'h3' },
	{ label: __('H4', 'advanced-post-block'), value: 'h4' },
	{ label: __('H5', 'advanced-post-block'), value: 'h5' },
	{ label: __('H6', 'advanced-post-block'), value: 'h6' },
	{ label: __('div', 'advanced-post-block'), value: 'div' },
	{ label: __('span', 'advanced-post-block'), value: 'span' },
	{ label: __('p', 'advanced-post-block'), value: 'p' },
];