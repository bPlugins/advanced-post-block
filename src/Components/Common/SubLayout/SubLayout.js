import Default from './Default';
import SideImage from './SideImage';
import Overlay from './Overlay';
import { classNames } from '../../../utils/functions';
import { prefix } from '../../../utils/data';

const SubLayout = ({ post, attributes }) => {
	const { subLayout, content = { height: 'auto' } } = attributes;

	const { id, thumbnail } = post;
	const postClass = classNames(`${prefix}Post`, `${prefix}Post-${id}`, `${content?.height}ContentHeight`, {
		'hasThumbnail': thumbnail.url
	});

	switch (subLayout) {
		case 'default':
		case 'title-meta':
			return <Default post={post} attributes={attributes} postClass={postClass} />;
		case 'left-image':
		case 'right-image':
			return <SideImage post={post} attributes={attributes} postClass={postClass} />;
		case 'overlay-content':
		case 'overlay-content-hover':
		case 'overlay-box':
		case 'overlay-content-box':
		case 'overlay-half-content':
			return <Overlay post={post} attributes={attributes} postClass={postClass} />;
		default:
			// Premium-only sub-layouts (the even/odd lists) can survive in saved content
			// after a downgrade — fall back to Default so the post still renders.
			return <Default post={post} attributes={attributes} postClass={postClass} />;
	}
}
export default SubLayout;