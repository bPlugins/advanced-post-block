import { useState } from 'react';
import Style from '../Common/Style';
import DisplayPosts from '../Common/DisplayPosts';
import LoadMore from '../Common/LoadMore';
import Slider from '../Common/Layout/Slider';
import Ticker from './Layout/Ticker';
import useAjaxPosts from '../../hooks/useAjaxPosts';
import LoadingSkeleton from '../Common/LoadingSkeleton';
import { getPaginationPage } from '../../utils/paginationStorage';

const APBPosts = ({ nonce, attributes, id }) => {
	const { layout, isPostsPerPageAll, postsPerPage } = attributes;
	const [pageNumber, setPageNumber] = useState(() => getPaginationPage(id, 1));

	const { posts, isLoading, totalPosts } = useAjaxPosts(nonce, attributes, pageNumber);

	return <>
		<Style attributes={attributes} id={id} />

		{isLoading ?
			<LoadingSkeleton attributes={attributes} /> :
			<DisplayPosts {...{ posts, attributes, id, Slider, Ticker }} />}

		{(!['slider', 'ticker', 'newsTicker'].includes(layout) && !isPostsPerPageAll && totalPosts > postsPerPage) && <LoadMore {...{ attributes, id, pageNumber, totalCount: totalPosts, isLoading }} onChange={val => setPageNumber(val)} />}
	</>
}
export default APBPosts;
