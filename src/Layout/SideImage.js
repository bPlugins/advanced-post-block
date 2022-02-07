// Components
import FeatureImage from '../Single/FeatureImage';
import PostTitle from '../Single/PostTitle';
import PostExcerpt from '../Single/PostExcerpt';
import PostReadMore from '../Single/PostReadMore';
import PostMeta from '../Single/PostMeta';

const SideImage = ({ atts, post }) => {
	const { layout, subLayout } = atts;
	const { id } = post;

	return <article className={`apbPost apbPost-${id} apbPostSideImage ${'left-image' === subLayout ? 'leftImage' : 'right-image' === subLayout ? 'rightImage' : ''} ${'slider' === layout ? 'swiper-slide' : ''}`}>
		{'left-image' === subLayout && <FeatureImage atts={atts} post={post} />}

		<div className='apbPostText'>
			<PostTitle atts={atts} post={post} />

			<PostMeta atts={atts} post={post} />

			<PostExcerpt atts={atts} post={post} />
			<PostReadMore atts={atts} post={post} />
		</div>

		{'right-image' === subLayout && <FeatureImage atts={atts} post={post} />}
	</article>;
};
export default SideImage;