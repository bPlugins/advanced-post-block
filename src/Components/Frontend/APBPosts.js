import { useMemo } from 'react';

import Style from '../Common/Style';
import PostsView from '../Common/PostsView';
import Slider from '../Common/Layout/Slider';
import Ticker from './Layout/Ticker';
import useFilteredPosts from '../../hooks/useFilteredPosts';
import { getQueryAttr } from '../../utils/filter';

const APBPosts = ({ nonce, attributes, id, request = {} }) => {
	// The signed query also holds the attributes the old admin-ajax action expects, for the
	// rare site where the REST API is blocked.
	// A page cached before the REST route existed carries no signed query at all; the
	// attributes it does carry give the same list.
	const legacy = useMemo(() => {
		try {
			return { nonce, queryAttr: JSON.parse(request.query).query };
		} catch (error) {
			return { nonce, queryAttr: getQueryAttr(attributes) };
		}
	}, [nonce, request.query]);

	const controller = useFilteredPosts({ id, attributes, request, initialFacets: request.facets, legacy });

	return <>
		<Style attributes={attributes} id={id} />

		<PostsView {...{ controller, attributes, id, Slider, Ticker }} />
	</>
}
export default APBPosts;
