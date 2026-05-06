import Style from '../Common/Style';
import DisplayPosts from '../Common/DisplayPosts';
import Slider from './Layout/Slider';
import Ticker from './Layout/Ticker';
import useAjaxPosts from '../../hooks/useAjaxPosts';
import LoadingSkeleton from '../Common/LoadingSkeleton';
import NoPosts from './NoPosts';

const APBPosts = ({ attributes, id }) => {
	// wpApiSettings.nonce is globally available in the WP admin context
	const nonce = typeof wpApiSettings !== 'undefined' ? wpApiSettings.nonce : '';

	const { posts, isLoading } = useAjaxPosts(nonce, attributes, 1);

	return <>
		<Style attributes={attributes} id={id} />

		{isLoading ?
			<LoadingSkeleton attributes={attributes} /> : (
				posts?.length ?
					<DisplayPosts {...{ posts, attributes, id, Slider, Ticker }} /> :
					<NoPosts />
			)}
	</>
}
export default APBPosts;