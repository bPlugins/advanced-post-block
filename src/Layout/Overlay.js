// Components
import PostTitle from '../Single/PostTitle';
import PostExcerpt from '../Single/PostExcerpt';
import PostReadMore from '../Single/PostReadMore';
import PostMeta from '../Single/PostMeta';

// Functions
import func from '../Const/functions';
const { mediaUrl } = func;

const Overlay = ({ atts, post }) => {
	const { layout, subLayout } = atts;
	const { id, featured_media } = post;

	return <article className={`apbPost apbPost-${id} apbPostOverlay ${'overlay-content-hover' === subLayout && mediaUrl(featured_media) ? 'apbPostOverlayHover' : ''} ${'overlay-box' === subLayout ? 'apbPostOverlayBox' : ''} ${'slider' === layout ? 'swiper-slide' : ''}`}>
		<div className='apbPostText'>
			<PostTitle atts={atts} post={post} />

			<PostMeta atts={atts} post={post} />

			{'overlay-box' !== subLayout && <>
				<PostExcerpt atts={atts} post={post} />
				<PostReadMore atts={atts} post={post} />
			</>}
		</div>
	</article>;
};

export default Overlay;