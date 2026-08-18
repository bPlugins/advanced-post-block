import { __ } from '@wordpress/i18n';
import { PanelBody, SelectControl, TextControl, ToggleControl } from '@wordpress/components';

import { Badge, HelpTooltip, Notice } from '../../../../../../bpl-tools/Components';

import { PremiumBadge, PremiumPanel } from '../../../../../../bpl-tools/ProControls';

import { pricingUrl } from '../../../../utils/data';
import { categoriesPosition } from '../../../../utils/options';

const MetaData = ({ attributes, setAttributes, taxOfPostType, updateObj }) => {
	const { layout, postType, isMeta, isMetaAuthor, isMetaDate, isMetaCategory, metaCategoryIn, isMetaComment, meta = {} } = attributes;
	const { separator = '' } = meta || {};

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
			<TextControl className='mt10' label={<>{__('Separator:', 'advanced-post-block')} <Badge size='regular' /> <HelpTooltip text={__('Choose the separator character to display between meta data items.', 'advanced-post-block')} /></>} labelPosition='left' value={separator} onChange={val => updateObj('meta', val, 'separator')} />

			<br />

			<PanelBody className='bPlPanelBody' title={__('Author', 'advanced-post-block')} initialOpen={false}>
				<ToggleControl label={__('Show Author', 'advanced-post-block')} checked={isMetaAuthor} onChange={val => setAttributes({ isMetaAuthor: val })} />

				<Notice status='premium' isIcon={true}>{__('Author link and custom author icons are available in the Premium version.', 'advanced-post-block')}</Notice>
			</PanelBody>

			<PanelBody className='bPlPanelBody' title={__('Date', 'advanced-post-block')} initialOpen={false}>
				<ToggleControl label={__('Show Date', 'advanced-post-block')} checked={isMetaDate} onChange={val => setAttributes({ isMetaDate: val })} />

				<Notice status='premium' isIcon={true}>{__('Date as Time Ago, preset and custom data format, and date icons are available in the Premium version.', 'advanced-post-block')}</Notice>
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

			<PanelBody className='bPlPanelBody' title={<>
				{__('Reading Time', 'advanced-post-block')}
				<PremiumBadge />
			</>} initialOpen={false}>
				<PremiumPanel title={__('Reading Time', 'advanced-post-block')} description={__('Reading Time with seconds, label and custom icon are available in the Premium version.', 'advanced-post-block')} pricingUrl={pricingUrl} />
			</PanelBody>

			<PanelBody className='bPlPanelBody' title={__('Comment', 'advanced-post-block')} initialOpen={false}>
				<ToggleControl label={__('Show Comment', 'advanced-post-block')} checked={isMetaComment} onChange={val => setAttributes({ isMetaComment: val })} />

				{isMetaComment && <>
					<Notice>{__('Comment Count will be displayed if the comment status is open!', 'advanced-post-block')}</Notice>
				</>}

				<Notice status='premium' isIcon={true}>{__('Custom comment icon is available in the Premium version.', 'advanced-post-block')}</Notice>
			</PanelBody>

			<PanelBody className='bPlPanelBody' title={<>
				{__('View Count', 'advanced-post-block')}
				<PremiumBadge />
			</>} initialOpen={false}>
				<PremiumPanel title={__('View Count', 'advanced-post-block')} description={__('View count with custom icon is available in the Premium version.', 'advanced-post-block')} pricingUrl={pricingUrl} />
			</PanelBody>
		</>}

		<Notice status='premium' isIcon={true}>{__('Meta item gaps and drag-and-drop meta sorting are available in the Premium version.', 'advanced-post-block')}</Notice>
	</PanelBody>
}
export default MetaData;