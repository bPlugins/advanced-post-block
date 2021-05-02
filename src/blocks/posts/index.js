import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

import Edit from './edit';

// Icon
import icons from '../../Const/icons';

registerBlockType('ap-block/posts', {
    // Build In attributes
    title: __('Advanced Posts', 'advanced-post-block'),
    description: __('Display posts easily', 'advanced-post-block'),
    icon: icons.advancedPosts,
    category: 'APBlock',
    keywords: [__('Show Posts', 'advanced-post-block'), __('Blog Posts', 'advanced-post-block'), __('Custom Posts', 'advanced-post-block')],
    supports: {
        align: ['center', 'wide', 'full']
    },

    // Custom Attributes
    attributes: {
        align: { type: 'string', default: 'wide' },
        cId: { type: 'string' },

        layout: { type: 'string', default: 'grid' },
        subLayout: { type: 'string', default: 'default' },
        columns: {
            type: 'object',
            default: {
                desktop: 3,
                tablet: 2,
                mobile: 1
            }
        },
        columnGap: { type: 'number', default: 10 },
        rowGap: { type: 'number', default: 10 },
        isContentEqualHight: { type: 'string', default: 'true' },
        sliderContentHeight: { type: 'number', default: 350 },

        postType: { type: 'string', default: 'post' },
        selectedCategories: { type: 'array', default: [] },
        isPostsPerPageAll: { type: 'string', default: 'false' },
        postsPerPage: { type: 'number', default: 12 },
        postsOrderBy: { type: 'string', default: 'date' },
        postsOrder: { type: 'string', default: 'desc' },

        contentAlign: { type: 'string', default: 'left' },
        contentBGColor: { type: 'string', default: '#f4f2fc' },
        postTextPTB: { type: 'number', default: 20 },
        postTextPLR: { type: 'number', default: 25 },
        borderColor: { type: 'string', default: '#4427a500' },

        sliderIsLoop: { type: 'boolean', default: true },
        sliderIsAutoplay: { type: 'boolean', default: true },
        sliderSpeed: { type: 'number', default: .5 },
        sliderIsFade: { type: 'boolean', default: false },
        sliderIsTouchMove: { type: 'boolean', default: false },
        sliderIsPage: { type: 'boolean', default: true },
        sliderIsPageClickable: { type: 'boolean', default: true },
        sliderIsPageDynamic: { type: 'boolean', default: true },
        sliderPageColor: { type: 'string', default: '#8344c5' },
        sliderPageWidth: { type: 'number', default: 15 },
        sliderPageHeight: { type: 'number', default: 15 },
        sliderPageRadius: { type: 'number', default: 50 },
        sliderPageRadiusType: { type: 'string', default: '%' },
        sliderIsPrevNext: { type: 'string', default: 'true' },
        sliderPrevNextColor: { type: 'string', default: '#4527a4' },

        isFImg: { type: 'string', default: 'true' },
        isFImgLink: { type: 'string', default: 'false' },

        isTitle: { type: 'string', default: 'true' },
        isTitleLink: { type: 'string', default: 'true' },
        titleFontSize: { type: 'number', default: 25 },
        titleColor: { type: 'string', default: '#4527a4' },
        titleMB: { type: 'number', default: 15 },

        isMeta: { type: 'string', default: 'true' },
        isMetaAuthor: { type: 'string', default: 'true' },
        isMetaDate: { type: 'string', default: 'true' },
        isMetaCategory: { type: 'string', default: 'true' },
        metaCategoryIn: { type: 'string', default: 'content' },
        isMetaComment: { type: 'string', default: 'false' },
        metaFontSize: { type: 'number', default: 13 },
        metaTransform: { type: 'string', default: 'uppercase' },
        metaTextColor: { type: 'string', default: '#333' },
        metaLinkColor: { type: 'string', default: '#8344c5' },
        metaIconColor: { type: 'string', default: '#4527a4' },
        metaMB: { type: 'number', default: 15 },

        isExcerpt: { type: 'string', default: 'true' },
        excerptLength: { type: 'number', default: 25 },
        excerptAlign: { type: 'string', default: 'justify' },
        excerptColor: { type: 'string', default: '#333' },
        excerptMB: { type: 'number', default: 10 },

        isReadMore: { type: 'string', default: 'true' },
        readMoreLabel: { type: 'string', default: 'Read More' },
        isLinkNewTab: { type: 'string', default: 'false' },
        readMoreAlign: { type: 'string', default: 'left' },
        readMoreFontSize: { type: 'number', default: 14 },
        readMoreTransform: { type: 'string', default: 'uppercase' },
        readMoreFontWeight: { type: 'string', default: '600' },
        readMoreColor: { type: 'string', default: '#4527a4' },
        readMoreHovColor: { type: 'string', default: '#8344c5' },
    },

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