import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
import { SortableControl, HelpTooltip } from '../../../../../../bpl-tools/Components';

const Sorting = ({ attributes, setAttributes }) => {
	const { layout, subLayout, elementsSort, isTitle, isMeta, isExcerpt } = attributes;

	// The accordion renders the title in the header, so it isn't sortable there.
	const isAccordion = 'accordion' === layout;

	const allPossible = [
		{ id: 'title', label: __('Title', 'advanced-post-block'), className: (isTitle && !isAccordion) ? '' : 'hide' },
		{ id: 'meta', label: __('Meta Data', 'advanced-post-block'), className: isMeta ? '' : 'hide' },
		{ id: 'excerpt', label: __('Excerpt', 'advanced-post-block'), className: (isExcerpt && !['title-meta', 'overlay-box', 'overlay-half-content'].includes(subLayout)) ? '' : 'hide' }
	];

	const sortingValue = [...new Set([...(elementsSort || []), ...allPossible.map(i => i.id)])]
		.map(id => allPossible.find(i => i.id === id))
		.filter(Boolean);

	return <PanelBody className='bPlPanelBody' title={__('Elements', 'advanced-post-block')}>
		<SortableControl
			label={<>{__('Sort Element:', 'advanced-post-block')} <HelpTooltip text={__('Drag and sort to reorder the appearance of the title, meta data and excerpt.', 'advanced-post-block')} /></>}
			value={sortingValue}
			property="label"
			onChange={val => setAttributes({ elementsSort: val.map(i => i.id) })}
		/>
	</PanelBody>
};

export default Sorting;
