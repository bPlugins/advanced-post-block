import { __ } from '@wordpress/i18n';
import { PanelBody, PanelRow } from '@wordpress/components';

import { Label, Background, BtnGroup, HelpTooltip } from '../../../../../../bpl-tools/Components';
import { SpaceControl } from '../../../../../../bpl-tools/Components/Deprecated';

import { aligns } from '../../../../utils/options';

const Content = ({ attributes, setAttributes }) => {
	const { layout, contentAlign, contentBG, hoverContentBG, contentPadding } = attributes;

	const isNewsTicker = 'newsTicker' === layout;

	return <PanelBody className='bPlPanelBody' title={__('Content', 'advanced-post-block')} initialOpen={false}>
		{!isNewsTicker && <PanelRow className='gap5'>
			<Label className=''>{__('Text Align:', 'advanced-post-block')}</Label>
			<BtnGroup value={contentAlign} onChange={val => setAttributes({ contentAlign: val })} options={aligns} isIcon={true} size='small' />
		</PanelRow>}

		<Background label={<>{__('Background', 'advanced-post-block')} <HelpTooltip text={__('Apply a color, image, or gradient to the post box.', 'advanced-post-block')} /></>} value={contentBG} onChange={val => setAttributes({ contentBG: val })} defaults={{ color: '' }} />

		<Background label={<>{__('Hover Background', 'advanced-post-block')} <HelpTooltip text={__('Apply a color, image, or gradient to the post box.', 'advanced-post-block')} /></>} value={hoverContentBG} onChange={val => setAttributes({ hoverContentBG: val })} defaults={{ color: '' }} />

		{!isNewsTicker && <SpaceControl className='mt20' label={<>{__('Padding:', 'advanced-post-block')} <HelpTooltip text={__('Space inside the post container.', 'advanced-post-block')} /></>} value={contentPadding} onChange={val => setAttributes({ contentPadding: val })} defaults={{ vertical: '20px', horizontal: '25px' }} />}
	</PanelBody>
}
export default Content;