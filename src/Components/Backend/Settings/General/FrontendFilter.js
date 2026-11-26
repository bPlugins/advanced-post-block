import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import { PanelBody, SelectControl, TextControl, ToggleControl } from '@wordpress/components';

import { HelpTooltip, Notice } from '../../../../../../bpl-tools/Components';
import { updateData } from '../../../../../../bpl-tools/utils/functions';

import { fillFilter, supportsFilter, taxonomyFacetDefaults, filterTaxonomies } from '../../../../utils/filter';
import AsyncTokenField from './AsyncTokenField';

const FrontendFilter = ({ attributes, setAttributes }) => {
	const { layout, postType = 'post', frontendFilter } = attributes;

	const filter = fillFilter(frontendFilter);
	const { enabled, alignment, taxonomies, resultCount, reset, noResults } = filter;

	// Every write starts from the filled-in settings, so a block saved by an older version
	// never ends up with half an object.
	const update = (val, ...path) => setAttributes({ frontendFilter: updateData(filter, val, ...path) });

	// Categories and Tags, when the block's post type uses them.
	const postTaxonomies = useSelect(select => {
		const all = select('core').getTaxonomies({ per_page: -1 });

		return (all || []).filter(tax => filterTaxonomies.includes(tax.slug) && tax.types.includes(postType));
	}, [postType]);

	// The block offers one taxonomy filter: the first one on Categories or Tags.
	const facetIndex = taxonomies.findIndex(facet => filterTaxonomies.includes(facet.taxonomy));
	const facet = -1 < facetIndex ? taxonomies[facetIndex] : { ...taxonomyFacetDefaults, taxonomy: postTaxonomies[0]?.slug || 'category' };
	const taxonomy = postTaxonomies.find(tax => tax.slug === facet.taxonomy);

	const updateFacet = values => {
		const next = { ...facet, ...values };
		update(-1 < facetIndex ? taxonomies.map((f, i) => i === facetIndex ? next : f) : [next, ...taxonomies], 'taxonomies');
	};

	if (!supportsFilter(layout)) {
		return <PanelBody className='bPlPanelBody' title={__('Frontend Filter', 'advanced-post-block')} initialOpen={false}>
			<Notice status='warning'>{__('The frontend filter is not available for the Ticker and News Ticker layouts.', 'advanced-post-block')}</Notice>
		</PanelBody>;
	}

	return <PanelBody className='bPlPanelBody' title={__('Frontend Filter', 'advanced-post-block')} initialOpen={false}>
		<ToggleControl
			label={<>{__('Enable Frontend Filter', 'advanced-post-block')} <HelpTooltip text={__('Let visitors narrow the posts without reloading the page.', 'advanced-post-block')} /></>}
			checked={enabled}
			onChange={val => update(val, 'enabled')}
		/>

		{enabled && <>
			<SelectControl className='mt20' label={__('Alignment:', 'advanced-post-block')} labelPosition='left' value={alignment} onChange={val => update(val, 'alignment')} options={[
				{ label: __('Left', 'advanced-post-block'), value: 'left' },
				{ label: __('Center', 'advanced-post-block'), value: 'center' },
				{ label: __('Right', 'advanced-post-block'), value: 'right' }
			]} />

			{postTaxonomies.length ? <>
				<SelectControl
					className='mt20'
					label={__('Filter By:', 'advanced-post-block')}
					labelPosition='left'
					value={facet.taxonomy}
					onChange={val => updateFacet({ taxonomy: val, terms: [] })}
					options={postTaxonomies.map(tax => ({ label: tax.name, value: tax.slug }))}
				/>

				<TextControl className='mt20' label={<>{__('Label:', 'advanced-post-block')} <HelpTooltip text={__('Shown before the choices. Leave empty to hide it.', 'advanced-post-block')} /></>} value={facet.label} onChange={val => updateFacet({ label: val })} />

				<TextControl className='mt20' label={__('"All" Label:', 'advanced-post-block')} value={facet.allLabel} onChange={val => updateFacet({ allLabel: val })} />

				<ToggleControl className='mt20' label={<>{__('Hide Empty Terms', 'advanced-post-block')} <HelpTooltip text={__('Leave out terms that have no posts in this block\'s query.', 'advanced-post-block')} /></>} checked={facet.hideEmpty} onChange={val => updateFacet({ hideEmpty: val })} />

				{taxonomy && <AsyncTokenField
					key={facet.taxonomy}
					label={<>{__('Only These Terms:', 'advanced-post-block')} <HelpTooltip text={__('Leave empty to offer every term.', 'advanced-post-block')} /></>}
					value={facet.terms || []}
					onChange={ids => updateFacet({ terms: ids })}
					apiPath={`/wp/v2/${taxonomy.rest_base || taxonomy.slug}`}
				/>}
			</> : <Notice status='warning'>{__('The filter works with Categories or Tags, and the selected post type uses neither.', 'advanced-post-block')}</Notice>}

			<ToggleControl className='mt20' label={__('Show Result Count', 'advanced-post-block')} checked={resultCount.enabled} onChange={val => update(val, 'resultCount', 'enabled')} />

			<ToggleControl className='mt20' label={__('Show Clear Button', 'advanced-post-block')} checked={reset.enabled} onChange={val => update(val, 'reset', 'enabled')} />

			{reset.enabled && <TextControl className='mt10' label={__('Clear Button Label:', 'advanced-post-block')} value={reset.label} onChange={val => update(val, 'reset', 'label')} />}

			<TextControl className='mt20' label={__('No Results Text:', 'advanced-post-block')} value={noResults.text} onChange={val => update(val, 'noResults', 'text')} />
		</>}

		<Notice status='premium' isIcon={true}>{__('More filters on any taxonomy, dropdown, checkbox and searchable dropdown styles, multiple choices, post counts, sidebar positions, an Apply button, search, sort, author and month filters, active filter chips, and shareable filter URLs are available in the Premium version.', 'advanced-post-block')}</Notice>
	</PanelBody>;
};
export default FrontendFilter;
