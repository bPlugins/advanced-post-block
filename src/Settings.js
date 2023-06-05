import { useEffect, useState } from 'react';
import { __ } from '@wordpress/i18n';
import { withSelect } from '@wordpress/data';
import { InspectorControls, BlockControls, AlignmentToolbar } from '@wordpress/block-editor';
import { PanelBody, SelectControl, RangeControl, TextControl, ToggleControl, TabPanel, RadioControl, PanelRow, __experimentalUnitControl as UnitControl, Modal, ButtonGroup, Button, Tooltip, Dashicon } from '@wordpress/components';
import SelectPure from 'select-pure';
import produce from 'immer';

// Settings Components
import { Label, Background, BColor, BDevice, BorderControl, BtnGroup, ColorsControl, SelectPureControl, SpaceControl, Typography } from '../../Components';
import { tabController } from '../../Components/utils/functions';
import { pxUnit, emUnit, vhUnit } from '../../Components/utils/options';

import { grid1Icon, gridIcon, masonryIcon, sliderIcon, tickerIcon } from './utils/icons';
import { generalStyleTabs, subLayouts, categoriesPosition, effects, aligns, postsOrdersBy, postsOrders, imageFittings } from './utils/options';
import { filterSelected } from './utils/functions';

const Settings = ({ attributes, setAttributes, posts, postTypes, getTaxonomy }) => {
	const { layout, subLayout, columns, columnGap, rowGap, isContentEqualHight, sliderHeight, postType, selectedCategories, postsPerPage, postsOrderBy, postsOrder, contentAlign, contentBG, contentPadding, border, sliderIsLoop, sliderIsTouchMove, sliderIsAutoplay, sliderSpeed, sliderEffect, sliderIsPage, sliderIsPageClickable, sliderIsPageDynamic, sliderPageColor, sliderPageWidth, sliderPageHeight, sliderPageBorder, sliderIsPrevNext, sliderPrevNextColor, isFImg, fImgFitting, isFImgLink, isTitle, isTitleLink, titleTypo, titleColor, titleMargin, isMeta, isMetaAuthor, isMetaDate, isMetaCategory, metaCategoryIn, isMetaComment, metaTypo, metaTextColor, metaLinkColor, metaIconColor, metaColorsOnImage, metaMargin, isExcerpt, excerptLength, excerptAlign, excerptTypo, excerptColor, excerptMargin, isReadMore, readMoreLabel, isLinkNewTab, readMoreAlign, readMoreTypo, readMoreColors, readMoreHovColors, readMorePadding, readMoreBorder } = attributes;

	const [device, setDevice] = useState('desktop');
	const [isProModal, setIsProModal] = useState(false);

	useEffect(() => {
		if (('slider' === layout || 'ticker' === layout) && ('default' === subLayout || 'title-meta' === subLayout))
			setAttributes({ subLayout: 'left-image', columns: { ...columns, desktop: 2 } })
	}, [layout]);

	const isPosts = posts?.length;

	const ProTitle = ({ className, label }) => <Label className={className}><span className='apbMutedText'>{label}</span> <span className='apbUpgradePro' onClick={() => setIsProModal(true)}>{__('Pro', 'advanced-post-block')}</span></Label>

	const ProToggle = ({ className, label }) => <ToggleControl className={`apbUpgradeProToggle ${className}`} label={<><span className='apbMutedText'>{label}</span> <span className='apbUpgradePro'>{__('Pro', 'advanced-post-block')}</span></>} checked={false} onChange={() => setIsProModal(true)} />

	return <>
		<InspectorControls>
			<TabPanel className='bPlTabPanel' activeClass='activeTab' tabs={generalStyleTabs} onSelect={() => tabController()}>{tab => <>
				{'general' === tab.name && <>
					<PanelBody className='bPlPanelBody help' title={__('Help', 'advanced-post-block')} initialOpen={false}>
						<div className='helpItem'>
							<a href='https://apb.bplugins.com/docs/' target='_blank' rel='noreferrer'><Dashicon icon='book' />{__('Read Documentation', 'advanced-post-block')}</a>
						</div>

						<div className='helpItem rateUs'>
							<a href='https://wordpress.org/support/plugin/advanced-post-block/reviews/#new-post' target='_blank' rel='noreferrer'>
								<span><Dashicon icon='star-filled' />{__('Would you please rate us?', 'advanced-post-block')}</span>
								<span>{__('We are new and we need your help to grow!🙏', 'advanced-post-block')}</span>
							</a>
						</div>
					</PanelBody>


					<PanelBody className='bPlPanelBody' title={__('Layouts Settings', 'advanced-post-block')} initialOpen={true}>
						<Label className='mb5'>{__('Layout:', 'advanced-post-block')}</Label>
						<ButtonGroup className='bPlBtnGroup'>
							<Tooltip text='Grid' position='top'>
								<Button icon={gridIcon} isPrimary={'grid' === layout} aria-pressed={'grid' === layout} isMedium={true} onClick={() => setAttributes({ layout: 'grid' })}></Button>
							</Tooltip>
							<Tooltip text='Grid 1' position='top'>
								<Button className='apbProGroupBtn' icon={grid1Icon} isMedium={true} onClick={() => setIsProModal(true)}></Button>
							</Tooltip>
							<Tooltip text='Masonry' position='top'>
								<Button icon={masonryIcon} isPrimary={'masonry' === layout} aria-pressed={'masonry' === layout} isMedium={true} onClick={() => setAttributes({ layout: 'masonry' })}></Button>
							</Tooltip>
							<Tooltip text='Slider' position='top'>
								<Button icon={sliderIcon} isPrimary={'slider' === layout} aria-pressed={'slider' === layout} isMedium={true} onClick={() => setAttributes({ layout: 'slider' })}></Button>
							</Tooltip>
							<Tooltip text='Ticker' position='top'>
								<Button icon={tickerIcon} isPrimary={'ticker' === layout} aria-pressed={'ticker' === layout} isMedium={true} onClick={() => setAttributes({ layout: 'ticker' })}></Button>
							</Tooltip>
						</ButtonGroup>

						<PanelRow className='mt20'>
							<Label className=''>{__('Sub Layout:', 'advanced-post-block')}</Label>
							<SelectControl value={subLayout} onChange={val => {
								setAttributes({ subLayout: val });
								'default' === val || 'title-meta' === val || 'left-image' === val || 'right-image' === val ? setAttributes({
									contentBG: { color: '#f4f2fc' },
									titleColor: '#4527a4',
									metaCategoryIn: 'image',
									metaTextColor: '#333',
									metaLinkColor: '#8344c5',
									metaIconColor: '#4527a4',
									excerptColor: '#333',
								}) : 'overlay-content' === val || 'overlay-content-hover' === val || 'overlay-box' === val ? setAttributes({
									contentBG: { color: '#000000b3' },
									titleColor: '#ccc0f0',
									metaCategoryIn: 'content',
									metaTextColor: '#fff',
									metaLinkColor: '#e0d0f0',
									metaIconColor: '#ccc0f0',
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
							}} options={'slider' === layout || 'ticker' === layout ? subLayouts.filter(l => l.value !== 'default' && l.value !== 'title-meta') : subLayouts}>
							</SelectControl>
						</PanelRow>

						<ProTitle className='mt5' label={__('There are more sub layouts in', 'advanced-post-block')} />
						<small>{__('Some settings may change when sub layout will be changed.', 'advanced-post-block')}</small>

						{'ticker' !== layout && <>
							<PanelRow className='mt20'>
								<Label className='mb5'>{__('Columns:', 'advanced-post-block')}</Label>
								<BDevice device={device} onChange={val => setDevice(val)} />
							</PanelRow>
							<RangeControl value={columns[device]} onChange={val => { setAttributes({ columns: { ...columns, [device]: val } }) }} min={1} max={6} step={1} beforeIcon='grid-view' />
						</>}

						{'ticker' !== layout && <>
							<Label>{__('Column Gap:', 'advanced-post-block')}</Label>
							<RangeControl value={columnGap} onChange={val => setAttributes({ columnGap: val })} min={0} max={100} step={1} beforeIcon='arrow-right-alt' />
						</>}

						{'slider' !== layout && <>
							<Label>{__('Row Gap:', 'advanced-post-block')}</Label>
							<RangeControl value={rowGap} onChange={val => setAttributes({ rowGap: val })} min={0} max={150} step={1} beforeIcon='arrow-down-alt' />
						</>}

						{'grid' === layout && <ToggleControl className='mt20' label={__('Enable Content Equal Height', 'advanced-post-block')} checked={isContentEqualHight} onChange={val => setAttributes({ isContentEqualHight: val })} />}

						{'slider' === layout && <UnitControl className='mt20' label={__('Slider Min Height:', 'advanced-post-block')} labelPosition='left' value={sliderHeight} onChange={val => setAttributes({ sliderHeight: val })} units={[pxUnit(), emUnit(), vhUnit()]} />}
					</PanelBody>


					<PanelBody className='bPlPanelBody' title={__('Posts Query', 'advanced-post-block')} initialOpen={false}>
						<PanelRow>
							<Label className=''>{__('Post Type:', 'advanced-post-block')}</Label>
							<SelectControl value={postType} onChange={val => setAttributes({ postType: val })} options={postTypes} />
						</PanelRow>

						{/* {'post' === postType && categories?.length ? <>
							<Label>{__('Select Categories:', 'advanced-post-block')}</Label>
							{categories.map(cat => {
								const isInc = selectedCategories.includes(cat.id);

								return <CheckboxControl label={cat.name} key={cat.id} checked={isInc} onChange={val => setAttributes({ selectedCategories: val ? [...selectedCategories, cat.id] : selectedCategories.filter(id => id !== cat.id) })} />;
							})}
						</> : null} */}

						{'post' === postType && getTaxonomy('category')?.length ? <>
							<Label>{__('Select Categories:', 'advanced-post-block')}</Label>
							<SelectPureControl
								value={filterSelected(getTaxonomy('category'), selectedCategories).map(cat => cat.toString())}
								onChange={val => setAttributes({ selectedCategories: val.map(cat => parseInt(cat)) })}
								options={getTaxonomy('category').map(cat => ({ label: cat.name, value: cat.id.toString() }))}
								SelectPure={SelectPure}
							/>
						</> : null}

						{'post' === postType && <ProTitle className='mt20' label={__('Filter By Tags', 'advanced-post-block')} />}
						<ProTitle className='mt20' label={__('Filter By Custom Taxonomy', 'advanced-post-block')} />

						<Label>{__('Post Per Page:', 'advanced-post-block')}</Label>
						<RangeControl value={postsPerPage} onChange={val => setAttributes({ postsPerPage: val, isPostsPerPageAll: -1 === val })} min={-1} max={36} step={1} />
						<small>{__('To show all posts set -1', 'advanced-post-block')}</small>

						<PanelRow className='mt20'>
							<Label className=''>{__('Post Order By:', 'advanced-post-block')}</Label>
							<SelectControl value={postsOrderBy} onChange={val => setAttributes({ postsOrderBy: val })} options={postsOrdersBy} />
						</PanelRow>

						<PanelRow>
							<Label className=''>{__('Post Order:', 'advanced-post-block')}</Label>
							<SelectControl value={postsOrder} onChange={val => setAttributes({ postsOrder: val })} options={postsOrders} />
						</PanelRow>

						<ProTitle className='mt20' label={__('Post Offset', 'advanced-post-block')} />
					</PanelBody>


					{'slider' !== layout && 'ticker' !== layout ? <PanelBody className='bPlPanelBody' title={__('Pagination Settings', 'advanced-post-block')} initialOpen={false}>
						<ProToggle label={__('Show Pagination', 'advanced-post-block')} />

						<ProTitle className='mt15' label={__('Previous Label:', 'advanced-post-block')} />
						<ProTitle className='mt15' label={__('Next Label:', 'advanced-post-block')} />
						<ProTitle className='mt15' label={__('Colors:', 'advanced-post-block')} />
						<ProTitle className='mt15' label={__('Active & Hover Colors:', 'advanced-post-block')} />
						<ProTitle className='mt15' label={__('Padding:', 'advanced-post-block')} />
						<ProTitle className='mt15' label={__('Space Between:', 'advanced-post-block')} />
					</PanelBody> : ''}


					{'slider' === layout && <PanelBody className='bPlPanelBody' title={__('Slider Options', 'advanced-post-block')} initialOpen={false}>
						<ToggleControl label={__('Enable Loop', 'advanced-post-block')} checked={sliderIsLoop} onChange={val => setAttributes({ sliderIsLoop: val })} />

						<ToggleControl className='mt10' label={__('Enable Touch Move', 'advanced-post-block')} checked={sliderIsTouchMove} onChange={val => setAttributes({ sliderIsTouchMove: val })} />

						<ToggleControl className='mt10' label={__('Enable Autoplay', 'advanced-post-block')} checked={sliderIsAutoplay} onChange={val => setAttributes({ sliderIsAutoplay: val })} />

						<Label>{__('Speed & Delay (s):', 'advanced-post-block')}</Label>
						<RangeControl value={sliderSpeed} onChange={val => setAttributes({ sliderSpeed: val })} min={0} max={10} step={.05} />
						<small>{__('Smaller speed & delay value will be slide faster', 'advanced-post-block')}</small>

						<PanelRow className='mt20'>
							<Label className=''>{__('Effect:', 'advanced-post-block')}</Label>
							<SelectControl value={sliderEffect} onChange={cng => setAttributes({ sliderEffect: cng })} options={effects} />
						</PanelRow>
						<small>{__('To work fade & creative effects properly, set single column per view', 'advanced-post-block')}</small>

						<Label>{__('Pagination:', 'advanced-post-block')}</Label>
						<ToggleControl label={__('Show Pagination', 'advanced-post-block')} checked={sliderIsPage} onChange={val => setAttributes({ sliderIsPage: val })} />

						{sliderIsPage && <>
							<ToggleControl className='mt10' label={__('Enable Pagination Clickable', 'advanced-post-block')} checked={sliderIsPageClickable} onChange={val => setAttributes({ sliderIsPageClickable: val })} />

							<ToggleControl className='mt10' label={__('Enable Pagination Dynamic Bullets', 'advanced-post-block')} checked={sliderIsPageDynamic} onChange={val => setAttributes({ sliderIsPageDynamic: val })} />
						</>}

						<Label>{__('Preview Next Button:', 'advanced-post-block')}</Label>
						<ToggleControl label={__('Show Preview Next Button', 'advanced-post-block')} checked={sliderIsPrevNext} onChange={val => setAttributes({ sliderIsPrevNext: val })} />
					</PanelBody>}


					{'ticker' === layout && <PanelBody className='bPlPanelBody' title={__('Ticker Options', 'advanced-post-block')} initialOpen={false}>
						<ProTitle label={__('Direction:', 'advanced-post-block')} />
						<ProTitle className='mt15' label={__('Speed:', 'advanced-post-block')} />
						<ProTitle className='mt15' label={__('Interval:', 'advanced-post-block')} />
						<ProTitle className='mt15' label={__('Height:', 'advanced-post-block')} />
						<ProTitle className='mt15' label={__('Post Visible:', 'advanced-post-block')} />
						<ProTitle className='mt15' label={__('Ticker Mouse Pause:', 'advanced-post-block')} />
					</PanelBody>}
				</>}


				{'elements' === tab.name && <>
					<PanelBody className='bPlPanelBody' title={__('Feature Image', 'advanced-post-block')}>
						<ToggleControl label={__('Show Feature Image', 'advanced-post-block')} checked={isFImg} onChange={val => setAttributes({ isFImg: val })} />

						{isFImg && <>
							<ProTitle className='mt10' label={__('Feature Image Size:', 'advanced-post-block')} />

							<PanelRow>
								<Label className=''>{__('Fitting:', 'advanced-post-block')}</Label>
								<SelectControl value={fImgFitting} onChange={val => setAttributes({ fImgFitting: val })} options={imageFittings} />
							</PanelRow>

							<ToggleControl className='mt10' label={__('Enable Link', 'advanced-post-block')} checked={isFImgLink} onChange={val => setAttributes({ isFImgLink: val })} />
						</>}
					</PanelBody>


					<PanelBody className='bPlPanelBody' title={__('Title', 'advanced-post-block')} initialOpen={false}>
						<ToggleControl label={__('Show Title', 'advanced-post-block')} checked={isTitle} onChange={val => setAttributes({ isTitle: val })} />

						{isTitle && <ToggleControl className='mt10' label={__('Enable Title Link', 'advanced-post-block')} checked={isTitleLink} onChange={val => setAttributes({ isTitleLink: val })} />}
					</PanelBody>


					<PanelBody className='bPlPanelBody' title={__('Meta Data', 'advanced-post-block')} initialOpen={false}>
						<ToggleControl label={__('Show Meta Data', 'advanced-post-block')} checked={isMeta} onChange={val => setAttributes({ isMeta: val })} />

						{isMeta && <>
							<Label className='mt30'><strong>{__('Author', 'advanced-post-block')}</strong></Label>

							<ToggleControl label={__('Show Author', 'advanced-post-block')} checked={isMetaAuthor} onChange={val => setAttributes({ isMetaAuthor: val })} />
							<ProToggle label={__('Author Link', 'advanced-post-block')} />

							<ProTitle className='mt10' label={__('Author Icon:', 'advanced-post-block')} />


							<Label className='mt30'><strong>{__('Date', 'advanced-post-block')}</strong></Label>

							<ToggleControl label={__('Show Date', 'advanced-post-block')} checked={isMetaDate} onChange={val => setAttributes({ isMetaDate: val })} />

							<ProTitle className='mt10' label={__('Date Format:', 'advanced-post-block')} />
							<ProTitle className='mt10' label={__('Date Icon:', 'advanced-post-block')} />


							<Label className='mt30'><strong>{__('Category', 'advanced-post-block')}</strong></Label>

							<ToggleControl label={__('Show Category', 'advanced-post-block')} checked={isMetaCategory} onChange={val => setAttributes({ isMetaCategory: val })} />

							{isMetaCategory && <PanelRow>
								<Label className=''>{__('Category In:', 'advanced-post-block')}</Label>
								<RadioControl selected={metaCategoryIn} onChange={val => setAttributes({ metaCategoryIn: val })} options={categoriesPosition} />
							</PanelRow>}

							<ProTitle className='mt10' label={__('Category Icon:', 'advanced-post-block')} />


							<Label className='mt30'><strong>{__('Reading Time', 'advanced-post-block')}</strong></Label>

							<ProToggle label={__('Show Reading Time', 'advanced-post-block')} />
							<ProToggle className='mt10' label={__('Show Reading Time Seconds', 'advanced-post-block')} />
							<ProTitle className='mt10' label={__('Reading Time Label:', 'advanced-post-block')} />
							<ProTitle className='mt10' label={__('Reading Time Icon:', 'advanced-post-block')} />


							<Label className='mt30'><strong>{__('Comment', 'advanced-post-block')}</strong></Label>

							<ToggleControl label={__('Show Comment', 'advanced-post-block')} checked={isMetaComment} onChange={val => setAttributes({ isMetaComment: val })} />

							<ProTitle className='mt10' label={__('Comment Icon:', 'advanced-post-block')} />
						</>}
					</PanelBody>


					<PanelBody className='bPlPanelBody' title={__('Excerpt', 'advanced-post-block')} initialOpen={false}>
						<ToggleControl label={__('Show Excerpt', 'advanced-post-block')} checked={isExcerpt} onChange={val => setAttributes({ isExcerpt: val })} />

						{isExcerpt && <>
							<ProToggle className='mt15' label={__('Show Excerpt from Content', 'advanced-post-block')} />

							<Label className='mt15'>{__('Excerpt Length:', 'advanced-post-block')}</Label>
							<RangeControl value={excerptLength} onChange={val => setAttributes({ excerptLength: val })} min={0} max={55} step={1} />
							<small>{__('Excerpt max value will be your site default excerpt length', 'advanced-post-block')}</small>
						</>}
					</PanelBody>


					<PanelBody className='bPlPanelBody' title={__('Read More', 'advanced-post-block')} initialOpen={false}>
						<ToggleControl label={__('Show Read More', 'advanced-post-block')} checked={isReadMore} onChange={val => setAttributes({ isReadMore: val })} />

						{isReadMore && <>
							<Label>{__('Read More Label:', 'advanced-post-block')}</Label>
							<TextControl value={readMoreLabel} onChange={val => setAttributes({ readMoreLabel: '' === val ? 'Read More' : val })} />

							<ToggleControl label={__('Open link in new tab', 'advanced-post-block')} checked={isLinkNewTab} onChange={val => setAttributes({ isLinkNewTab: val })} />
						</>}
					</PanelBody>
				</>}


				{'style' === tab.name && <>
					{isPosts && <PanelBody className='bPlPanelBody' title={__('Content', 'advanced-post-block')}>
						<PanelRow>
							<Label className=''>{__('Text Align:', 'advanced-post-block')}</Label>
							<BtnGroup value={contentAlign} onChange={val => setAttributes({ contentAlign: val })} options={aligns} isIcon={true} />
						</PanelRow>

						<Background label={__('Background', 'advanced-post-block')} value={contentBG} onChange={val => setAttributes({ contentBG: val })} defaults={{ color: '#f4f2fc' }} />

						<SpaceControl className='mt20' label={__('Padding:', 'advanced-post-block')} value={contentPadding} onChange={val => setAttributes({ contentPadding: val })} defaults={{ vertical: '20px', horizontal: '25px' }} />

						<BorderControl label={__('Border:', 'advanced-post-block')} value={border} onChange={val => setAttributes({ border: val })} defaults={{ radius: '5px' }} />
					</PanelBody>}


					{isPosts && 'slider' === layout && <PanelBody className='bPlPanelBody' title={__('Slider Options', 'advanced-post-block')} initialOpen={false}>
						{sliderIsPage && <>
							<BColor label={__('Pagination Bullets Color:', 'advanced-post-block')} value={sliderPageColor} onChange={val => setAttributes({ sliderPageColor: val })} defaultColor='#4527a4' />

							<UnitControl className='mt20' label={__('Pagination Width:', 'advanced-post-block')} labelPosition='left' value={sliderPageWidth} onChange={val => setAttributes({ sliderPageWidth: val })} units={[pxUnit(), emUnit()]} />

							<UnitControl className='mt20' label={__('Pagination Height:', 'advanced-post-block')} labelPosition='left' value={sliderPageHeight} onChange={val => setAttributes({ sliderPageHeight: val })} units={[pxUnit(), emUnit()]} />

							<BorderControl label={__('Pagination Border:', 'advanced-post-block')} value={sliderPageBorder} onChange={val => setAttributes({ sliderPageBorder: val })} defaults={{ radius: '50%' }} />
						</>}

						{sliderIsPrevNext && <BColor label={__('Preview Next Button Color:', 'advanced-post-block')} value={sliderPrevNextColor} onChange={val => setAttributes({ sliderPrevNextColor: val })} defaultColor='#4527a4' />}
					</PanelBody>}


					{isPosts && isTitle && <PanelBody className='bPlPanelBody' title={__('Title', 'advanced-post-block')} initialOpen={false}>
						<Typography value={titleTypo} onChange={val => setAttributes({ titleTypo: val })} defaults={{ fontSize: { desktop: 25, tablet: 22, mobile: 20 } }} produce={produce} />

						<BColor label={__('Color:', 'advanced-post-block')} value={titleColor} onChange={val => setAttributes({ titleColor: val })} defaultColor='#4527a4' />

						<SpaceControl className='mt20' label={__('Margin:', 'advanced-post-block')} value={titleMargin} onChange={val => setAttributes({ titleMargin: val })} defaults={{ side: 4, bottom: '15px' }} />
					</PanelBody>}


					{isPosts && isMeta && <PanelBody className='bPlPanelBody' title={__('Meta Data', 'advanced-post-block')} initialOpen={false}>
						<Typography value={metaTypo} onChange={val => setAttributes({ metaTypo: val })} defaults={{ fontSize: { desktop: 13, tablet: 13, mobile: 13 }, textTransform: 'uppercase' }} produce={produce} />

						<BColor label={__('Text Color:', 'advanced-post-block')} value={metaTextColor} onChange={val => setAttributes({ metaTextColor: val })} defaultColor='#333' />

						<BColor label={__('Link Color:', 'advanced-post-block')} value={metaLinkColor} onChange={val => setAttributes({ metaLinkColor: val })} defaultColor='#8344c5' />

						<BColor label={__('Icon Color:', 'advanced-post-block')} value={metaIconColor} onChange={val => setAttributes({ metaIconColor: val })} defaultColor='#4527a4' />

						<ColorsControl label={__('Category Colors On Image:', 'advanced-post-block')} value={metaColorsOnImage} onChange={val => setAttributes({ metaColorsOnImage: val })} defaults={{ color: '#fff', bg: '#4527a4' }} />

						<SpaceControl className='mt20' label={__('Margin:', 'advanced-post-block')} value={metaMargin} onChange={val => setAttributes({ metaMargin: val })} defaults={{ side: 4, bottom: '15px' }} />
					</PanelBody>}


					{isPosts && isExcerpt && <PanelBody className='bPlPanelBody' title={__('Excerpt', 'advanced-post-block')} initialOpen={false}>
						<PanelRow>
							<Label className=''>{__('Text Align:', 'advanced-post-block')}</Label>
							<BtnGroup value={excerptAlign} onChange={val => setAttributes({ excerptAlign: val })} options={aligns} isIcon={true} />
						</PanelRow>

						<Typography value={excerptTypo} onChange={val => setAttributes({ excerptTypo: val })} defaults={{ fontSize: { desktop: 15, tablet: 15, mobile: 15 } }} produce={produce} />

						<BColor label={__('Color:', 'advanced-post-block')} value={excerptColor} onChange={val => setAttributes({ excerptColor: val })} defaultColor='#333' />

						<SpaceControl className='mt20' label={__('Margin:', 'advanced-post-block')} value={excerptMargin} onChange={val => setAttributes({ excerptMargin: val })} defaults={{ side: 4, bottom: '10px' }} />
					</PanelBody>}


					{isPosts && isReadMore && <PanelBody className='bPlPanelBody' title={__('Read More', 'advanced-post-block')} initialOpen={false}>
						<PanelRow>
							<Label className=''>{__('Button Align:', 'advanced-post-block')}</Label>
							<BtnGroup value={readMoreAlign} onChange={val => setAttributes({ readMoreAlign: val })} options={aligns.filter(a => a.value !== 'justify')} isIcon={true} />
						</PanelRow>

						<Typography value={readMoreTypo} onChange={val => setAttributes({ readMoreTypo: val })} defaults={{ fontSize: { desktop: 14, tablet: 14, mobile: 14 }, textTransform: 'uppercase', fontWeight: 600 }} produce={produce} />

						<ColorsControl value={readMoreColors} onChange={val => setAttributes({ readMoreColors: val })} defaults={{ color: '#fff', bg: '#8344c5' }} />

						<ColorsControl label={__('Hover Colors:', 'advanced-post-block')} value={readMoreHovColors} onChange={val => setAttributes({ readMoreHovColors: val })} defaults={{ color: '#fff', bg: '#4527a4' }} />

						<SpaceControl className='mt20' label={__('Padding:', 'advanced-post-block')} value={readMorePadding} onChange={val => setAttributes({ readMorePadding: val })} defaults={{ vertical: '12px', horizontal: '35px' }} />

						<BorderControl label={__('Border:', 'advanced-post-block')} value={readMoreBorder} onChange={val => setAttributes({ readMoreBorder: val })} defaults={{ radius: '3px' }} />
					</PanelBody>}
				</>}
			</>}</TabPanel>
		</InspectorControls>


		<BlockControls>
			<AlignmentToolbar value={contentAlign} onChange={val => setAttributes({ contentAlign: val })} />
		</BlockControls>


		{isProModal && <Modal className='apbUpgradeProModal' title={__('Upgrade To Pro', 'advanced-post-block')} onRequestClose={() => setIsProModal(false)}>
			<h3>{__('Explore new features in Pro', 'advanced-post-block')}</h3>

			<ul className='apbUpgradeProFeatures'>
				<li>&emsp;<strong>{__('Layouts: ', 'advanced-post-block')}</strong>{__('Checkout more layouts and sub layouts.', 'advanced-post-block')}</li>

				<li>&emsp;<strong>{__('Pagination: ', 'advanced-post-block')}</strong>{__('Add custom pagination bottom of the posts.', 'advanced-post-block')}</li>

				<li>&emsp;<strong>{__('Tag Filter: ', 'advanced-post-block')}</strong>{__('ost Filter by tags (only for default post).', 'advanced-post-block')}</li>

				<li>&emsp;<strong>{__('Post Offset: ', 'advanced-post-block')}</strong>{__('Offset to exclude first N posts.', 'advanced-post-block')}</li>

				<li>&emsp;<strong>{__('Custom Taxonomy Filter: ', 'advanced-post-block')}</strong>{__('Custom Taxonomy filter for post and custom posts.', 'advanced-post-block')}</li>

				<li>&emsp;<strong>{__('Meta Data Icon: ', 'advanced-post-block')}</strong>{__('Custom icon for meta data.', 'advanced-post-block')}</li>

				<li>&emsp;<strong>{__('Meta Author Link Toggle: ', 'advanced-post-block')}</strong>{__('Show meta author with or without link.', 'advanced-post-block')}</li>

				<li>&emsp;<strong>{__('Reading Time: ', 'advanced-post-block')}</strong>{__('Show post reading time in meta area.', 'advanced-post-block')}</li>

				<li>&emsp;<strong>{__('Excerpt from Content: ', 'advanced-post-block')}</strong>{__('Show excerpt from main content.', 'advanced-post-block')}</li>

				<li>&emsp;<strong>{__('Ticker Layout Options: ', 'advanced-post-block')}</strong>{__('Options for ticker post layout.', 'advanced-post-block')}</li>

				<li>&emsp;<strong>{__('Feature Image Size: ', 'advanced-post-block')}</strong>{__('Options to set feature image size.', 'advanced-post-block')}</li>

				<li>&emsp;<strong>{__('Shortcode: ', 'advanced-post-block')}</strong>{__('Shortcode option to use anywhere.', 'advanced-post-block')}</li>
			</ul>

			<h4 className='apbUpgradeProText'>{__('To unlock those features! Upgrade to Pro')}</h4>

			<a className='apbUpgradeProLearnMore' href='https://apb.bplugins.com/buy-now/' target='_blank' rel='noreferrer'>{__('Learn More', 'advanced-post-block')}</a>
		</Modal>}
	</>;
};
export default withSelect((select) => {
	const { getPostTypes, getEntityRecords } = select('core');

	return {
		postTypes: getPostTypes({ per_page: -1 })?.filter(p => !['apb', 'page', 'attachment', 'wp_block', 'wp_template', 'wp_navigation', 'wp_template_part', 'nav_menu_item'].includes(p.slug))?.map(({ name, slug }) => ({ label: name, value: slug })),

		getTaxonomy: slug => getEntityRecords('taxonomy', slug, { per_page: -1 })
	}
})(Settings);
