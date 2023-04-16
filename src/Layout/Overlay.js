import PostTitle from '../Single/PostTitle';
import PostExcerpt from '../Single/PostExcerpt';
import PostReadMore from '../Single/PostReadMore';
import PostMeta from '../Single/PostMeta';

const Overlay = ({ post, attributes }) => {
	const { id, thumbnail } = post;
	const { layout, subLayout } = attributes;

	return <article className={`apbPost apbPost-${id} apbPostOverlay ${'overlay-content-hover' === subLayout && thumbnail ? 'apbPostOverlayHover' : ''} ${'overlay-box' === subLayout ? 'apbPostOverlayBox' : ''} ${'slider' === layout ? 'swiper-slide' : ''}`}>
		<div className='apbPostText'>
			<PostTitle post={post} attributes={attributes} />

			<PostMeta post={post} attributes={attributes} />

			{'overlay-box' !== subLayout && <>
				<PostExcerpt post={post} attributes={attributes} />
				<PostReadMore post={post} attributes={attributes} />
			</>}
		</div>
	</article>;
};
export default Overlay;