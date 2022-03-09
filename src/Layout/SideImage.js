// Components
import FeatureImage from '../Single/FeatureImage';
import PostTitle from '../Single/PostTitle';
import PostExcerpt from '../Single/PostExcerpt';
import PostReadMore from '../Single/PostReadMore';
import PostMeta from '../Single/PostMeta';

const SideImage = ({ post, attributes }) => {
	const { id } = post;
	const { layout, subLayout } = attributes;

	return <article className={`apbPost apbPost-${id} apbPostSideImage ${'left-image' === subLayout ? 'leftImage' : 'right-image' === subLayout ? 'rightImage' : ''} ${'slider' === layout ? 'swiper-slide' : ''}`}>
		{'left-image' === subLayout && <FeatureImage atts={attributes} post={post} />}

		<div className='apbPostText'>
			<PostTitle atts={attributes} post={post} />

			<PostMeta atts={attributes} post={post} />

			<PostExcerpt atts={attributes} post={post} />
			<PostReadMore atts={attributes} post={post} />
		</div>

		{'right-image' === subLayout && <FeatureImage atts={attributes} post={post} />}
	</article>;
};
export default SideImage;