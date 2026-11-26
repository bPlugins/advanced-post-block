import { _n, sprintf } from '@wordpress/i18n';

import { prefix } from '../../../utils/data';
import { isSelectionEmpty } from '../../../utils/filter';

/**
 * The line above the posts: how many posts matched and Clear all.
 * The count sits in a live region that is in the page from the start, so screen readers
 * announce every change, including "no posts".
 */
const FilterStatus = ({ filter, selection, totalPosts, hasLoaded, isLoading, onReset }) => {
	const { resultCount, reset, noResults } = filter;

	const canReset = reset.enabled && !isSelectionEmpty(selection);

	let countText = '';
	if (hasLoaded && !isLoading) {
		/* translators: %d: Number of posts found. */
		countText = totalPosts > 0 ? sprintf(_n('%d post', '%d posts', totalPosts, 'advanced-post-block'), totalPosts) : noResults.text;
	}

	return <div className={`${prefix}FilterStatus`}>
		<span className={`${prefix}FilterResultCount ${resultCount.enabled ? '' : `${prefix}SrOnly`}`} role='status' aria-live='polite'>{countText}</span>

		{canReset && <button type='button' className={`${prefix}FilterReset`} onClick={onReset}>{reset.label}</button>}
	</div>;
};
export default FilterStatus;
