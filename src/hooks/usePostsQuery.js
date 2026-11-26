import { useState, useEffect, useRef } from 'react';

import { postsAjaxHandler } from '../utils/data';
import { isSelectionEmpty } from '../utils/filter';

const buildUrl = (request, selection, pageNumber, withFacets) => {
	// The REST root may already carry a query string (plain permalinks use ?rest_route=).
	const url = new URL(request.url, window.location.href);
	const { searchParams } = url;

	if (request.attrs) {
		searchParams.set('attrs', request.attrs);
	} else {
		searchParams.set('q', request.query);
		searchParams.set('sig', request.sig);
	}

	if (pageNumber > 1) searchParams.set('page', pageNumber);
	if (withFacets) searchParams.set('facets', 1);

	const { tax = {} } = selection || {};
	Object.keys(tax).sort().forEach(taxonomy => {
		if (tax[taxonomy]?.length) searchParams.set(`tax[${taxonomy}]`, tax[taxonomy].join(','));
	});

	return url.toString();
};

// The admin-ajax action the block used before the REST route existed. It cannot filter, so it
// only stands in when the REST API is unreachable and the visitor has picked nothing.
const legacyRequest = (legacy, pageNumber) => new Promise((resolve, reject) => {
	if (!legacy?.queryAttr || !window.wp?.ajax) {
		reject(new Error('unavailable'));
		return;
	}

	window.wp.ajax
		.post(postsAjaxHandler, { _wpnonce: legacy.nonce, queryAttr: legacy.queryAttr, pageNumber })
		.done(resolve)
		.fail(reject);
});

/**
 * Loads one page of posts for a block.
 *
 * @param {Object}	request			Where and what to ask: { url, query, sig } on the frontend, { url, attrs, nonce } in the editor.
 * @param {Object}	selection		The visitor's filter pick.
 * @param {number}	pageNumber		Page to load.
 * @param {string}	loadMoreType	'button' adds to the posts already shown.
 * @param {boolean}	withFacets		Ask for the filter choices too (the editor has no server-rendered copy).
 * @param {Object}	legacy			{ nonce, queryAttr } for the admin-ajax stand-in.
 */
const usePostsQuery = ({ request, selection, pageNumber, loadMoreType = '', withFacets = false, legacy = null }) => {
	const [posts, setPosts] = useState([]);
	const [totalPosts, setTotalPosts] = useState(0);
	const [facets, setFacets] = useState(null);
	const [settledKey, setSettledKey] = useState(null);
	const [hasLoaded, setHasLoaded] = useState(false);
	const [isError, setIsError] = useState(false);
	const [retryCount, setRetryCount] = useState(0);

	const lastKeyRef = useRef(null);

	const queryKey = JSON.stringify([request?.attrs || request?.query || '', selection]);

	// Loading is worked out from what was asked for against what has arrived, so it is already
	// true in the same render that changes a filter - there is no frame of stale "done".
	const requestKey = `${queryKey}|${pageNumber}|${withFacets}|${retryCount}`;
	const isLoading = settledKey !== requestKey;

	useEffect(() => {
		const controller = 'undefined' !== typeof AbortController ? new AbortController() : null;
		let isCurrent = true;
		let retryTimer = null;

		const isAppending = 'button' === loadMoreType && Number(pageNumber) > 1 && lastKeyRef.current === queryKey;

		const receive = data => {
			if (!isCurrent) return;

			const dataPosts = Array.isArray(data) ? data : (data?.posts || []);

			setPosts(prev => isAppending ? [...prev, ...dataPosts] : dataPosts);
			setTotalPosts(Array.isArray(data) ? 0 : (data?.totalPosts || 0));
			if (data?.facets) setFacets(data.facets);

			lastKeyRef.current = queryKey;
			setIsError(false);
			setHasLoaded(true);
			setSettledKey(requestKey);
		};

		// A failed request is not an empty result: the posts already on screen stay, and the
		// block says it could not load instead of claiming there are no posts.
		const fail = () => {
			if (!isCurrent) return;

			setIsError(true);
			setHasLoaded(true);
			setSettledKey(requestKey);
		};

		const load = () => {
			const url = buildUrl(request, selection, pageNumber, withFacets);

			// In the editor WordPress sends the request itself: it holds the current nonce and
			// replaces it when a long-open tab has let it expire.
			if (request.nonce && window.wp?.apiFetch) {
				return window.wp.apiFetch({ url, signal: controller?.signal })
					.catch(error => Promise.reject('AbortError' === error?.name ? error : Object.assign(new Error(error?.message || 'Request failed'), { status: error?.data?.status })));
			}

			return window.fetch(url, {
				credentials: 'same-origin',
				headers: request.nonce ? { 'X-WP-Nonce': request.nonce } : {},
				signal: controller?.signal
			}).then(response => response.ok ? response.json() : Promise.reject(Object.assign(new Error(`HTTP ${response.status}`), { status: response.status })));
		};

		const send = attempt => load()
			.catch(error => {
				// A busy or restarting server (no answer, or a 5xx) often answers a moment later.
				const isTransient = 'AbortError' !== error?.name && (!error?.status || error.status >= 500);

				if (!isTransient || attempt >= 2 || !isCurrent) throw error;

				return new Promise(resolve => {
					retryTimer = setTimeout(resolve, 1200 * (attempt + 1));
				}).then(() => send(attempt + 1));
			});

		// No signed query means the page was cached before the REST route existed.
		if (!request?.url) {
			legacyRequest(legacy, pageNumber).then(receive).catch(fail);

			return () => {
				isCurrent = false;
			};
		}

		send(0)
			.then(receive)
			.catch(error => {
				if ('AbortError' === error?.name || !isCurrent) return;

				if (legacy && isSelectionEmpty(selection)) {
					legacyRequest(legacy, pageNumber).then(receive).catch(fail);
				} else {
					fail();
				}
			});

		// A newer request replaces this one, so a slow early response can never overwrite a later one.
		return () => {
			isCurrent = false;
			clearTimeout(retryTimer);
			controller?.abort();
		};
	}, [queryKey, pageNumber, request?.url, withFacets, retryCount]);

	const retry = () => setRetryCount(count => count + 1);

	return { posts, totalPosts, facets, isLoading, hasLoaded, isError: isError && !isLoading, retry };
};
export default usePostsQuery;
