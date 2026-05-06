import { __ } from '@wordpress/i18n';
import { TabPanel, PanelBody, __experimentalBorderBoxControl, BorderBoxControl as BBControl, SelectControl } from '@wordpress/components';
const BorderBoxControl = BBControl || __experimentalBorderBoxControl;

import { BoxControl, ShadowControl, Badge, Notice } from '../../../../../../bpl-tools/Components';
import { normalHoverTabs } from '../../../../../../bpl-tools/utils/options';

const FeatureImage = ({ attributes, updateObj }) => {
	const { subLayout, image = {} } = attributes;
	const { styles = {} } = image || {};

	const { border = { width: '0px', style: 'none' }, radius = { top: '0px', right: '0px', bottom: '0px', left: '0px' }, shadow = [], hoverShadow = [], margin = { top: '', right: '', bottom: '', left: '' }, hoverAnimation = 'none' } = styles || {};

	return <PanelBody className='bPlPanelBody' title={__('Feature Image', 'advanced-post-block')} initialOpen={false}>
		<TabPanel className='bPlTabPanel small' activeClass='activeTab' tabs={normalHoverTabs}>{tab => <>
			{'normal' === tab.name && <>
				{!subLayout.includes('overlay') && <>
					<BorderBoxControl className='mt20' label={<>{__('Border', 'advanced-post-block')} <Badge /></>} value={border} onChange={val => updateObj('image', val, 'styles', 'border')} />

					<BoxControl className='mt10' label={<>{__('Radius', 'advanced-post-block')} <Badge /></>} values={radius} onChange={val => updateObj('image', val, 'styles', 'radius')} />

					<ShadowControl className='mt20' label={<>{__('Shadow:', 'advanced-post-block')} <Badge /></>} value={shadow} onChange={val => updateObj('image', val, 'styles', 'shadow')} />

					<BoxControl className='mt10' label={<>{__('Margin', 'advanced-post-block')} <Badge /></>} values={margin} onChange={val => updateObj('image', val, 'styles', 'margin')} />
				</>}
			</>}

			{'hover' === tab.name && <>
				<SelectControl className='mt20' label={<>{__('Animation:', 'advanced-post-block')} <Badge /></>} labelPosition='left' value={hoverAnimation} onChange={val => updateObj('image', val, 'styles', 'hoverAnimation')} options={[
					{ label: __('None', 'advanced-post-block'), value: 'none' },
					{ label: __('Zoom In', 'advanced-post-block'), value: 'zoom-in' },
					{ label: __('Zoom Out', 'advanced-post-block'), value: 'zoom-out' }
				]} />

				{!subLayout.includes('overlay') && <>
					<ShadowControl className='mt20' label={<>{__('Hover Shadow:', 'advanced-post-block')} <Badge /></>} value={hoverShadow} onChange={val => updateObj('image', val, 'styles', 'hoverShadow')} />
				</>}
			</>}
		</>}</TabPanel>

		<Notice status='premium' isIcon={true}>{__('Grayscale filters, hover effects, and image animations are available in the Premium version.', 'advanced-post-block')}</Notice>
	</PanelBody>
}
export default FeatureImage;