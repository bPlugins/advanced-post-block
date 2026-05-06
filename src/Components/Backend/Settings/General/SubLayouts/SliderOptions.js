import { __ } from '@wordpress/i18n';
import { PanelBody, SelectControl, ToggleControl, RangeControl, PanelRow } from '@wordpress/components';

import { Label, HelpTooltip, Notice } from '../../../../../../../bpl-tools/Components';

import { effects } from '../../../../../utils/options';

const SliderOptions = ({ attributes, setAttributes }) => {
	const { sliderIsLoop, sliderIsTouchMove, sliderIsAutoplay, sliderAutoplayOptions, sliderSpeed, sliderEffect, sliderIsPage, sliderIsPageClickable, sliderIsPageDynamic, sliderIsPrevNext } = attributes;

	return <PanelBody className='bPlPanelBody apbSliderOptions' title={__('Slider Options', 'advanced-post-block')} initialOpen={false}>
		<ToggleControl label={__('Enable Loop', 'advanced-post-block')} checked={sliderIsLoop} onChange={val => setAttributes({ sliderIsLoop: val })} />

		<ToggleControl className='mt10' label={__('Enable Touch Move', 'advanced-post-block')} checked={sliderIsTouchMove} onChange={val => setAttributes({ sliderIsTouchMove: val })} />

		<ToggleControl className='mt10' label={__('Enable Autoplay', 'advanced-post-block')} checked={sliderIsAutoplay} onChange={val => setAttributes({ sliderIsAutoplay: val })} />

		{sliderIsAutoplay && <>
			<Label className='mt10'>{__('Autoplay Delay (s):', 'content-slider-block')} <HelpTooltip text={__('Delay between slides in seconds. Smaller values mean faster autoplay.', 'advanced-post-block')} /></Label>
			<RangeControl value={sliderAutoplayOptions.delay} onChange={val => setAttributes({ sliderAutoplayOptions: { ...sliderAutoplayOptions, delay: val } })} min={0} max={10} step={.05} />
			<Notice>{__('Smaller delay value will be autoplay faster', 'content-slider-block')}</Notice>
		</>}

		<Label>{__('Speed (s):', 'advanced-post-block')}</Label>
		<RangeControl value={sliderSpeed} onChange={val => setAttributes({ sliderSpeed: val })} min={0} max={10} step={.05} />
		<Notice>{__('Smaller speed & delay value will be slide faster', 'advanced-post-block')}</Notice>

		<PanelRow className='gap5 mt20'>
			<Label className=''>{__('Effect:', 'advanced-post-block')}</Label>
			<SelectControl value={sliderEffect} onChange={cng => setAttributes({ sliderEffect: cng })} options={effects} />
		</PanelRow>
		<Notice>{__('To work fade & creative effects properly, set single column per view', 'advanced-post-block')}</Notice>

		<Label><strong>{__('Pagination:', 'advanced-post-block')}</strong></Label>
		<ToggleControl label={__('Show Pagination', 'advanced-post-block')} checked={sliderIsPage} onChange={val => setAttributes({ sliderIsPage: val })} />

		{sliderIsPage && <>
			<ToggleControl className='mt10' label={__('Enable Pagination Clickable', 'advanced-post-block')} checked={sliderIsPageClickable} onChange={val => setAttributes({ sliderIsPageClickable: val })} />

			<ToggleControl className='mt10' label={__('Enable Pagination Dynamic Bullets', 'advanced-post-block')} checked={sliderIsPageDynamic} onChange={val => setAttributes({ sliderIsPageDynamic: val })} />
		</>}

		<Label><strong>{__('Preview Next Button:', 'advanced-post-block')}</strong></Label>
		<ToggleControl label={__('Show Preview Next Button', 'advanced-post-block')} checked={sliderIsPrevNext} onChange={val => setAttributes({ sliderIsPrevNext: val })} />
	</PanelBody>
}
export default SliderOptions;
