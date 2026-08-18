import { __ } from '@wordpress/i18n';
import { TabPanel, PanelBody } from '@wordpress/components';

import { BoxControl, ColorControl, ColorsControl, Typography, HelpTooltip, Notice } from '../../../../../../bpl-tools/Components';
import { SpaceControl } from '../../../../../../bpl-tools/Components/Deprecated';

import { normalHoverTabs } from '../../../../../../bpl-tools/utils/options';
import { primaryColor } from '../../../../../../bpl-tools/utils/data';

const MetaData = (props) => {
	const { attributes, setAttributes, updateObj } = props;
	const { isMeta, metaCategoryIn, metaTypo, metaTextColor, metaLinkColor, metaIconColor, metaMargin, meta = {} } = attributes;
	const { styles = {} } = meta || {};

	const { hoverColor = '', linkHoverColor = '', iconHoverColor = '' } = styles || {};

	if (!isMeta) return null;

	return <PanelBody className='bPlPanelBody' title={__('Meta Data', 'advanced-post-block')} initialOpen={false}>
		<Typography className='mt15' value={metaTypo} onChange={val => setAttributes({ metaTypo: val })} defaults={{ fontSize: { desktop: 13, tablet: 13, mobile: 13 }, textTransform: 'uppercase' }} />

		<TabPanel className='bPlTabPanel small mt10' activeClass='activeTab' tabs={normalHoverTabs}>{tab => <>
			{'normal' === tab.name && <>
				<ColorControl label={__('Text Color:', 'advanced-post-block')} value={metaTextColor} onChange={val => setAttributes({ metaTextColor: val })} defaultColor='' />

				<ColorControl label={__('Link Color:', 'advanced-post-block')} value={metaLinkColor} onChange={val => setAttributes({ metaLinkColor: val })} defaultColor={primaryColor} />

				<ColorControl label={__('Icon Color:', 'advanced-post-block')} value={metaIconColor} onChange={val => setAttributes({ metaIconColor: val })} defaultColor='' />
			</>}

			{'hover' === tab.name && <>
				<ColorControl label={__('Text Hover Color:', 'advanced-post-block')} value={hoverColor} onChange={val => updateObj('meta', val, 'styles', 'hoverColor')} defaultColor='' />

				<ColorControl label={__('Link Hover Color:', 'advanced-post-block')} value={linkHoverColor} onChange={val => updateObj('meta', val, 'styles', 'linkHoverColor')} defaultColor='' />

				<ColorControl label={__('Icon Hover Color:', 'advanced-post-block')} value={iconHoverColor} onChange={val => updateObj('meta', val, 'styles', 'iconHoverColor')} defaultColor='' />
			</>}
		</>}</TabPanel>

		<hr />
		<SpaceControl className='mt20' label={<>{__('Margin:', 'advanced-post-block')} <HelpTooltip text={__('Space around the meta data elements.', 'advanced-post-block')} /></>} value={metaMargin} onChange={val => setAttributes({ metaMargin: val })} defaults={{ side: 4, bottom: '15px' }} />

		{['image', 'aboveContent'].includes(metaCategoryIn) && <>
			<hr />
			<CategoriesBadge {...props} />
		</>}

		<Notice status='premium' isIcon={true}>{__('Custom alignment and separator color are available in the Premium version.', 'advanced-post-block')}</Notice>
	</PanelBody>
}
export default MetaData;

const CategoriesBadge = ({ attributes, setAttributes, updateObj }) => {
	const { metaColorsOnImage, categoryOnImage = {} } = attributes;
	const { styles = {} } = categoryOnImage || {};

	const { margin = { top: '0px', right: '0px', bottom: '10px', left: '10px' } } = styles || {};

	return <PanelBody className='bPlPanelBody' title={__('Categories Badge', 'advanced-post-block')} initialOpen={false}>
		<ColorsControl label={__('Colors:', 'advanced-post-block')} value={metaColorsOnImage} onChange={val => setAttributes({ metaColorsOnImage: val })} defaults={{ color: '#fff', bg: primaryColor }} />

		<BoxControl className='mt20' label={__('Margin', 'advanced-post-block')} values={margin} onChange={val => updateObj('categoryOnImage', val, 'styles', 'margin')} />

		<Notice status='premium' isIcon={true}>{__('Precise padding and border radius controls for categories are available in the Premium version.', 'advanced-post-block')}</Notice>
	</PanelBody>
}