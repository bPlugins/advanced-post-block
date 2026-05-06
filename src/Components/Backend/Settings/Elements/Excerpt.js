import { __ } from '@wordpress/i18n';
import { PanelBody, RangeControl, SelectControl, ToggleControl } from '@wordpress/components';

import { Label, HelpTooltip, Notice } from '../../../../../../bpl-tools/Components';

const excerptFromOptions = [
	{ label: __('Excerpt', 'advanced-post-block'), value: 'excerpt' },
	{ label: __('Content', 'advanced-post-block'), value: 'content' }
];

const Excerpt = ({ attributes, setAttributes }) => {
	const { isExcerpt, isExcerptFromContent, excerpt = {}, excerptLength } = attributes;
	const { from = 'excerpt' } = excerpt || {};

	return <PanelBody className='bPlPanelBody' title={__('Excerpt', 'advanced-post-block')} initialOpen={false}>
		<ToggleControl label={__('Show Excerpt', 'advanced-post-block')} checked={isExcerpt} onChange={val => setAttributes({ isExcerpt: val })} />

		{isExcerpt && <>
			<SelectControl className='mt20' label={<>{__('Excerpt From:', 'advanced-post-block')} <HelpTooltip text={__('Choose where to pull the excerpt text from: the manual excerpt field, the post content, or an SEO meta description.', 'advanced-post-block')} /></>} labelPosition='left' value={from} onChange={val => setAttributes({
				excerpt: { ...excerpt, from: val },
				isExcerptFromContent: false
			})} options={excerptFromOptions} />

			<Label className='mt20'>{__('Excerpt Length:', 'advanced-post-block')} <HelpTooltip text={__('Number of words to show in the excerpt. Set -1 to show all content.', 'advanced-post-block')} /></Label>
			<RangeControl value={excerptLength} onChange={val => setAttributes({ excerptLength: val })} min={-1} max={120} step={1} />
			<Notice>{__(`Set -1 to show all the ${('content' === from || isExcerptFromContent) ? 'content' : 'excerpt'}`, 'advanced-post-block')}</Notice>
		</>}

		<Notice status='premium' isIcon={true}>{__('SEO meta content and precise ellipsis control are available in the Premium version.', 'advanced-post-block')}</Notice>
	</PanelBody>
};
export default Excerpt;
