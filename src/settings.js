import { __ } from '@wordpress/i18n';
import { useEffect, useState } from '@wordpress/element';
import { InspectorControls, BlockControls, AlignmentToolbar } from '@wordpress/block-editor';
import { PanelBody, SelectControl, RangeControl, CheckboxControl, TextControl, ToggleControl, TabPanel, RadioControl, PanelRow, __experimentalUnitControl as UnitControl } from '@wordpress/components';

// Variables
import BDevice from '../../Components/BDevice';
import Background from '../../Components/Background';
import Title from '../../Components/Title';
import BColor from '../../Components/BColor';
import BorderControl from '../../Components/BorderControl';
import SpaceControl from '../../Components/SpaceControl';
import ColorsControl from '../../Components/ColorsControl';
import Typography from '../../Components/Typography';
import BtnGroup from '../../Components/BtnGroup';
import options from './Const/options';
const { generalStyleTabs, layouts, subLayouts, categoriesPosition, effects, aligns, postsOrdersBy, postsOrders, pxUnit, emUnit, vhUnit } = options;

const Settings = ({ settings, getPostTypes, categories }) => {
    const { attributes: { layout, subLayout, columns, columnGap, rowGap, isContentEqualHight, sliderHeight, postType, selectedCategories, isPostsPerPageAll, postsPerPage, postsOrderBy, postsOrder, contentAlign, contentBG, contentPadding, border, sliderIsLoop, sliderIsTouchMove, sliderIsAutoplay, sliderSpeed, sliderEffect, sliderIsPage, sliderIsPageClickable, sliderIsPageDynamic, sliderPageColor, sliderPageWidth, sliderPageHeight, sliderPageBorder, sliderIsPrevNext, sliderPrevNextColor, isFImg, isFImgLink, isTitle, isTitleLink, titleTypo, titleColor, titleMargin, isMeta, isMetaAuthor, isMetaDate, isMetaCategory, metaCategoryIn, isMetaComment, metaTypo, metaTextColor, metaLinkColor, metaIconColor, metaMargin, isExcerpt, excerptLength, excerptAlign, excerptTypo, excerptColor, excerptMargin, isReadMore, readMoreLabel, isLinkNewTab, readMoreAlign, readMoreTypo, readMoreColors, readMoreHovColors, readMorePadding, readMoreBorder }, setAttributes, posts } = settings;

    const [device, setDevice] = useState('desktop');

    useEffect(() => {
        if ('slider' === layout && ('default' === subLayout || 'title-meta' === subLayout))
            setAttributes({ subLayout: 'left-image', columns: { ...columns, desktop: 2 } })
    }, [layout]);

    return <>
        <InspectorControls>
            <TabPanel className='bPlTabPanel' activeClass='activeTab' tabs={generalStyleTabs}>{tab => <>
                {'general' === tab.name && <>
                    {/* Layouts Settings */}
                    {posts && 0 !== posts.length && <PanelBody className='bPlPanelBody' title={__('Layouts Settings', 'advanced-post-block')} initialOpen={true}>
                        {/* Layout Type */}
                        <PanelRow>
                            <Title mt='0' mb='0'>{__('Layout Type:', 'advanced-post-block')}</Title>
                            <BtnGroup options={layouts} myValue={layout} setState={val => setAttributes({ layout: val })} icon={true} />
                        </PanelRow>

                        {/* Sub Layout */}
                        <PanelRow className='mt-20p'>
                            <Title mt='0' mb='0'>{__('Sub Layout:', 'advanced-post-block')}</Title>
                            <SelectControl value={subLayout} onChange={val => {
                                setAttributes({ subLayout: val });
                                'default' === val || 'title-meta' === val || 'left-image' === val || 'right-image' === val ? setAttributes({
                                    contentBG: { color: '#f4f2fc', styles: `background-color: #f4f2fc;` },
                                    titleColor: '#fe6601',
                                    metaCategoryIn: 'image',
                                    metaTextColor: '#333',
                                    metaLinkColor: '#fe6601',
                                    metaIconColor: '#fe6601',
                                    excerptColor: '#333',
                                }) : 'overlay-content' === val || 'overlay-content-hover' === val || 'overlay-box' === val ? setAttributes({
                                    contentBG: { color: '#000000b3', styles: `background-color: #000000b3;` },
                                    titleColor: '#fed8bf',
                                    metaCategoryIn: 'content',
                                    metaTextColor: '#fff',
                                    metaLinkColor: '#fed8bf',
                                    metaIconColor: '#fed8bf',
                                    excerptColor: '#fff',
                                }) : '';

                                'left-image' === val || 'right-image' === val ? setAttributes({
                                    columns: { ...columns, desktop: 2 }
                                }) : setAttributes({
                                    columns: { ...columns, desktop: 3 }
                                });

                                'overlay-box' === val ? setAttributes({
                                    contentAlign: 'center'
                                }) : setAttributes({
                                    contentAlign: 'left'
                                });
                            }} options={layout === 'slider' ? subLayouts.filter(l => l.value !== 'default' && l.value !== 'title-meta') : subLayouts} />
                        </PanelRow>
                        <small>{__('Some settings may change when sub layout will be changed.', 'advanced-post-block')}</small>

                        {/* Columns */}
                        <PanelRow className='mt-20p'>
                            <Title mt='0'>{__('Columns:', 'advanced-post-block')}</Title>
                            <BDevice device={device} onChange={val => setDevice(val)} />
                        </PanelRow>
                        <RangeControl value={columns[device]} onChange={val => { setAttributes({ columns: { ...columns, [device]: val } }) }} min={1} max={6} step={1} beforeIcon='grid-view' />

                        {/* Column Gap */}
                        <Title>{__('Column Gap:', 'advanced-post-block')}</Title>
                        <RangeControl value={columnGap} onChange={val => setAttributes({ columnGap: val })} min={0} max={100} step={1} beforeIcon='arrow-right-alt' />

                        {/* Row Gap */}
                        <Title>{__('Row Gap:', 'advanced-post-block')}</Title>
                        <RangeControl value={rowGap} onChange={val => setAttributes({ rowGap: val })} min={0} max={150} step={1} beforeIcon='arrow-down-alt' />

                        {/* Content Height */}
                        {'grid' === layout && <><Title mt='10px'></Title><ToggleControl label={__('Enable Content Equal Height', 'advanced-post-block')} checked={isContentEqualHight} onChange={val => setAttributes({ isContentEqualHight: val })} /></>}

                        {'slider' === layout && <UnitControl className='mt-20p' label={__('Slider Min Height:', 'advanced-post-block')} labelPosition='left' value={sliderHeight} onChange={val => setAttributes({ sliderHeight: val })} units={[pxUnit, emUnit, vhUnit]} />}
                    </PanelBody>}


                    {/* Posts Query */}
                    <PanelBody className='bPlPanelBody' title={__('Posts Query', 'advanced-post-block')} initialOpen={posts && 0 !== posts.length ? false : true}>
                        {/* Post Type */}
                        <PanelRow>
                            <Title mt='0' mb='0'>{__('Post Type:', 'advanced-post-block')}</Title>
                            <SelectControl value={postType} onChange={val => setAttributes({ postType: val })} options={getPostTypes} />
                        </PanelRow>

                        {/* Select Categories */}
                        {'post' === postType && categories && 0 !== categories.length ? <>
                            <Title>{__('Select Categories:', 'advanced-post-block')}</Title>
                            {categories.map(cat => {
                                const isInc = selectedCategories.includes(cat.id);

                                return <CheckboxControl label={cat.name} key={cat.id} checked={isInc} onChange={val => setAttributes({ selectedCategories: val ? [...selectedCategories, cat.id] : selectedCategories.filter(id => id !== cat.id) })} />;
                            })}
                        </> : null}

                        {/* Posts Per Page */}
                        <Title>{__('Post Per Page:', 'advanced-post-block')}</Title>
                        <ToggleControl label={__('Show All Posts', 'advanced-post-block')} checked={isPostsPerPageAll} onChange={val => setAttributes({ isPostsPerPageAll: val })} />

                        {false === isPostsPerPageAll && <RangeControl value={postsPerPage} onChange={val => setAttributes({ postsPerPage: val })} min={1} max={36} step={1} />}

                        {/* Posts Order By */}
                        <PanelRow>
                            <Title mt='0' mb='0'>{__('Post Order By:', 'advanced-post-block')}</Title>
                            <SelectControl value={postsOrderBy} onChange={val => setAttributes({ postsOrderBy: val })} options={postsOrdersBy} />
                        </PanelRow>

                        {/* Posts Order */}
                        <PanelRow>
                            <Title mt='0' mb='0'>{__('Post Order:', 'advanced-post-block')}</Title>
                            <SelectControl value={postsOrder} onChange={val => setAttributes({ postsOrder: val })} options={postsOrders} />
                        </PanelRow>
                    </PanelBody>


                    {/* Elements Settings */}
                    {posts && 0 !== posts.length && <PanelBody className='bPlPanelBody' title={__('Elements Settings', 'advanced-post-block')} initialOpen={false}>
                        {/*Feature Image */}
                        <Title mt='0'>{__('Feature Image:', 'advanced-post-block')}</Title>
                        <ToggleControl label={__('Show Feature Image', 'advanced-post-block')} checked={isFImg} onChange={val => setAttributes({ isFImg: val })} />

                        {isFImg && <ToggleControl label={__('Enable Feature Image Link', 'advanced-post-block')} checked={isFImgLink} onChange={val => setAttributes({ isFImgLink: val })} />}


                        {/* Title */}
                        <Title>{__('Title:', 'advanced-post-block')}</Title>
                        <ToggleControl label={__('Show Title', 'advanced-post-block')} checked={isTitle} onChange={val => setAttributes({ isTitle: val })} />

                        {isTitle && <ToggleControl label={__('Enable Title Link', 'advanced-post-block')} checked={isTitleLink} onChange={val => setAttributes({ isTitleLink: val })} />}


                        {/* Meta Data */}
                        <Title>{__('Meta Data:', 'advanced-post-block')}</Title>
                        <ToggleControl label={__('Show Meta Data', 'advanced-post-block')} checked={isMeta} onChange={val => setAttributes({ isMeta: val })} />

                        {isMeta && <>
                            <ToggleControl label={__('Show Author', 'advanced-post-block')} checked={isMetaAuthor} onChange={val => setAttributes({ isMetaAuthor: val })} />

                            <ToggleControl label={__('Show Date', 'advanced-post-block')} checked={isMetaDate} onChange={val => setAttributes({ isMetaDate: val })} />

                            <ToggleControl label={__('Show Category', 'advanced-post-block')} checked={isMetaCategory} onChange={val => setAttributes({ isMetaCategory: val })} />

                            {isMetaCategory && <PanelRow>
                                <Title mt='0' mb='0'>{__('Category In:', 'advanced-post-block')}</Title>
                                <RadioControl selected={metaCategoryIn} onChange={val => setAttributes({ metaCategoryIn: val })} options={categoriesPosition} />
                                <Title mt='10px'></Title>
                            </PanelRow>}

                            <ToggleControl label={__('Show Comment', 'advanced-post-block')} checked={isMetaComment} onChange={val => setAttributes({ isMetaComment: val })} />
                        </>}


                        {/* Excerpt */}
                        <Title>{__('Excerpt:', 'advanced-post-block')}</Title>
                        <ToggleControl label={__('Show Excerpt', 'advanced-post-block')} checked={isExcerpt} onChange={val => setAttributes({ isExcerpt: val })} />

                        {isExcerpt && <>
                            {/* Excerpt Length */}
                            <Title mt='0' mb='0'>{__('Excerpt Length:', 'advanced-post-block')}</Title>
                            <RangeControl value={excerptLength} onChange={val => setAttributes({ excerptLength: val })} min={0} max={100} step={1} />
                        </>}


                        {/* Read More */}
                        <Title>{__('Read More:', 'advanced-post-block')}</Title>
                        <ToggleControl label={__('Show Read More', 'advanced-post-block')} checked={isReadMore} onChange={val => setAttributes({ isReadMore: val })} />

                        {isReadMore && <>
                            {/* Read More Label */}
                            <Title mt='0' mb='0'>{__('Read More Label:', 'advanced-post-block')}</Title>
                            <TextControl value={readMoreLabel} onChange={val => setAttributes({ readMoreLabel: '' === val ? 'Read More' : val })} />

                            {/* New Tab */}
                            <ToggleControl label={__('Open link in new tab', 'advanced-post-block')} checked={isLinkNewTab} onChange={val => setAttributes({ isLinkNewTab: val })} />
                        </>}
                    </PanelBody>}


                    {/* Slider Settings */}
                    {posts && 0 !== posts.length && 'slider' === layout && <PanelBody className='bPlPanelBody' title={__('Slider Options', 'advanced-post-block')} initialOpen={false}>
                        {/* Loop */}
                        <ToggleControl label={__('Enable Loop', 'advanced-post-block')} checked={sliderIsLoop} onChange={val => setAttributes({ sliderIsLoop: val })} />

                        {/* Touch Move */}
                        <ToggleControl label={__('Enable Touch Move', 'advanced-post-block')} checked={sliderIsTouchMove} onChange={val => setAttributes({ sliderIsTouchMove: val })} />

                        {/* Autoplay */}
                        <ToggleControl label={__('Enable Autoplay', 'advanced-post-block')} checked={sliderIsAutoplay} onChange={val => setAttributes({ sliderIsAutoplay: val })} />

                        {/* Speed & Delay */}
                        <Title>{__('Speed & Delay (s):', 'advanced-post-block')}</Title>
                        <RangeControl value={sliderSpeed} onChange={val => setAttributes({ sliderSpeed: val })} min={0} max={10} step={.05} />
                        <small>{__('Smaller speed & delay value will be slide faster', 'advanced-post-block')}</small>

                        {/* Effect */}
                        <PanelRow className='mt-20p'>
                            <Title mt='0' mb='0'>{__('Effect:', 'advanced-post-block')}</Title>
                            <SelectControl value={sliderEffect} onChange={cng => setAttributes({ sliderEffect: cng })} options={effects} />
                        </PanelRow>
                        <small>{__('To work fade & creative effects properly, set single column per view', 'advanced-post-block')}</small>

                        {/* Pagination */}
                        <Title>{__('Pagination:', 'advanced-post-block')}</Title>
                        <ToggleControl label={__('Show Pagination', 'advanced-post-block')} checked={sliderIsPage} onChange={val => setAttributes({ sliderIsPage: val })} />

                        {sliderIsPage && <>
                            <ToggleControl label={__('Enable Pagination Clickable', 'advanced-post-block')} checked={sliderIsPageClickable} onChange={val => setAttributes({ sliderIsPageClickable: val })} />

                            <ToggleControl label={__('Enable Pagination Dynamic Bullets', 'advanced-post-block')} checked={sliderIsPageDynamic} onChange={val => setAttributes({ sliderIsPageDynamic: val })} />
                        </>}

                        {/* Preview Next Button */}
                        <Title>{__('Preview Next Button:', 'advanced-post-block')}</Title>
                        <ToggleControl label={__('Show Preview Next Button', 'advanced-post-block')} checked={sliderIsPrevNext} onChange={val => setAttributes({ sliderIsPrevNext: val })} />
                    </PanelBody>}
                </>}

                {'style' === tab.name && <>
                    {/* Content Style */}
                    {posts && 0 !== posts.length && <PanelBody className='bPlPanelBody' title={__('Content Settings', 'advanced-post-block')} initialOpen={true}>
                        {/* Text Align */}
                        <PanelRow>
                            <Title mt='0' mb='0'>{__('Text Align:', 'advanced-post-block')}</Title>
                            <BtnGroup options={aligns} myValue={contentAlign} setState={val => setAttributes({ contentAlign: val })} icon={true} />
                        </PanelRow>

                        {/* Background */}
                        <Background label={__('Background', 'advanced-post-block')} background={contentBG} onChange={val => setAttributes({ contentBG: val })} defaults={{ color: '#f4f2fc' }} />

                        {/* Padding */}
                        <SpaceControl className='mt-20p' label={__('Padding:', 'advanced-post-block')} space={contentPadding} onChange={val => setAttributes({ contentPadding: val })} defaults={{ vertical: '20px', horizontal: '25px' }} />

                        {/* Border */}
                        <BorderControl label={__('Border:', 'advanced-post-block')} border={border} onChange={val => setAttributes({ border: val })} defaults={{ radius: '5px' }} />
                    </PanelBody>}


                    {/* Slider Styles */}
                    {posts && 0 !== posts.length && 'slider' === layout && <PanelBody className='bPlPanelBody' title={__('Slider Options Style', 'advanced-post-block')} initialOpen={false}>
                        {sliderIsPage && <>
                            <BColor label={__('Pagination Bullets Color:', 'advanced-post-block')} value={sliderPageColor} onChange={val => setAttributes({ sliderPageColor: val })} defaultColor='#fe6601' />

                            <UnitControl className='mt-20p' label={__('Pagination Width:', 'advanced-post-block')} labelPosition='left' value={sliderPageWidth} onChange={val => setAttributes({ sliderPageWidth: val })} units={[pxUnit, emUnit]} />

                            <UnitControl className='mt-20p' label={__('Pagination Height:', 'advanced-post-block')} labelPosition='left' value={sliderPageHeight} onChange={val => setAttributes({ sliderPageHeight: val })} units={[pxUnit, emUnit]} />

                            <BorderControl label={__('Pagination Border:', 'advanced-post-block')} border={sliderPageBorder} onChange={val => setAttributes({ sliderPageBorder: val })} defaults={{ radius: '50%' }} />
                        </>}

                        {sliderIsPrevNext && <BColor label={__('Preview Next Button Color:', 'advanced-post-block')} value={sliderPrevNextColor} onChange={val => setAttributes({ sliderPrevNextColor: val })} defaultColor='#fe6601' />}
                    </PanelBody>}


                    {/* Feature Image Styles */}
                    {/* {isFImg && <PanelBody className='bPlPanelBody' title={__('Feature Image Styles', 'advanced-post-block')} initialOpen={false}></PanelBody>} */}


                    {/* Title Styles */}
                    {posts && 0 !== posts.length && isTitle && <PanelBody className='bPlPanelBody' title={__('Title Styles', 'advanced-post-block')} initialOpen={false}>
                        {/* Typography */}
                        <Typography typography={titleTypo} onChange={val => setAttributes({ titleTypo: val })} defaults={{ fontSize: 25 }} />

                        {/* Color */}
                        <BColor label={__('Color:', 'advanced-post-block')} value={titleColor} onChange={val => setAttributes({ titleColor: val })} defaultColor='#fe6601' />

                        {/* Margin */}
                        <SpaceControl className='mt-20p' label={__('Margin:', 'advanced-post-block')} space={titleMargin} onChange={val => setAttributes({ titleMargin: val })} defaults={{ side: 4, bottom: '15px' }} />
                    </PanelBody>}


                    {/* Meta Data Styles */}
                    {posts && 0 !== posts.length && isMeta && <PanelBody className='bPlPanelBody' title={__('Meta Data Styles', 'advanced-post-block')} initialOpen={false}>
                        {/* Typography */}
                        <Typography typography={metaTypo} onChange={val => setAttributes({ metaTypo: val })} defaults={{ fontSize: 13, textTransform: 'uppercase' }} />

                        {/* Text Color */}
                        <BColor label={__('Text Color:', 'advanced-post-block')} value={metaTextColor} onChange={val => setAttributes({ metaTextColor: val })} defaultColor='#333' />

                        {/* Link Color */}
                        <BColor label={__('Link Color:', 'advanced-post-block')} value={metaLinkColor} onChange={val => setAttributes({ metaLinkColor: val })} defaultColor='#fe6601' />

                        {/* Icon Color */}
                        <BColor label={__('Icon Color:', 'advanced-post-block')} value={metaIconColor} onChange={val => setAttributes({ metaIconColor: val })} defaultColor='#fe6601' />

                        {/* Margin */}
                        <SpaceControl className='mt-20p' label={__('Margin:', 'advanced-post-block')} space={metaMargin} onChange={val => setAttributes({ metaMargin: val })} defaults={{ side: 4, bottom: '15px' }} />
                    </PanelBody>}


                    {/* Excerpt Styles */}
                    {posts && 0 !== posts.length && isExcerpt && <PanelBody className='bPlPanelBody' title={__('Excerpt Styles', 'advanced-post-block')} initialOpen={false}>
                        {/* Text Align */}
                        <PanelRow>
                            <Title mt='0' mb='0'>{__('Text Align:', 'advanced-post-block')}</Title>
                            <BtnGroup options={aligns} myValue={excerptAlign} setState={val => setAttributes({ excerptAlign: val })} icon={true} />
                        </PanelRow>

                        {/* Typography */}
                        <Typography typography={excerptTypo} onChange={val => setAttributes({ excerptTypo: val })} defaults={{ fontSize: 15 }} />

                        {/* Color */}
                        <BColor label={__('Color:', 'advanced-post-block')} value={excerptColor} onChange={val => setAttributes({ excerptColor: val })} defaultColor='#333' />

                        {/* Margin */}
                        <SpaceControl className='mt-20p' label={__('Margin:', 'advanced-post-block')} space={excerptMargin} onChange={val => setAttributes({ excerptMargin: val })} defaults={{ side: 4, bottom: '10px' }} />
                    </PanelBody>}


                    {/* Read More Settings */}
                    {posts && 0 !== posts.length && isReadMore && <PanelBody className='bPlPanelBody' title={__('Read More Settings', 'advanced-post-block')} initialOpen={false}>
                        {/* Button Align */}
                        <PanelRow>
                            <Title mt='0' mb='0'>{__('Button Align:', 'advanced-post-block')}</Title>
                            <BtnGroup options={aligns.filter(a => a.value !== 'justify')} myValue={readMoreAlign} setState={val => setAttributes({ readMoreAlign: val })} icon={true} />
                        </PanelRow>

                        {/* Typography */}
                        <Typography typography={readMoreTypo} onChange={val => setAttributes({ readMoreTypo: val })} defaults={{ fontSize: 14, textTransform: 'uppercase', fontWeight: 600 }} />

                        <ColorsControl colors={readMoreColors} onChange={val => setAttributes({ readMoreColors: val })} defaults={{ color: '#fff', bg: '#fbb040' }} />

                        <ColorsControl label={__('Hover Colors:', 'b-blocks')} colors={readMoreHovColors} onChange={val => setAttributes({ readMoreHovColors: val })} defaults={{ color: '#fff', bg: '#fe6601' }} />

                        {/* Padding */}
                        <SpaceControl className='mt-20p' label={__('Padding:', 'advanced-post-block')} space={readMorePadding} onChange={val => setAttributes({ readMorePadding: val })} defaults={{ vertical: '12px', horizontal: '35px' }} />

                        {/* Border */}
                        <BorderControl label={__('Border:', 'advanced-post-block')} border={readMoreBorder} onChange={val => setAttributes({ readMoreBorder: val })} defaults={{ radius: '3px' }} />
                    </PanelBody>}
                </>}
            </>}</TabPanel>
        </InspectorControls>


        <BlockControls>
            <AlignmentToolbar value={contentAlign} onChange={val => setAttributes({ contentAlign: val })} />
        </BlockControls>
    </>;
};
export default Settings;