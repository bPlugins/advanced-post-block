import { __ } from '@wordpress/i18n';
import { PanelBody, SelectControl, TextControl, ToggleControl } from '@wordpress/components';

import { Badge, HelpTooltip, Notice } from '../../../../../../bpl-tools/Components';

import { PremiumBadge, PremiumPanel } from '../../../../../../bpl-tools/ProControls';

import { pricingUrl } from '../../../../utils/data';
import { categoriesPosition } from '../../../../utils/options';

const MetaData = ({ attributes, setAttributes, taxOfPostType, updateObj }) => {
	const { layout, postType, isMeta, isMetaAuthor, isMetaAuthorLink, isMetaDate, isMetaCategory, metaCategoryIn, isMetaReadTime, metaReadTimeLabel, isMetaComment, meta = {} } = attributes;
	const { separator = '', date = {}, viewCount = {} } = meta || {};

	const isAccordion = 'accordion' === layout;
	const categoryPositions = isAccordion
		? [
			{ label: __('With Meta', 'advanced-post-block'), value: 'content' },
			{ label: __('With Title', 'advanced-post-block'), value: 'aboveContent' }
		]
		: categoriesPosition;

	return <PanelBody className='bPlPanelBody' title={__('Meta Data', 'advanced-post-block')} initialOpen={false}>
		<ToggleControl label={__('Show Meta Data', 'advanced-post-block')} checked={isMeta} onChange={val => setAttributes({ isMeta: val })} />

		{isMeta && <>
			<TextControl className='mt10' label={<>{__('Separator:', 'advanced-post-block')} <HelpTooltip text={__('Choose the separator character to display between meta data items.', 'advanced-post-block')} /></>} labelPosition='left' value={separator} onChange={val => updateObj('meta', val, 'separator')} />

			<br />

			<PanelBody className='bPlPanelBody' title={__('Author', 'advanced-post-block')} initialOpen={false}>
				<ToggleControl label={__('Show Author', 'advanced-post-block')} checked={isMetaAuthor} onChange={val => setAttributes({ isMetaAuthor: val })} />

				{isMetaAuthor && <ToggleControl className='mt10' label={<>{__('Author Link', 'advanced-post-block')} <Badge size='regular' /></>} checked={isMetaAuthorLink} onChange={val => setAttributes({ isMetaAuthorLink: val })} />}

				<Notice status='premium' isIcon={true}>{__('Custom author icons are available in the Premium version.', 'advanced-post-block')}</Notice>
			</PanelBody>

			<PanelBody className='bPlPanelBody' title={__('Date', 'advanced-post-block')} initialOpen={false}>
				<ToggleControl label={__('Show Date', 'advanced-post-block')} checked={isMetaDate} onChange={val => setAttributes({ isMetaDate: val })} />

				{isMetaDate && <ToggleControl className='mt10' label={<>{__('Date as Time Ago', 'advanced-post-block')} <Badge size='regular' /></>} checked={date.timeAgo} onChange={val => updateObj('meta', val, 'date', 'timeAgo')} />}

				<Notice status='premium' isIcon={true}>{__('Preset and custom date formats and date icons are available in the Premium version.', 'advanced-post-block')}</Notice>
			</PanelBody>

			{'post' === postType && <PanelBody className='bPlPanelBody' title={__('Category', 'advanced-post-block')} initialOpen={false}>
				<ToggleControl label={__('Show Category', 'advanced-post-block')} checked={isMetaCategory} onChange={val => setAttributes({ isMetaCategory: val })} />

				{isMetaCategory && <>
					<SelectControl className='mt20' label={<>{__('Category Position:', 'advanced-post-block')} <HelpTooltip text={__('Choose where the category labels appear: overlaid on the image or inside the content area.', 'advanced-post-block')} /></>} value={metaCategoryIn} onChange={val => {
						setAttributes({ metaCategoryIn: val });

						if ('image' === val) {
							updateObj('categoryOnImage', { top: '10px', right: '10px', bottom: '10px', left: '10px' }, 'styles', 'margin');
						} else if ('aboveContent' === val) {
							updateObj('categoryOnImage', { top: '0px', right: '0px', bottom: '15px', left: '0px' }, 'styles', 'margin');
						}
					}} options={categoryPositions} />
				</>}
				<Notice status='premium' isIcon={true}>{__('Custom positions, icons, and overlay settings are available in the Premium version.', 'advanced-post-block')}</Notice>
			</PanelBody>}

			{taxOfPostType?.length > 0 && <PanelBody className='bPlPanelBody' title={<>
				{__('Taxonomies', 'advanced-post-block')}
				<PremiumBadge />
			</>} initialOpen={false}>
				<PremiumPanel title={__('Taxonomy Filter', 'advanced-post-block')} description={__('Tags and custom taxonomies with custom icons are available in the Premium version.', 'advanced-post-block')} pricingUrl={pricingUrl} />
			</PanelBody>}

			<PanelBody className='bPlPanelBody' title={<>{__('Reading Time', 'advanced-post-block')} <Badge size='regular' /></>} initialOpen={false}>
				<ToggleControl label={<>{__('Show Reading Time', 'advanced-post-block')} <HelpTooltip text={__('Estimated time to read the post content based on word count.', 'advanced-post-block')} /></>} checked={isMetaReadTime} onChange={val => setAttributes({ isMetaReadTime: val })} />

				{isMetaReadTime && <>
					<Notice>{__('Reading Time will be displayed if the post has content!', 'advanced-post-block')}</Notice>

					<TextControl className='mt10' label={__('Reading Time Label:', 'advanced-post-block')} value={metaReadTimeLabel} onChange={val => setAttributes({ metaReadTimeLabel: val })} placeholder={__('Reading Time Label', 'advanced-post-block')} />
				</>}

				<Notice status='premium' isIcon={true}>{__('Reading time with seconds and a custom reading time icon are available in the Premium version.', 'advanced-post-block')}</Notice>
			</PanelBody>

			<PanelBody className='bPlPanelBody' title={__('Comment', 'advanced-post-block')} initialOpen={false}>
				<ToggleControl label={__('Show Comment', 'advanced-post-block')} checked={isMetaComment} onChange={val => setAttributes({ isMetaComment: val })} />

				{isMetaComment && <>
					<Notice>{__('Comment Count will be displayed if the comment status is open!', 'advanced-post-block')}</Notice>
				</>}

				<Notice status='premium' isIcon={true}>{__('Custom comment icon is available in the Premium version.', 'advanced-post-block')}</Notice>
			</PanelBody>

			<PanelBody className='bPlPanelBody' title={<>{__('View Count', 'advanced-post-block')} <Badge size='regular' /></>} initialOpen={false}>
				<ToggleControl label={__('Show View Count', 'advanced-post-block')} checked={viewCount.isVisible} onChange={val => updateObj('meta', val, 'viewCount', 'isVisible')} />

				<Notice status='premium' isIcon={true}>{__('Custom view count icon is available in the Premium version.', 'advanced-post-block')}</Notice>
			</PanelBody>
		</>}

		<Notice status='premium' isIcon={true}>{__('Meta item gaps and drag-and-drop meta sorting are available in the Premium version.', 'advanced-post-block')}</Notice>
	</PanelBody>
}
export default MetaData;