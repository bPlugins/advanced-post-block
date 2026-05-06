import { __ } from '@wordpress/i18n';
import { PanelBody, TextControl, ToggleControl } from '@wordpress/components';
import { Label, HelpTooltip, Badge, Notice, BtnGroup } from '../../../../../../bpl-tools/Components';
import { readMoreIcons } from '../../../../utils/readMoreIcons';

const ReadMore = ({ attributes, setAttributes, updateObj }) => {
	const { isReadMore, readMoreLabel, isLinkNewTab, readMore = {} } = attributes;
	const { icon } = readMore || {};

	return <PanelBody className='bPlPanelBody' title={__('Read More', 'advanced-post-block')} initialOpen={false}>
		<ToggleControl label={__('Show Read More', 'advanced-post-block')} checked={isReadMore} onChange={val => setAttributes({ isReadMore: val })} />

		{isReadMore && <>
			<Label>{__('Read More Label:', 'advanced-post-block')} <HelpTooltip text={__('Custom text for the link button.', 'advanced-post-block')} /></Label>
			<TextControl value={readMoreLabel} onChange={val => setAttributes({ readMoreLabel: '' === val ? 'Read More' : val })} />

			<ToggleControl className='mt20' label={__('Open link in new tab', 'advanced-post-block')} checked={isLinkNewTab} onChange={val => setAttributes({ isLinkNewTab: val })} />

			<hr />
			<Label>{<>{__('Select Icon', 'advanced-post-block')} <Badge /></>}</Label>
			<BtnGroup value={icon} onChange={val => updateObj('readMore', val, 'icon')} options={readMoreIcons} isIcon={true} />
		</>}

		<Notice status='premium' isIcon={true}>{__('More icons, icon positioning, and gap adjustments are available in the Premium version.', 'advanced-post-block')}</Notice>
	</PanelBody>
};
export default ReadMore;
