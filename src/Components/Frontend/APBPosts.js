import Style from '../Common/Style';
import DisplayPosts from '../Common/DisplayPosts';
import Slider from '../Common/Layout/Slider';
import Ticker from './Layout/Ticker';
import useAjaxPosts from '../../hooks/useAjaxPosts';
import LoadingSkeleton from '../Common/LoadingSkeleton';

const APBPosts = ({ nonce, attributes, id }) => {
	const { posts, isLoading } = useAjaxPosts(nonce, attributes, 1);

	return <>
		<Style attributes={attributes} id={id} />

		{isLoading ?
			<LoadingSkeleton attributes={attributes} /> :
			<DisplayPosts {...{ posts, attributes, id, Slider, Ticker }} />}
	</>
}
export default APBPosts;