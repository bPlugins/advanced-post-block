import { useMemo } from 'react';

import Style from '../Common/Style';
import PostsView from '../Common/PostsView';
import Slider from './Layout/Slider';
import Ticker from './Layout/Ticker';
import NoPosts from './NoPosts';
import useFilteredPosts from '../../hooks/useFilteredPosts';
import { getFilter, getQueryAttr, filterForRequest } from '../../utils/filter';

const APBPosts = ({ attributes, id }) => {
	// wpApiSettings is globally available in the WP admin context
	const hasApi = typeof wpApiSettings !== 'undefined';

	// The editor sends the unsaved attributes; the server accepts them from logged-in editors only.
	const attrs = JSON.stringify({
		query: getQueryAttr(attributes),
		filter: filterForRequest(getFilter(attributes))
	});

	const request = useMemo(() => ({
		url: `${hasApi ? wpApiSettings.root : '/wp-json/'}apb/v1/posts`,
		nonce: hasApi ? wpApiSettings.nonce : '',
		attrs
	}), [attrs]);

	const controller = useFilteredPosts({ id, attributes, request, isEditor: true });

	return <>
		<Style attributes={attributes} id={id} />

		<PostsView {...{ controller, attributes, id, Slider, Ticker }} Empty={NoPosts} />
	</>
}
export default APBPosts;
