import { __ } from '@wordpress/i18n';
import { TabPanel, PanelBody, ToggleControl, __experimentalBorderBoxControl, BorderBoxControl as BBControl, SelectControl } from '@wordpress/components';
const BorderBoxControl = BBControl || __experimentalBorderBoxControl;

import { Badge, BoxControl, ShadowControl, Notice } from '../../../../../../bpl-tools/Components';
import { normalHoverTabs } from '../../../../../../bpl-tools/utils/options';

const FeatureImage = ({ attributes, updateObj }) => {
	const { subLayout, image = {} } = attributes;
	const { styles = {} } = image || {};

	const { grayScale = false, hoverGrayScale = false, border = { width: '0px', style: 'none' }, radius = { top: '0px', right: '0px', bottom: '0px', left: '0px' }, hoverRadius = { top: '0px', right: '0px', bottom: '0px', left: '0px' }, shadow = [], hoverShadow = [], margin = { top: '', right: '', bottom: '', left: '' }, hoverAnimation = 'none' } = styles || {};

	return <PanelBody className='bPlPanelBody' title={__('Feature Image', 'advanced-post-block')} initialOpen={false}>
		<TabPanel className='bPlTabPanel small' activeClass='activeTab' tabs={normalHoverTabs}>{tab => <>
			{'normal' === tab.name && <>
				<ToggleControl className='mt10' label={<>{__('Grayscale', 'advanced-post-block')} <Badge size='regular' /></>} checked={grayScale} onChange={val => updateObj('image', val, 'styles', 'grayScale')} />

				{!subLayout.includes('overlay') && <>
					<BorderBoxControl className='mt20' label={__('Border', 'advanced-post-block')} value={border} onChange={val => updateObj('image', val, 'styles', 'border')} />

					<BoxControl className='mt10' label={__('Radius', 'advanced-post-block')} values={radius} onChange={val => updateObj('image', val, 'styles', 'radius')} />

					<ShadowControl className='mt20' label={__('Shadow:', 'advanced-post-block')} value={shadow} onChange={val => updateObj('image', val, 'styles', 'shadow')} />

					<BoxControl className='mt10' label={__('Margin', 'advanced-post-block')} values={margin} onChange={val => updateObj('image', val, 'styles', 'margin')} />
				</>}
			</>}

			{'hover' === tab.name && <>
				<ToggleControl className='mt10' label={<>{__('Hover Grayscale', 'advanced-post-block')} <Badge size='regular' /></>} checked={hoverGrayScale} onChange={val => updateObj('image', val, 'styles', 'hoverGrayScale')} />

				<SelectControl className='mt20' label={__('Animation:', 'advanced-post-block')} labelPosition='left' value={hoverAnimation} onChange={val => updateObj('image', val, 'styles', 'hoverAnimation')} options={[
					{ label: __('None', 'advanced-post-block'), value: 'none' },
					{ label: __('Zoom In', 'advanced-post-block'), value: 'zoom-in' },
					{ label: __('Zoom Out', 'advanced-post-block'), value: 'zoom-out' }
				]} />

				{!subLayout.includes('overlay') && <>
					<BoxControl className='mt20' label={__('Hover Radius', 'advanced-post-block')} values={hoverRadius} onChange={val => updateObj('image', val, 'styles', 'hoverRadius')} />

					<ShadowControl className='mt20' label={__('Hover Shadow:', 'advanced-post-block')} value={hoverShadow} onChange={val => updateObj('image', val, 'styles', 'hoverShadow')} />
				</>}
			</>}
		</>}</TabPanel>

		<Notice status='premium' isIcon={true}>{__('The Scale Up hover animation is available in the Premium version.', 'advanced-post-block')}</Notice>
	</PanelBody>
}
export default FeatureImage;