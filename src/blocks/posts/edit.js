import Swiper from 'swiper/bundle';
const $ = require('jquery');

import { __ } from '@wordpress/i18n';
import { withSelect } from '@wordpress/data';
import { useEffect, Fragment, useState } from '@wordpress/element';

import { InspectorControls, BlockControls, AlignmentToolbar, ColorPalette } from '@wordpress/block-editor';
import { PanelBody, SelectControl, RangeControl, FontSizePicker, CheckboxControl, TextControl, ToggleControl, TabPanel, Spinner, Button, ButtonGroup, Tooltip, RadioControl, PanelRow } from '@wordpress/components';

// Icon
import icons from '../../Const/icons';

// Variables
import BColor from '../../GutenComp/BColor';
import BtnGroup from '../../GutenComp/BtnGroup';
import Title from '../../GutenComp/Title';
import BDevice from '../../GutenComp/BDevice';
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
import Default from './Layout/Default';
import SideImage from './Layout/SideImage';
import Overlay from './Layout/Overlay';

const Edit = props => {
    const { attributes, setAttributes, clientId, posts, categories } = props;

    const { align, layout, subLayout, columns, columnGap, rowGap, isContentEqualHight, sliderContentHeight, postType, selectedCategories, isPostsPerPageAll, postsPerPage, postsOrderBy, postsOrder, contentAlign, contentBGColor, postTextPTB, postTextPLR, borderColor, sliderIsLoop, sliderIsAutoplay, sliderSpeed, sliderIsFade, sliderIsTouchMove, sliderIsPage, sliderIsPageClickable, sliderIsPageDynamic, sliderPageColor, sliderPageWidth, sliderPageHeight, sliderPageRadius, sliderPageRadiusType, sliderIsPrevNext, sliderPrevNextColor, isFImg, isFImgLink, isTitle, isTitleLink, titleFontSize, titleColor, titleMB, isMeta, isMetaAuthor, isMetaDate, isMetaCategory, metaCategoryIn, isMetaComment, metaFontSize, metaTransform, metaTextColor, metaLinkColor, metaIconColor, metaMB, isExcerpt, excerptLength, excerptAlign, excerptColor, excerptMB, isReadMore, readMoreLabel, isLinkNewTab, readMoreAlign, readMoreFontSize, readMoreTransform, readMoreFontWeight, readMoreColor, readMoreHovColor } = attributes;

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
            <TabPanel className='b_blocks_tab_panel' activeClass='active-tab'
                tabs={[{ name: 'layout', title: __('Layout', 'advanced-post-block'), className: 'layout-tab' }, { name: 'style', title: __('Style', 'advanced-post-block'), className: 'style-tab' }]}>
                {tab => {
                    return <Fragment>
                        {'layout' == tab.name && <Fragment>
                            {/* Layouts Settings */}
                            <PanelBody title={__('Layouts Settings', 'advanced-post-block')} initialOpen={true}>
                                {/* Layout Type */}
                                <Title mt='0'>{__('Layout Type:', 'advanced-post-block')}</Title>
                                <ButtonGroup className='b_blocks_button_groups'>
                                    <Tooltip text='Grid' position='top'>
                                        <Button icon={icons.grid} isMedium isPrimary={layout === 'grid'} aria-pressed={layout === 'grid'} onClick={() => setAttributes({ layout: 'grid' })}></Button>
                                    </Tooltip>

                                    <Tooltip text='Masonry' position='top'>
                                        <Button icon={icons.masonry} isMedium isPrimary={layout === 'masonry'} aria-pressed={layout === 'masonry'} onClick={() => setAttributes({ layout: 'masonry' })}></Button>
                                    </Tooltip>

                                    <Tooltip text='Slider' position='top'>
                                        <Button icon={icons.sliderNoColor} isMedium isPrimary={layout === 'slider'} aria-pressed={layout === 'slider'} onClick={() => setAttributes({ layout: 'slider', subLayout: 'left-image', columns: { ...columns, desktop: 2 } })}></Button>
                                    </Tooltip>
                                </ButtonGroup>

                                {/* Sub Layout */}
                                <Title>{__('Sub Layout:', 'advanced-post-block')}</Title>
                                <SelectControl value={subLayout} onChange={val => {
                                    setAttributes({ subLayout: val });
                                    'default' == val || 'title-meta' == val || 'left-image' == val || 'right-image' == val ? setAttributes({ contentBGColor: '#f4f2fc', titleColor: '#4527a4', metaCategoryIn: 'image', metaTextColor: '#333', metaLinkColor: '#8344c5', metaIconColor: '#4527a4', excerptColor: '#333', readMoreColor: '#4527a4', readMoreHovColor: '#8344c5' }) : 'overlay-content' == val || 'overlay-content-hover' == val || 'overlay-box' == val ? setAttributes({ contentBGColor: '#00000080', titleColor: '#e0d9f6', metaCategoryIn: 'content', metaTextColor: '#fff', metaLinkColor: '#e0d9f6', metaIconColor: '#e0d9f6', excerptColor: '#fff', readMoreColor: '#e0d9f6', readMoreHovColor: '#e0d9f6' }) : '';

                                    'left-image' == val || 'right-image' == val ? setAttributes({ columns: { ...columns, desktop: 2 } }) : setAttributes({ columns: { ...columns, desktop: 4 } });

                                    'overlay-box' == val ? setAttributes({ contentAlign: 'center' }) : setAttributes({ contentAlign: 'left' });
                                }} options={layout == 'slider' ? subLayouts.filter(l => l.value !== 'default' && l.value !== 'title-meta') : subLayouts} />

                                {/* Columns */}
                                <PanelRow className='mt-15'>
                                    <Title mt='0'>{__('Columns:', 'advanced-post-block')}</Title>
                                    <BDevice device={device} onChange={val => setDevice(val)} />
                                </PanelRow>
                                <RangeControl value={columns[device]} onChange={val => { setAttributes({ columns: { ...columns, [device]: val } }) }} min={1} max={6} step={1} />

                                {/* Column Gap */}
                                <Title>{__('Column Gap:', 'advanced-post-block')}</Title>
                                <RangeControl value={columnGap} onChange={val => setAttributes({ columnGap: val })} min={0} max={100} step={1} />

                                {/* Row Gap */}
                                <Title>{__('Row Gap:', 'advanced-post-block')}</Title>
                                <RangeControl value={rowGap} onChange={val => setAttributes({ rowGap: val })} min={0} max={150} step={1} />

                                {'grid' == layout && <Fragment>
                                    {/* Content Height */}
                                    <Title>{__('Content Height:', 'advanced-post-block')}</Title>
                                    <ToggleControl label={'true' == isContentEqualHight ? 'Disable Equal Height' : 'Enable Equal Height'} checked={'true' == isContentEqualHight ? true : false} onChange={val => setAttributes({ isContentEqualHight: val.toString() })} />
                                </Fragment>}

                                {'slider' == layout && <Fragment>
                                    {/* Content Height */}
                                    <Title>{__('Slider Content Height:', 'advanced-post-block')}</Title>
                                    <RangeControl value={sliderContentHeight} onChange={val => setAttributes({ sliderContentHeight: val })} min={150} max={1000} step={1} />
                                </Fragment>}
                            </PanelBody>


                            {/* Posts Query */}
                            <PanelBody title={__('Posts Query', 'advanced-post-block')} initialOpen={false}>
                                {/* Post Type */}
                                <Title mt='0'>{__('Post Type:', 'advanced-post-block')}</Title>
                                <SelectControl value={postType} onChange={val => setAttributes({ postType: val })} options={APBlockAdmin.postTypes} />

                                {/* Select Categories */}
                                {categories && 0 !== categories.length ? <Fragment>
                                    <Title>{__('Select Categories:', 'advanced-post-block')}</Title>
                                    {categories.map(cat => {
                                        const isInc = selectedCategories.includes(cat.id);

                                        return (
                                            <CheckboxControl label={cat.name} key={cat.id} checked={isInc} onChange={val => setAttributes({ selectedCategories: val ? [...selectedCategories, cat.id] : selectedCategories.filter(id => id !== cat.id) })} />
                                        );
                                    })}
                                </Fragment> : null}

                                {/* Posts Per Page */}
                                <Title>{__('Post Per Page:', 'advanced-post-block')}</Title>
                                <ToggleControl label={'true' == isPostsPerPageAll ? 'Show Some Posts' : 'Show All Posts'} checked={'true' == isPostsPerPageAll ? true : false} onChange={val => setAttributes({ isPostsPerPageAll: val.toString() })} />

                                {'false' == isPostsPerPageAll && <Fragment>
                                    <RangeControl value={postsPerPage} onChange={val => setAttributes({ postsPerPage: 0 === val ? 12 : val })} min={1} max={36} step={1} />
                                </Fragment>}

                                {/* Posts Order By */}
                                <Title>{__('Post Order By:', 'advanced-post-block')}</Title>
                                <SelectControl value={postsOrderBy} onChange={val => setAttributes({ postsOrderBy: val })} options={postsOrdersBy} />

                                {/* Posts Order */}
                                <Title>{__('Post Order:', 'advanced-post-block')}</Title>
                                <SelectControl value={postsOrder} onChange={val => setAttributes({ postsOrder: val })} options={postsOrders} />
                            </PanelBody>


                            {/* Elements Settings */}
                            <PanelBody title={__('Elements Settings', 'advanced-post-block')} initialOpen={false}>
                                {/*Feature Image */}
                                <Title mt='0'>{__('Feature Image:', 'advanced-post-block')}</Title>
                                <ToggleControl label={'true' == isFImg ? 'Hide Feature Image' : 'Show Feature Image'} checked={'true' == isFImg ? true : false} onChange={val => setAttributes({ isFImg: val.toString() })} />

                                {'true' == isFImg && <Fragment>
                                    <ToggleControl label={'true' == isFImgLink ? 'Disable Feature Image Link' : 'Enable Feature Image Link'} checked={'true' == isFImgLink ? true : false} onChange={val => setAttributes({ isFImgLink: val.toString() })} />
                                </Fragment>}


                                {/* Title */}
                                <Title>{__('Title:', 'advanced-post-block')}</Title>
                                <ToggleControl label={'true' == isTitle ? 'Hide Title' : 'Show Title'} checked={'true' == isTitle ? true : false} onChange={val => setAttributes({ isTitle: val.toString() })} />

                                {'true' == isTitle && <Fragment>
                                    <ToggleControl label={'true' == isTitleLink ? 'Disable Title Link' : 'Enable Title Link'} checked={'true' == isTitleLink ? true : false} onChange={val => setAttributes({ isTitleLink: val.toString() })} />
                                </Fragment>}


                                {/* Meta Data */}
                                <Title>{__('Meta Data:', 'advanced-post-block')}</Title>
                                <ToggleControl label={'true' == isMeta ? 'Hide Meta Data' : 'Show Meta Data'} checked={'true' == isMeta ? true : false} onChange={val => setAttributes({ isMeta: val.toString() })} />

                                {'true' == isMeta && <Fragment>
                                    <ToggleControl label={'true' == isMetaAuthor ? 'Hide Author' : 'Show Author'} checked={'true' == isMetaAuthor ? true : false} onChange={val => setAttributes({ isMetaAuthor: val.toString() })} />

                                    <ToggleControl label={'true' == isMetaDate ? 'Hide Date' : 'Show Date'} checked={'true' == isMetaDate ? true : false} onChange={val => setAttributes({ isMetaDate: val.toString() })} />

                                    <ToggleControl label={'true' == isMetaCategory ? 'Hide Category' : 'Show Category'} checked={'true' == isMetaCategory ? true : false} onChange={val => setAttributes({ isMetaCategory: val.toString() })} />

                                    {'true' == isMetaCategory && <Fragment>
                                        <label style={{ marginBottom: 0, fontSize: '13px' }}>Show Category In:</label>
                                        <RadioControl selected={metaCategoryIn} options={[
                                            { label: 'Content', value: 'content' },
                                            { label: 'Image', value: 'image' },
                                        ]} onChange={val => setAttributes({ metaCategoryIn: val })} />
                                        <span style={{ display: 'inline-block', marginBottom: '10px' }}></span>
                                    </Fragment>}

                                    <ToggleControl label={'true' == isMetaComment ? 'Hide Comment' : 'Show Comment'} checked={'true' == isMetaComment ? true : false} onChange={val => setAttributes({ isMetaComment: val.toString() })} />
                                </Fragment>}


                                {/* Excerpt */}
                                <Title>{__('Excerpt:', 'advanced-post-block')}</Title>
                                <ToggleControl label={'true' == isExcerpt ? 'Hide Excerpt' : 'Show Excerpt'} checked={'true' == isExcerpt ? true : false} onChange={val => setAttributes({ isExcerpt: val.toString() })} />

                                {'true' == isExcerpt && <Fragment>
                                    {/* Excerpt Length */}
                                    <small style={{ fontSize: '13px' }}>Excerpt Length:</small>
                                    <RangeControl value={excerptLength} onChange={val => setAttributes({ excerptLength: val })} min={0} max={100} step={1} />
                                </Fragment>}


                                {/* Read More */}
                                <Title>{__('Read More:', 'advanced-post-block')}</Title>
                                <ToggleControl label={'true' == isReadMore ? 'Hide Read More' : 'Show Read More'} checked={'true' == isReadMore ? true : false} onChange={val => setAttributes({ isReadMore: val.toString() })} />

                                {'true' == isReadMore && <Fragment>
                                    {/* Read More Label */}
                                    <small style={{ fontSize: '13px' }}>Read More Label:</small>
                                    <TextControl value={readMoreLabel} onChange={val => setAttributes({ readMoreLabel: '' === val ? 'Read More' : val })} />

                                    {/* New Tab */}
                                    <ToggleControl label={'true' == isLinkNewTab ? 'Open in this tab' : 'Open in new tab'} checked={'true' == isLinkNewTab ? true : false} onChange={val => setAttributes({ isLinkNewTab: val.toString() })} />
                                </Fragment>}
                            </PanelBody>


                            {/* Slider Settings */}
                            {'slider' == layout &&
                                <PanelBody title={__('Slider Settings', 'advanced-post-block')} initialOpen={false}>
                                    {/* Loop */}
                                    <Title mt='0'>{__('Loop:', 'advanced-post-block')}</Title>
                                    <ToggleControl label={sliderIsLoop ? 'Disable Loop' : 'Enable Loop'} checked={sliderIsLoop} onChange={val => setAttributes({ sliderIsLoop: val })} />

                                    {/* Autoplay */}
                                    <Title mt='0'>{__('Autoplay:', 'advanced-post-block')}</Title>
                                    <ToggleControl label={sliderIsAutoplay ? 'Disable Autoplay' : 'Enable Autoplay'} checked={sliderIsAutoplay} onChange={val => setAttributes({ sliderIsAutoplay: val })} />

                                    {sliderIsAutoplay && <Fragment>
                                        {/* Speed */}
                                        <Title>{__('Speed:', 'advanced-post-block')}</Title>
                                        <RangeControl value={sliderSpeed} onChange={val => setAttributes({ sliderSpeed: val })} min={0} max={10} step={.05} />
                                    </Fragment>}

                                    {/* Fade */}
                                    <Title>{__('Fade:', 'advanced-post-block')}</Title>
                                    <ToggleControl label={sliderIsFade ? 'Disable Fade Effect' : 'Enable Fade Effect'} help={columns !== 1 ? 'To enable fade effect please set 1 column' : ''} checked={sliderIsFade} onChange={val => setAttributes({ sliderIsFade: val })} disabled={true} />

                                    {/* Draggable */}
                                    <Title>{__('Draggable:', 'advanced-post-block')}</Title>
                                    <ToggleControl label={sliderIsTouchMove ? 'Disable Draggable' : 'Enable Draggable'} checked={sliderIsTouchMove} onChange={val => setAttributes({ sliderIsTouchMove: val })} />


                                    {/* Pagination */}
                                    <Title>{__('Pagination:', 'advanced-post-block')}</Title>
                                    <ToggleControl label={sliderIsPage ? 'Hide Pagination' : 'Show Pagination'} checked={sliderIsPage} onChange={val => setAttributes({ sliderIsPage: val })} />

                                    {sliderIsPage && <Fragment>
                                        <ToggleControl label={sliderIsPageClickable ? 'Disable Pagination Clickable' : 'Enable Pagination Clickable'} checked={sliderIsPageClickable} onChange={val => setAttributes({ sliderIsPageClickable: val })} />

                                        <ToggleControl label={sliderIsPageDynamic ? 'Disable Pagination Dynamic Bullets' : 'Enable Pagination Dynamic Bullets'} checked={sliderIsPageDynamic} onChange={val => setAttributes({ sliderIsPageDynamic: val })} />

                                        <PanelRow className='mt-0'>
                                            <Title mt='0' mb='0'>{__('Pagination Bullets Color:', 'advanced-post-block')}</Title>
                                            <BColor value={sliderPageColor} onChange={val => setAttributes({ sliderPageColor: val })} defaultColor='#8344c5' />
                                        </PanelRow>

                                        <Title mt='15px' mb='0'>{__('Width:', 'advanced-post-block')}</Title>
                                        <RangeControl value={sliderPageWidth} onChange={val => setAttributes({ sliderPageWidth: val })} min={0} max={200} step={1} />

                                        <Title mt='15px' mb='0'>{__('Height:', 'advanced-post-block')}</Title>
                                        <RangeControl value={sliderPageHeight} onChange={val => setAttributes({ sliderPageHeight: val })} min={0} max={100} step={1} />

                                        <PanelRow className='mt-15'>
                                            <Title mt='0'>{__('Border Radius:', 'advanced-post-block')}</Title>
                                            <BtnGroup options={sizeTypes} myValue={sliderPageRadiusType} setState={val => setAttributes({ sliderPageRadiusType: val })} classes='b_blocks_size_type' size='small' />
                                        </PanelRow>
                                        <RangeControl value={sliderPageRadius} onChange={val => setAttributes({ sliderPageRadius: val })} min={0} max={50} step={1} />
                                    </Fragment>}


                                    {/* Preview Next Button */}
                                    <Title>{__('Preview Next Button:', 'advanced-post-block')}</Title>
                                    <ToggleControl label={sliderIsPrevNext ? 'Hide Preview Next Button' : 'Show Preview Next Button'} checked={sliderIsPrevNext} onChange={val => setAttributes({ sliderIsPrevNext: val })} />

                                    <PanelRow className='mt-0'>
                                        <Title mt='0' mb='0'>{__('Preview Next Button Color:', 'advanced-post-block')}</Title>
                                        <BColor value={sliderPrevNextColor} onChange={val => setAttributes({ sliderPrevNextColor: val })} defaultColor='#4527a4' />
                                    </PanelRow>
                                </PanelBody>}
                        </Fragment>}

                        {'style' == tab.name && <Fragment>
                            {/* Content Settings */}
                            <PanelBody title={__('Content Settings', 'advanced-post-block')} initialOpen={true}>
                                {/* Text Align */}
                                <Title mt='0'>{__('Text Align:', 'advanced-post-block')}</Title>
                                <BtnGroup options={aligns} myValue={contentAlign} setState={val => setAttributes({ contentAlign: val })} icon={true} />

                                {/* Background Color */}
                                <PanelRow className='mt-25'>
                                    <Title mt='0' mb='0'>{__('Background Color:', 'advanced-post-block')}</Title>
                                    <BColor value={contentBGColor} onChange={val => setAttributes({ contentBGColor: val })} defaultColor='#f4f2fc' />
                                </PanelRow>

                                {/* Top Bottom Padding */}
                                <Title>{__('Top Bottom Padding:', 'advanced-post-block')}</Title>
                                <RangeControl value={postTextPTB} onChange={val => setAttributes({ postTextPTB: val })} min={0} max={100} step={1} />

                                {/* Left Right Padding */}
                                <Title>{__('Left Right Padding:', 'advanced-post-block')}</Title>
                                <RangeControl value={postTextPLR} onChange={val => setAttributes({ postTextPLR: val })} min={0} max={150} step={1} />

                                {/* Border Color */}
                                <PanelRow className='mt-25'>
                                    <Title mt='0' mb='0'>{__('Border Color:', 'advanced-post-block')}</Title>
                                    <BColor value={borderColor} onChange={val => setAttributes({ borderColor: val })} defaultColor='#4527a4' />
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
                                    <Title mt='0'>{__('Font Size:', 'advanced-post-block')}</Title>
                                    <FontSizePicker fontSizes={fontSizes} fallbackFontSize={20} value={titleFontSize} onChange={val => setAttributes({ titleFontSize: 'undefined' === typeof val ? 20 : val })} />

                                    {/* Color */}
                                    <Title>{__('Color:', 'advanced-post-block')}</Title>
                                    <ColorPalette value={titleColor} onChange={val => setAttributes({ titleColor: val })} colors={colors} />

                                    {/* Bottom Margin */}
                                    <Title>{__('Bottom Margin:', 'advanced-post-block')}</Title>
                                    <RangeControl value={titleMB} onChange={val => setAttributes({ titleMB: val })} min={0} max={100} step={1} />
                                </PanelBody>
                            </Fragment>}


                            {/* Meta Data Settings */}
                            {'true' == isMeta && <Fragment>
                                <PanelBody title={__('Meta Data Settings', 'advanced-post-block')} initialOpen={false}>
                                    {/* Font Size */}
                                    <Title mt='0'>{__('Font Size:', 'advanced-post-block')}</Title>
                                    <FontSizePicker fontSizes={fontSizes} fallbackFontSize={13} value={metaFontSize} onChange={val => setAttributes({ metaFontSize: 'undefined' === typeof val ? 13 : val })} />

                                    {/* Text Transform */}
                                    <Title>{__('Text Transform:', 'advanced-post-block')}</Title>
                                    <BtnGroup options={textTransforms} myValue={metaTransform} setState={val => setAttributes({ metaTransform: val })} />

                                    {/* Text Color */}
                                    <Title>{__('Text Color:', 'advanced-post-block')}</Title>
                                    <ColorPalette value={metaTextColor} onChange={val => setAttributes({ metaTextColor: val })} colors={colors} />

                                    {/* Link Color */}
                                    <Title>{__('Link Color:', 'advanced-post-block')}</Title>
                                    <ColorPalette value={metaLinkColor} onChange={val => setAttributes({ metaLinkColor: val })} colors={colors} />

                                    {/* Icon Color */}
                                    <Title>{__('Icon Color:', 'advanced-post-block')}</Title>
                                    <ColorPalette value={metaIconColor} onChange={val => setAttributes({ metaIconColor: val })} colors={colors} />

                                    {/* Bottom Margin */}
                                    <Title>{__('Bottom Margin:', 'advanced-post-block')}</Title>
                                    <RangeControl value={metaMB} onChange={val => setAttributes({ metaMB: val })} min={0} max={100} step={1} />
                                </PanelBody>
                            </Fragment>}


                            {/* Excerpt Settings */}
                            {'true' == isExcerpt && <Fragment>
                                <PanelBody title={__('Excerpt Settings', 'advanced-post-block')} initialOpen={false}>
                                    {/* Text Align */}
                                    <Title mt='0'>{__('Text Align:', 'advanced-post-block')}</Title>
                                    <BtnGroup options={aligns} myValue={excerptAlign} setState={val => setAttributes({ excerptAlign: val })} icon={true} />

                                    {/* Color */}
                                    <Title>{__('Color:', 'advanced-post-block')}</Title>
                                    <ColorPalette value={excerptColor} onChange={val => setAttributes({ excerptColor: val })} colors={colors} />

                                    {/* Bottom Margin */}
                                    <Title>{__('Bottom Margin:', 'advanced-post-block')}</Title>
                                    <RangeControl value={excerptMB} onChange={val => setAttributes({ excerptMB: val })} min={0} max={100} step={1} />
                                </PanelBody>
                            </Fragment>}


                            {/* Read More Settings */}
                            {'true' == isReadMore && <Fragment>
                                <PanelBody title={__('Read More Settings', 'advanced-post-block')} initialOpen={false}>
                                    {/* Text Align */}
                                    <Title mt='0'>{__('Text Align:', 'advanced-post-block')}</Title>
                                    <BtnGroup options={aligns} myValue={readMoreAlign} setState={val => setAttributes({ readMoreAlign: val })} icon={true} />

                                    {/* Font Size */}
                                    <Title>{__('Font Size:', 'advanced-post-block')}</Title>
                                    <FontSizePicker fontSizes={fontSizes} fallbackFontSize={14} value={readMoreFontSize} onChange={val => setAttributes({ readMoreFontSize: 'undefined' === typeof val ? 14 : val })} />

                                    {/* Text Transform */}
                                    <Title>{__('Text Transform:', 'advanced-post-block')}</Title>
                                    <BtnGroup options={textTransforms} myValue={readMoreTransform} setState={val => setAttributes({ readMoreTransform: val })} />

                                    {/* Font Weight */}
                                    <Title>{__('Font Weight:', 'advanced-post-block')}</Title>
                                    <SelectControl value={readMoreFontWeight} onChange={val => setAttributes({ readMoreFontWeight: val })} options={fontWeights} />

                                    <Title>{__('Colors:', 'advanced-post-block')}</Title>
                                    <TabPanel className='b_blocks_tab_panel' activeClass='active-tab'
                                        tabs={[{ name: 'normal', title: __('Normal', 'advanced-post-block'), className: 'normal-tab' }, { name: 'hover', title: __('Hover', 'advanced-post-block'), className: 'hover-tab', }]}>
                                        {tab => {
                                            return <Fragment>
                                                {'normal' == tab.name && <Fragment>
                                                    {/* Color */}
                                                    <Title>{__('Color:', 'advanced-post-block')}</Title>
                                                    <ColorPalette value={readMoreColor} onChange={val => setAttributes({ readMoreColor: val })} colors={colors} />
                                                </Fragment>}

                                                {'hover' == tab.name && <Fragment>
                                                    {/* Hover Color */}
                                                    <Title>{__('Hover Color:', 'advanced-post-block')}</Title>
                                                    <ColorPalette value={readMoreHovColor} onChange={val => setAttributes({ readMoreHovColor: val })} colors={colors} />
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


        posts && 0 !== posts.length ? <div className='b_blocks_advanced_posts' style={{ overflow: 'hidden' }}>
            <BlockControls>
                <AlignmentToolbar value={contentAlign} onChange={val => setAttributes({ contentAlign: val })} />
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

                'slider' == layout && new Swiper(`#bBlocksSliderAdvancedPosts-${clientId}`, {
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


            {'grid' == layout ? <div id={`bBlocksGridAdvancedPosts-${clientId}`} className='bBlocksGridPosts' style={gridPostsStyle}>
                {posts.map(post => {
                    return (
                        'default' == subLayout || 'title-meta' == subLayout ? <Default atts={attributes} post={post} /> : 'left-image' == subLayout || 'right-image' == subLayout ? <SideImage atts={attributes} post={post} /> : 'overlay-content' == subLayout || 'overlay-content-hover' == subLayout || 'overlay-box' == subLayout ? <Overlay atts={attributes} post={post} /> : <p>Please, select a sub layout</p>
                    );
                })} {/* Single Posts */}
            </div> /* Grid Layout */ :


                'masonry' == layout ? <div id={`bBlocksMasonryAdvancedPosts-${clientId}`} className='bBlocksMasonryPosts' style={masonryPostsStyle}>
                    {posts.map(post => {
                        return (
                            'default' == subLayout || 'title-meta' == subLayout ? <Default atts={attributes} post={post} /> : 'left-image' == subLayout || 'right-image' == subLayout ? <SideImage atts={attributes} post={post} /> : 'overlay-content' == subLayout || 'overlay-content-hover' == subLayout || 'overlay-box' == subLayout ? <Overlay atts={attributes} post={post} /> : <p>Please, select a sub layout</p>
                        );
                    })} {/* Single Posts */}
                </div> /* Masonry Layout */ :


                    'slider' == layout && <div id={`bBlocksSliderAdvancedPosts-${clientId}`} className='bBlocksSliderPosts' style={sliderPostsStyle}>
                        <div className='swiper-wrapper'>
                            {posts.map(post => {
                                return (
                                    'default' == subLayout || 'title-meta' == subLayout ? <Default atts={attributes} post={post} /> : 'left-image' == subLayout || 'right-image' == subLayout ? <SideImage atts={attributes} post={post} /> : 'overlay-content' == subLayout || 'overlay-content-hover' == subLayout || 'overlay-box' == subLayout ? <Overlay atts={attributes} post={post} /> : <p>Please, select a sub layout</p>
                                );
                            })} {/* Single Posts */}
                        </div>

                        {sliderIsPage && <div className='swiper-pagination'></div>}

                        {sliderIsPrevNext && <Fragment>
                            <div className='swiper-button-prev'></div>
                            <div className='swiper-button-next'></div>
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
}
export default withSelect((select, props) => {
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
})(Edit);