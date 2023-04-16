import FeatureImage from '../Single/FeatureImage';
import PostTitle from '../Single/PostTitle';
import PostExcerpt from '../Single/PostExcerpt';
import PostReadMore from '../Single/PostReadMore';
import PostMeta from '../Single/PostMeta';

const Default = ({ post, attributes }) => {
	const { id } = post;
	const { layout, subLayout } = attributes;

	return <article className={`apbPost apbPost-${id} apbPostDefault ${'slider' === layout ? 'swiper-slide' : ''}`}>
		<FeatureImage post={post} attributes={attributes} />

		<div className='apbPostText'>
			<PostTitle post={post} attributes={attributes} />

			<PostMeta post={post} attributes={attributes} />

			{'title-meta' !== subLayout && <>
				<PostExcerpt post={post} attributes={attributes} />
				<PostReadMore post={post} attributes={attributes} />
			</>}
		</div>
	</article>;
};
export default Default;