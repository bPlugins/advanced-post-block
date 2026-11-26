import { __ } from '@wordpress/i18n';

import { prefix } from '../../../utils/data';
import TaxonomyFacet from './TaxonomyFacet';

/**
 * The filter bar above the posts.
 *
 * @param {Object}		filter		Settings from getFilter().
 * @param {Object}		facets		Choices each filter offers.
 * @param {Object}		selection	The applied pick.
 * @param {Function}	onChange	Receives the new pick.
 */
const FilterBar = ({ filter, facets, selection, onChange }) => {
	const { alignment, taxonomies } = filter;

	return <form className={`${prefix}Filter ${prefix}FilterAlign-${alignment}`} role='search' aria-label={__('Filter posts', 'advanced-post-block')} onSubmit={e => e.preventDefault()}>
		<div className={`${prefix}FilterFields`}>
			{taxonomies.map(facet => <TaxonomyFacet
				key={facet.taxonomy}
				facet={facet}
				data={facets?.taxonomies?.[facet.taxonomy]}
				value={selection.tax[facet.taxonomy] || []}
				onChange={slugs => onChange({ ...selection, tax: { ...selection.tax, [facet.taxonomy]: slugs } })}
			/>)}
		</div>
	</form>;
};
export default FilterBar;
