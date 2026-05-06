import { __ } from '@wordpress/i18n';
import { PanelBody, __experimentalUnitControl as UnitControl } from '@wordpress/components';

import { ColorControl, HelpTooltip } from '../../../../../../bpl-tools/Components';
import { BorderControl } from '../../../../../../bpl-tools/Components/Deprecated';
import { pxUnit, emUnit } from '../../../../../../bpl-tools/utils/options';
import { primaryColor } from '../../../../../../bpl-tools/utils/data';

const SliderOptions = ({ attributes, setAttributes }) => {
	const { layout, sliderIsPage, sliderPageColor, sliderPageWidth, sliderPageHeight, sliderPageBorder, sliderIsPrevNext, sliderPrevNextColor } = attributes;

	const isSlider = 'slider' === layout;

	if (!isSlider) return null;

	return <PanelBody className='bPlPanelBody' title={__('Slider Options', 'advanced-post-block')} initialOpen={false}>
		{sliderIsPage && <>
			<ColorControl label={<>{__('Pagination Bullets Color:', 'advanced-post-block')} <HelpTooltip text={__('Color for the slider pagination bullets.', 'advanced-post-block')} /></>} value={sliderPageColor} onChange={val => setAttributes({ sliderPageColor: val })} defaultColor={primaryColor} />

			<UnitControl className='mt20' label={__('Pagination Width:', 'advanced-post-block')} labelPosition='left' value={sliderPageWidth} onChange={val => setAttributes({ sliderPageWidth: val })} units={[pxUnit(), emUnit()]} />

			<UnitControl className='mt20' label={__('Pagination Height:', 'advanced-post-block')} labelPosition='left' value={sliderPageHeight} onChange={val => setAttributes({ sliderPageHeight: val })} units={[pxUnit(), emUnit()]} />

			<BorderControl label={__('Pagination Border:', 'advanced-post-block')} value={sliderPageBorder} onChange={val => setAttributes({ sliderPageBorder: val })} defaults={{ radius: '50%' }} />
		</>}

		{sliderIsPrevNext && <ColorControl label={__('Preview Next Button Color:', 'advanced-post-block')} value={sliderPrevNextColor} onChange={val => setAttributes({ sliderPrevNextColor: val })} defaultColor={primaryColor} />}
	</PanelBody>
}
export default SliderOptions;