import { __ } from '@wordpress/i18n';

// Icons
import icons from './icons';

const options = {
    layouts: [
        { label: __('Grid', 'advanced-post-block'), value: 'grid', icon: icons.grid },
        { label: __('Masonry', 'advanced-post-block'), value: 'masonry', icon: icons.masonry },
        { label: __('Slider', 'advanced-post-block'), value: 'slider', icon: icons.slider }
    ],

    subLayouts: [
        { label: __('Default', 'advanced-post-block'), value: 'default' },
        { label: __('Title Meta', 'advanced-post-block'), value: 'title-meta' },
        { label: __('Left Image', 'advanced-post-block'), value: 'left-image' },
        { label: __('Right Image', 'advanced-post-block'), value: 'right-image' },
        { label: __('Overlay Content', 'advanced-post-block'), value: 'overlay-content' },
        { label: __('Overlay Content Hover', 'advanced-post-block'), value: 'overlay-content-hover' },
        { label: __('Overlay Box', 'advanced-post-block'), value: 'overlay-box' },
    ],

    categoriesPosition: [
        { label: __('Content', 'advanced-post-block'), value: 'content' },
        { label: __('Image', 'advanced-post-block'), value: 'image' }
    ],

    effects: [
        { label: __('Slide', 'advanced-post-block'), value: 'slide' },
        { label: __('Fade', 'advanced-post-block'), value: 'fade' },
        { label: __('Creative', 'advanced-post-block'), value: 'creative' }
    ],

    postsOrdersBy: [
        { label: __('Author', 'advanced-post-block'), value: 'author' },
        { label: __('Title', 'advanced-post-block'), value: 'title' },
        { label: __('Date', 'advanced-post-block'), value: 'date' },
        { label: __('Last Modified', 'advanced-post-block'), value: 'modified' },
    ],

    postsOrders: [
        { label: __('Ascending', 'advanced-post-block'), value: 'asc' },
        { label: __('Descending', 'advanced-post-block'), value: 'desc' }
    ],

    aligns: [
        { label: __('Left', 'advanced-post-block'), value: 'left', icon: 'editor-alignleft' },
        { label: __('Center', 'advanced-post-block'), value: 'center', icon: 'editor-aligncenter' },
        { label: __('Right', 'advanced-post-block'), value: 'right', icon: 'editor-alignright' },
        { label: __('Justify', 'advanced-post-block'), value: 'justify', icon: 'editor-justify' }
    ],

    pxUnit: { value: 'px', label: 'px', default: 0 },
    perUnit: { value: '%', label: '%', default: 0 },
    emUnit: { value: 'em', label: 'em', default: 0 },
    remUnit: { value: 'rem', label: 'rem', default: 0 },
    vwUnit: { value: 'vw', label: 'vw', default: 0 },
    vhUnit: { value: 'vh', label: 'vh', default: 0 },

    generalStyleTabs: [
        { name: 'general', title: __('General', 'b-blocks') },
        { name: 'style', title: __('Style', 'b-blocks') }
    ],

    gradients: [
        { name: 'Daisy Bush to Fuchsia Blue', gradient: 'linear-gradient(135deg, #4527a4, #8344c5)', slug: 'daisy-bush-to-fuchsia-blue' },
        { name: 'Reddish Orange to Yellowish Orange', gradient: 'linear-gradient(135deg, #fe6601, #fbb040)', slug: 'reddish-orange-to-yellowish-orange' },
        { name: 'Tuft Bush to Carnation Pink', gradient: 'linear-gradient(135deg, #fed1c7, #fe8dc6)', slug: 'tuft-bush-to-carnation-pink' },
        { name: 'Golden Fizz to Yellow Orange', gradient: 'linear-gradient(135deg, #f9ed32, #fbb040)', slug: 'golden-fizz-to-yellow-orange' },
        { name: 'Light Electric Violet to Electric Violet', gradient: 'linear-gradient(135deg, #e100ff, #7f00ff)', slug: 'light-electric-violet-to-electric-violet' },
        { name: 'Hot Pink to Violet Red', gradient: 'linear-gradient(135deg, #ff7db8, #ee2a7b)', slug: 'hot-pink-to-violet-red' },
        { name: 'Spring Green to Azure Radiance', gradient: 'linear-gradient(135deg, #00ff8f, #00a1ff)', slug: 'spring-green-to-azure-radiance' }
    ]
}
export default options;