import { useState } from 'react';

import Style from '../Common/Style';
import DisplayPosts from '../Common/DisplayPosts';
import Slider from './Layout/Slider';
import Ticker from './Layout/Ticker';
import LoadMore from '../Common/LoadMore';
import useAjaxPosts from '../../hooks/useAjaxPosts';
import LoadingSkeleton from '../Common/LoadingSkeleton';
import NoPosts from './NoPosts';

const APBPosts = ({ attributes, id }) => {
	const { layout, isPostsPerPageAll, postsPerPage } = attributes;
	const [pageNumber, setPageNumber] = useState(1);

	// wpApiSettings.nonce is globally available in the WP admin context
	const nonce = typeof wpApiSettings !== 'undefined' ? wpApiSettings.nonce : '';

	const { posts, isLoading, totalPosts } = useAjaxPosts(nonce, attributes, pageNumber);

	return <>
		<Style attributes={attributes} id={id} />

		{isLoading ?
			<LoadingSkeleton attributes={attributes} /> : (
				posts?.length ?
					<DisplayPosts {...{ posts, attributes, id, Slider, Ticker }} /> :
					<NoPosts />
			)}

		{(!['slider', 'ticker', 'newsTicker'].includes(layout) && !isPostsPerPageAll && totalPosts > postsPerPage) && <LoadMore {...{ attributes, id, pageNumber, totalCount: totalPosts, isLoading }} onChange={val => setPageNumber(val)} />}
	</>
}
export default APBPosts;
