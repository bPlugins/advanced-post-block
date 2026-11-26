import { prefix } from '../../../utils/data';

/**
 * One taxonomy filter, drawn as pills. One term can be picked at a time.
 *
 * @param {Object}		facet		The filter's settings.
 * @param {Object}		data		{ name, terms } from the server.
 * @param {string[]}	value		Selected term slug.
 * @param {Function}	onChange	Receives the new list of slugs.
 */
const TaxonomyFacet = ({ facet, data, value = [], onChange }) => {
	const { taxonomy, label, allLabel } = facet;
	const { name = taxonomy, terms = [] } = data || {};

	if (!terms.length) return null;

	const isActive = slug => value.includes(slug);

	return <fieldset className={`${prefix}FilterGroup ${prefix}FilterGroupPills`}>
		<legend className={`${prefix}FilterLabel ${label ? '' : `${prefix}SrOnly`}`}>{label || name}</legend>

		<div className={`${prefix}FilterPills`}>
			{allLabel && <button type='button' className={`${prefix}FilterItem ${value.length ? '' : 'active'}`} aria-pressed={!value.length} onClick={() => onChange([])}>{allLabel}</button>}

			{terms.map(term => <button key={term.id} type='button' className={`${prefix}FilterItem ${isActive(term.slug) ? 'active' : ''}`} aria-pressed={isActive(term.slug)} onClick={() => onChange(isActive(term.slug) ? [] : [term.slug])}>
				{term.name}
			</button>)}
		</div>
	</fieldset>;
};
export default TaxonomyFacet;
