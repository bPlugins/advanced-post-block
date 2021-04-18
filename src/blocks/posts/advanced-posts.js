import Swiper from 'swiper/bundle';
const $ = require('jquery');

const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;
const { withSelect } = wp.data;
const { useEffect, Fragment, useState } = wp.element;

const { InspectorControls, BlockControls, AlignmentToolbar, ColorPalette } = wp.blockEditor;
const { PanelBody, SelectControl, RangeControl, FontSizePicker, CheckboxControl, TextControl, ToggleControl, TabPanel, Spinner, Button, ButtonGroup, Tooltip, RadioControl, PanelRow } = wp.components;

// Icon
import icons from '../../Const/icons';

// Variables
import BColor from '../../GutenComp/BColor';
import options from '../../Const/options';
const { fontSizes, colors, aligns, fontWeights, textTransforms, postsOrdersBy, postsOrders, sizeTypes } = options;

const subLayouts = [
    { label: __('Default', 'advanced-post-block'), value: 'default' },
    { label: __('Title Meta', 'advanced-post-block'), value: 'title-meta' },
    { label: __('Left Image', 'advanced-post-block'), value: 'left-image' },
    { label: __('Right Image', 'advanced-post-block'), value: 'right-image' },
    { label: __('Overlay Content', 'advanced-post-block'), value: 'overlay-content' },
    { label: __('Overlay Content Hover', 'advanced-post-block'), value: 'overlay-content-hover' },
    { label: __('Overlay Box', 'advanced-post-block'), value: 'overlay-box' },
];

// Components
import BtnGroup from '../../GutenComp/BtnGroup';
import Title from '../../GutenComp/Title';
import BDevice from '../../GutenComp/BDevice';

import Default from './Layout/Default';
import SideImage from './Layout/SideImage';
import Overlay from './Layout/Overlay';

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
    edit: withSelect((select, props) => {
        const { postType, selectedCategories, isPostsPerPageAll, postsPerPage, postsOrderBy, postsOrder } = props.attributes;

        const query = {
            categories: selectedCategories,
            per_page: 'true' == isPostsPerPageAll ? -1 : postsPerPage, // set -1 to display ALL
            orderby: postsOrderBy,
            order: postsOrder,
        }

        return {
            select,
            posts: select('core').getEntityRecords('postType', postType, query),
            categories: select('core').getEntityRecords('taxonomy', 'category'),
            media: id => select('core').getMedia(id),
            authors: select('core').getAuthors()
        };

    })(({ select, posts, categories, media, authors, attributes, setAttributes, clientId }) => {
        const { align, cId, layout, subLayout, columns, deviceRange, columnGap, rowGap, isContentEqualHight, sliderContentHeight, postType, selectedCategories, isPostsPerPageAll, postsPerPage, postsOrderBy, postsOrder, contentAlign, contentBGColor, postTextPTB, postTextPLR, borderColor, sliderIsLoop, sliderIsAutoplay, sliderSpeed, sliderIsFade, sliderIsTouchMove, sliderIsPage, sliderIsPageClickable, sliderIsPageDynamic, sliderPageColor, sliderPageWidth, sliderPageHeight, sliderPageRadius, sliderPageRadiusType, sliderIsPrevNext, sliderPrevNextColor, isFImg, isFImgLink, isTitle, isTitleLink, titleFontSize, titleColor, titleMB, isMeta, isMetaAuthor, isMetaDate, isMetaCategory, metaCategoryIn, isMetaComment, metaFontSize, metaTransform, metaTextColor, metaLinkColor, metaIconColor, metaMB, isExcerpt, excerptLength, excerptAlign, excerptColor, excerptMB, isReadMore, readMoreLabel, isLinkNewTab, readMoreAlign, readMoreFontSize, readMoreTransform, readMoreFontWeight, readMoreColor, readMoreHovColor } = attributes;

        // Posts and Categories Check
        if (!posts || !categories) {
            return <h3 style={{ color: '#4527a4', fontSize: '20px' }}><Spinner /> {__('Loading...', 'advanced-post-block')}</h3>;
        }

        // Styles
        const gridPostsStyle = { gridGap: `${rowGap}px ${columnGap}px`, alignItems: `${'false' == isContentEqualHight ? 'start' : 'initial'}` }
        const sliderPostsStyle = { height: `${sliderContentHeight}px` }
        const masonryPostsStyle = { gap: `${columnGap}px` }

        // Functions
        useEffect(() => {
            clientId && setAttributes({ cId: clientId });
        }, [clientId]);

        // Components
        const noPosts = () => {
            return <h3 style={{ color: '#4527a4', textAlign: 'center', fontSize: '20px' }}>{__('No posts found!! Please add some posts', 'advanced-post-block')}</h3>;
        }

        const currentBlock = document.querySelector(`#block-${clientId} .wp-block`);
        const isEditorSidebarOpened = wp.data.select('core/edit-post').isEditorSidebarOpened();

        // const allPostTypes = select('core').getPostTypes();
        // const filterPostTypes = allPostTypes && allPostTypes.filter(p => p.slug !== 'page' && p.slug !== 'wp_block' && p.slug !== 'attachment');
        // const postTypes = filterPostTypes && filterPostTypes.map(p => {
        //     return { label: p.name, value: p.slug }
        // });

        const [device, setDevice] = useState('desktop');

        return [
            posts && 0 !== posts.length && <InspectorControls>
                <TabPanel className="b_blocks_tab_panel" activeClass="active-tab"
                    tabs={[{ name: 'layout', title: __('Layout', 'advanced-post-block'), className: 'layout-tab' }, { name: 'style', title: __('Style', 'advanced-post-block'), className: 'style-tab' }]}>
                    {tab => {
                        return <Fragment>
                            {'layout' == tab.name && <Fragment>
                                {/* Layouts Settings */}
                                <PanelBody title={__('Layouts Settings', 'advanced-post-block')} initialOpen={true}>
                                    {/* Layout Type */}
                                    <Title mt="0">Layout Type:</Title>
                                    <ButtonGroup className="b_blocks_button_groups">
                                        <Tooltip text="Grid" position="top">
                                            <Button icon={icons.grid} isMedium isPrimary={layout === 'grid'} aria-pressed={layout === 'grid'} onClick={() => setAttributes({ layout: 'grid' })}></Button>
                                        </Tooltip>

                                        <Tooltip text="Masonry" position="top">
                                            <Button icon={icons.masonry} isMedium isPrimary={layout === 'masonry'} aria-pressed={layout === 'masonry'} onClick={() => setAttributes({ layout: 'masonry' })}></Button>
                                        </Tooltip>

                                        <Tooltip text="Slider" position="top">
                                            <Button icon={icons.sliderNoColor} isMedium isPrimary={layout === 'slider'} aria-pressed={layout === 'slider'} onClick={() => setAttributes({ layout: 'slider', subLayout: 'left-image', columns: { ...columns, desktop: 2 } })}></Button>
                                        </Tooltip>
                                    </ButtonGroup>

                                    {/* Sub Layout */}
                                    <Title>Sub Layout:</Title>
                                    <SelectControl value={subLayout} onChange={cng => {
                                        setAttributes({ subLayout: cng });
                                        'default' == cng || 'title-meta' == cng || 'left-image' == cng || 'right-image' == cng ? setAttributes({ contentBGColor: '#f4f2fc', titleColor: '#4527a4', metaCategoryIn: 'image', metaTextColor: '#333', metaLinkColor: '#8344c5', metaIconColor: '#4527a4', excerptColor: '#333', readMoreColor: '#4527a4', readMoreHovColor: '#8344c5' }) : 'overlay-content' == cng || 'overlay-content-hover' == cng || 'overlay-box' == cng ? setAttributes({ contentBGColor: '#00000080', titleColor: '#e0d9f6', metaCategoryIn: 'content', metaTextColor: '#fff', metaLinkColor: '#e0d9f6', metaIconColor: '#e0d9f6', excerptColor: '#fff', readMoreColor: '#e0d9f6', readMoreHovColor: '#e0d9f6' }) : '';

                                        'left-image' == cng || 'right-image' == cng ? setAttributes({ columns: { ...columns, desktop: 2 } }) : setAttributes({ columns: { ...columns, desktop: 4 } });

                                        'overlay-box' == cng ? setAttributes({ contentAlign: 'center' }) : setAttributes({ contentAlign: 'left' });
                                    }} options={layout == 'slider' ? subLayouts.filter(l => l.value !== 'default' && l.value !== 'title-meta') : subLayouts} />

                                    {/* Columns */}
                                    <PanelRow className="mt-15">
                                        <Title mt="0">Columns:</Title>
                                        <BDevice device={device} onChange={cng => setDevice(cng)} />
                                    </PanelRow>
                                    <RangeControl value={columns[device]} onChange={cng => { setAttributes({ columns: { ...columns, [device]: cng } }) }} min={1} max={6} step={1} />

                                    {/* Column Gap */}
                                    <Title>Column Gap:</Title>
                                    <RangeControl value={columnGap} onChange={cng => setAttributes({ columnGap: cng })} min={0} max={100} step={1} />

                                    {/* Row Gap */}
                                    <Title>Row Gap:</Title>
                                    <RangeControl value={rowGap} onChange={cng => setAttributes({ rowGap: cng })} min={0} max={150} step={1} />

                                    {'grid' == layout && <Fragment>
                                        {/* Content Height */}
                                        <Title>Content Height:</Title>
                                        <ToggleControl label={'true' == isContentEqualHight ? 'Disable Equal Height' : 'Enable Equal Height'} checked={'true' == isContentEqualHight ? true : false} onChange={cng => setAttributes({ isContentEqualHight: cng.toString() })} />
                                    </Fragment>}

                                    {'slider' == layout && <Fragment>
                                        {/* Content Height */}
                                        <Title>Slider Content Height:</Title>
                                        <RangeControl value={sliderContentHeight} onChange={cng => setAttributes({ sliderContentHeight: cng })} min={150} max={1000} step={1} />
                                    </Fragment>}
                                </PanelBody>


                                {/* Posts Query */}
                                <PanelBody title={__('Posts Query', 'advanced-post-block')} initialOpen={false}>
                                    {/* Post Type */}
                                    <Title mt="0">Post Type:</Title>
                                    <SelectControl value={postType} onChange={cng => setAttributes({ postType: cng })} options={bBlocksProAdmin.postTypes} />

                                    {/* Select Categories */}
                                    {categories && 0 !== categories.length ? <Fragment>
                                        <Title>Select Categories:</Title>
                                        {categories.map(cat => {
                                            const isInc = selectedCategories.includes(cat.id);

                                            return (
                                                <CheckboxControl label={cat.name} key={cat.id} checked={isInc} onChange={cng => setAttributes({ selectedCategories: cng ? [...selectedCategories, cat.id] : selectedCategories.filter(id => id !== cat.id) })} />
                                            );
                                        })}
                                    </Fragment> : null}

                                    {/* Posts Per Page */}
                                    <Title>Post Per Page:</Title>
                                    <ToggleControl label={'true' == isPostsPerPageAll ? 'Show Some Posts' : 'Show All Posts'} checked={'true' == isPostsPerPageAll ? true : false} onChange={cng => setAttributes({ isPostsPerPageAll: cng.toString() })} />

                                    {'false' == isPostsPerPageAll && <Fragment>
                                        <RangeControl value={postsPerPage} onChange={cng => setAttributes({ postsPerPage: 0 === cng ? 12 : cng })} min={1} max={36} step={1} />
                                    </Fragment>}

                                    {/* Posts Order By */}
                                    <Title>Post Order By:</Title>
                                    <SelectControl value={postsOrderBy} onChange={cng => setAttributes({ postsOrderBy: cng })} options={postsOrdersBy} />

                                    {/* Posts Order */}
                                    <Title>Post Order:</Title>
                                    <SelectControl value={postsOrder} onChange={cng => setAttributes({ postsOrder: cng })} options={postsOrders} />
                                </PanelBody>


                                {/* Elements Settings */}
                                <PanelBody title={__('Elements Settings', 'advanced-post-block')} initialOpen={false}>
                                    {/*Feature Image */}
                                    <Title mt="0">Feature Image:</Title>
                                    <ToggleControl label={'true' == isFImg ? 'Hide Feature Image' : 'Show Feature Image'} checked={'true' == isFImg ? true : false} onChange={cng => setAttributes({ isFImg: cng.toString() })} />

                                    {'true' == isFImg && <Fragment>
                                        <ToggleControl label={'true' == isFImgLink ? 'Disable Feature Image Link' : 'Enable Feature Image Link'} checked={'true' == isFImgLink ? true : false} onChange={cng => setAttributes({ isFImgLink: cng.toString() })} />
                                    </Fragment>}


                                    {/* Title */}
                                    <Title>Title:</Title>
                                    <ToggleControl label={'true' == isTitle ? 'Hide Title' : 'Show Title'} checked={'true' == isTitle ? true : false} onChange={cng => setAttributes({ isTitle: cng.toString() })} />

                                    {'true' == isTitle && <Fragment>
                                        <ToggleControl label={'true' == isTitleLink ? 'Disable Title Link' : 'Enable Title Link'} checked={'true' == isTitleLink ? true : false} onChange={cng => setAttributes({ isTitleLink: cng.toString() })} />
                                    </Fragment>}


                                    {/* Meta Data */}
                                    <Title>Meta Data:</Title>
                                    <ToggleControl label={'true' == isMeta ? 'Hide Meta Data' : 'Show Meta Data'} checked={'true' == isMeta ? true : false} onChange={cng => setAttributes({ isMeta: cng.toString() })} />

                                    {'true' == isMeta && <Fragment>
                                        <ToggleControl label={'true' == isMetaAuthor ? 'Hide Author' : 'Show Author'} checked={'true' == isMetaAuthor ? true : false} onChange={cng => setAttributes({ isMetaAuthor: cng.toString() })} />

                                        <ToggleControl label={'true' == isMetaDate ? 'Hide Date' : 'Show Date'} checked={'true' == isMetaDate ? true : false} onChange={cng => setAttributes({ isMetaDate: cng.toString() })} />

                                        <ToggleControl label={'true' == isMetaCategory ? 'Hide Category' : 'Show Category'} checked={'true' == isMetaCategory ? true : false} onChange={cng => setAttributes({ isMetaCategory: cng.toString() })} />

                                        {'true' == isMetaCategory && <Fragment>
                                            <label style={{ marginBottom: 0, fontSize: '13px' }}>Show Category In:</label>
                                            <RadioControl selected={metaCategoryIn} options={[
                                                { label: 'Content', value: 'content' },
                                                { label: 'Image', value: 'image' },
                                            ]} onChange={cng => setAttributes({ metaCategoryIn: cng })} />
                                            <span style={{ display: 'inline-block', marginBottom: '10px' }}></span>
                                        </Fragment>}

                                        <ToggleControl label={'true' == isMetaComment ? 'Hide Comment' : 'Show Comment'} checked={'true' == isMetaComment ? true : false} onChange={cng => setAttributes({ isMetaComment: cng.toString() })} />
                                    </Fragment>}


                                    {/* Excerpt */}
                                    <Title>Excerpt:</Title>
                                    <ToggleControl label={'true' == isExcerpt ? 'Hide Excerpt' : 'Show Excerpt'} checked={'true' == isExcerpt ? true : false} onChange={cng => setAttributes({ isExcerpt: cng.toString() })} />

                                    {'true' == isExcerpt && <Fragment>
                                        {/* Excerpt Length */}
                                        <small style={{ fontSize: '13px' }}>Excerpt Length:</small>
                                        <RangeControl value={excerptLength} onChange={cng => setAttributes({ excerptLength: cng })} min={0} max={100} step={1} />
                                    </Fragment>}


                                    {/* Read More */}
                                    <Title>Read More:</Title>
                                    <ToggleControl label={'true' == isReadMore ? 'Hide Read More' : 'Show Read More'} checked={'true' == isReadMore ? true : false} onChange={cng => setAttributes({ isReadMore: cng.toString() })} />

                                    {'true' == isReadMore && <Fragment>
                                        {/* Read More Label */}
                                        <small style={{ fontSize: '13px' }}>Read More Label:</small>
                                        <TextControl value={readMoreLabel} onChange={cng => setAttributes({ readMoreLabel: '' === cng ? 'Read More' : cng })} />

                                        {/* New Tab */}
                                        <ToggleControl label={'true' == isLinkNewTab ? 'Open in this tab' : 'Open in new tab'} checked={'true' == isLinkNewTab ? true : false} onChange={cng => setAttributes({ isLinkNewTab: cng.toString() })} />
                                    </Fragment>}
                                </PanelBody>


                                {/* Slider Settings */}
                                {'slider' == layout &&
                                    <PanelBody title={__('Slider Settings', 'advanced-post-block')} initialOpen={false}>
                                        {/* Loop */}
                                        <Title mt="0">Loop:</Title>
                                        <ToggleControl label={sliderIsLoop ? 'Disable Loop' : 'Enable Loop'} checked={sliderIsLoop} onChange={cng => setAttributes({ sliderIsLoop: cng })} />

                                        {/* Autoplay */}
                                        <Title mt="0">Autoplay:</Title>
                                        <ToggleControl label={sliderIsAutoplay ? 'Disable Autoplay' : 'Enable Autoplay'} checked={sliderIsAutoplay} onChange={cng => setAttributes({ sliderIsAutoplay: cng })} />

                                        {sliderIsAutoplay && <Fragment>
                                            {/* Speed */}
                                            <Title>Speed:</Title>
                                            <RangeControl value={sliderSpeed} onChange={cng => setAttributes({ sliderSpeed: cng })} min={0} max={10} step={.05} />
                                        </Fragment>}

                                        {/* Fade */}
                                        <Title>Fade:</Title>
                                        <ToggleControl label={sliderIsFade ? 'Disable Fade Effect' : 'Enable Fade Effect'} help={columns !== 1 ? 'To enable fade effect please set 1 column' : ''} checked={sliderIsFade} onChange={cng => setAttributes({ sliderIsFade: cng })} disabled={true} />

                                        {/* Draggable */}
                                        <Title>Draggable:</Title>
                                        <ToggleControl label={sliderIsTouchMove ? 'Disable Draggable' : 'Enable Draggable'} checked={sliderIsTouchMove} onChange={cng => setAttributes({ sliderIsTouchMove: cng })} />


                                        {/* Pagination */}
                                        <Title>Pagination:</Title>
                                        <ToggleControl label={sliderIsPage ? 'Hide Pagination' : 'Show Pagination'} checked={sliderIsPage} onChange={cng => setAttributes({ sliderIsPage: cng })} />

                                        {sliderIsPage && <Fragment>
                                            <ToggleControl label={sliderIsPageClickable ? 'Disable Pagination Clickable' : 'Enable Pagination Clickable'} checked={sliderIsPageClickable} onChange={cng => setAttributes({ sliderIsPageClickable: cng })} />

                                            <ToggleControl label={sliderIsPageDynamic ? 'Disable Pagination Dynamic Bullets' : 'Enable Pagination Dynamic Bullets'} checked={sliderIsPageDynamic} onChange={cng => setAttributes({ sliderIsPageDynamic: cng })} />

                                            <PanelRow className="mt-0">
                                                <Title mt="0" mb="0">Pagination Bullets Color:</Title>
                                                <BColor value={sliderPageColor} onChange={cng => setAttributes({ sliderPageColor: cng })} defaultColor="#8344c5" />
                                            </PanelRow>

                                            <Title mt="15px" mb="0">Width:</Title>
                                            <RangeControl value={sliderPageWidth} onChange={cng => setAttributes({ sliderPageWidth: cng })} min={0} max={200} step={1} />

                                            <Title mt="15px" mb="0">Height:</Title>
                                            <RangeControl value={sliderPageHeight} onChange={cng => setAttributes({ sliderPageHeight: cng })} min={0} max={100} step={1} />

                                            <PanelRow className="mt-15">
                                                <Title mt="0">Border Radius:</Title>
                                                <BtnGroup options={sizeTypes} myValue={sliderPageRadiusType} setState={(cng, def) => setAttributes({ sliderPageRadiusType: cng })} classes="b_blocks_size_type" size="small" />
                                            </PanelRow>
                                            <RangeControl value={sliderPageRadius} onChange={cng => setAttributes({ sliderPageRadius: cng })} min={0} max={50} step={1} />
                                        </Fragment>}


                                        {/* Preview Next Button */}
                                        <Title>Preview Next Button:</Title>
                                        <ToggleControl label={sliderIsPrevNext ? 'Hide Preview Next Button' : 'Show Preview Next Button'} checked={sliderIsPrevNext} onChange={cng => setAttributes({ sliderIsPrevNext: cng })} />

                                        <PanelRow className="mt-0">
                                            <Title mt="0" mb="0">Preview Next Button Color:</Title>
                                            <BColor value={sliderPrevNextColor} onChange={cng => setAttributes({ sliderPrevNextColor: cng })} defaultColor="#4527a4" />
                                        </PanelRow>
                                    </PanelBody>}
                            </Fragment>}

                            {'style' == tab.name && <Fragment>
                                {/* Content Settings */}
                                <PanelBody title={__('Content Settings', 'advanced-post-block')} initialOpen={true}>
                                    {/* Text Align */}
                                    <Title mt="0">Text Align:</Title>
                                    <BtnGroup options={aligns} myValue={contentAlign} setState={cng => setAttributes({ contentAlign: cng })} icon={true} />

                                    {/* Background Color */}
                                    <PanelRow className="mt-25">
                                        <Title mt="0" mb="0">Background Color:</Title>
                                        <BColor value={contentBGColor} onChange={cng => setAttributes({ contentBGColor: cng })} defaultColor="#f4f2fc" />
                                    </PanelRow>

                                    {/* Top Bottom Padding */}
                                    <Title>Top Bottom Padding:</Title>
                                    <RangeControl value={postTextPTB} onChange={cng => setAttributes({ postTextPTB: cng })} min={0} max={100} step={1} />

                                    {/* Left Right Padding */}
                                    <Title>Left Right Padding:</Title>
                                    <RangeControl value={postTextPLR} onChange={cng => setAttributes({ postTextPLR: cng })} min={0} max={150} step={1} />

                                    {/* Border Color */}
                                    <PanelRow className="mt-25">
                                        <Title mt="0" mb="0">Border Color:</Title>
                                        <BColor value={borderColor} onChange={cng => setAttributes({ borderColor: cng })} defaultColor="#4527a4" />
                                    </PanelRow>
                                </PanelBody>


                                {/* Feature Image Settings */}
                                {/* {'true' == isFImg && <Fragment>
                                    <PanelBody title={__('Feature Image Settings', 'advanced-post-block')} initialOpen={false}>
                                        
                                    </PanelBody>
                                </Fragment>} */}


                                {/* Title Settings */}
                                {'true' == isTitle && <Fragment>
                                    <PanelBody title={__('Title Settings', 'advanced-post-block')} initialOpen={false}>
                                        {/* Font Size */}
                                        <Title mt="0">Font Size:</Title>
                                        <FontSizePicker fontSizes={fontSizes} fallbackFontSize={20} value={titleFontSize} onChange={cng => setAttributes({ titleFontSize: 'undefined' === typeof cng ? 20 : cng })} />

                                        {/* Color */}
                                        <Title>Color:</Title>
                                        <ColorPalette value={titleColor} onChange={cng => setAttributes({ titleColor: cng })} colors={colors} />

                                        {/* Bottom Margin */}
                                        <Title>Bottom Margin:</Title>
                                        <RangeControl value={titleMB} onChange={cng => setAttributes({ titleMB: cng })} min={0} max={100} step={1} />
                                    </PanelBody>
                                </Fragment>}


                                {/* Meta Data Settings */}
                                {'true' == isMeta && <Fragment>
                                    <PanelBody title={__('Meta Data Settings', 'advanced-post-block')} initialOpen={false}>
                                        {/* Font Size */}
                                        <Title mt="0">Font Size:</Title>
                                        <FontSizePicker fontSizes={fontSizes} fallbackFontSize={13} value={metaFontSize} onChange={cng => setAttributes({ metaFontSize: 'undefined' === typeof cng ? 13 : cng })} />

                                        {/* Text Transform */}
                                        <Title>Text Transform:</Title>
                                        <BtnGroup options={textTransforms} myValue={metaTransform} setState={cng => setAttributes({ metaTransform: cng })} />

                                        {/* Text Color */}
                                        <Title>Text Color:</Title>
                                        <ColorPalette value={metaTextColor} onChange={cng => setAttributes({ metaTextColor: cng })} colors={colors} />

                                        {/* Link Color */}
                                        <Title>Link Color:</Title>
                                        <ColorPalette value={metaLinkColor} onChange={cng => setAttributes({ metaLinkColor: cng })} colors={colors} />

                                        {/* Icon Color */}
                                        <Title>Icon Color:</Title>
                                        <ColorPalette value={metaIconColor} onChange={cng => setAttributes({ metaIconColor: cng })} colors={colors} />

                                        {/* Bottom Margin */}
                                        <Title>Bottom Margin:</Title>
                                        <RangeControl value={metaMB} onChange={cng => setAttributes({ metaMB: cng })} min={0} max={100} step={1} />
                                    </PanelBody>
                                </Fragment>}


                                {/* Excerpt Settings */}
                                {'true' == isExcerpt && <Fragment>
                                    <PanelBody title={__('Excerpt Settings', 'advanced-post-block')} initialOpen={false}>
                                        {/* Text Align */}
                                        <Title mt="0">Text Align:</Title>
                                        <BtnGroup options={aligns} myValue={excerptAlign} setState={cng => setAttributes({ excerptAlign: cng })} icon={true} />

                                        {/* Color */}
                                        <Title>Color:</Title>
                                        <ColorPalette value={excerptColor} onChange={cng => setAttributes({ excerptColor: cng })} colors={colors} />

                                        {/* Bottom Margin */}
                                        <Title>Bottom Margin:</Title>
                                        <RangeControl value={excerptMB} onChange={cng => setAttributes({ excerptMB: cng })} min={0} max={100} step={1} />
                                    </PanelBody>
                                </Fragment>}


                                {/* Read More Settings */}
                                {'true' == isReadMore && <Fragment>
                                    <PanelBody title={__('Read More Settings', 'advanced-post-block')} initialOpen={false}>
                                        {/* Text Align */}
                                        <Title mt="0">Text Align:</Title>
                                        <BtnGroup options={aligns} myValue={readMoreAlign} setState={cng => setAttributes({ readMoreAlign: cng })} icon={true} />

                                        {/* Font Size */}
                                        <Title>Font Size:</Title>
                                        <FontSizePicker fontSizes={fontSizes} fallbackFontSize={14} value={readMoreFontSize} onChange={cng => setAttributes({ readMoreFontSize: 'undefined' === typeof cng ? 14 : cng })} />

                                        {/* Text Transform */}
                                        <Title>Text Transform:</Title>
                                        <BtnGroup options={textTransforms} myValue={readMoreTransform} setState={cng => setAttributes({ readMoreTransform: cng })} />

                                        {/* Font Weight */}
                                        <Title>Font Weight:</Title>
                                        <SelectControl value={readMoreFontWeight} onChange={cng => setAttributes({ readMoreFontWeight: cng })} options={fontWeights} />

                                        <Title>Colors:</Title>
                                        <TabPanel className="b_blocks_tab_panel" activeClass="active-tab"
                                            tabs={[{ name: 'normal', title: __('Normal', 'advanced-post-block'), className: 'normal-tab' }, { name: 'hover', title: __('Hover', 'advanced-post-block'), className: 'hover-tab', }]}>
                                            {tab => {
                                                return <Fragment>
                                                    {'normal' == tab.name && <Fragment>
                                                        {/* Color */}
                                                        <Title>Color:</Title>
                                                        <ColorPalette value={readMoreColor} onChange={cng => setAttributes({ readMoreColor: cng })} colors={colors} />
                                                    </Fragment>}

                                                    {'hover' == tab.name && <Fragment>
                                                        {/* Hover Color */}
                                                        <Title>Hover Color:</Title>
                                                        <ColorPalette value={readMoreHovColor} onChange={cng => setAttributes({ readMoreHovColor: cng })} colors={colors} />
                                                    </Fragment>}
                                                </Fragment>
                                            }}
                                        </TabPanel>
                                    </PanelBody>
                                </Fragment>}
                            </Fragment>}
                        </Fragment>
                    }}
                </TabPanel>
            </InspectorControls>,


            posts && 0 !== posts.length ? <div className="b_blocks_advanced_posts" style={{ overflow: 'hidden' }}>
                <BlockControls>
                    <AlignmentToolbar value={contentAlign} onChange={cng => setAttributes({ contentAlign: cng })} />
                </BlockControls>


                {useEffect(() => {
                    const currentSlider = document.querySelector(`#bBlocksSliderAdvancedPosts-${clientId}`);

                    const condition = currentSlider && currentBlock;

                    condition ? currentBlock.style.display = 'block' : 'initial';
                    align == 'full' && condition ? currentBlock.style.maxWidth = 'none' : '';
                    align == 'wide' && condition ? currentBlock.style.maxWidth = 'none' : '';
                    align == 'center' && condition ? currentBlock.style.maxWidth = '' : '';

                    condition && isEditorSidebarOpened ? currentBlock.style.display = 'grid' : '';

                    condition ? currentSlider.style.width = `${currentBlock.clientWidth}px` : '';

                    const swiper = 'slider' == layout && new Swiper(`#bBlocksSliderAdvancedPosts-${clientId}`, {
                        // Optional parameters
                        direction: 'horizontal',
                        slidesPerView: columns.mobile,
                        breakpoints: {
                            // when window width is >= 576px
                            576: {
                                slidesPerView: columns.tablet,
                            },
                            // when window width is >= 768px
                            768: {
                                slidesPerView: columns.desktop,
                            },
                        },
                        spaceBetween: columnGap,
                        loop: sliderIsLoop,
                        autoplay: sliderIsAutoplay,
                        speed: sliderSpeed,
                        effect: columns == 1 && sliderIsFade ? 'fade' : '',
                        fadeEffect: {
                            crossFade: true
                        },
                        allowTouchMove: sliderIsTouchMove,
                        allowSlideNext: true,
                        allowSlidePrev: true,
                        autoHeight: false,
                        notificationClass: null,

                        // Controllers
                        pagination: {
                            el: '.swiper-pagination',
                            clickable: sliderIsPageClickable,
                            dynamicBullets: sliderIsPageDynamic
                        },
                        navigation: {
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                        }
                    });


                    let seen = {};
                    $('.swiper-notification').each(function () {
                        let txt = $(this).attr('class');
                        if (seen[txt])
                            $(this).remove();
                        else
                            seen[txt] = true;
                    });
                }, ['slider' == layout, columns, columnGap, postTextPTB, postTextPLR, sliderContentHeight, contentBGColor, align, isEditorSidebarOpened, currentBlock, postType, sliderIsLoop, sliderIsAutoplay, sliderSpeed, sliderIsTouchMove, sliderIsPage, sliderIsPageClickable, sliderIsPageDynamic])}


                {'grid' == layout ? <div id={`bBlocksGridAdvancedPosts-${clientId}`} className="bBlocksGridPosts" style={gridPostsStyle}>
                    {posts.map(post => {
                        return (
                            'default' == subLayout || 'title-meta' == subLayout ? <Default atts={attributes} post={post} /> : 'left-image' == subLayout || 'right-image' == subLayout ? <SideImage atts={attributes} post={post} /> : 'overlay-content' == subLayout || 'overlay-content-hover' == subLayout || 'overlay-box' == subLayout ? <Overlay atts={attributes} post={post} /> : <p>Please, select a sub layout</p>
                        );
                    })} {/* Single Posts */}
                </div> /* Grid Layout */ :


                    'masonry' == layout ? <div id={`bBlocksMasonryAdvancedPosts-${clientId}`} className="bBlocksMasonryPosts" style={masonryPostsStyle}>
                        {posts.map(post => {
                            return (
                                'default' == subLayout || 'title-meta' == subLayout ? <Default atts={attributes} post={post} /> : 'left-image' == subLayout || 'right-image' == subLayout ? <SideImage atts={attributes} post={post} /> : 'overlay-content' == subLayout || 'overlay-content-hover' == subLayout || 'overlay-box' == subLayout ? <Overlay atts={attributes} post={post} /> : <p>Please, select a sub layout</p>
                            );
                        })} {/* Single Posts */}
                    </div> /* Masonry Layout */ :


                        'slider' == layout && <div id={`bBlocksSliderAdvancedPosts-${clientId}`} className="bBlocksSliderPosts" style={sliderPostsStyle}>
                            <div class="swiper-wrapper">
                                {posts.map(post => {
                                    return (
                                        'default' == subLayout || 'title-meta' == subLayout ? <Default atts={attributes} post={post} /> : 'left-image' == subLayout || 'right-image' == subLayout ? <SideImage atts={attributes} post={post} /> : 'overlay-content' == subLayout || 'overlay-content-hover' == subLayout || 'overlay-box' == subLayout ? <Overlay atts={attributes} post={post} /> : <p>Please, select a sub layout</p>
                                    );
                                })} {/* Single Posts */}
                            </div>

                            {sliderIsPage && <div class="swiper-pagination"></div>}

                            {sliderIsPrevNext && <Fragment>
                                <div class="swiper-button-prev"></div>
                                <div class="swiper-button-next"></div>
                            </Fragment>}
                        </div>/* Slider Layout */
                }

                <style dangerouslySetInnerHTML={{
                    __html: `
                        #bBlocksGridAdvancedPosts-${clientId}{
                            grid-template-columns: repeat(${columns.desktop}, 1fr);
                        }
                        #bBlocksMasonryAdvancedPosts-${clientId}{
                            columns: ${columns.desktop};
                        }

                        @media (max-width: 767px) { 
                            #bBlocksGridAdvancedPosts-${clientId}{
                                grid-template-columns: repeat(${columns.tablet}, 1fr);
                            }
                            #bBlocksMasonryAdvancedPosts-${clientId}{
                                columns: ${columns.tablet};
                            }
                        }
                        @media (max-width: 575px) { 
                            #bBlocksGridAdvancedPosts-${clientId}{
                                grid-template-columns: repeat(${columns.mobile}, 1fr);
                            }
                            #bBlocksMasonryAdvancedPosts-${clientId}{
                                columns: ${columns.mobile};
                            }
                        }

                        
                        #bBlocksSliderAdvancedPosts-${clientId} .swiper-pagination .swiper-pagination-bullet{
                            background: ${sliderPageColor};
                            width: ${sliderPageWidth}px;
                            height: ${sliderPageHeight}px;
                            border-radius: ${sliderPageRadius}${sliderPageRadiusType};
                        }
                        #bBlocksSliderAdvancedPosts-${clientId} .swiper-pagination .swiper-pagination-bullet:focus{
                            outline: 0;
                        }
                        
                        #bBlocksSliderAdvancedPosts-${clientId} .swiper-button-prev, .swiper-button-next{
                            color: ${sliderPrevNextColor};
                        }
                    `}} />
            </div> /* Advanced Post Block Posts */ : noPosts()
        ];
    }),

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