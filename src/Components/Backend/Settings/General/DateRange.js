import { __ } from '@wordpress/i18n';
import { SelectControl, TextControl, PanelRow, __experimentalNumberControl as NumberControl } from '@wordpress/components';
import { HelpTooltip } from '../../../../../../bpl-tools/Components';

// The attribute is a WP_Query date_query clause; `range` only tells the editor which controls to show.
// Posts::dateClause() accepts exactly the values this panel can save.

const rangeOptions = [
	{ label: __('Any Time', 'advanced-post-block'), value: '' },
	{ label: __('In the Last…', 'advanced-post-block'), value: 'last' },
	{ label: __('Custom Range', 'advanced-post-block'), value: 'custom' }
];

const unitOptions = [
	{ label: __('Days', 'advanced-post-block'), value: 'day' },
	{ label: __('Weeks', 'advanced-post-block'), value: 'week' },
	{ label: __('Months', 'advanced-post-block'), value: 'month' },
	{ label: __('Years', 'advanced-post-block'), value: 'year' }
];

// "30 days ago" ↔ { amount: 30, unit: 'day' }
const parseLast = after => {
	const match = /^(\d+) (day|week|month|year)s? ago$/.exec(after || '');
	return match ? { amount: parseInt(match[1], 10), unit: match[2] } : { amount: 30, unit: 'day' };
};
const lastAfter = (amount, unit) => `${amount} ${unit}${1 === amount ? '' : 's'} ago`;

const startOf = {
	'': { after: '', before: '' },
	last: { after: lastAfter(30, 'day'), before: '' },
	custom: { after: '', before: '' }
};

const DateRange = ({ attributes, setAttributes }) => {
	const { dateQuery = {} } = attributes;
	const { range = '', after = '', before = '' } = dateQuery || {};

	// Spreading keeps premium values (such as the date field) a block may carry from the Pro plugin.
	const update = patch => setAttributes({ dateQuery: { ...dateQuery, ...patch } });

	// A range only the Pro plugin offers counts as "Any Time" here, as it does on the server.
	const value = startOf[range] ? range : '';

	const { amount, unit } = parseLast(after);
	const setLast = (nextAmount, nextUnit) => update({ after: lastAfter(Math.min(9999, Math.max(1, parseInt(nextAmount, 10) || 1)), nextUnit) });

	return <>
		<SelectControl className='mt20' label={<>{__('Date Range:', 'advanced-post-block')} <HelpTooltip text={__('Show only the posts published within a period.', 'advanced-post-block')} /></>} labelPosition='left' value={value} onChange={val => update({ range: val, ...startOf[val] })} options={rangeOptions} />

		{'last' === value && <PanelRow className='apbDateLast mt10'>
			<NumberControl value={amount} onChange={val => setLast(val, unit)} min={1} max={9999} step={1} aria-label={__('Number', 'advanced-post-block')} />
			<SelectControl value={unit} onChange={val => setLast(amount, val)} options={unitOptions} aria-label={__('Unit', 'advanced-post-block')} />
		</PanelRow>}

		{'custom' === value && <>
			<TextControl className='mt10' type='date' label={__('From:', 'advanced-post-block')} value={after} max={before || undefined} onChange={val => update({ after: val })} />
			<TextControl className='mt10' type='date' label={<>{__('To:', 'advanced-post-block')} <HelpTooltip text={__('Both days are included. Leave one empty for a range with no start or no end.', 'advanced-post-block')} /></>} value={before} min={after || undefined} onChange={val => update({ before: val })} />
		</>}
	</>;
};
export default DateRange;
