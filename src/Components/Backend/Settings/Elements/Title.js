import { __ } from '@wordpress/i18n';
import { PanelBody, SelectControl, ToggleControl, RangeControl } from '@wordpress/components';
import { Badge, Label, HelpTooltip, Notice } from '../../../../../../bpl-tools/Components';

import { titleTags } from '../../../../utils/options';

const Title = ({ attributes, setAttributes, updateObj }) => {
	const { layout, isTitle, isTitleLink, title = {} } = attributes;
	const { tag = 'h3', limit = {} } = title || {};
	const { type = 'word', value = 10 } = limit || {};

	const isNewsTicker = 'newsTicker' === layout;

	return <PanelBody className='bPlPanelBody' title={__('Title', 'advanced-post-block')} initialOpen={isNewsTicker ? true : false}>
		<ToggleControl label={__('Show Title', 'advanced-post-block')} checked={isTitle} onChange={val => setAttributes({ isTitle: val })} />

		{isTitle && <>
			<ToggleControl className='mt10' label={__('Enable Title Link', 'advanced-post-block')} checked={isTitleLink} onChange={val => setAttributes({ isTitleLink: val })} />

			<SelectControl className='mt20' label={<>{__('Title Tag:', 'advanced-post-block')} <HelpTooltip text={__('Select the HTML tag for the post title (H1-H6, div, p, etc.).', 'advanced-post-block')} /></>} labelPosition='left' value={tag} options={titleTags} onChange={val => updateObj('title', val, 'tag')} />

			<Label>{__('Title Limit', 'advanced-post-block')} <Badge size='regular' /></Label>
			<SelectControl label={__('Limit Type:', 'advanced-post-block')} labelPosition='left' value={type} onChange={val => updateObj('title', val, 'limit', 'type')} options={[
				{ label: __('Word', 'advanced-post-block'), value: 'word' },
				{ label: __('Character', 'advanced-post-block'), value: 'char' }
			]} />

			<br />

			<RangeControl label={__('Limit Value:', 'advanced-post-block')} value={value} onChange={val => updateObj('title', val, 'limit', 'value')} min={1} max={500} />
		</>}

		<Notice status='premium' isIcon={true}>{__('Showing an ellipsis on truncated titles is available in the Premium version.', 'advanced-post-block')}</Notice>
	</PanelBody>
};
export default Title;
