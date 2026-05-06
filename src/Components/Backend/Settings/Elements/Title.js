import { __ } from '@wordpress/i18n';
import { PanelBody, SelectControl, ToggleControl } from '@wordpress/components';
import { HelpTooltip, Badge, Notice } from '../../../../../../bpl-tools/Components';

import { titleTags } from '../../../../utils/options';

const Title = ({ attributes, setAttributes, updateObj }) => {
	const { layout, isTitle, isTitleLink, title = {} } = attributes;
	const { tag = 'h3' } = title || {};

	const isNewsTicker = 'newsTicker' === layout;

	return <PanelBody className='bPlPanelBody' title={__('Title', 'advanced-post-block')} initialOpen={isNewsTicker ? true : false}>
		<ToggleControl label={__('Show Title', 'advanced-post-block')} checked={isTitle} onChange={val => setAttributes({ isTitle: val })} />

		{isTitle && <>
			<ToggleControl className='mt10' label={__('Enable Title Link', 'advanced-post-block')} checked={isTitleLink} onChange={val => setAttributes({ isTitleLink: val })} />

			<SelectControl className='mt20' label={<>{__('Title Tag:', 'advanced-post-block')} <HelpTooltip text={__('Select the HTML tag for the post title (H1-H6, div, p, etc.).', 'advanced-post-block')} /> <Badge /></>} labelPosition='left' value={tag} options={titleTags} onChange={val => updateObj('title', val, 'tag')} />
		</>}

		<Notice status='premium' isIcon={true}>{__('Title words or characters limits with ellipsis is available in the Premium version.', 'advanced-post-block')}</Notice>
	</PanelBody>
};
export default Title;
