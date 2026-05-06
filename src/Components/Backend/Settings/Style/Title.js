import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';

import { ColorControl, BtnGroup, Typography, HelpTooltip, Badge } from '../../../../../../bpl-tools/Components';
import { SpaceControl } from '../../../../../../bpl-tools/Components/Deprecated';
import { primaryColor } from '../../../../../../bpl-tools/utils/data';

import { aligns } from '../../../../utils/options';

const Title = ({ attributes, setAttributes, updateObj }) => {
	const { isTitle, titleTypo, titleColor, titleMargin, title = {} } = attributes;
	const { styles = {} } = title || {};

	const { textAlign = '', hoverColor = '' } = styles || {};

	if (!isTitle) return null;

	return <PanelBody className='bPlPanelBody' title={__('Title', 'advanced-post-block')} initialOpen={false}>
		<Typography value={titleTypo} onChange={val => setAttributes({ titleTypo: val })} defaults={{ fontSize: { desktop: 25, tablet: 22, mobile: 20 } }} />

		<BtnGroup label={<>{__('Text Align:', 'advanced-post-block')} <Badge /></>} value={textAlign} onChange={val => updateObj('title', val, 'styles', 'textAlign')} options={aligns?.filter(a => 'justify' !== a.value)} isIcon={true} size='small' />

		<ColorControl label={__('Color:', 'advanced-post-block')} value={titleColor} onChange={val => setAttributes({ titleColor: val })} defaultColor={primaryColor} />

		<ColorControl label={<>{__('Hover Color:', 'advanced-post-block')} <Badge /></>} value={hoverColor} onChange={val => updateObj('title', val, 'styles', 'hoverColor')} defaultColor='' />

		<SpaceControl className='mt20' label={<>{__('Margin:', 'advanced-post-block')} <HelpTooltip text={__('Space around the post title.', 'advanced-post-block')} /></>} value={titleMargin} onChange={val => setAttributes({ titleMargin: val })} defaults={{ side: 4, bottom: '15px' }} />
	</PanelBody>
}
export default Title;