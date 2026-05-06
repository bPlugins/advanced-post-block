/* eslint-disable no-console */
import { useState, useEffect } from 'react';
import { FormTokenField } from '@wordpress/components';
import apiFetch from '@wordpress/api-fetch';
import { useDebounce } from '@wordpress/compose';

const AsyncTokenField = ({ label, value = [], onChange, apiPath, __experimentalExpandOnFocus = true, ...props }) => {
	const [suggestions, setSuggestions] = useState([]);
	const [selectedTerms, setSelectedTerms] = useState([]);

	useEffect(() => {
		const queryChar = apiPath.includes('?') ? '&' : '?';

		// Fetch default suggestions to populate the dropdown when clicked
		apiFetch({ path: `${apiPath}${queryChar}per_page=20` })
			.then(terms => {
				const newTerms = terms.map(t => ({ id: t.id, name: t.name }));
				setSelectedTerms(prev => {
					const merged = [...prev];
					newTerms.forEach(nt => {
						if (!merged.find(m => m.id === nt.id)) merged.push(nt);
					});
					return merged;
				});
				setSuggestions(terms.map(t => t.name));
			})
			.catch(err => console.error(err));

		// Resolve names for currently selected IDs
		if (value && value.length > 0) {
			apiFetch({ path: `${apiPath}${queryChar}include=${value.join(',')}&per_page=100` })
				.then(terms => {
					setSelectedTerms(prev => {
						const merged = [...prev];
						terms.forEach(t => {
							if (!merged.find(m => m.id === t.id)) merged.push({ id: t.id, name: t.name });
						});
						return merged;
					});
				})
				.catch(err => console.error(err));
		}
	}, []);

	const fetchSuggestions = useDebounce((search) => {
		const queryChar = apiPath.includes('?') ? '&' : '?';
		const searchParam = search ? `search=${search}&` : '';

		apiFetch({ path: `${apiPath}${queryChar}${searchParam}per_page=20` })
			.then(terms => {
				const newTerms = terms.map(t => ({ id: t.id, name: t.name }));

				setSelectedTerms(prev => {
					const merged = [...prev];
					newTerms.forEach(nt => {
						if (!merged.find(m => m.id === nt.id)) {
							merged.push(nt);
						}
					});
					return merged;
				});

				setSuggestions(terms.map(t => t.name));
			})
			.catch(err => console.error(err));
	}, 500);

	const handleOnChange = (tokens) => {
		const newIds = tokens.map(token => {
			const term = selectedTerms.find(t => t.name === token);
			return term ? term.id : null;
		}).filter(Boolean);

		onChange(newIds);
	};

	return <FormTokenField
		label={label}
		value={(value || []).map(id => {
			const term = selectedTerms.find(t => t.id === id);
			return term ? term.name : '';
		}).filter(Boolean)}
		suggestions={suggestions}
		onInputChange={fetchSuggestions}
		onChange={handleOnChange}
		__experimentalExpandOnFocus={__experimentalExpandOnFocus}
		messages={{
			added: 'Added',
			removed: 'Removed',
			remove: 'Remove',
			__experimentalInvalid: 'Invalid item'
		}}
		{...props}
	/>
};
export default AsyncTokenField;
