import { __ } from '@wordpress/i18n';
import { PanelBody, PanelRow } from '@wordpress/components';

import { Label, ColorControl, BtnGroup, Typography, HelpTooltip } from '../../../../../../bpl-tools/Components';
import { SpaceControl } from '../../../../../../bpl-tools/Components/Deprecated';

import { aligns } from '../../../../utils/options';

const Excerpt = ({ attributes, setAttributes, updateObj }) => {
	const { isExcerpt, excerptAlign, excerptTypo, excerptColor, excerptMargin, excerpt = {} } = attributes;
	const { styles = {} } = excerpt || {};

	const { hoverColor = '' } = styles || {};

	if (!isExcerpt) return null;

	return <PanelBody className='bPlPanelBody' title={__('Excerpt', 'advanced-post-block')} initialOpen={false}>
		<PanelRow className='gap5'>
			<Label className=''>{__('Text Align:', 'advanced-post-block')}</Label>
			<BtnGroup value={excerptAlign} onChange={val => setAttributes({ excerptAlign: val })} options={aligns} isIcon={true} size='small' />
		</PanelRow>

		<Typography value={excerptTypo} onChange={val => setAttributes({ excerptTypo: val })} defaults={{ fontSize: { desktop: 15, tablet: 15, mobile: 15 } }} />

		<ColorControl label={__('Color:', 'advanced-post-block')} value={excerptColor} onChange={val => setAttributes({ excerptColor: val })} defaultColor='' />

		<ColorControl label={__('Hover Color:', 'advanced-post-block')} value={hoverColor} onChange={val => updateObj('excerpt', val, 'styles', 'hoverColor')} defaultColor='' />

		<SpaceControl className='mt20' label={<>{__('Margin:', 'advanced-post-block')} <HelpTooltip text={__('Space around the excerpt text.', 'advanced-post-block')} /></>} value={excerptMargin} onChange={val => setAttributes({ excerptMargin: val })} defaults={{ side: 4, bottom: '10px' }} />
	</PanelBody>
}
export default Excerpt;