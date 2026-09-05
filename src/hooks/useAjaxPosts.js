import { useState, useEffect } from 'react';

import { useWPAjax } from '../../../bpl-tools/hooks';

import { postsAjaxHandler } from '../utils/data';

const useAjaxPosts = (nonce, attributes, pageNumber) => {
	const { postType, taxonomyRelation = 'AND', selectedCategories = [], selectedTags = [], postsAuthors = [], isPostsPerPageAll, postsPerPage, postsOrderBy, postsOrder, postsOffset = 0, postsInclude = [], postsExclude = [], isExcludeSticky, currentPostId, fImgSize = 'full', isExcerptFromContent = false, excerptLength = 25, excerpt = {} } = attributes;
	const { from = 'excerpt' } = excerpt || {};

	const excerptFrom = (isExcerptFromContent || 'content' === from) ? 'content' : 'excerpt';

	const queryAttr = { postType, taxonomyRelation, selectedCategories, selectedTags, postsAuthors, isPostsPerPageAll, postsPerPage, postsOrderBy, postsOrder, postsOffset, postsInclude, postsExclude, isExcludeSticky, currentPostId, fImgSize, excerptFrom, excerptLength }
	const { data = null, saveData, isLoading } = useWPAjax(postsAjaxHandler, { _wpnonce: nonce, queryAttr, pageNumber }, false);

	const [posts, setPosts] = useState([]);
	const [totalPosts, setTotalPosts] = useState(0);

	useEffect(() => {
		if (data) {
			const { loadMore = {} } = attributes;
			const { type = '' } = loadMore || {};
			const loadMoreType = isPostsPerPageAll ? '' : (attributes.isPagination ? 'pagination' : type);

			const dataPosts = Array.isArray(data) ? data : (data?.posts || []);
			const dataTotalPosts = Array.isArray(data) ? 0 : (data?.totalPosts || 0);

			// The Load More button appends to the list; Pagination and Navigation replace it.
			if ('button' === loadMoreType) {
				setPosts(prev => Number(pageNumber) === 1 ? dataPosts : [...prev, ...dataPosts]);
			} else {
				setPosts(dataPosts);
			}

			if (dataTotalPosts > 0 || Array.isArray(data)) {
				setTotalPosts(dataTotalPosts);
			}
		}
	}, [data]);

	useEffect(() => {
		saveData({ pageNumber });
	}, [pageNumber, JSON.stringify(queryAttr)]);

	// Reset posts when query attributes change (excluding pageNumber which is handled above)
	useEffect(() => {
		if (pageNumber > 1) {
			setPosts([]);
		}
	}, [JSON.stringify(queryAttr)]);

	return { posts, isLoading, totalPosts };
};
export default useAjaxPosts;