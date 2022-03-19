import { __ } from '@wordpress/i18n';
import { useEffect, useState, useContext } from '@wordpress/element';
import { InspectorControls, BlockControls, AlignmentToolbar } from '@wordpress/block-editor';
import { PanelBody, SelectControl, RangeControl, TextControl, ToggleControl, TabPanel, RadioControl, PanelRow, __experimentalUnitControl as UnitControl, Modal, ButtonGroup, Button, Tooltip } from '@wordpress/components';
import SelectPure from 'select-pure';

// Settings Components
import BDevice from '../../Components/BDevice';
import Background from '../../Components/Background';
import Title from '../../Components/Title';
import BColor from '../../Components/BColor';
import BorderControl from '../../Components/BorderControl';
import SpaceControl from '../../Components/SpaceControl';
import SelectPureControl from '../../Components/SelectPureControl';
import ColorsControl from '../../Components/ColorsControl';
import Typography from '../../Components/Typography';
import BtnGroup from '../../Components/BtnGroup';

import { ExcerptLengthCtx } from './edit';
import icons from './Const/icons';
import options from './Const/options';
const { generalStyleTabs, subLayouts, categoriesPosition, effects, aligns, postsOrdersBy, postsOrders, pxUnit, emUnit, vhUnit } = options;

const Settings = ({ attributes, setAttributes, posts, getPostTypes, categories }) => {
	const { layout, subLayout, columns, columnGap, rowGap, isContentEqualHight, sliderHeight, postType, selectedCategories, isPostsPerPageAll, postsPerPage, postsOrderBy, postsOrder, contentAlign, contentBG, contentPadding, border, sliderIsLoop, sliderIsTouchMove, sliderIsAutoplay, sliderSpeed, sliderEffect, sliderIsPage, sliderIsPageClickable, sliderIsPageDynamic, sliderPageColor, sliderPageWidth, sliderPageHeight, sliderPageBorder, sliderIsPrevNext, sliderPrevNextColor, isFImg, isFImgLink, isTitle, isTitleLink, titleTypo, titleColor, titleMargin, isMeta, isMetaAuthor, isMetaDate, isMetaCategory, metaCategoryIn, isMetaComment, metaTypo, metaTextColor, metaLinkColor, metaIconColor, metaColorsOnImage, metaMargin, isExcerpt, excerptLength, excerptAlign, excerptTypo, excerptColor, excerptMargin, isReadMore, readMoreLabel, isLinkNewTab, readMoreAlign, readMoreTypo, readMoreColors, readMoreHovColors, readMorePadding, readMoreBorder } = attributes;

	const [device, setDevice] = useState('desktop');
	const [isProModal, setIsProModal] = useState(false);
	const maxExcerptLength = useContext(ExcerptLengthCtx);

	const ProTitle = ({ label }) => <Title><span className='apbMutedText'>{label}</span> <span className='apbUpgradePro' onClick={() => setIsProModal(true)}>{__('Pro', 'advanced-post-block')}</span></Title>

	useEffect(() => {
		if (('slider' === layout || 'ticker' === layout) && ('default' === subLayout || 'title-meta' === subLayout))
			setAttributes({ subLayout: 'left-image', columns: { ...columns, desktop: 2 } })
	}, [layout]);

	const isPosts = posts?.length;

	return <>
		<InspectorControls>
			<TabPanel className='bPlTabPanel' activeClass='activeTab' tabs={generalStyleTabs}>{tab => <>
				{'general' === tab.name && <>
					{/* Layouts Settings */}
					<PanelBody className='bPlPanelBody' title={__('Layouts Settings', 'advanced-post-block')} initialOpen={true}>
						<Title mt='0'>{__('Layout:', 'advanced-post-block')}</Title>
						<ButtonGroup className='bPlBtnGroup'>
							<Tooltip text='Grid' position='top'>
								<Button icon={icons.grid} isPrimary={'grid' === layout} aria-pressed={'grid' === layout} isMedium={true} onClick={() => setAttributes({ layout: 'grid' })}></Button>
							</Tooltip>
							<Tooltip text='Grid 1' position='top'>
								<Button className='apbProGroupBtn' icon={icons.grid1} isMedium={true} onClick={() => setIsProModal(true)}></Button>
							</Tooltip>
							<Tooltip text='Masonry' position='top'>
								<Button icon={icons.masonry} isPrimary={'masonry' === layout} aria-pressed={'masonry' === layout} isMedium={true} onClick={() => setAttributes({ layout: 'masonry' })}></Button>
							</Tooltip>
							<Tooltip text='Slider' position='top'>
								<Button icon={icons.slider} isPrimary={'slider' === layout} aria-pressed={'slider' === layout} isMedium={true} onClick={() => setAttributes({ layout: 'slider' })}></Button>
							</Tooltip>
							<Tooltip text='Ticker' position='top'>
								<Button icon={icons.ticker} isPrimary={'ticker' === layout} aria-pressed={'ticker' === layout} isMedium={true} onClick={() => setAttributes({ layout: 'ticker' })}></Button>
							</Tooltip>
						</ButtonGroup>

						<PanelRow className='mt20'>
							<Title mt='0' mb='0'>{__('Sub Layout:', 'advanced-post-block')}</Title>
							<SelectControl value={subLayout} onChange={val => {
								setAttributes({ subLayout: val });
								'default' === val || 'title-meta' === val || 'left-image' === val || 'right-image' === val ? setAttributes({
									contentBG: { color: '#f4f2fc', styles: `background-color: #f4f2fc;` },
									titleColor: '#4527a4',
									metaCategoryIn: 'image',
									metaTextColor: '#333',
									metaLinkColor: '#8344c5',
									metaIconColor: '#4527a4',
									excerptColor: '#333',
								}) : 'overlay-content' === val || 'overlay-content-hover' === val || 'overlay-box' === val ? setAttributes({
									contentBG: { color: '#000000b3', styles: `background-color: #000000b3;` },
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
						<Title mt='5px' mb='5px'><span className='apbMutedText'>{__('There are more sub layouts in')}</span> <span className='apbUpgradePro' onClick={() => setIsProModal(true)}>{__('Pro')}</span></Title>
						<small>{__('Some settings may change when sub layout will be changed.', 'advanced-post-block')}</small>

						{'ticker' !== layout && <>
							<PanelRow className='mt20'>
								<Title mt='0'>{__('Columns:', 'advanced-post-block')}</Title>
								<BDevice device={device} onChange={val => setDevice(val)} />
							</PanelRow>
							<RangeControl value={columns[device]} onChange={val => { setAttributes({ columns: { ...columns, [device]: val } }) }} min={1} max={6} step={1} beforeIcon='grid-view' />
						</>}

						{'ticker' !== layout && <>
							<Title>{__('Column Gap:', 'advanced-post-block')}</Title>
							<RangeControl value={columnGap} onChange={val => setAttributes({ columnGap: val })} min={0} max={100} step={1} beforeIcon='arrow-right-alt' />
						</>}

						{'slider' !== layout && <>
							<Title>{__('Row Gap:', 'advanced-post-block')}</Title>
							<RangeControl value={rowGap} onChange={val => setAttributes({ rowGap: val })} min={0} max={150} step={1} beforeIcon='arrow-down-alt' />
						</>}

						{'grid' === layout && <ToggleControl className='mt10' label={__('Enable Content Equal Height', 'advanced-post-block')} checked={isContentEqualHight} onChange={val => setAttributes({ isContentEqualHight: val })} />}

						{'slider' === layout && <UnitControl className='mt20' label={__('Slider Min Height:', 'advanced-post-block')} labelPosition='left' value={sliderHeight} onChange={val => setAttributes({ sliderHeight: val })} units={[pxUnit, emUnit, vhUnit]} />}
					</PanelBody>


					{/* Posts Query */}
					<PanelBody className='bPlPanelBody' title={__('Posts Query', 'advanced-post-block')} initialOpen={false}>
						<PanelRow>
							<Title mt='0' mb='0'>{__('Post Type:', 'advanced-post-block')}</Title>
							<SelectControl value={postType} onChange={val => setAttributes({ postType: val })} options={getPostTypes} />
						</PanelRow>

						{/* {'post' === postType && categories?.length ? <>
							<Title>{__('Select Categories:', 'advanced-post-block')}</Title>
							{categories.map(cat => {
								const isInc = selectedCategories.includes(cat.id);

								return <CheckboxControl label={cat.name} key={cat.id} checked={isInc} onChange={val => setAttributes({ selectedCategories: val ? [...selectedCategories, cat.id] : selectedCategories.filter(id => id !== cat.id) })} />;
							})}
						</> : null} */}

						{'post' === postType && categories?.length ? <>
							<Title>{__('Select Categories:', 'advanced-post-block')}</Title>
							<SelectPureControl
								value={selectedCategories.map(cat => cat.toString())}
								onChange={val => setAttributes({ selectedCategories: val.map(cat => parseInt(cat)) })}
								options={categories.map(cat => ({ label: cat.name, value: cat.id.toString() }))}
								SelectPure={SelectPure}
							/>
						</> : null}

						{'post' === postType && <ProTitle label={__('Filter By Tags', 'advanced-post-block')} />}
						<ProTitle label={__('Filter By Custom Taxonomy', 'advanced-post-block')} />

						<Title>{__('Post Per Page:', 'advanced-post-block')}</Title>
						<ToggleControl label={__('Show All Posts', 'advanced-post-block')} checked={isPostsPerPageAll} onChange={val => setAttributes({ isPostsPerPageAll: val })} />

						{false === isPostsPerPageAll && <RangeControl value={postsPerPage} onChange={val => setAttributes({ postsPerPage: val })} min={1} max={36} step={1} />}

						<PanelRow>
							<Title mt='0' mb='0'>{__('Post Order By:', 'advanced-post-block')}</Title>
							<SelectControl value={postsOrderBy} onChange={val => setAttributes({ postsOrderBy: val })} options={postsOrdersBy} />
						</PanelRow>

						<PanelRow>
							<Title mt='0' mb='0'>{__('Post Order:', 'advanced-post-block')}</Title>
							<SelectControl value={postsOrder} onChange={val => setAttributes({ postsOrder: val })} options={postsOrders} />
						</PanelRow>

						<ProTitle label={__('Post Offset', 'advanced-post-block')} />
					</PanelBody>


					{'slider' !== layout && 'ticker' !== layout ? <PanelBody className='bPlPanelBody' title={__('Pagination Settings', 'advanced-post-block')} initialOpen={false}>
						<ToggleControl className='apbUpgradeProToggle' label={<><span className='apbMutedText'>{__('Show Pagination', 'advanced-post-block')}</span> <span className='apbUpgradePro'>{__('Pro', 'advanced-post-block')}</span></>} checked={true} onChange={() => setIsProModal(true)} />

						<ProTitle label={__('Previous Label:', 'advanced-post-block')} />
						<ProTitle label={__('Next Label:', 'advanced-post-block')} />
						<ProTitle label={__('Colors:', 'advanced-post-block')} />
						<ProTitle label={__('Active & Hover Colors:', 'advanced-post-block')} />
						<ProTitle label={__('Padding:', 'advanced-post-block')} />
						<ProTitle label={__('Space Between:', 'advanced-post-block')} />
					</PanelBody> : ''}


					{/* Elements Settings */}
					<PanelBody className='bPlPanelBody' title={__('Elements Settings', 'advanced-post-block')} initialOpen={false}>
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

							{isMetaCategory && <PanelRow className='mt0 mb20'>
								<Title mt='0' mb='0'>{__('Category In:', 'advanced-post-block')}</Title>
								<RadioControl selected={metaCategoryIn} onChange={val => setAttributes({ metaCategoryIn: val })} options={categoriesPosition} />
							</PanelRow>}

							<ToggleControl className='apbUpgradeProToggle' label={<><span className='apbMutedText'>{__('Show Reading Time', 'advanced-post-block')}</span> <span className='apbUpgradePro'>{__('Pro', 'advanced-post-block')}</span></>} checked={false} onChange={() => setIsProModal(true)} />

							<ToggleControl label={__('Show Comment', 'advanced-post-block')} checked={isMetaComment} onChange={val => setAttributes({ isMetaComment: val })} />
						</>}


						{/* Excerpt */}
						<Title>{__('Excerpt:', 'advanced-post-block')}</Title>
						<ToggleControl label={__('Show Excerpt', 'advanced-post-block')} checked={isExcerpt} onChange={val => setAttributes({ isExcerpt: val })} />

						{isExcerpt && <>
							{/* Excerpt Length */}
							<Title mt='0' mb='0'>{__('Excerpt Length:', 'advanced-post-block')}</Title>
							<RangeControl value={excerptLength} onChange={val => setAttributes({ excerptLength: val })} min={0} max={maxExcerptLength} step={1} />
							<small>{__('Excerpt max value will be your site default excerpt length', 'advanced-post-block')}</small>
						</>}


						{/* Read More */}
						<Title>{__('Read More:', 'advanced-post-block')}</Title>
						<ToggleControl label={__('Show Read More', 'advanced-post-block')} checked={isReadMore} onChange={val => setAttributes({ isReadMore: val })} />

						{isReadMore && <>
							<Title mt='0' mb='0'>{__('Read More Label:', 'advanced-post-block')}</Title>
							<TextControl value={readMoreLabel} onChange={val => setAttributes({ readMoreLabel: '' === val ? 'Read More' : val })} />

							<ToggleControl label={__('Open link in new tab', 'advanced-post-block')} checked={isLinkNewTab} onChange={val => setAttributes({ isLinkNewTab: val })} />
						</>}
					</PanelBody>


					{/* Slider Settings */}
					{'slider' === layout && <PanelBody className='bPlPanelBody' title={__('Slider Options', 'advanced-post-block')} initialOpen={false}>
						<ToggleControl label={__('Enable Loop', 'advanced-post-block')} checked={sliderIsLoop} onChange={val => setAttributes({ sliderIsLoop: val })} />

						<ToggleControl label={__('Enable Touch Move', 'advanced-post-block')} checked={sliderIsTouchMove} onChange={val => setAttributes({ sliderIsTouchMove: val })} />

						<ToggleControl label={__('Enable Autoplay', 'advanced-post-block')} checked={sliderIsAutoplay} onChange={val => setAttributes({ sliderIsAutoplay: val })} />

						<Title>{__('Speed & Delay (s):', 'advanced-post-block')}</Title>
						<RangeControl value={sliderSpeed} onChange={val => setAttributes({ sliderSpeed: val })} min={0} max={10} step={.05} />
						<small>{__('Smaller speed & delay value will be slide faster', 'advanced-post-block')}</small>

						<PanelRow className='mt20'>
							<Title mt='0' mb='0'>{__('Effect:', 'advanced-post-block')}</Title>
							<SelectControl value={sliderEffect} onChange={cng => setAttributes({ sliderEffect: cng })} options={effects} />
						</PanelRow>
						<small>{__('To work fade & creative effects properly, set single column per view', 'advanced-post-block')}</small>

						<Title>{__('Pagination:', 'advanced-post-block')}</Title>
						<ToggleControl label={__('Show Pagination', 'advanced-post-block')} checked={sliderIsPage} onChange={val => setAttributes({ sliderIsPage: val })} />

						{sliderIsPage && <>
							<ToggleControl label={__('Enable Pagination Clickable', 'advanced-post-block')} checked={sliderIsPageClickable} onChange={val => setAttributes({ sliderIsPageClickable: val })} />

							<ToggleControl label={__('Enable Pagination Dynamic Bullets', 'advanced-post-block')} checked={sliderIsPageDynamic} onChange={val => setAttributes({ sliderIsPageDynamic: val })} />
						</>}

						<Title>{__('Preview Next Button:', 'advanced-post-block')}</Title>
						<ToggleControl label={__('Show Preview Next Button', 'advanced-post-block')} checked={sliderIsPrevNext} onChange={val => setAttributes({ sliderIsPrevNext: val })} />
					</PanelBody>}


					{/* Ticker Settings */}
					{'ticker' === layout && <PanelBody className='bPlPanelBody' title={__('Ticker Options', 'advanced-post-block')} initialOpen={false}>
						<ProTitle label={__('Direction:', 'advanced-post-block')} />
						<ProTitle label={__('Speed:', 'advanced-post-block')} />
						<ProTitle label={__('Interval:', 'advanced-post-block')} />
						<ProTitle label={__('Height:', 'advanced-post-block')} />
						<ProTitle label={__('Post Visible:', 'advanced-post-block')} />
						<ProTitle label={__('Ticker Mouse Pause:', 'advanced-post-block')} />
					</PanelBody>}
				</>}

				{'style' === tab.name && <>
					{/* Content Style */}
					{isPosts && <PanelBody className='bPlPanelBody' title={__('Content Settings', 'advanced-post-block')} initialOpen={true}>
						<PanelRow>
							<Title mt='0' mb='0'>{__('Text Align:', 'advanced-post-block')}</Title>
							<BtnGroup value={contentAlign} onChange={val => setAttributes({ contentAlign: val })} options={aligns} isIcon={true} />
						</PanelRow>

						<Background label={__('Background', 'advanced-post-block')} background={contentBG} onChange={val => setAttributes({ contentBG: val })} defaults={{ color: '#f4f2fc' }} />

						<SpaceControl className='mt20' label={__('Padding:', 'advanced-post-block')} space={contentPadding} onChange={val => setAttributes({ contentPadding: val })} defaults={{ vertical: '20px', horizontal: '25px' }} />

						<BorderControl label={__('Border:', 'advanced-post-block')} border={border} onChange={val => setAttributes({ border: val })} defaults={{ radius: '5px' }} />
					</PanelBody>}


					{/* Slider Styles */}
					{isPosts && 'slider' === layout && <PanelBody className='bPlPanelBody' title={__('Slider Options Style', 'advanced-post-block')} initialOpen={false}>
						{sliderIsPage && <>
							<BColor label={__('Pagination Bullets Color:', 'advanced-post-block')} value={sliderPageColor} onChange={val => setAttributes({ sliderPageColor: val })} defaultColor='#4527a4' />

							<UnitControl className='mt20' label={__('Pagination Width:', 'advanced-post-block')} labelPosition='left' value={sliderPageWidth} onChange={val => setAttributes({ sliderPageWidth: val })} units={[pxUnit, emUnit]} />

							<UnitControl className='mt20' label={__('Pagination Height:', 'advanced-post-block')} labelPosition='left' value={sliderPageHeight} onChange={val => setAttributes({ sliderPageHeight: val })} units={[pxUnit, emUnit]} />

							<BorderControl label={__('Pagination Border:', 'advanced-post-block')} border={sliderPageBorder} onChange={val => setAttributes({ sliderPageBorder: val })} defaults={{ radius: '50%' }} />
						</>}

						{sliderIsPrevNext && <BColor label={__('Preview Next Button Color:', 'advanced-post-block')} value={sliderPrevNextColor} onChange={val => setAttributes({ sliderPrevNextColor: val })} defaultColor='#4527a4' />}
					</PanelBody>}


					{/* Title Styles */}
					{isPosts && isTitle && <PanelBody className='bPlPanelBody' title={__('Title Styles', 'advanced-post-block')} initialOpen={false}>
						<Typography typography={titleTypo} onChange={val => setAttributes({ titleTypo: val })} defaults={{ fontSize: 25 }} />

						<BColor label={__('Color:', 'advanced-post-block')} value={titleColor} onChange={val => setAttributes({ titleColor: val })} defaultColor='#4527a4' />

						<SpaceControl className='mt20' label={__('Margin:', 'advanced-post-block')} space={titleMargin} onChange={val => setAttributes({ titleMargin: val })} defaults={{ side: 4, bottom: '15px' }} />
					</PanelBody>}


					{/* Meta Data Styles */}
					{isPosts && isMeta && <PanelBody className='bPlPanelBody' title={__('Meta Data Styles', 'advanced-post-block')} initialOpen={false}>
						<Typography typography={metaTypo} onChange={val => setAttributes({ metaTypo: val })} defaults={{ fontSize: 13, textTransform: 'uppercase' }} />

						<BColor label={__('Text Color:', 'advanced-post-block')} value={metaTextColor} onChange={val => setAttributes({ metaTextColor: val })} defaultColor='#333' />

						<BColor label={__('Link Color:', 'advanced-post-block')} value={metaLinkColor} onChange={val => setAttributes({ metaLinkColor: val })} defaultColor='#8344c5' />

						<BColor label={__('Icon Color:', 'advanced-post-block')} value={metaIconColor} onChange={val => setAttributes({ metaIconColor: val })} defaultColor='#4527a4' />

						<ColorsControl label={__('Category Colors On Image:', 'advanced-post-block')} colors={metaColorsOnImage} onChange={val => setAttributes({ metaColorsOnImage: val })} defaults={{ color: '#fff', bg: '#4527a4' }} />

						<SpaceControl className='mt20' label={__('Margin:', 'advanced-post-block')} space={metaMargin} onChange={val => setAttributes({ metaMargin: val })} defaults={{ side: 4, bottom: '15px' }} />
					</PanelBody>}


					{/* Excerpt Styles */}
					{isPosts && isExcerpt && <PanelBody className='bPlPanelBody' title={__('Excerpt Styles', 'advanced-post-block')} initialOpen={false}>
						<PanelRow>
							<Title mt='0' mb='0'>{__('Text Align:', 'advanced-post-block')}</Title>
							<BtnGroup value={excerptAlign} onChange={val => setAttributes({ excerptAlign: val })} options={aligns} isIcon={true} />
						</PanelRow>

						<Typography typography={excerptTypo} onChange={val => setAttributes({ excerptTypo: val })} defaults={{ fontSize: 15 }} />

						<BColor label={__('Color:', 'advanced-post-block')} value={excerptColor} onChange={val => setAttributes({ excerptColor: val })} defaultColor='#333' />

						<SpaceControl className='mt20' label={__('Margin:', 'advanced-post-block')} space={excerptMargin} onChange={val => setAttributes({ excerptMargin: val })} defaults={{ side: 4, bottom: '10px' }} />
					</PanelBody>}


					{/* Read More Settings */}
					{isPosts && isReadMore && <PanelBody className='bPlPanelBody' title={__('Read More Settings', 'advanced-post-block')} initialOpen={false}>
						<PanelRow>
							<Title mt='0' mb='0'>{__('Button Align:', 'advanced-post-block')}</Title>
							<BtnGroup value={readMoreAlign} onChange={val => setAttributes({ readMoreAlign: val })} options={aligns.filter(a => a.value !== 'justify')} isIcon={true} />
						</PanelRow>

						<Typography typography={readMoreTypo} onChange={val => setAttributes({ readMoreTypo: val })} defaults={{ fontSize: 14, textTransform: 'uppercase', fontWeight: 600 }} />

						<ColorsControl colors={readMoreColors} onChange={val => setAttributes({ readMoreColors: val })} defaults={{ color: '#fff', bg: '#8344c5' }} />

						<ColorsControl label={__('Hover Colors:', 'advanced-post-block')} colors={readMoreHovColors} onChange={val => setAttributes({ readMoreHovColors: val })} defaults={{ color: '#fff', bg: '#4527a4' }} />

						<SpaceControl className='mt20' label={__('Padding:', 'advanced-post-block')} space={readMorePadding} onChange={val => setAttributes({ readMorePadding: val })} defaults={{ vertical: '12px', horizontal: '35px' }} />

						<BorderControl label={__('Border:', 'advanced-post-block')} border={readMoreBorder} onChange={val => setAttributes({ readMoreBorder: val })} defaults={{ radius: '3px' }} />
					</PanelBody>}
				</>}
			</>}</TabPanel>
		</InspectorControls>


		<BlockControls>
			<AlignmentToolbar value={contentAlign} onChange={val => setAttributes({ contentAlign: val })} />
		</BlockControls>

		{isProModal && <Modal title={__('Upgrade To Pro', 'advanced-post-block')} onRequestClose={() => setIsProModal(false)}>
			<p className='apbUpgradeProText'>{__('To unlock the features, upgrade to Pro')}</p>

			<a className='apbUpgradeProLearnMore' href='https://apb.bplugins.com/buy-now/' target='_blank' rel='noreferrer'>{__('Learn More', 'advanced-post-block')}</a>
		</Modal>}
	</>;
};
export default Settings;