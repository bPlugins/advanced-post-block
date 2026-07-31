import { __ } from '@wordpress/i18n';
import { PanelBody, SelectControl, RangeControl, ToggleControl, PanelRow, __experimentalUnitControl as UnitControl } from '@wordpress/components';
import { Label, Device, HelpTooltip, Notice, BtnGroup } from '../../../../../../bpl-tools/Components';

import { pxUnit, emUnit, vhUnit } from '../../../../../../bpl-tools/utils/options';
import { layouts, subLayouts, contentHeights } from '../../../../utils/options';
import { subLayoutSwitch, accordionThemeSwitch } from '../../../../utils/switcher';
import scrollTo from '../../../../utils/scrollTo';

const Layout = ({ attributes, setAttributes, device }) => {
	const { layout, subLayout, columns, columnGap, rowGap, isContentEqualHight, accordion = {}, sliderHeight, content } = attributes;
	const { theme = 'classic' } = accordion || {};

	const isGrid = 'grid' === layout;
	const isSlider = 'slider' === layout;
	const isTicker = 'ticker' === layout;
	const isNewsTicker = 'newsTicker' === layout;
	const isAccordion = 'accordion' === layout;

	return <PanelBody className='bPlPanelBody' title={__('Layout', 'advanced-post-block')} initialOpen={true}>
		<Label className='mb5'>
			{__('Layout:', 'advanced-post-block')}
			<HelpTooltip text={__('Choose your preferred post layout.', 'advanced-post-block')} />
		</Label>

		<BtnGroup
			value={layout}
			onChange={val => {
				const isSliderOrTicker = ['slider', 'ticker'].includes(val);
				const needsLeftImage =
					(isSliderOrTicker && ['default', 'title-meta'].includes(subLayout)) ||
					('ticker' === val && 'overlay-half-content' === subLayout);
				const needsDefault =
					['left-image', 'right-image'].includes(subLayout);

				// Preset the border sides for the accordion theme; reset to all
				// sides when leaving the accordion so other layouts aren't affected.
				const borderAttrs = 'accordion' === val
					? accordionThemeSwitch(theme, attributes)
					: isAccordion
						? { border: { ...attributes.border, side: 'all' }, hoverBorder: { ...attributes.hoverBorder, side: 'all' } }
						: {};

				setAttributes({
					layout: val,
					subLayout: needsLeftImage ? 'left-image' : needsDefault ? 'default' : subLayout,
					columns: isSliderOrTicker ? { ...columns, desktop: 2 } : columns,
					...borderAttrs
				});
			}}
			options={layouts}
			isTextIcon={true}
		/>

		{isSlider && <div className='mt10 mb5'>Configure the <span className='link' onClick={() => scrollTo(document.querySelector('.bPlPanelBody.apbSliderOptions'))}>Slider Options</span>.</div>}
		{isTicker && <div className='mt10 mb5'>Configure the <span className='link' onClick={() => scrollTo(document.querySelector('.bPlPanelBody.apbTickerOptions'))}>Ticker Options</span>.</div>}
		{isNewsTicker && <div className='mt10 mb5'>Configure the <span className='link' onClick={() => scrollTo(document.querySelector('.bPlPanelBody.apbNewsTickerOptions'))}>News Ticker Options</span>.</div>}

		{!isNewsTicker && !isAccordion && <>
			<SelectControl
				className='mt20'
				label={<>
					{__('Sub Layout:', 'advanced-post-block')}
					<HelpTooltip text={__('Select a sub-layout for your post grid. Some settings may change based on this selection.', 'advanced-post-block')} />
				</>}
				value={subLayout}
				onChange={val => {
					setAttributes({
						subLayout: val,
						...subLayoutSwitch(val, attributes)
					});
				}}
				options={isTicker
					? subLayouts.filter(l => l.value !== 'overlay-half-content')
					: subLayouts}
			/>

			<Notice status='warning'>{__('Some settings may change when sub layout will be changed.', 'advanced-post-block')}</Notice>
		</>}

		{!isTicker && !isNewsTicker && !isAccordion && <>
			<PanelRow className='gap5 mt20'>
				<Label className='mb5'>
					{__('Columns:', 'advanced-post-block')}
					<HelpTooltip text={__('Number of columns to display on different devices.', 'advanced-post-block')} />
				</Label>
				<Device />
			</PanelRow>

			<RangeControl
				value={columns[device]}
				onChange={val => setAttributes({ columns: { ...columns, [device]: val } })}
				min={1} max={6} step={1}
				beforeIcon='grid-view'
			/>
		</>}

		{!isTicker && !isNewsTicker && !isAccordion && <>
			<Label>
				{__('Column Gap:', 'advanced-post-block')}
				<HelpTooltip text={__('Horizontal space between post items.', 'advanced-post-block')} />
			</Label>

			<RangeControl
				value={columnGap}
				onChange={val => setAttributes({ columnGap: val })}
				min={0} max={100} step={1}
				beforeIcon='arrow-right-alt'
			/>
		</>}

		{!isSlider && !isNewsTicker && <>
			<Label>
				{isAccordion ? __('Gap:', 'advanced-post-block') : __('Row Gap:', 'advanced-post-block')}
				<HelpTooltip text={__('Vertical space between post items.', 'advanced-post-block')} />
			</Label>

			<RangeControl
				value={rowGap}
				onChange={val => setAttributes({ rowGap: val })}
				min={0} max={150} step={1}
				beforeIcon='arrow-down-alt'
			/>
		</>}

		{isGrid && <ToggleControl
			className='mt20'
			label={<>
				{__('Post Equal Height', 'advanced-post-block')}
				<HelpTooltip text={__('Ensures all items in the same row have matching heights.', 'advanced-post-block')} />
			</>}
			checked={isContentEqualHight}
			onChange={val => setAttributes({ isContentEqualHight: val })}
		/>}

		{isSlider && <UnitControl
			className='mt20'
			label={__('Slider Min Height:', 'advanced-post-block')}
			labelPosition='left'
			value={sliderHeight}
			onChange={val => setAttributes({ sliderHeight: val })}
			units={[pxUnit(), emUnit(), vhUnit()]}
		/>}

		{!isTicker && !isNewsTicker && !isAccordion && <SelectControl
			className='mt20'
			label={__('Content Height:', 'advanced-post-block')}
			labelPosition='left'
			value={content?.height}
			onChange={val => setAttributes({ content: { ...content, height: val } })}
			options={contentHeights}
		/>}

		<Notice status='premium' isIcon={true}>
			{__('Grid 1, Magazine 1, Magazine 2 layouts, and overlay settings are available in the Premium version.', 'advanced-post-block')}
		</Notice>
	</PanelBody>
};
export default Layout;
