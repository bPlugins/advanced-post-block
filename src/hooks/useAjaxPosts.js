import { useState, useEffect } from 'react';

import { useWPAjax } from '../../../bpl-tools/hooks';

import { postsAjaxHandler } from '../utils/data';

const useAjaxPosts = (nonce, attributes, pageNumber) => {
	const { postType, taxonomyRelation = 'AND', selectedCategories = [], selectedTags = [], postsAuthors = [], isPostsPerPageAll, postsPerPage, postsOrderBy, postsOrder, postsOffset = 0, postsInclude = [], postsExclude = [], currentPostId, fImgSize = 'full', isExcerptFromContent = false, excerptLength = 25, excerpt = {} } = attributes;
	const { from = 'excerpt' } = excerpt || {};

	const excerptFrom = (isExcerptFromContent || 'content' === from) ? 'content' : 'excerpt';

	const queryAttr = { postType, taxonomyRelation, selectedCategories, selectedTags, postsAuthors, isPostsPerPageAll, postsPerPage, postsOrderBy, postsOrder, postsOffset, postsInclude, postsExclude, currentPostId, fImgSize, excerptFrom, excerptLength }
	const { data = null, saveData, isLoading } = useWPAjax(postsAjaxHandler, { _wpnonce: nonce, queryAttr, pageNumber }, false);

	const [posts, setPosts] = useState([]);
	const [totalPosts, setTotalPosts] = useState(0);

	useEffect(() => {
		if (data) {
			const dataPosts = Array.isArray(data) ? data : (data?.posts || []);
			const dataTotalPosts = Array.isArray(data) ? 0 : (data?.totalPosts || 0);

			// Pagination and Navigation both replace the list; the appending types
			// (Infinity Scroll, Load More button) are premium-only.
			setPosts(dataPosts);

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