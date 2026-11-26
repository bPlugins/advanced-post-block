import { useState, useEffect, useMemo, useRef, useCallback } from 'react';

import usePostsQuery from './usePostsQuery';
import { getFilter, emptySelection, cleanSelection } from '../utils/filter';
import { getPaginationPage } from '../utils/paginationStorage';

/**
 * Holds everything a block needs to show its posts: the filter settings, the visitor's pick,
 * the page number and the loaded posts.
 *
 * @param {string}	id			The block wrapper id.
 * @param {Object}	attributes	Block attributes.
 * @param {Object}	request		Passed to usePostsQuery.
 * @param {boolean}	isEditor	The editor never touches stored pages.
 * @param {Object}	initialFacets	Filter choices printed by the server.
 * @param {Object}	legacy		Passed to usePostsQuery.
 */
const useFilteredPosts = ({ id, attributes, request, isEditor = false, initialFacets = null, legacy = null }) => {
	const { layout, postType, isPagination, isPostsPerPageAll, loadMore = {}, frontendFilter } = attributes;

	// "Limit Number of Pages": a page restored from the session or the address bar stays inside it.
	const maxPages = Math.max(0, parseInt(loadMore?.maxPages, 10) || 0) || Infinity;

	const loadMoreType = isPostsPerPageAll ? '' : (isPagination ? 'pagination' : (loadMore?.type || ''));

	const filter = useMemo(() => getFilter(attributes), [JSON.stringify(frontendFilter), layout, postType]);

	// A filtered block starts on page 1; an unfiltered one returns to the page it was left on.
	const [state, setState] = useState(() => ({ selection: emptySelection(), pageNumber: isEditor || filter.enabled ? 1 : Math.min(getPaginationPage(id, 1), maxPages) }));

	// Picks the current settings no longer offer are dropped before they reach the server.
	const selection = useMemo(() => cleanSelection(state.selection, filter), [state.selection, filter]);
	const { pageNumber } = state;

	const { posts, totalPosts, facets: loadedFacets, isLoading, hasLoaded, isError, retry } = usePostsQuery({
		request,
		selection,
		pageNumber,
		loadMoreType,
		withFacets: isEditor && filter.enabled,
		legacy
	});

	// Any change of filter goes back to the first page.
	const setSelection = useCallback(nextSelection => {
		setState({ selection: cleanSelection(nextSelection, filter), pageNumber: 1 });
	}, [filter]);

	const setPageNumber = useCallback(page => {
		setState(prev => ({ ...prev, pageNumber: page }));
	}, []);

	// In the editor the query changes under the block; start again from page 1 when it does.
	const requestKey = request?.attrs || request?.query || '';
	const isFirstRun = useRef(true);
	useEffect(() => {
		if (isFirstRun.current) {
			isFirstRun.current = false;
			return;
		}

		setState(prev => 1 === prev.pageNumber ? prev : { ...prev, pageNumber: 1 });
	}, [requestKey]);

	return {
		filter,
		facets: loadedFacets || initialFacets,
		selection,
		setSelection,
		pageNumber,
		setPageNumber,
		loadMoreType,
		posts,
		totalPosts,
		isLoading,
		hasLoaded,
		isError,
		retry
	};
};
export default useFilteredPosts;
