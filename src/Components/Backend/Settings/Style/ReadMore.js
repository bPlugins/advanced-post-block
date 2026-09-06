import { __ } from '@wordpress/i18n';
import { TabPanel, PanelBody, PanelRow, SelectControl } from '@wordpress/components';

import { Label, BtnGroup, ColorsControl, Typography, HelpTooltip, ShadowControl, Notice } from '../../../../../../bpl-tools/Components';
import { BorderControl, SpaceControl } from '../../../../../../bpl-tools/Components/Deprecated';
import { normalHoverTabs } from '../../../../../../bpl-tools/utils/options';
import { primaryColor, secondaryColor } from '../../../../../../bpl-tools/utils/data';

import { aligns } from '../../../../utils/options';

const ReadMore = ({ attributes, setAttributes, updateObj }) => {
	const { isReadMore, readMoreAlign, readMoreTypo, readMoreColors, readMoreHovColors, readMorePadding, readMoreBorder, readMore = {} } = attributes;
	const { styles = {} } = readMore || {};

	const { shadow = [], hoverBorder = { radius: '3px' }, hoverShadow = [], hoverAnimation = 'none' } = styles || {};

	if (!isReadMore) return null;

	return <PanelBody className='bPlPanelBody' title={__('Read More', 'advanced-post-block')} initialOpen={false}>
		<PanelRow className='gap5'>
			<Label className=''>{__('Button Align:', 'advanced-post-block')}</Label>
			<BtnGroup value={readMoreAlign} onChange={val => setAttributes({ readMoreAlign: val })} options={aligns.filter(a => a.value !== 'justify')} isIcon={true} />
		</PanelRow>

		<Typography value={readMoreTypo} onChange={val => setAttributes({ readMoreTypo: val })} defaults={{ fontSize: { desktop: 14, tablet: 14, mobile: 14 }, textTransform: 'uppercase', fontWeight: 600 }} />

		<SpaceControl className='mt20' label={__('Padding:', 'advanced-post-block')} value={readMorePadding} onChange={val => setAttributes({ readMorePadding: val })} defaults={{ vertical: '12px', horizontal: '35px' }} />

		<TabPanel className='bPlTabPanel small mt20' activeClass='activeTab' tabs={normalHoverTabs}>{tab => <>
			{'normal' === tab.name && <>
				<ColorsControl className='mt10' label={<>{__('Colors:', 'advanced-post-block')} <HelpTooltip text={__('Set button text and background colors.', 'advanced-post-block')} /></>} value={readMoreColors} onChange={val => setAttributes({ readMoreColors: val })} defaults={{ color: '#fff', bg: primaryColor }} />

				<BorderControl label={__('Border:', 'advanced-post-block')} value={readMoreBorder} onChange={val => setAttributes({ readMoreBorder: val })} defaults={{ radius: '3px' }} />

				<ShadowControl className='mt10' label={__('Shadow:', 'advanced-post-block')} value={shadow} onChange={val => updateObj('readMore', val, 'styles', 'shadow')} />
			</>}

			{'hover' === tab.name && <>
				<ColorsControl className='mt10' label={__('Hover Colors:', 'advanced-post-block')} value={readMoreHovColors} onChange={val => setAttributes({ readMoreHovColors: val })} defaults={{ color: '#fff', bg: secondaryColor }} />

				<BorderControl className='mt10' label={__('Hover Border:', 'advanced-post-block')} value={hoverBorder} onChange={val => updateObj('readMore', val, 'styles', 'hoverBorder')} defaults={{ radius: '3px' }} />

				<ShadowControl className='mt10' label={__('Hover Shadow:', 'advanced-post-block')} value={hoverShadow} onChange={val => updateObj('readMore', val, 'styles', 'hoverShadow')} />

				<SelectControl className='mt10' label={__('Hover Animation:', 'advanced-post-block')} labelPosition='left' value={hoverAnimation} onChange={val => updateObj('readMore', val, 'styles', 'hoverAnimation')} options={[
					{ label: __('None', 'advanced-post-block'), value: 'none' },
					{ label: __('Zoom In', 'advanced-post-block'), value: 'zoom-in' },
					{ label: __('Zoom Out', 'advanced-post-block'), value: 'zoom-out' }
				]} />
			</>}
		</>}</TabPanel>

		<Notice status='premium' isIcon={true}>{__('The interactive pulse hover animation is available in the Premium version.', 'advanced-post-block')}</Notice>
	</PanelBody>
}
export default ReadMore;