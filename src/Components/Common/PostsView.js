import { __ } from '@wordpress/i18n';

import DisplayPosts from './DisplayPosts';
import LoadMore from './LoadMore';
import LoadingSkeleton from './LoadingSkeleton';
import FilterBar from './Filter';
import FilterStatus from './Filter/FilterStatus';
import NoResults from './Filter/NoResults';

import { prefix } from '../../utils/data';
import { emptySelection } from '../../utils/filter';
import { pagedTotal } from '../../utils/paginationStorage';

/**
 * The posts of a block with their load-more control and, when it is on, the frontend filter.
 * Shared by the frontend and the editor preview; `controller` comes from useFilteredPosts().
 *
 * @param {Object}	controller	State and actions from useFilteredPosts().
 * @param {Object}	attributes	Block attributes.
 * @param {string}	id			The block wrapper id.
 * @param {Object}	Slider		Slider layout component (differs between frontend and editor).
 * @param {Object}	Ticker		Ticker layout component (differs between frontend and editor).
 * @param {Object}	Empty		Shown when an unfiltered block has no posts (editor only).
 */
const PostsView = ({ controller, attributes, id, Slider, Ticker, Empty = null }) => {
	const { layout, isPostsPerPageAll, postsPerPage } = attributes;
	const { filter, facets, selection, setSelection, pageNumber, setPageNumber, loadMoreType, posts, totalPosts, isLoading, hasLoaded, isError, retry } = controller;

	// "Limit Number of Pages" caps what the pager offers; the result count still shows every match.
	const pagerTotal = pagedTotal(totalPosts, attributes);

	const hasLoadMore = !['slider', 'ticker', 'newsTicker'].includes(layout) && !isPostsPerPageAll && pagerTotal > postsPerPage;

	const loadMoreEl = hasLoadMore && <LoadMore {...{ attributes, id, pageNumber, totalCount: pagerTotal, isLoading }} persist={!filter.enabled} onChange={setPageNumber} />;
	const postsEl = <DisplayPosts {...{ posts, attributes, id, Slider, Ticker }} />;

	// The request failed even after retrying. Posts already on screen stay above the message.
	const errorEl = isError && <div className={`${prefix}FilterNoResults ${prefix}LoadError`} role='alert'>
		<p>{__('The posts could not be loaded.', 'advanced-post-block')}</p>
		<button type='button' className={`${prefix}FilterReset`} onClick={retry}>{__('Try again', 'advanced-post-block')}</button>
	</div>;

	if (!filter.enabled) {
		return <>
			{isLoading ?
				<LoadingSkeleton attributes={attributes} /> :
				(posts?.length || !Empty || isError ? postsEl : <Empty />)}

			{errorEl}

			{loadMoreEl}
		</>;
	}

	const reset = () => setSelection(emptySelection());

	// More posts joining the list below is not a refresh, so the list does not dim for it.
	const isAppending = 'button' === loadMoreType && pageNumber > 1;
	const isRefreshing = isLoading && hasLoaded && !isAppending;

	return <div className={`${prefix}FilterLayout ${prefix}FilterPos-top`}>
		<FilterBar {...{ filter, facets, selection }} onChange={setSelection} />

		<div className={`${prefix}FilterResults ${isRefreshing ? `${prefix}FilterBusy` : ''}`} aria-busy={isLoading}>
			<FilterStatus {...{ filter, selection, totalPosts, isLoading }} hasLoaded={hasLoaded && !isError} onReset={reset} />

			{!hasLoaded ?
				<LoadingSkeleton attributes={attributes} /> :
				(posts?.length ? postsEl : (isLoading ? <LoadingSkeleton attributes={attributes} /> : (!isError && <NoResults {...{ filter, selection }} onReset={reset} />)))}

			{errorEl}

			{loadMoreEl}
		</div>
	</div>;
};
export default PostsView;
