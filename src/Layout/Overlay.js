// Components
import PostTitle from '../Single/PostTitle';
import PostExcerpt from '../Single/PostExcerpt';
import PostReadMore from '../Single/PostReadMore';
import PostMeta from '../Single/PostMeta';

// Functions
import func from '../Const/functions';
const { mediaUrl } = func;

const Overlay = ({ post, attributes }) => {
	const { id, featured_media } = post;
	const { layout, subLayout } = attributes;

	return <article className={`apbPost apbPost-${id} apbPostOverlay ${'overlay-content-hover' === subLayout && mediaUrl(featured_media) ? 'apbPostOverlayHover' : ''} ${'overlay-box' === subLayout ? 'apbPostOverlayBox' : ''} ${'slider' === layout ? 'swiper-slide' : ''}`}>
		<div className='apbPostText'>
			<PostTitle atts={attributes} post={post} />

			<PostMeta atts={attributes} post={post} />

			{'overlay-box' !== subLayout && <>
				<PostExcerpt atts={attributes} post={post} />
				<PostReadMore atts={attributes} post={post} />
			</>}
		</div>
	</article>;
};

export default Overlay;