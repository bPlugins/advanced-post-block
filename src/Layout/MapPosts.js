import Default from './Default';
import SideImage from './SideImage';
import Overlay from './Overlay';

const MapPosts = ({ posts, attributes }) => {
	const { subLayout } = attributes;

	return posts.map(post => (
		('default' === subLayout || 'title-meta' === subLayout) ?
			<Default post={post} attributes={attributes} /> :
			('left-image' === subLayout || 'right-image' === subLayout) ?
				<SideImage post={post} attributes={attributes} /> :
				('overlay-content' === subLayout || 'overlay-content-hover' === subLayout || 'overlay-box' === subLayout) && <Overlay post={post} attributes={attributes} />
	));
}
export default MapPosts;