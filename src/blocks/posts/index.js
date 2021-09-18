import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

import Edit from './edit';

// Icon
import icons from '../../Const/icons';

// Attributes
const attributes = {
    align: { type: 'string', default: 'wide' },
    cId: { type: 'string' },

    layout: { type: 'string', default: 'grid' },
    subLayout: { type: 'string', default: 'default' },
    columns: { type: 'object', default: { desktop: 3, tablet: 2, mobile: 1 } },
    columnGap: { type: 'number', default: 15 },
    rowGap: { type: 'number', default: 15 },
    isContentEqualHight: { type: 'boolean', default: true },
    sliderHeight: { type: 'string', default: '350px' },

    postType: { type: 'string', default: 'post' },
    selectedCategories: { type: 'array', default: [] },
    isPostsPerPageAll: { type: 'boolean', default: false },
    postsPerPage: { type: 'number', default: 12 },
    postsOrderBy: { type: 'string', default: 'date' },
    postsOrder: { type: 'string', default: 'desc' },

    contentAlign: { type: 'string', default: 'left' },
    contentBG: { type: 'object', default: { color: '#f4f2fc' } },
    contentPadding: { type: 'object', default: { vertical: '20px', horizontal: '25px' } },
    border: { type: 'object', default: { radius: '5px' } },

    sliderIsLoop: { type: 'boolean', default: true },
    sliderIsTouchMove: { type: 'boolean', default: false },
    sliderIsAutoplay: { type: 'boolean', default: true },
    sliderSpeed: { type: 'number', default: 1.5 },
    sliderEffect: { type: 'string', default: 'slide' },
    sliderIsPage: { type: 'boolean', default: true },
    sliderIsPageClickable: { type: 'boolean', default: true },
    sliderIsPageDynamic: { type: 'boolean', default: true },
    sliderPageColor: { type: 'string', default: '#fe6601' },
    sliderPageWidth: { type: 'string', default: '15px' },
    sliderPageHeight: { type: 'string', default: '15px' },
    sliderPageBorder: { type: 'object', default: { radius: '50%' } },
    sliderIsPrevNext: { type: 'boolean', default: true },
    sliderPrevNextColor: { type: 'string', default: '#fe6601' },

    isFImg: { type: 'boolean', default: true },
    isFImgLink: { type: 'boolean', default: false },

    isTitle: { type: 'boolean', default: true },
    isTitleLink: { type: 'boolean', default: true },
    titleTypo: { type: 'object', default: { fontFamily: 'Roboto', fontSize: 25, googleFontLink: 'https://fonts.googleapis.com/css2?family=Roboto&display=swap' } },
    titleColor: { type: 'string', default: '#fe6601' },
    titleMargin: { type: 'object', default: { bottom: '15px' } },

    isMeta: { type: 'boolean', default: true },
    isMetaAuthor: { type: 'boolean', default: true },
    isMetaDate: { type: 'boolean', default: true },
    isMetaCategory: { type: 'boolean', default: true },
    metaCategoryIn: { type: 'string', default: 'content' },
    isMetaComment: { type: 'boolean', default: false },
    metaTypo: { type: 'object', default: { fontSize: 13, textTransform: 'uppercase' } },
    metaTextColor: { type: 'string', default: '#333' },
    metaLinkColor: { type: 'string', default: '#fe6601' },
    metaIconColor: { type: 'string', default: '#fe6601' },
    metaMargin: { type: 'object', default: { bottom: '15px' } },

    isExcerpt: { type: 'boolean', default: true },
    excerptLength: { type: 'number', default: 25 },
    excerptAlign: { type: 'string', default: 'justify' },
    excerptTypo: { type: 'object', default: { fontSize: 15 } },
    excerptColor: { type: 'string', default: '#333' },
    excerptMargin: { type: 'object', default: { bottom: '10px' } },

    isReadMore: { type: 'boolean', default: true },
    readMoreLabel: { type: 'string', default: 'Read More' },
    isLinkNewTab: { type: 'boolean', default: false },
    readMoreAlign: { type: 'string', default: 'left' },
    readMoreTypo: { type: 'object', default: { fontSize: 14, textTransform: 'uppercase', fontWeight: 600 } },
    readMoreColors: { type: 'object', default: { color: '#fff', bg: '#fbb040' } },
    readMoreHovColors: { type: 'object', default: { color: '#fff', bg: '#fe6601' } },
    readMorePadding: { type: 'object', default: { vertical: '12px', horizontal: '35px' } },
    readMoreBorder: { type: 'object', default: { radius: '3px' } }
}

registerBlockType('ap-block/posts', {
    // Build In attributes
    title: __('Advanced Posts', 'advanced-post-block'),
    description: __('Display posts in a beautiful way!', 'advanced-post-block'),
    icon: icons.advancedPosts(24),
    category: 'APBlock',
    keywords: [__('Show Posts', 'advanced-post-block'), __('Embed Blog Posts', 'advanced-post-block'), __('Custom Posts', 'advanced-post-block')],
    supports: {
        align: ['wide', 'full']
    },

    // Custom Attributes
    attributes,

    // Build In Functions
    edit: Edit,

    save: () => null,

    example: {
        attributes: {
            'preview': true,
            columns: {
                desktop: 1,
                tablet: 1,
                mobile: 1
            },
        },
    },
});