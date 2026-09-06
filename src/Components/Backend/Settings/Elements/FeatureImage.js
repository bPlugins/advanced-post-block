import { __ } from '@wordpress/i18n';
import { PanelBody, SelectControl, ToggleControl, __experimentalUnitControl as UnitControl } from '@wordpress/components';
import { InlineMediaUpload, HelpTooltip, Notice } from '../../../../../../bpl-tools/Components';
import { imageFittings } from '../../../../utils/options';
import { emUnit, perUnit, pxUnit } from '../../../../../../bpl-tools/utils/options';

const FeatureImage = ({ attributes, setAttributes, updateObj, imageSizes }) => {
	const { subLayout, isFImg, fImgSize, fImgFitting, isFImgLink, image = {} } = attributes;
	const { width = '100%', height = '60%', defaultImage = '' } = image || {};

	return <PanelBody className='bPlPanelBody' title={__('Feature Image', 'advanced-post-block')}>
		<ToggleControl label={__('Show Feature Image', 'advanced-post-block')} checked={isFImg} onChange={val => setAttributes({ isFImg: val })} />

		{isFImg && <>
			{!subLayout.includes('overlay') && <>
				<ToggleControl className='mt10' label={__('Enable Link', 'advanced-post-block')} checked={isFImgLink} onChange={val => setAttributes({ isFImgLink: val })} />
			</>}

			<SelectControl className='mt20' label={<>{__('Size:', 'advanced-post-block')} <HelpTooltip text={__('Select the image size (thumbnail, medium, large, full). Image may crop based on the image size.', 'advanced-post-block')} /></>} labelPosition='left' value={fImgSize} onChange={val => setAttributes({ fImgSize: val })} options={imageSizes} />

			{!subLayout.includes('overlay') && <>
				<UnitControl className='mt20' label={<>{__('Width:', 'advanced-post-block')} <HelpTooltip text={__('Define custom width for the post image.', 'advanced-post-block')} /></>} labelPosition='left' value={width} onChange={val => updateObj('image', val, 'width')} units={[pxUnit(), perUnit(), emUnit()]} />

				<UnitControl className='mt10' label={<>{__('Height:', 'advanced-post-block')} <HelpTooltip text={__('Define custom height for the post image.', 'advanced-post-block')} /></>} labelPosition='left' value={height} onChange={val => updateObj('image', val, 'height')} units={[pxUnit(), perUnit(), emUnit()]} />

				<Notice>{__('For specific ratios, set height to 100% (1:1), 56.25% (16:9), 75% (4:3), 66.67% (3:2), or 42.85% (21:9).', 'advanced-post-block')}</Notice>
			</>}

			<SelectControl className='mt20' label={<>{__('Fitting:', 'advanced-post-block')} <HelpTooltip text={__('Choose how the image should fit within its container.', 'advanced-post-block')} /></>} labelPosition='left' value={fImgFitting} onChange={val => setAttributes({ fImgFitting: val })} options={imageFittings} />

			<InlineMediaUpload className='mt20' label={__('Default Image:', 'advanced-post-block')} value={defaultImage} types={['image']} onChange={val => updateObj('image', val, 'defaultImage')} placeholder={__('Placeholder Image URL', 'advanced-post-block')} />
		</>}

		<Notice status='premium' isIcon={true}>{__('Image lazy loading and grayscale filters are available in the Premium version.', 'advanced-post-block')}</Notice>
	</PanelBody>
};
export default FeatureImage;
